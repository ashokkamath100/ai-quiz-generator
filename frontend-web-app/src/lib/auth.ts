import { Lucia } from 'lucia' ; 
import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import db from './db';
import { cookies } from 'next/headers';


const adapter = new BetterSqlite3Adapter(db, {
    user: 'users',
    session: 'sessions'
}) ; 
const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    }
}) ; 

//should create auth session for input userId and 
//create cookie for outgoing request
export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId, {}) ; //give session object
    const sessionCookie = lucia.createSessionCookie(session.id) ; 
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes) ; 
}

export async function verifyAuth() {
    const sessionCookie = cookies().get(lucia.sessionCookieName) ; 

    if(!sessionCookie){
        return {
            user: null, 
            session: null
        }
    }

    const sessionId = sessionCookie.value ; 

    if(!sessionId){
        return {
            user: null, 
            session: null
        }
    }
    //we know we have session cookie and id 
    //we need to find if its valid using lucia object and passing sessionId
    //looks into database and sees if there is a valid session 
    const result = await lucia.validateSession(sessionId) ; 
    try {
        if(result.session && result.session.fresh) {
            lucia.createSessionCookie(result.session.id) ; 
            cookies().set(
                sessionCookie.name, 
                sessionCookie.value, 
                sessionCookie.attributes
            )
        }
        if(!result.session) {
            lucia.createBlankSessionCookie() ; 
            cookies().set(
                sessionCookie.name, 
                sessionCookie.value, 
                sessionCookie.attributes
            )
        }
    }
    catch {}
    return result ; 
}


export async function destroySession() {
    const {session} = await verifyAuth() ; 

    if(!session){
        return {
            error: 'Unauthorized'
        }
    }

    await lucia.invalidateSession(session.id) ; //delete session from database

    const sessionCookie = lucia.createBlankSessionCookie() ; 
    cookies().set(
        sessionCookie.name, 
        sessionCookie.value, 
        sessionCookie.attributes
    )
}