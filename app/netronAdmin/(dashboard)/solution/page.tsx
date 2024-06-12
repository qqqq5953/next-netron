import FormAddSolution from '@/app/netronAdmin/(dashboard)/solution/_components/FormAddSolution'
import TableSolution from '@/app/netronAdmin/(dashboard)/solution/_components/TableSolution'

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
