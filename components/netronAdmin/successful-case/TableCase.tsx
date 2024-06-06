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
import { Button } from '@/components/netronAdmin/global/button'
import { Input } from '@/components/ui/input'
import { CheckedState } from '@radix-ui/react-checkbox'
import { useParams } from 'next/navigation'

type InitialData = Record<string, {
  title: string;
  isActive: CheckedState;
  order: string;
}[]>

const initialData: InitialData = {
  "all": [
    { title: "UGG", isActive: false, order: "1" },
    { title: "【MAYO 鼎恒數位科技", isActive: false, order: "3" },
    { title: "藥華醫藥", isActive: false, order: "2" }
  ],
  "3": [
    { title: "【MAYO 鼎恒數位科技", isActive: false, order: "3" },
    { title: "藥華醫藥", isActive: false, order: "2" },
    { title: "UGG", isActive: false, order: "1" },
  ],
  "14": [
    { title: "藥華醫藥", isActive: false, order: "2" },
    { title: "UGG", isActive: false, order: "1" },
    { title: "【MAYO 鼎恒數位科技", isActive: false, order: "3" }
  ],
}

export default function TableCase() {
  const params = useParams<{ id: string }>()

  const [data, setData] = useState(params?.id ? initialData[params.id] : initialData['all']);

  function toggleCheckbox(index: number, isChecked: CheckedState, type: 'isActive') {
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
          <TableHead>排序</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          return <TableRow key={item.title}>
            <TableCell className="font-medium">
              <div className='flex gap-2'>
                <Button variant="outline" size="sm">編輯</Button>
                <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'>刪除</Button>
                <Button variant="outline" size="sm" className='text-neutral-500 border-current hover:text-neutral-500/90'>預覽</Button>
              </div>
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              <Checkbox
                checked={item.isActive} onCheckedChange={(isChecked) => toggleCheckbox(index, isChecked, 'isActive')}
              />
            </TableCell>
            <TableCell>
              <Input
                type="number"
                className="primary-input-focus"
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