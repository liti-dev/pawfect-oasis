import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import { getBookings } from '../../services/apiBookings'
import Spinner from '../../ui/Spinner'
import Heading from '../../ui/Heading'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

function DashboardLayout() {
  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  })

  if (isLoading) return <Spinner />
  if (error) {
    console.error('Error fetching bookings:', error)
    return <div>Error fetching bookings</div>
  }

  const data = [
    {
      status: 'Confirmed',
      count: bookings.filter(b => b.status === 'confirmed').length,
    },
    {
      status: 'Unconfirmed',
      count: bookings.filter(b => b.status === 'unconfirmed').length,
    },
    {
      status: 'Checked In',
      count: bookings.filter(b => b.status === 'checked-in').length,
    },
    {
      status: 'Checked Out',
      count: bookings.filter(b => b.status === 'checked-out').length,
    },
  ]

  const totalSales = bookings.reduce((acc, booking) => {
    const { totalPrice } = booking
    return acc + totalPrice
  }, 0)

  const salesBySuite = bookings.reduce((acc, booking) => {
    const { suites, totalPrice } = booking
    const suiteName = suites.name
    if (!acc[suiteName]) {
      acc[suiteName] = 0
    }
    acc[suiteName] += totalPrice
    return acc
  }, {})
  const salesBySuiteData = Object.entries(salesBySuite).map(
    ([suiteName, totalSales]) => ({
      suiteName,
      totalSales,
    }),
  )
  // console.log('Bookings:', bookings)
  // console.log('Data:', data)
  const StyledChartContainer = styled.div`
    grid-column: span 4;
    height: 300px; /* Set a fixed height to display charts*/
  `
  return (
    <>
      <Heading>Total Sales: £{totalSales}</Heading>
      <Heading>Bookings by status</Heading>
      <StyledChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </StyledChartContainer>
      <Heading>Total Sales by Suite</Heading>
      <StyledChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesBySuiteData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="suiteName"
              label={{
                value: 'Suite Name',
                position: 'insideBottom',
                offset: -5,
              }}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalSales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </StyledChartContainer>
    </>
  )
}

export default DashboardLayout
