import { Button } from "@/components/ui/button";
import { MenuItem } from '@/lib/definitions';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

type Props = {
  item: MenuItem;
};

export default function NavDropdown(props: Props) {
  return (
    <div className="relative group">
      <Button variant="ghost" className="text-base font-normal gap-1">
        {props.item.name}
        {props.item.icon && <props.item.icon />}
        <div className="group-hover:rotate-180 transition-all duration-500">
          <ChevronDown size={16} />
        </div>
      </Button>
      <ul className="absolute top-full hidden group-hover:flex flex-col shadow-lg rounded-md min-w-full w-fit text-nowrap bg-white overflow-hidden py-1.5 border-t-4 border-t-sky-400">
        {props.item.children!.map(child => {
          return <li key={child.name}>
            <Link href={child.path} className="block w-full px-4 py-2 hover:text-sky-500 transition-all duration-300">
              {child.name}
            </Link>
          </li>
        })}
      </ul>
    </div>
  )
}
