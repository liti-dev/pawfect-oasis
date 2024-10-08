import { useForm } from 'react-hook-form'
import { createCabin } from '../../services/apiCabins'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { FormRow, Error, Label } from '../../ui/FormRow'

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit

  // If there's an id, the form show EditCabinForm with default values. No id then show CreateCabinForm
  const isEdit = Boolean(editId)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: isEdit ? editValues : {} })

  const QueryClient = useQueryClient()
  const { isLoading, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin added sucessfully')
      QueryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
      // reset if mutation is successful. That's why we don't add reset to onSubmit func
      reset()
    },
    onError: err => toast.error(err.message, 'Cabin could not be added'),
  })

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabin, id }) => createCabin(cabin, id),
    onSuccess: () => {
      toast.success('Cabin sucessfully edited')
      QueryClient.invalidateQueries({
        queryKey: ['cabins'],
      })
    },
    onError: err => toast.error(err.message, 'Cabin could not be edited'),
  })

  function onSubmit(data) {
    // console.log('data', data)
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEdit) {
      editCabin({ cabin: { ...data, image }, id: editId })
    } else createCabin({ ...data, image: image })
  }

  function onError(err) {
    console.log(err)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'Cabin name is required',
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
            required: 'Cabin capacity is required',
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
            required: 'Cabin price is required',
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
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register('image')} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onClose}>
          Cancel
        </Button>
        <Button disable={isLoading} onClick={onClose}>
          {isEdit ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
