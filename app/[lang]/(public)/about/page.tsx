// import CountUpNumber from "@/app/(public)/about/_components/count-up";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
import { fetchAbout } from "@/lib/dataPublic";
import { Language } from "@/lib/definitions";
import { isSuccessResponse } from "@/lib/utils";

type Props = {
  params: {
    lang: Language
  }
}

export default async function AboutPage(props: Props) {
  console.log('props.params.lang', props.params.lang);

  const result = await fetchAbout(props.params.lang ?? "tw")
  // console.log('result', result);

  return (
    <>
      <main className="pt-20">
        <h2 className="text-3xl font-semibold pt-8">關於我們</h2>
        {isSuccessResponse(result) && (
          <div dangerouslySetInnerHTML={{
            __html: result.data.content
          }}></div>
        )}
      </main>
      {/* <main className="flex flex-col gap-4 pt-20">
        <h2 className="text-3xl font-semibold px-4 pt-8">關於我們</h2>
        <div className="grid place-items-center py-20">
          <Image
            src="/about/header-logo.png"
            alt="header-logo"
            width={203}
            height={245}
            priority
          />
        </div>

        <div className="flex flex-col gap-12 w-full px-4 py-8">
          <h1 className="text-netron text-3xl text-center font-semibold">Netron 網創資訊向企業提供多元的 Cloud 雲端平台服務</h1>
          <section className="flex flex-col gap-12">
            <iframe width="100%" src="https://www.youtube.com/embed/6kQtFIy9OQE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="aspect-video"></iframe>
            <div>
              <h2 className="text-3xl font-semibold">關於 NETRON 網創資訊</h2>
              <p className="pt-4">Netron網創資訊為資安服務起家的雲端顧問公司，提供全方位一站式<Link href="/services/4" className="text-teal-600">雲端顧問服務</Link>以及7*24 中英雙語線上專業維運服務，不但在 4 個月內成為 AWS 進階合作夥伴，更取得AWS MSP、MSSP、Migration認證資格，代理超過20種國際品牌，服務將近兩千家客戶，為客戶客製量身訂做的解決方案。</p>
            </div>
          </section>

          <section className="flex flex-col items-center gap-8 text-center">
            <div className="space-y-2 ">
              <CountUpNumber
                end={200}
                suffix="+"
              />
              <h4 className=" text-xl">張多平台認證的雲端技術維運團隊</h4>
            </div>
            <div className="space-y-2">
              <CountUpNumber
                end={170}
                suffix="+"
              />
              <h4 className=" text-xl">項雲端服務</h4>
            </div>
            <div className="space-y-2">
              <CountUpNumber
                end={1650}
                suffix="+"
                decimal=","
              />
              <h4 className=" text-xl">客戶</h4>
            </div>
            <div className="space-y-2">
              <CountUpNumber
                end={95.5}
                decimals={1}
                suffix="%"
              />
              <h4 className=" text-xl">顧客滿意度</h4>
            </div>
          </section>

          <section className="flex flex-col items-center gap-8 text-center">
            <h2 className="text-3xl font-semibold">為什麼選擇 NETRON 網創資訊</h2>
            <div className="flex flex-col gap-8">
              <div className="grid place-items-center">
                <Image
                  src="/about/why-netron1.png"
                  alt="why-netron1"
                  width={100}
                  height={100}
                />
                <h3 className="text-2xl font-medium pt-8 pb-4">全方位一站式雲端顧問服務</h3>
                <p>針對客戶的企業做出診斷，在需求、預算、所在地區等多重考量下提供量身訂做的雲端服務</p>
              </div>
              <div className="grid place-items-center">
                <Image
                  src="/about/why-netron2.png"
                  alt="why-netron2"
                  width={100}
                  height={100}
                />
                <h3 className="text-2xl font-medium pt-8 pb-4">7*24 中英雙語線上專業維運服務</h3>
                <p>第一線即為專業技術人員，無需等待客服轉接時間，可立即處理你的疑難雜症</p>
              </div>
              <div className="grid place-items-center">
                <Image
                  src="/about/why-netron3.png"
                  alt="why-netron3"
                  width={100}
                  height={100}
                />
                <h3 className="text-2xl font-medium pt-8 pb-4">破紀錄的 AWS 證照取得速度</h3>
                <p>不但在 4 個月內成為 AWS 進階合作夥伴，更取得超過 80 張 AWS 相關技術認證，技術人員每人平均擁有 3 張 AWS 專業技術認證</p>
              </div>
            </div>
            <Button variant="secondary" size="lg" className="rounded-full">
              <Link href="services/4" className="text-base tracking-widest">了解我們提供的雲端服務</Link>
            </Button>
          </section>
        </div>

      </main> */}
    </>

  )
}
