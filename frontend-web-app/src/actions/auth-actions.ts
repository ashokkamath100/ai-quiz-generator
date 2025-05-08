'use server' ; 
import { createAuthSession, destroySession } from '@/lib/auth';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getUserByEmail } from '@/lib/user';
import { redirect} from 'next/navigation';

export async function signup(prevState, formData) {
    const email = formData.get('email') ; 
    const password = formData.get('password') ; 

    let errors = {} ; 

    if(!email.includes('a')){
        errors.email ='Please enter a valid email address.' ; 
    }

    if(password.trim().length < 8) {
        errors.password = 'Password must be at least 8 charcters' ; 
    }

    if(Object.keys(errors).length > 0){
        return {
            errors,
        } //this object will become the new state that is return to 
        //formState in AuthForm
    }

    //store the new user in a database 
    const hashedPassword = hashUserPassword(password) ;
    try {
        //createUser(email,password) ; 
        const id = createUser(email,hashedPassword) ;
        await createAuthSession(id) ; 
        redirect('/training') ; 
    } catch(error){
        if(error.code === 'SQLITE_CONSTRAINT_UNIQUE'){
            return {
                errors: {
                    email: 'It seems like an account for the chosen email already exists'
                }
            }
        }
        throw error ; 
    }
}


export async function login(prevState, formData) {
    const email = formData.get('email') ; 
    const password = formData.get('password') ; 

    const existingUser = getUserByEmail(email) ; 
    console.log(existingUser) ; 
    if(!existingUser){
        return {
            errors: {
                email: 'Could not authenticate user, please check your credentials'
            }
        }
    }

    const isValidPassword = verifyPassword(existingUser.password, password) ; 
    if(!isValidPassword){
        return {
            errors: {
                password: 'Could not authenticate user, please check your credentials'
            }
        }
    }
    await createAuthSession(existingUser.id) ; 
    redirect('/myLibrary') ; 
}

export async function auth(mode, prevState, formData) {
    if(mode === 'login'){
        return login(prevState, formData) ; 
    }
    return signup(prevState, formData) ; 

}

export async function logout() {
    await destroySession()
    redirect('/') ; 
}