'use client'

import type React from 'react'
import { useEffect, useState, useRef, useActionState } from 'react' // Добавлен useRef
import Image from 'next/image'
import { Input } from '@/shared/components/ui/input' // Input останется скрытым
import { Camera, Loader2 } from 'lucide-react' // Добавлена иконка камеры
import { toast } from '@payloadcms/ui'
import { Button } from '@/shared/components/ui/button'
import { saveAvatar } from '@/modules/users/actions/save-avatar'
import { cn } from '@/shared/lib/utils'

interface AvatarUploadProps {
  userId: string | undefined
  url: string | null
  size: number
  onUpload: (url: string) => void
}

export default function AvatarUpload({
  userId,
  url,
  size,
  onUpload,
}: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null) // Ссылка на скрытый input

  const [state, saveAvatarHandler, isLoading] = useActionState<any, any>(
    saveAvatar,
    {
      success: undefined,
      errors: undefined,
    },
  )
  useEffect(() => {
    if (state.success === true) {
      toast.success('Avatar saved successfully!')
    }
    if (state.success === false) {
      toast.error('Avatar save failed!')
    }
  }, [state.success])
  // useEffect(() => {
  //   async function downloadImage(path: string) {
  //     try {
  //       console.warn(
  //         "Supabase client not available for image download. Using placeholder."
  //       );
  //       setAvatarUrl("/placeholder.svg?height=150&width=150");
  //     } catch (error) {
  //       console.error("Error downloading image: ", error);
  //     }
  //   }
  //   if (url) downloadImage(url);
  // }, [url]);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${userId}-${Math.random()}.${fileExt}`

      onUpload(filePath)
      setFile(file)
      setAvatarUrl(URL.createObjectURL(file))
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Error uploading avatar!',
      )
    } finally {
      setUploading(false)
    }
  }

  const handleAvatarClick = () => {
    if (!uploading && fileInputRef.current) {
      fileInputRef.current.click() // Имитируем клик по скрытому input
    }
  }

  return (
    <div className="relative flex flex-col items-center gap-4">
      <div
        className="relative rounded-full overflow-hidden cursor-pointer group border-2 border-gray-200 shadow-sm transition-all duration-200 "
        style={{ height: size, width: size }}
        onClick={handleAvatarClick}
        aria-label={
          uploading ? 'Загрузка аватара...' : 'Нажмите, чтобы загрузить аватар'
        }
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleAvatarClick()
          }
        }}
      >
        {/* {uploading ? (
          <Loader2 className="h-8 w-8 text-white animate-spin z-10" />
        ) : null} */}
        {avatarUrl ? (
          <Image
            width={size}
            height={size}
            src={avatarUrl || '/placeholder.svg'}
            alt="Аватар"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <span className="text-muted-foreground text-sm">
              Нет изображения
            </span>
          </div>
        )}

        {/* Оверлей для загрузки или иконки камеры */}
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {uploading ? (
            <Loader2 className="size-8 text-white animate-spin" />
          ) : (
            <Camera className="size-8 text-white" />
          )}
        </div>
      </div>

      {/* Скрытый input для выбора файла */}

      <form action={saveAvatarHandler}>
        <Input type="hidden" name="userId" value={userId} />
        <Input
          ref={fileInputRef}
          name="avatar_file"
          className="sr-only"
          type="file"
          id="single-avatar-upload" // Уникальный ID
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
        <Button
          type="submit"
          className={cn({
            hidden: !file,
          })}
          disabled={uploading || !file || isLoading}
        >
          Click to upload
        </Button>
        {state.errors?.avatar_file ? (
          <p className="text-red-600 py-4">{state.errors.avatar_file}</p>
        ) : null}
      </form>
    </div>
  )
}
