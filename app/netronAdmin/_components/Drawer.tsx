'use client'

import { useRef } from "react";
import Image from "next/image";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "@/hooks/useDimensions";
import MenuList from "./MenuList";
import DrawerToggle from "./DrawerToggle";
import { menuList } from "@/lib/utils";

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
