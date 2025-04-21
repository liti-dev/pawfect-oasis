import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import getSuites from '../../services/apiSuites'
import Spinner from '../../ui/Spinner'
import SuiteRow from './SuiteRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr 0.7fr 0.7fr 1.5fr 2fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-size: clamp(1rem, 1.5rem, 1.8rem);
  font-weight: 600;
  color: var(--color-grey-600);
`

export default function SuiteTable() {
  const {
    isLoading,
    data: suites,
    error,
  } = useQuery({
    queryKey: ['suites'],
    queryFn: getSuites,
  })
  // console.log(suites, error)
  if (isLoading) return <Spinner />
  if (error) {
    console.error('Error fetching settings:', error)
  }

  return (
    <Table role="table">
      <TableHeader>
        <div></div>
        <div>Suite</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Description</div>
        <div></div>
      </TableHeader>
      {suites.map(s => (
        <SuiteRow suite={s} key={s.id} />
      ))}
    </Table>
  )
}
