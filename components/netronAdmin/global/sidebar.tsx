import MenuList from "./MenuList";
import Image from "next/image";

export const menuNavs = [
  { name: "關於我們", path: "/netronAdmin/about" },
  {
    name: "最新消息", path: "", children: [
      { name: "分類管理", path: "/netronAdmin/category/news" },
      { name: "消息清單", path: "/netronAdmin/news" },
      { name: "Meta 資訊", path: "/netronAdmin/meta/news" },
    ]
  },
  {
    name: "雲產品服務", path: "", children: [
      { name: "品牌項目", path: "/netronAdmin/brand" },
      { name: "產品項目", path: "/netronAdmin/product" },
    ]
  },
  { name: "解決方案", path: "/netronAdmin/solution" },
  {
    name: "成功案例", path: "", children: [
      { name: "分類管理", path: "/netronAdmin/category/case" },
      { name: "案例清單", path: "/netronAdmin/case" },
      { name: "Meta 資訊", path: "/netronAdmin/meta/success" },
    ]
  },
  { name: "聯絡我們", path: "/netronAdmin/contact" },
]

export default function Sidebar() {
  return (
    <nav className="shrink-0 w-52 p-4 bg-neutral-50">
      <Image
        src="/home/logo.svg"
        alt="Netron Logo"
        className="dark:invert"
        width={160}
        height={44}
        priority
      />
      <MenuList menuList={menuNavs} />
    </nav>
  )
}
