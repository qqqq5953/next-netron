'use client'

import { Button } from "@/components/ui/button";
import MenuList from "./MenuList";
import Image from "next/image";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { useState } from "react";
import { BsPersonVcard } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosCloudOutline } from "react-icons/io";
import { CgToolbox } from "react-icons/cg";
import { SiFuturelearn } from "react-icons/si";
import { MenuList as MenuListType } from '@/lib/definitions'

export const menuNavs: MenuListType = [
  { name: "關於我們", path: "/netronAdmin/about", icon: BsPersonVcard },
  {
    name: "最新消息", path: "", icon: IoNewspaperOutline, children: [
      { name: "分類管理", path: "/netronAdmin/category/news" },
      { name: "消息清單", path: "/netronAdmin/news" },
      { name: "Meta 資訊", path: "/netronAdmin/meta/news" },
    ]
  },
  {
    name: "雲產品服務", path: "", icon: IoIosCloudOutline, children: [
      { name: "品牌項目", path: "/netronAdmin/brand" },
      { name: "產品項目", path: "/netronAdmin/product" },
    ]
  },
  { name: "解決方案", path: "/netronAdmin/solution", icon: CgToolbox },
  {
    name: "成功案例", path: "", icon: SiFuturelearn, children: [
      { name: "分類管理", path: "/netronAdmin/category/case" },
      { name: "案例清單", path: "/netronAdmin/case" },
      { name: "Meta 資訊", path: "/netronAdmin/meta/success" },
    ]
  },
  // { name: "聯絡我們", path: "/netronAdmin/contact", icon: "" },
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    setIsTransitioning(true);
    setOpen(!open);
  }

  return (
    <nav
      className={`${open ? 'animate-sidebar-expand' : 'animate-sidebar-close'} p-4 bg-neutral-50`}
      onTransitionEnd={() => setIsTransitioning(false)}
    >
      <div className="flex items-center gap-6 w-full">
        {open && !isTransitioning && <Image
          src="/home/logo.svg"
          alt="Netron Logo"
          width={120}
          height={44}
          priority
        />}
        <div className={`${open ? 'ml-auto mr-4' : 'mx-auto mr-0'} `}>
          {open ?
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggle}
            >
              <FaAnglesLeft />
            </Button> :
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggle}
            >
              <FaAnglesRight />
            </Button>
          }
        </div>
      </div>
      <MenuList
        menuList={menuNavs}
        open={open}
        isTransitioning={isTransitioning}
      />
    </nav>
  )
}
