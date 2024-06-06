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

const redirectPathMap: Record<string, string> = {
  "/netronAdmin/news/2": "/netronAdmin/news",
  "/netronAdmin/news/5": "/netronAdmin/news",
  "/netronAdmin/news/9": "/netronAdmin/news",
  "/netronAdmin/case/3": "/netronAdmin/case",
  "/netronAdmin/case/14": "/netronAdmin/case",
}

export default function BreadcrumbCustom() {
  const pathname = usePathname()
  const menuObj = convertToMenuObj(menuNavs)
  const redirectPath = redirectPathMap[pathname]
  const breadcrumbs = redirectPath ? menuObj[redirectPath] : menuObj[pathname]

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
