'use client'

import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import MenuList from "./menu-list";
import { FaGlobe } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";

export default function TopNav() {
  const menuNavs = [
    { name: "關於我們", path: "/about" },
    {
      name: "最新消息", path: "", children: [
        { name: "所有資訊", path: "/newsList" },
        { name: "雲端新聞", path: "/newsList/5" },
        { name: "雲端活動", path: "/newsList/2" },
        { name: "雲端技能學習", path: "/newsList/9" },
      ]
    },
    {
      name: "雲產品服務", path: "", children: [
        { name: "Cloud 雲端服務", path: "/services/4" },
        { name: "Brand 雲端品牌", path: "/services/3" },
      ]
    },
    { name: "成功案例", path: "/caseList" },
    { name: "聯絡我們", path: "/contact" },
    {
      name: " ", path: "", icon: FaGlobe, children: [
        { name: "繁體中文", path: "/tw" },
        { name: "简体中文", path: "/ch" },
        { name: "English", path: "/en" },
      ]
    },
  ]

  return (
    <nav className="fixed z-10 w-full p-4 bg-white/80 backdrop-blur-md">
      <div className="flex justify-between">
        <Link href="/">
          <Image
            src="/home/logo.svg"
            alt="Netron Logo"
            className="dark:invert"
            width={160}
            height={44}
            priority
          />
        </Link>
        <Sheet>
          <SheetTrigger className="border rounded-lg p-2 size-10 grid place-items-center">
            <FiMenu />
          </SheetTrigger>
          <SheetContent>
            <MenuList menuList={menuNavs} />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
