import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getBookings } from '../../services/apiBookings'

import BookingRow from './BookingRow'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'

function BookingTable() {
  const [searchParams] = useSearchParams()
  const selectedStatus = searchParams.get('status') || 'all'

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  })

  console.log('Bookings:', bookings)

  if (isLoading) return <Spinner />
  if (error) {
    console.error('Error fetching bookings:', error)
  }

  const filteredBookings =
    selectedStatus === 'all'
      ? bookings
      : bookings.filter(b => b.status === selectedStatus)

  return (
    <Menus>
      <Table columns="1.5fr 2fr 1.5fr 2.5fr 1.5fr 1fr">
        <Table.Header>
          <div>Suite</div>
          <div>Guest</div>
          <div>Num of Pets</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
        </Table.Header>

        <Table.Body
          data={filteredBookings}
          render={booking => <BookingRow key={booking.id} booking={booking} />}
        />
      </Table>
    </Menus>
  )
}

export default BookingTable
