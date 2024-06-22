'use client'

import { Fragment } from 'react';
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage
} from '@/components/ui/breadcrumb'
import { menuListObj } from './Drawer';

const redirectPathMap: Record<string, string> = {
  "/netronAdmin/news/2": "/netronAdmin/news",
  "/netronAdmin/news/5": "/netronAdmin/news",
  "/netronAdmin/news/9": "/netronAdmin/news",
  "/netronAdmin/case/3": "/netronAdmin/case",
  "/netronAdmin/case/14": "/netronAdmin/case",
}

export default function BreadcrumbCustom() {
  const pathname = usePathname()
  const redirectPath = redirectPathMap[pathname]
  const breadcrumbs = redirectPath ? menuListObj[redirectPath] : menuListObj[pathname]

  const breadcrumbItems = breadcrumbs.map((breadcrumb, index) => {
    const isLastItem = breadcrumbs.length - 1 === index

    if (isLastItem) {
      return <BreadcrumbItem key={breadcrumb}>
        <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
      </BreadcrumbItem>
    } else {
      return <Fragment key={breadcrumb}>
        <BreadcrumbItem >
          {breadcrumb}
        </BreadcrumbItem>
        <BreadcrumbSeparator />
      </Fragment>
    }
  })

  return <>
    {breadcrumbs.length > 1 ?
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb> :
      null
    }
  </>
}
