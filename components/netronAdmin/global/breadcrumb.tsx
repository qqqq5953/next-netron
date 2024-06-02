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
import { menuNavs } from './sidebar';

type Route = {
  name: string;
  path: string;
  children?: Route[];
};

export default function BreadcrumbCustom() {
  const pathname = usePathname()
  const menuObj = convertToMenuObj(menuNavs)
  const breadcrumbs = menuObj[pathname]

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

  function convertToMenuObj(navs: Route[], parentBreadcrumb: string[] = []) {
    return navs.reduce((menuObj, nav) => {
      const currentBreadcrumb = [...parentBreadcrumb, nav.name];

      if (nav.path) {
        menuObj[nav.path] = currentBreadcrumb;
      }

      if (nav.children) {
        menuObj = {
          ...menuObj,
          ...convertToMenuObj(nav.children, currentBreadcrumb),
        };
      }

      return menuObj;
    }, {} as Record<Route['path'], Route['name'][]>);
  };

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
