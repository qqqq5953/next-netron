'use client'

import { useRef } from "react";
import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "@/hooks/useDimensions";
import MenuList from "./MenuList";
import DrawerToggle from "./DrawerToggle";
import { MenuList as MenuListType } from '@/lib/definitions'

import { BsPersonVcard } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosCloudOutline } from "react-icons/io";
import { CgToolbox } from "react-icons/cg";
import { SiFuturelearn } from "react-icons/si";
import { convertToMenuObj } from "@/lib/utils";

export const menuList: MenuListType = [
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
      { name: "品牌項目", path: "/netronAdmin/brands" },
      { name: "產品項目", path: "/netronAdmin/product" },
    ]
  },
  { name: "解決方案", path: "/netronAdmin/solutions", icon: CgToolbox },
  {
    name: "成功案例", path: "", icon: SiFuturelearn, children: [
      { name: "分類管理", path: "/netronAdmin/category/case" },
      { name: "案例清單", path: "/netronAdmin/case" },
      { name: "Meta 資訊", path: "/netronAdmin/meta/success" },
    ]
  },
]

export const menuListObj = convertToMenuObj(menuList)

const sidebar = {
  open: {
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40
    },
    width: "180px"
  },
  closed: {
    transition: {
      // delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    },
    width: "40px"
  }
};

const variantsImg = {
  open: {
    opacity: 1,
    transition: { staggerChildren: 0, delayChildren: 0 }
  },
  closed: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

export default function Drawer() {
  const [isOpen, toggleOpen] = useCycle(true, false);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className={`p-4 bg-neutral-50`}
    >
      <motion.div variants={sidebar} />
      <div className={`flex items-center gap-6 w-full ${isOpen ? 'justify-between' : 'justify-start'}`}>
        <motion.div variants={variantsImg}>
          {isOpen && <Image
            src="/home/logo.svg"
            alt="Netron Logo"
            width={130}
            height={44}
            priority
          />}
        </motion.div>
        <DrawerToggle isOpen={isOpen} toggle={toggleOpen} />
      </div>
      <MenuList menuList={menuList} open={isOpen} />
    </motion.nav>
  );
};
