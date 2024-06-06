import FormAddSolution from '@/components/netronAdmin/solution/FormAddSolution'
import TableSolution from '@/components/netronAdmin/solution/TableSolution'

export default function SolutionPage() {
  return (
    <>
      <div className='flex items-center'>
        <h2 className='text-3xl font-medium'>解決方案</h2>
        <FormAddSolution />
      </div>

      <section>
        <TableSolution />
      </section>
    </>
  )
}
