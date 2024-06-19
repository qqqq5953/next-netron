import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/app/netronAdmin/_components/Button'
import { SolutionData } from '@/lib/types/admin-types'
import FormSolution from './FormSolution'

type Props = {
  initialData: SolutionData[]
  allNews: { id: number, title: string }[]
}

export default function TableSolution(props: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>標題</TableHead>
          <TableHead>動作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.initialData.map((solution) => {
          return <TableRow key={solution.title}>
            <TableCell>{solution.title}</TableCell>
            <TableCell className="font-medium">
              <div className='flex gap-2'>
                <FormSolution type="edit" solution={solution} allNews={props.allNews} />
                <Button variant="outline" size="sm" className='text-rose-500 border-current hover:text-rose-500/90'>刪除</Button>
              </div>
            </TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
  )
}