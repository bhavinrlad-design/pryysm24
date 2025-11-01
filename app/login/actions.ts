'use server'

import { signIn } from '@/auth'

export async function signInAzureAD() {
  await signIn('azure-ad')
}
