import styled from 'styled-components'

import { capitaliseWords, formatCurrency } from '../../utils/helpers'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1.5fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`

const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`
const Description = styled.div`
  font-family: 'Sono';
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default function CabinRow({ cabin }) {
  return (
    <TableRow role="row">
      <Img src={cabin.image} alt="cabin" />
      <Cabin>{capitaliseWords(cabin.name)}</Cabin>
      <div>{cabin.maxCapacity}</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Description>{cabin.description}</Description>
      <button>Delete</button>
    </TableRow>
  )
}
