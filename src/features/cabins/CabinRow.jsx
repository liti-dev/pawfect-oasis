import { useState } from 'react'
import styled from 'styled-components'

import { capitaliseWords, formatCurrency } from '../../utils/helpers'
import { deleteCabin } from '../../services/apiCabins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Button from '../../ui/Button'
import CreateCabinForm from '../cabins/CreateCabinForm'

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.7fr 0.7fr 1.5fr 2fr;
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

const Description = styled.div`
  font-family: 'Sono';
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Container = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: row;
  gap: 1rem;
`

export default function CabinRow({ cabin }) {
  const [showEditForm, setShowEditForm] = useState(false)
  const QueryClient = useQueryClient()
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Delete cabin sucessfully')
      QueryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: err => toast.error(err.message, 'Cabin could not be deleted'),
  })

  return (
    <>
      <TableRow role="row">
        <Img src={cabin.image} alt="cabin" />
        <Cabin>{capitaliseWords(cabin.name)}</Cabin>
        <div>{cabin.maxCapacity}</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Description>
          {cabin.description.charAt(0).toUpperCase() +
            cabin.description.slice(1)}
        </Description>
        <Container>
          <Button onClick={() => setShowEditForm(show => !show)}>Edit</Button>
          <Button
            variation="danger"
            disabled={isLoading}
            onClick={() => mutate(cabin.id)}
          >
            Delete
          </Button>
        </Container>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  )
}
