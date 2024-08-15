// import CountUpNumber from "@/app/(public)/about/_components/count-up";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
import Paginations from "@/components/Paginations";
import { fetchCaseList } from "@/lib/dataPublic";
import { Language } from "@/lib/definitions";
import { isSuccessResponse } from "@/lib/utils";
import Image from "next/image";

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
        <div className="grid grid-cols-4 gap-8">
          {isSuccessResponse(result) && (
            <>
              {result.data.rows.map(row => {
                return <div key={row.id} className="rounded-lg p-4 shadow-md">
                  {row.img ? <Image
                    src={"/" + row.img}
                    alt=""
                    width={90}
                    height={90}
                  /> :
                    "no image"
                  }
                  <h3>{row.title}</h3>
                </div>
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
