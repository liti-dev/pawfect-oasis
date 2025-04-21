import { useState } from 'react'
import styled from 'styled-components'

import { capitaliseWords, formatCurrency } from '../../utils/helpers'
import { deleteSuite } from '../../services/apiSuites'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import Button from '../../ui/Button'
import CreateSuiteForm from '../suites/CreateSuiteForm'
import { RiDeleteBinLine } from 'react-icons/ri'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'

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

const Suite = styled.div`
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

export default function SuiteRow({ suite }) {
  const [showEditForm, setShowEditForm] = useState(false)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const QueryClient = useQueryClient()
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteSuite,
    onSuccess: () => {
      toast.success('Delete suite sucessfully')
      QueryClient.invalidateQueries({
        queryKey: ['suites'],
      })
    },
    onError: err => toast.error(err.message, 'suite could not be deleted'),
  })

  return (
    <>
      <TableRow role="row">
        <Img src={suite.image} alt="suite" />
        <Suite>{capitaliseWords(suite.name)}</Suite>
        <div>{suite.maxCapacity}</div>
        <Price>{formatCurrency(suite.regularPrice)}</Price>
        <Description>
          {suite.description.charAt(0).toUpperCase() +
            suite.description.slice(1)}
        </Description>
        <Container>
          <Button onClick={() => setShowEditForm(show => !show)}>Edit</Button>
          <Button
            variation="danger"
            disabled={isLoading}
            // onClick={() => mutate(suite.id)}
            onClick={() => setShowConfirmDelete(true)}
          >
            <RiDeleteBinLine />
          </Button>
        </Container>
      </TableRow>
      {/* {showEditForm && <CreateSuiteForm suiteToEdit={suite} />} */}
      {showEditForm && (
        <Modal onClose={() => setShowEditForm(false)}>
          <CreateSuiteForm
            onClose={() => setShowEditForm(false)}
            suiteToEdit={suite}
          />
        </Modal>
      )}
      {showConfirmDelete && (
        <Modal onClose={() => setShowConfirmDelete(false)}>
          <ConfirmDelete
            onClose={() => setShowConfirmDelete(false)}
            onConfirm={() => mutate(suite.id)}
          />
        </Modal>
      )}
    </>
  )
}
