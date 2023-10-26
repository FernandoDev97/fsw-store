'use client'

import React from 'react'
import { Card } from './card'
import { Button } from './button'
import { HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, PercentIcon, ShoppingCartIcon, UserIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './sheet'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Separator } from './separator'
import Link from 'next/link'
import { Cart } from './cart'
import Image from 'next/image'

const NAV_ITENS = [
  {
    id: 1,
    label: 'Início',
    href: '/',
  },
  {
    id: 2,
    label: 'Catálogo',
    href: '/catalog',
  },
  {
    id: 3,
    label: 'Ofertas',
    href: '/ofertas',
  }
]

const handleLoginClick = async () => {
  await signIn("google")
}

const handleLogoutClick = async () => {
  await signOut()
}

const Header = () => {
  const { status, data } = useSession()

  return (
    <Card className='flex items-center justify-between p-[1.875rem] px-4 w-full max-w-[1366px] mx-auto'>
      <Sheet>
        <SheetTrigger className='md:hidden' asChild>
          <Button size='icon' variant='outline'>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader className='text-left text-lg font-semibold'>
            Menu
          </SheetHeader>

          {status === 'authenticated' && data?.user && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>

                  {data.user.image && (
                    <AvatarImage src={data.user.image} />
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <p className='font-medium'>{data.user.name}</p>
                  <p className='text-sm opacity-75'>Boas compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 flex gap-2 flex-col">
            {status === "unauthenticated" && (
              <Button onClick={handleLoginClick} variant='outline' className='w-full justify-start gap-2'>
                <LogInIcon size={16} />
                Fazer login
              </Button>
            )}

            {status === 'authenticated' && (
              <Button onClick={handleLogoutClick} variant='outline' className='w-full justify-start gap-2'>
                <LogOutIcon size={16} />
                Fazer logout
              </Button>
            )}

            <Button variant='outline' className='w-full justify-start gap-2'>
              <HomeIcon size={16} />
              Início
            </Button>

            <Button variant='outline' className='w-full justify-start gap-2'>
              <PercentIcon size={16} />
              Ofertas
            </Button>
            <Link href='/catalog'>
              <Button variant='outline' className='w-full justify-start gap-2'>
                <ListOrderedIcon size={16} />
                Catálogo
              </Button>
            </Link>

          </div>
        </SheetContent>
      </Sheet>

      <Link href='/'>
        <Image
          src='/logo-header.svg'
          alt='Logo FSW Store'
          width={0}
          height={0}
          sizes="100vw"
          className="max-h-[70%] w-auto object-contain max-w-[80%] h-auto"
        />
      </Link>

      <nav className='hidden md:flex gap-12 font-semibold w-auto'>
        {NAV_ITENS.map(item => (
          <Link className='hover:text-violet-600 transition-all' key={item.id} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className='flex items-center gap-8'>
        <div className='hidden md:flex'>
          {status === 'authenticated' && data?.user ? (
            <Avatar className='w-8 h-8'>
              <AvatarFallback>
                {data.user.name?.[0].toUpperCase()}
              </AvatarFallback>

              {data.user.image && (
                <AvatarImage src={data.user.image} />
              )}
            </Avatar>
          ) : (
            <UserIcon />
          )}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button size='icon' variant='outline'>
              <ShoppingCartIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <Cart />
          </SheetContent>
        </Sheet>
      </div>


    </Card>
  )
}

export default Header