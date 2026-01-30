'use server'

import { getPayload } from '@/shared/lib/better-auth/payload'
// import { getPayload } from 'payload'
import config from '@payload-config'
import { parseCookies } from 'better-auth/cookies'
import { headers as getHeaders } from 'next/headers'
import { cookies } from 'next/headers'

// import { cookies as getCookies } from 'next/headers'
// import { revalidatePath } from 'next/cache'
// import {
//   updateProfileSchema,
//   UpdateProfileZodFieldErrors,
// } from '../modules/schemas'

export async function saveAvatar(_: any, formData: FormData) {
  const userId = formData.get('userId') as string
  const avatarFile = formData.get('avatar_file')
  console.log('saveAvatar', userId, avatarFile, avatarFile instanceof File)
  try {
    // Upload the avatar to media collection
    const formData = new FormData()
    formData.append('file', avatarFile as any)
    formData.append(
      '_payload',
      JSON.stringify({
        alt: `avatar`,
      }),
    )
    const payload = await getPayload()
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join('; ')

    const savedFile = await fetch(
      `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/media`,
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
        headers: {
          cookie: cookieHeader,
        },
      },
    )

    if (!savedFile.ok) {
      return {
        success: false,
        errors: {
          root: ['Failed to upload avatar'],
        },
      }
    }

    const { doc } = await savedFile.json()

    if (!doc.id) {
      throw new Error('Failed to upload avatar')
    }

    // Update user in Payload
    const updatedUser = await payload.update({
      collection: 'users',
      id: userId,
      data: {
        avatar: doc.id,
      },
    })

    return {
      success: true,
      data: updatedUser,
    }
  } catch (error: unknown) {
    console.log('Avatar upload error:', error)
    return {
      success: false,
      errors: {
        root: [
          error instanceof Error ? error.message : 'Failed to upload avatar',
        ],
      },
    }
  }
}
