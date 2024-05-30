import Image from "next/image";
import Link from "next/link";
import { PiArrowRightLight } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";

export default function footer() {
  const contactList = [
    { name: "tel:+886-2-77181919", path: "+886-2-77181919", icon: FaPhoneAlt },
    { name: "info@netron.asia", path: "mailto:info@netron.asia", icon: MdEmail },
    { name: "Netron 網創資訊", path: "https://www.facebook.com/NetronInformationTechnology/", icon: FaFacebook },
  ]

  return (
    <footer className="flex flex-col gap-8 w-full px-4 pt-12 pb-24 bg-sky-50">
      <figure>
        <Image
          src="/home/logo.svg"
          alt="Netron Logo"
          width={237}
          height={65}
          className="pb-4"
        />
        <span>網路加速與安全整合服務的專家</span>
      </figure>

      <div>
        <hr className="mb-4" />
        <ul className="space-y-4">
          {contactList.map(item => {
            return <li key={item.name}>
              <Link className="flex items-center gap-4 hover:text-cyan-500 transition-colors ease-in-out duration-300 hover:no-underline w-fit" href={item.path}><item.icon />{item.name}</Link>
            </li>
          })}

          <li>
            <Link href="/contact" className="flex items-center gap-2 hover:text-cyan-500 transition-colors ease-in-out duration-300 hover:no-underline w-fit">聯絡我們 Contact Us <PiArrowRightLight size={24} /></Link>
          </li>
        </ul>
      </div>

      <div className="text-xs">
        <hr className="mb-4" />
        <p>台北市內湖區瑞光路168號5F-2</p>
        <p>5F-2., No.168, Ruiguang Rd.,Neihu Dist.,Taipei City 114, Taiwan</p>
      </div>

      <div className="text-xs">
        <hr className="mb-4" />
        <p>Copyright © 網創資訊有限公司. All Rights Reserved.</p>
        <Link href="https://www.forestwebs.com.tw/" className="flex items-center gap-2 hover:text-cyan-500 transition-colors ease-in-out duration-300 hover:no-underline w-fit">Design by Forestwebs</Link>
      </div>
    </footer>
  )
}
