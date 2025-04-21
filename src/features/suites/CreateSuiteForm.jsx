import { useForm } from 'react-hook-form'
import { createSuite as createEditSuite } from '../../services/apiSuites'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { FormRow, Error, Label } from '../../ui/FormRow'

function CreateSuiteForm({ suiteToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = suiteToEdit

  // If there's an id, the form show EditSuiteForm with default values. No id then show CreateSuiteForm
  const isEdit = Boolean(editId)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: isEdit ? editValues : {} })

  const QueryClient = useQueryClient()
  const { isLoading: isCreating, mutate: createSuite } = useMutation({
    mutationFn: createEditSuite,
    onSuccess: () => {
      toast.success('suite added sucessfully')
      QueryClient.invalidateQueries({
        queryKey: ['suites'],
      })
      // reset if mutation is successful. That's why we don't add reset to onSubmit func
      reset()
      onClose()
    },
    onError: err => toast.error(err.message, 'suite could not be added'),
  })

  const { isLoading: isEditing, mutate: editSuite } = useMutation({
    mutationFn: ({ suite, id }) => createEditSuite(suite, id),
    onSuccess: () => {
      toast.success('suite sucessfully edited')
      QueryClient.invalidateQueries({
        queryKey: ['suites'],
      })
      onClose()
    },
    onError: err => toast.error(err.message, 'suite could not be edited'),
  })

  const isWorking = isCreating || isEditing

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEdit) {
      editSuite({ suite: { ...data, image }, id: editId })
    } else createSuite({ ...data, image: image })
  }

  function onError(err) {
    console.log(err)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Suite name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'suite name is required',
            maxLength: 30,
          })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'suite capacity is required',
            min: { value: 1, message: 'Capacity must be at least 1' },
            max: { value: 10, message: 'Capacity cannot exceed 10' },
          })}
        />
        {errors.maxCapacity && <Error>{errors.maxCapacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'suite price is required',
            min: { value: 1, message: 'Price must be at least 1' },
          })}
        />
        {errors.regularPrice && <Error>{errors.regularPrice.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description</Label>
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register('description')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Suite image</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: isEdit ? false : 'Image is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button disable={isWorking} type="submit">
          {isEdit ? 'Edit suite' : 'Create new suite'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateSuiteForm
