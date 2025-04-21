import { useState } from 'react'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import SuiteTable from '../features/suites/SuiteTable'
import CreateSuiteForm from '../features/suites/CreateSuiteForm'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

function Suites() {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All suites</Heading>
        <p>Filter/Sort</p>
      </Row>
      <Row>
        <SuiteTable />
      </Row>
      <Button onClick={() => setShowModal(!showModal)}>
        {showModal ? 'Close form' : 'Add new suite'}
      </Button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSuiteForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </>
  )
}

export default Suites
