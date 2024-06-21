'use client';

import type { User } from '@/types/user';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '@/lib/firebase';

function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;
    const auth = getAuth();

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      const uid = userCredential.user.uid;

      console.log(uid);
      // Fetch user details with the authorization header
      const response = await fetch(`https://users-qtuc4oxynq-uc.a.run.app/admin/get/${uid}`, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });

      const data = await response.json();

      if (data.error) {
        return { error: data.message };
      }

      const user = data.result;

      // Check for required conditions
      if (user.role !== 'admin') {
        return { error: 'You do not have the required admin role.' };
      }

      if (user.status !== 'active') {
        return { error: 'Your account is not active.' };
      }

      if (!user.permissions.includes('manage_providers')) {
        return { error: 'You do not have the required permissions to manage providers.' };
      }

      localStorage.setItem('custom-auth-token', idToken);
      localStorage.setItem('uid', uid);
      localStorage.setItem('email', email);
      localStorage.setItem('external_login', 'false');

      return {};
    } catch (error:any) {
      return { error: error.message };
    }
  }


  async signOut(): Promise<{ error?: string }> {
    try {
      await auth.signOut();
      localStorage.removeItem('custom-auth-token');
      localStorage.removeItem('uid');
      return {};
    } catch (error:any) {
      return { error: error.message };
    }
  }


  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

}

export const authClient = new AuthClient();
