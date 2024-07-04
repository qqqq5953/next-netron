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
import { getBreadCrumbs } from '@/lib/utils';

export default function BreadcrumbCustom() {
  const pathname = usePathname()
  const breadcrumbs = getBreadCrumbs(pathname)

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
