import { useState } from 'react'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import CabinTable from '../features/cabins/CabinTable'
import CreateCabinForm from '../features/cabins/CreateCabinForm'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

function Cabins() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Button onClick={() => setShowModal(!showModal)}>
        {showModal ? 'Close form' : 'Add new cabin'}
      </Button>
      {/* {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCabinForm onClose={() => setShowModal(false)} />
        </Modal>
      )} */}
      {showModal && <CreateCabinForm />}
    </>
  )
}

export default Cabins
