'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  // PaginationEllipsis,
} from "@/components/ui/pagination"
import { isInvalidPageNumber } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  perPage: number
  total: number
}

export default function Paginations(props: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const lang = searchParams.get("adminLang") ?? "tw"
  const page = searchParams.get("page") ?? "1"
  const currentPage = isInvalidPageNumber(page) ? 1 : Number(page)
  const pages = Math.ceil(props.total / props.perPage)
  const pageNumbers = Array.from(Array(pages).keys())
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === pageNumbers.length

  return (
    pageNumbers.length > 1 ?
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={{
                pathname,
                query: {
                  adminLang: lang,
                  page: isFirstPage ? currentPage : currentPage - 1
                },
              }}
              className={isFirstPage ? 'cursor-not-allowed opacity-40 pointer-event-none' : 'cursor-pointer hover:text-sky-500'}
            />
          </PaginationItem>

          {pageNumbers.map(pageNumber => {
            return <PaginationItem key={pageNumber}>
              <PaginationLink
                href={{
                  pathname,
                  query: { adminLang: lang, page: pageNumber + 1 },
                }}
                className={currentPage === (pageNumber + 1) ?
                  'bg-sky-50 text-sky-500 hover:text-sky-500' :
                  // 'text-sky-500 border border-current hover:bg-transparent hover:text-sky-500 hover:border-current' :
                  'text-black hover:text-sky-500'
                }
              >{pageNumber + 1}</PaginationLink>
            </PaginationItem>
          })}

          {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

          <PaginationItem>
            <PaginationNext
              href={{
                pathname,
                query: {
                  adminLang: lang,
                  page: isLastPage ? currentPage : currentPage + 1
                },
              }}
              className={isLastPage ? 'cursor-not-allowed opacity-40 pointer-event-none' : 'cursor-pointer hover:text-sky-500'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination> :
      null
  )
}
