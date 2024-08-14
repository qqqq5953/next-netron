import React from 'react'
import { FaTelegramPlane, FaFacebookF } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
import { FaLine } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Link from 'next/link';

export default function BottomNav() {
  const contactList = [
    { path: "https://telegram.me/netronservice", icon: FaTelegramPlane },
    { path: "https://www.netron.asia/images/template/wechat_mb.jpg", icon: IoLogoWechat },
    { path: "https://lin.ee/f4ZrJsk", icon: FaLine },
    { path: "https://m.me/NetronInformationTechnology", icon: FaFacebookF },
    { path: "https://www.netron.asia/contact", icon: MdEmail },
  ]

  return (
    <nav className='fixed bottom-0 inset-x-0 flex items-center gap-4 w-full px-4 py-2.5 bg-neutral-600 container'>
      <ul className='flex justify-between text-white w-full'>
        {contactList.map(item => {
          return <li key={item.path}>
            <Link href={item.path}>
              <item.icon size={36} /></Link>
          </li>
        })}

      </ul>
    </nav>
  )
}
