'use client'
import type React from 'react'
import { useState } from 'react'
import { btnVariants, Button } from '@/shared/components/ui/button'
import { Media, User } from '@/payload-types'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import AvatarUpload from './AvatarUpload'
import { UserUpdateForm } from '@/modules/users/ui/UserUpdateForm'
import { Shell } from '@/shared/components/ui/shell'
import { ChevronsUpDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'
import Link from 'next/link'

type Props = {
  userProfile: User
}

export default function ProfileEditPageClient({ userProfile }: Props) {
  const [avatarUrl, setAvatarUrl] = useState('')
  const t = useTranslations('AccountSettingsPage')

  return (
    <section className="space-y-4 grow">
      <h1 className="fl-text-32/48">{t('title')}</h1>
      <Shell>
        <AvatarAndInfo
          user={userProfile}
          avatarUrl={avatarUrl}
          setAvatarUrl={setAvatarUrl}
        />
        <Collapsible defaultValue="open">
          <CollapsibleContent>
            {/* Объединенная секция аватара и информации о пользователе */}
            <UserUpdateForm user={userProfile} avatarUrl={avatarUrl} />
          </CollapsibleContent>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="lg" className="grow w-full">
              {t('collapsible.button')} <ChevronsUpDown />
              <span className="sr-only">{t('collapsible.srOnly')}</span>
            </Button>
          </CollapsibleTrigger>
        </Collapsible>
      </Shell>
    </section>
  )
}

function AvatarAndInfo({
  user,
  avatarUrl,
  setAvatarUrl,
}: {
  user: User
  avatarUrl: string
  setAvatarUrl: React.Dispatch<React.SetStateAction<string>>
}) {
  const t = useTranslations('AccountSettingsPage.avatarSection')
  return (
    <div className="flex flex-col w-full md:items-start gap-8 mb-6 border-b border-gray-200">
      <h3 className="fl-text-24/32 text-nowrap">{t('title')}</h3>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Колонка аватара */}
        <div className="shrink-0">
          <AvatarUpload
            userId={String(user.id)}
            url={avatarUrl || (user.avatar as Media)?.url || ''}
            size={180}
            onUpload={url => {
              setAvatarUrl(url)
            }}
          />
        </div>

        {/* Колонка информации о пользователе */}
        <div className="flex-grow space-y-4 md:w-3xl mb-6">
          <div className="flex gap-4 flex-col md:flex-row md:items-start">
            <div className="space-y-2 hidden">
              <Label htmlFor="userId" className="text-gray-700">
                ID
              </Label>
              <Input
                id="userId"
                name="userId"
                type="text"
                readOnly={true}
                defaultValue={user.id}
                disabled
              />
            </div>

            <div className="flex justify-between grow">
              <div className="space-y-2 grow flex flex-col">
                <div className="fl-text-20/24">
                  <span className="text-muted-foreground">
                    {t('fields.name')}{' '}
                  </span>
                  {user.name}
                </div>
                <div className="fl-text-20/24">
                  <span className="text-muted-foreground">
                    {t('fields.email')}{' '}
                  </span>
                  {user.email}
                </div>
                <div className="fl-text-20/24">
                  <span className="text-muted-foreground">
                    {t('fields.phone')}{' '}
                  </span>
                  {user.phoneNumber || t('noPhone')}
                </div>
              </div>
              <div>
                <Link
                  href={'/forgot-password'}
                  className={btnVariants({
                    variant: 'ghost',
                    className: '!w-fit',
                  })}
                >
                  {t('changePassword')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
