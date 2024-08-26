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
            path: "/ch"
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

  // console.log('menuNavs1', menuNavs1);

  const menuNavs = [
    { name: "關於我們", path: "/about" },
    {
      name: "最新消息", path: "", children: [
        // { name: "所有資訊", path: "/newsList" },
        { name: "雲端新聞", path: "/newsList/5" },
        { name: "雲端活動", path: "/newsList/2" },
        { name: "雲端技能學習", path: "/newsList/9" },
      ]
    },
    {
      name: "雲產品服務", path: "", children: [
        { name: "Cloud 雲端服務", path: "/services/4?services" },
        { name: "Brand 雲端品牌", path: "/services/3?brands" },
      ]
    },
    { name: "成功案例", path: "/caseList" },
    { name: "聯絡我們", path: "/contact" },
    {
      name: "", path: "", icon: FaGlobe, children: [
        { name: "繁體中文", path: "/tw" },
        { name: "简体中文", path: "/ch" },
        { name: "English", path: "/en" },
      ]
    },
    { name: "登入", path: "/netronAdmin/login" },
  ]

  // console.log('menuNavs', menuNavs);

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
            <MenuList menuList={menuNavs} />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
