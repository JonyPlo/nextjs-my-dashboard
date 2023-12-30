'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import style from './SideBarMenuItem.module.css'

interface Props {
  path: string
  icon: JSX.Element
  title: string
  subTitle: string
}

export const SideBarMenuItem = ({ icon, path, subTitle, title }: Props) => {
  const currentPath = usePathname()

  return (
    <Link
      href={path}
      className={`${style.link} ${
        currentPath === path && style['active-link']
      }`}
    >
      <div>{icon}</div>
      <div className='flex flex-col'>
        <span className='text-lg font-bold leading-5 text-white'>{title}</span>
        <span className='text-sm text-white/50 hidden md:block'>
          {subTitle}
        </span>
      </div>
    </Link>
  )
}
