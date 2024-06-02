import { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useParams, usePathname } from 'next/navigation'

type InitialData = Record<string, {
  title: string;
  isActive: CheckedState;
  isAddToHome: CheckedState;
  order: string;
}[]>

const initialData: InitialData = {
  "all": [
    { title: "2024 Netron x AWS Philippines event", isActive: false, isAddToHome: false, order: "1" },
    { title: "【雲端活動】雲服務技術優化工作坊", isActive: false, isAddToHome: false, order: "2" },
    { title: "【雲端活動】SRE CONFERENCE 2024", isActive: false, isAddToHome: false, order: "3" }
  ],
  "2": [
    { title: "【媒體報導】網創資訊執行長李尚修主打快速 發揚雲端服務", isActive: false, isAddToHome: false, order: "2" },
    { title: "【雲端活動】雲服務技術優化工作坊", isActive: false, isAddToHome: false, order: "1" },
    { title: "【雲端活動】SRE CONFERENCE 2024", isActive: false, isAddToHome: false, order: "3" }
  ],
  "5": [
    { title: "【媒體報導】網創資訊執行長李尚修主打快速 發揚雲端服務", isActive: false, isAddToHome: false, order: "3" },
    { title: "【最新消息】Netron 網創資訊榮獲騰訊雲二項夥伴大獎 銷售業績位居全球前三", isActive: false, isAddToHome: false, order: "2" },
    { title: "【媒體報導】Netron網創資訊挾MSP、MSSP與Migration三大認證打造差異化能力，助攻企業迎接雲端轉型浪潮", isActive: false, isAddToHome: false, order: "1" }
  ],
  "9": [
    { title: "【雲端技能學習】安全標準全面更新：深入解析ISO/IEC 27001與27002的最新變革	", isActive: false, isAddToHome: false, order: "1" },
    { title: "【雲端技能學習】AWS 推出Amazon Q 企業專屬的生成式 AI 助理服務", isActive: false, isAddToHome: false, order: "3" },
    { title: "【雲端技能學習】專為 AWS 打造的 SentinelOne Singularity Cloud Workload Security", isActive: false, isAddToHome: false, order: "2" }
  ],

}

export default function TableNews() {
  const pathname = usePathname()
  const params = useParams<{ id: string }>()
  console.log('pathname', pathname);
  console.log('params', params);

  const [data, setData] = useState(params?.id ? initialData[params.id] : initialData['all']);

  function toggleCheckbox(index: number, isChecked: CheckedState, type: 'isActive' | 'isAddToHome') {
    const updatedData = [...data];
    updatedData[index][type] = isChecked;
    setData(updatedData);
  }

  function handleOrderChange(index: number, newOrder: string) {
    const updatedData = [...data];
    updatedData[index].order = newOrder;
    setData(updatedData);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">動作</TableHead>
          <TableHead>標題</TableHead>
          <TableHead>上下架</TableHead>
          <TableHead>首頁</TableHead>
          <TableHead>排序</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return <TableRow key={item.title}>
            <TableCell className="font-medium">
              <div className='flex gap-2'>
                <Button variant="outline" size="sm" className='text-indigo-500 border-current'>編輯</Button>
                <Button variant="outline" size="sm" className='text-rose-500 border-current'>刪除</Button>
                <Button variant="outline" size="sm" className='text-neutral-500 border-current'>預覽</Button>
              </div>
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <Checkbox
                checked={item.isActive} onCheckedChange={(isChecked) => toggleCheckbox(index, isChecked, 'isActive')}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                checked={item.isAddToHome}
                onCheckedChange={(isChecked) => toggleCheckbox(index, isChecked, 'isAddToHome')}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                className="focus-visible:outline-indigo-300"
                value={item.order}
                onChange={(e) => handleOrderChange(index, e.target.value)}
              />
            </TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}
