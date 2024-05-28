import Header from "@/components/global/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { PiArrowRightLight } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import Footer from "@/components/global/footer";
import BottomNav from "@/components/global/bottom-nav";
// import AOS from 'aos';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col pt-20">
        <section className="flex flex-col items-center gap-4 w-full px-4 py-8">
          <div>
            <Image
              src="/home/netron.svg"
              alt="Netron Logo"
              width={182}
              height={32}
              priority
            />
            <h1 className="text-[40px] font-semibold leading-10 pt-1.5">網創資訊</h1>
            <div className="font-medium text-lg tracking-widest">Connect you to the cloud</div>
          </div>

          <div>
            <Image
              src="/home/floating-logo.svg"
              alt="floating-logo"
              width={230}
              height={32}
              priority
              className="animate-bounce-netron ease-in-out"
            />
            <div className="flex justify-center">
              <div className="animate-scale-netron-shadow bg-gray-200/80 w-28 h-6 rounded-[50%] shadow-lg"></div>
            </div>
          </div>

          <div className="tracking-widest w-full p-4">
            <div className="text-end">網路加速與安全整合服務的專家</div>
            <div className="flex flex-col items-end text-xl">
              <span>NETRON</span>
              <span>INFORMATION</span>
              <span>TECHNOLOGY</span>
            </div>
          </div>
        </section>

        {/* 亞馬遜 AWS 官方認證 ADVANCED 進階合作夥伴 */}
        <section className="flex flex-col gap-8 w-full px-4 py-16 bg-sky-50">
          {/* <hr className="mt-8 w-full" /> */}
          <h3 className="text-3xl font-semibold">亞馬遜 AWS 官方認證 ADVANCED 進階合作夥伴</h3>
          <p>網創資訊榮獲亞馬遜AWS Advanced 進階合作夥伴(Advanced Consulting Partner)官方認證，提供企業更多元化的雲端解決方案。</p>
          <ul className="list-disc list-inside space-y-4">
            <li>全方位代管服務</li>
            <li>7*24全天候監控及線上雙語維運</li>
            <li>200+多平台認證的雲端技術維運團隊</li>
            <li>170+項雲端服務</li>
            <li>量身訂做多雲、混合雲等客製化架構</li>
          </ul>
          <div className="flex justify-center">
            <Image
              src="/home/aws-cert.svg"
              alt="Netron Logo"
              width={182}
              height={32}
            />
          </div>
          <Button variant="link" className="text-cyan-500 text-xl gap-2 hover:text-black transition-colors ease-in-out duration-300 hover:no-underline w-fit">Read more <PiArrowRightLight size={24} /></Button>
          <div>
            <iframe width="100%" src="https://www.youtube.com/embed/6kQtFIy9OQE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="aspect-video"></iframe>
          </div>
        </section>

        {/* 最新消息 */}
        <section className="flex flex-col gap-8 w-full px-4 py-10">
          <h2 className="text-3xl font-semibold">最新消息</h2>
          <div>event goes here</div>
          <Button variant="link" className="text-cyan-500 text-xl gap-2 hover:text-black transition-colors ease-in-out duration-300 hover:no-underline w-fit">Read more <PiArrowRightLight size={24} /></Button>
        </section>

        {/* 成功案例 */}
        <section className="flex flex-col gap-8 w-full px-4 py-16">
          <h2 className="text-3xl font-semibold">成功案例</h2>
          <div>event goes here</div>
          <Button variant="link" className="text-cyan-500 text-xl gap-2 hover:text-black transition-colors ease-in-out duration-300 hover:no-underline w-fit">Read more <PiArrowRightLight size={24} /></Button>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
