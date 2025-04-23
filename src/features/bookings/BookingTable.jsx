import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import BookingRow from './BookingRow'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import Spinner from '../../ui/Spinner'

function BookingTable() {
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

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={booking => <BookingRow key={booking.id} booking={booking} />}
        />
      </Table>
    </Menus>
  )
}

export default BookingTable
