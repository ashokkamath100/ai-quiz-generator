import { AuthProvider } from '@/components/AuthContext'; // Import the AuthProvider
import "../globals.css";
import VerticalNavBar from "@/components/VerticalNavBar";
import { redirect } from 'next/navigation';

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

async function getAuthData() {
    // This is the crucial part: Fetch authentication data HERE, in a Server Component
    try {
        console.log('auth layout making auth api call') ; 
        const res = await fetch('http://localhost:3000/api/auth', {
            cache: 'no-store', // Prevent caching for up-to-date auth checks
        });        
        if (res.status === 401) {
            // Redirect to the home page on a 401 response
            redirect('/');
            return; // Ensure nothing is executed after the redirect
        }
        if (!res.ok) {
            console.error("Error fetching auth data:", res.status, await res.text());
            return null; // Handle errors appropriately
        }
        const authData = await res.json();
        return authData;
    } catch (error) {
        console.error("Error fetching auth data:", error);
        return null;
    }
}

export default async function AuthRootLayout({ children }) {
    const authData = await getAuthData();

  return (
    <AuthProvider authData={authData}> {/* Pass authData as a prop */}
      <header id="auth-header"></header>
      <div className="flex h-screen overflow-hidden">
        <div className="w-56 h-screen overflow-auto m-4">
          <VerticalNavBar />
        </div>
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </div>
    </AuthProvider>
  );
}
