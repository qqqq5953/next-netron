// import CountUpNumber from "@/app/(public)/about/_components/count-up";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
import Paginations from "@/components/Paginations";
import { fetchCaseList } from "@/lib/dataPublic";
import { Language } from "@/lib/definitions";
import { isSuccessResponse } from "@/lib/utils";
import CardServices from "../_components/CardServices";

type Props = {
  params: {
    lang: Language
  },
  searchParams: {
    page: string
  }
}

export default async function CaseListPage(props: Props) {
  const result = await fetchCaseList(
    props.params.lang ?? "tw",
    props.searchParams.page
  )

  return (
    <>
      <main className="flex flex-col gap-8">
        <h2 className="text-3xl font-semibold">成功案例</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isSuccessResponse(result) && (
            <>
              {result.data.rows.map(row => {
                return <CardServices
                  key={row.id}
                  imgUrl={row.img}
                  title={row.title}
                />
              })}
            </>
          )}
        </div>
        <div className='not-prose'>
          {isSuccessResponse(result) &&
            <Paginations
              perPage={12}
              total={result.data.total}
            />
          }
        </div>
      </main>
    </>
  )
}
