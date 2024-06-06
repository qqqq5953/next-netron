import FormAddNews from '@/components/netronAdmin/latest-news/FormAddNews'
import TableNews from '@/components/netronAdmin/latest-news/TableNews'
import TabsNav from '@/components/TabsNav'

const tabs = [
  { name: "所有資訊", path: "/netronAdmin/news" },
  { name: "雲端活動", path: "/netronAdmin/news/2" },
  { name: "雲端新聞", path: "/netronAdmin/news/5" },
  { name: "雲端技能學習", path: "/netronAdmin/news/9" },
]

export default function NewsPage() {
  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>消息清單</h2>
        <FormAddNews />
      </div>

      <TabsNav tabs={tabs} />

      <section>
        <TableNews />
      </section>
    </>
  )
}
