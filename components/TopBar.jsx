'use client'
import { Logout } from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import React from 'react'


const TopBar = () => {


    const pathname = usePathname();
const handleLogout = () => {
    signOut({callbackUrl:'/'})
};
const { data: session } = useSession();
const user =session?.user
  return (
    <div className="topbar">
    <Link href="/chats">
      <Image src="/assets/logo.png" alt="logo" className="logo" width={200} height={100} />
    </Link>

    <div className="menu">
      <Link
        href="/chats"
        className={`${
          pathname === "/chats" ? "text-red-1" : ""
        } text-heading4-bold`}
      >
        Chats
      </Link>
      <Link
        href="/contacts"
        className={`${
          pathname === "/contacts" ? "text-red-1" : ""
        } text-heading4-bold`}
      >
        Contacts
      </Link>

      <Logout
        sx={{ color: "#737373", cursor: "pointer" }}
        onClick={handleLogout}
      />

      <Link href="/profile">
        <Image
          src={user?.profileImage || "/assets/person.jpg"}
          alt="profile"
            className="profilePhoto"
            width={100} height={100}
        />
      </Link>
    </div>
  </div>
  )
}

export default TopBar