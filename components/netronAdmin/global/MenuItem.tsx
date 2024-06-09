'use client'

import { useMemo } from "react";
import { motion } from "framer-motion";
import { MenuItem as MenuItemType } from '@/lib/definitions'
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import Navigation from "./MenuList";

type Props = {
  item: MenuItemType
  open: boolean
  isChild?: boolean
}

export const MenuItem = (props: Props) => {
  const itemVariants = useMemo(() => {
    return {
      open: {
        y: 0,
        transition: {
          y: { stiffness: 1000, velocity: -100 }
        }
      },
      closed: {
        y: !props.open && props.isChild ? 0 : 10,
        transition: {
          y: { stiffness: 1000 }
        }
      }
    };
  }, [props.open, props.isChild])

  return (
    <motion.li
      key={props.item.name}
      className={`z-50 flex flex-col gap-4 ${props.open ? '' : 'items-center'} `}
      variants={itemVariants}
    // whileHover={{ scale: 1.05 }}
    // whileTap={{ scale: 0.95 }}
    >
      {props.item.children ?
        <Accordion type="single" collapsible>
          <AccordionItem
            value={props.item.name}
            className='border-none'
          >
            <AccordionTrigger
              className={`p-0 hover:no-underline focus:no-underline font-normal`}
              showChevron={props.open}
            >
              {props.open ?
                <div className={`flex items-center gap-2 h-7`}>
                  {props.item.icon && <span className={`${!props.open && !props.isChild ? 'text-sky-700' : ''}`}>
                    <props.item.icon size={20} />
                  </span>}
                  {props.open && <span>{props.item.name}</span>}
                </div> :
                <TooltipProvider delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={`flex items-center gap-2 h-7`}>
                        {props.item.icon && <span className={`${!props.open && !props.isChild ? 'text-sky-700' : ''}`}>
                          <props.item.icon size={20} />
                        </span>}
                        {props.open && <span>{props.item.name}</span>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      {props.item.name}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
            </AccordionTrigger>
            <AccordionContent className={`pt-4 pb-0 ${props.open ? 'ml-7' : 'ml-0'}`}>
              <Navigation
                menuList={props.item.children}
                open={props.open}
                isChild
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion> :
        <>
          {props.open ?
            <Link href={props.item.path} className={`flex items-center gap-2 h-7`}>
              {props.item.icon && <span><props.item.icon size={20} /></span>}
              {props.open && <span >
                {props.item.name}
              </span>}
              {!props.open && props.isChild && <span>
                {props.item.name.substring(0, 1)}
              </span>}
            </Link> :
            <TooltipProvider delayDuration={0} >
              <Tooltip>
                <TooltipTrigger>
                  <Link href={props.item.path} className={`flex items-center gap-2 h-7`}>
                    {props.item.icon && <span><props.item.icon size={20} /></span>}
                    {props.open && <span >
                      {props.item.name}
                    </span>}
                    {!props.open && props.isChild && <span>
                      {props.item.name.substring(0, 1)}
                    </span>}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-white">
                  {props.item.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          }
        </>

      }
    </motion.li>
  );
};
