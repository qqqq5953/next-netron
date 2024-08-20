import { fetchServices } from "@/lib/dataPublic";
import { Language } from "@/lib/definitions";
import { isSuccessResponse } from "@/lib/utils";
import CardServices from "../../_components/CardServices";
import CardBrand from "../../_components/CardBrand";

type Props = {
  params: {
    lang: Language,
    productId: string
  },
  searchParams: {
    page: string
  }
}

export default async function ServicesPage(props: Props) {
  const { lang, productId } = props.params

  const result = await fetchServices(
    lang ?? "tw",
    productId
  )

  return (
    <>
      <main className="flex flex-col gap-8">
        <p className="text-3xl font-semibold">雲服務產品</p>
        {isSuccessResponse(result) &&
          <h1>{result.data.title}</h1>
        }

        {/* Brand 雲端品牌 */}
        {productId === "3" && isSuccessResponse(result) && 'brandItems' in result.data && <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 not-prose">
          {result.data.brandItems.map(brand => {
            return <CardBrand
              key={brand.id}
              imgUrl={brand.img}
              title={brand.title}
              m_url={brand.m_url}
            />
          })}
        </section>}

        {/* Cloud 雲端服務 */}
        {productId === "4" && isSuccessResponse(result) && 'productItems' in result.data && <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {result.data.productItems.map(product => {
            return <CardServices
              key={product.id}
              imgUrl={product.img}
              title={product.title}
              content={product.description}
              url={product.url}
            />
          })}
        </section>}
      </main>
    </>
  )
}