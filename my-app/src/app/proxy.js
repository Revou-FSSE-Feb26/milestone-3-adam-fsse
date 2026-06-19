'use server';

import { cookies } from 'next/headers';

/**
 * Helper function to retrieve and parse the active session cookie
 * safely from any Server Component or Server Action in your app.
 */
export async function getSessionData() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session || !session.value) return null;

  try {
    return JSON.parse(session.value); // Returns the parsed object: { user, token }
  } catch {
    return null;
  }
}

/**
 * Helper function to quickly verify if the current user has administrative rights.
 * Returns true if the active role is 'admin' (like Emily), otherwise false.
 */
export async function checkIsAdmin() {
  const sessionData = await getSessionData();
  return sessionData?.user?.role === 'admin';
}