import { FaGlobe } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

import Image from "next/image";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import MenuList from "./MenuList";
import NavList from "./NavList";
import { Language } from "@/lib/definitions";
import { fetchNav } from "@/lib/dataPublic";
import { isSuccessResponse } from "@/lib/utils";
import { useTranslation } from "@/app/i18n";

type Props = {
  lang: Language
}

export default async function TopNav(props: Props) {
  const { lang } = props
  console.log('lang', lang);

  const reuslt = await fetchNav(lang)
  // const {about, categories, products} = result.data
  // console.log('data', reuslt);
  const { t } = await useTranslation(lang)

  const menuNavs1 = isSuccessResponse(reuslt) ?
    [
      {
        name: reuslt.data.about[0].title,
        path: `/${lang}/about`
      },
      {
        name: t("navbar-header.News"),
        path: "",
        children: reuslt.data.categories.map(category => ({
          name: category.title,
          path: `/${lang}/newsList/${category.id}`
        }))
      },
      {
        name: t("navbar-header.Products & Services"),
        path: "",
        children: reuslt.data.products.map(product => ({
          name: product.title,
          path: `/${lang}/services/${product.id}?${product.m_url}`
        }))
      },
      {
        name: t("navbar-header.Case Studies"),
        path: `/${lang}/caseList`
      },
      {
        name: t("navbar-header.Contact Us"),
        path: `/${lang}/contact`
      },
      {
        name: "", path: "", icon: FaGlobe, children: [
          {
            name: t("navbar-header.lang.Traditional Chinese"),
            path: "/tw"
          },
          {
            name: t("navbar-header.lang.Simplified Chinese"),
            path: "/cn"
          },
          {
            name: t("navbar-header.lang.English"),
            path: "/en"
          },
        ]
      },
      {
        name: "登入",
        path: "/netronAdmin/login"
      }
    ] :
    []

  console.log('menuNavs1', menuNavs1);

  return (
    <nav className="fixed inset-x-0 z-10 w-full py-4 bg-white/80 backdrop-blur-md">
      <div className="flex items-center container">
        <Link href="/">
          <div className="relative w-40 h-11 xl:w-60 xl:h-16">
            <Image
              src="/home/logo.svg"
              alt="Netron Logo"
              fill
              priority
            />
          </div>
        </Link>
        <NavList menuList={menuNavs1} />
        <Sheet>
          <SheetTrigger className="border rounded-lg p-2 size-10 grid place-items-center ml-auto lg:hidden ">
            <FiMenu />
          </SheetTrigger>
          <SheetContent>
            <MenuList menuList={menuNavs1} />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
