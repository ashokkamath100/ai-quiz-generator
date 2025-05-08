import { NextApiRequest, NextApiResponse } from 'next';
//import { signup, login, auth, logout } from '@/lib/auth';
import {signup, login} from '@/actions/auth-actions' ; 
import { verifyAuth } from '@/lib/auth';


export async function POST(req: Request) {
    console.log('API POST route hit for auth');
    
    try {
      const body = await req.json(); // Parse JSON from the request body
      const { mode, formData } = body;
  
      let result;
      switch (mode) {
        case 'signup':
          result = await signup({}, formData); // Pass empty initial state
          break;
        case 'login':
          result = await login({}, formData);
          break;
        default:
          return new Response(JSON.stringify({ error: 'Invalid authentication mode' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
      }
  
      if (result.errors) {
        return new Response(JSON.stringify(result), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error during authentication:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  
  export async function GET() {
    console.log('API GET route hit for auth');

    try {
      // Call the verifyAuth function to get the user and session information
      const { user, session } = await verifyAuth();
  
      if (!user || !session) {
        return new Response(
          JSON.stringify({ user: null, session: null }),
          {
            status: 401, // Unauthorized
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
  
      // Return the authenticated user and session information
      return new Response(
        JSON.stringify({ user, session }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Error verifying authentication:', error);
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }