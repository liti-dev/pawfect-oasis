import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Form from '../../ui/Form'
import { FormRow, Label } from '../../ui/FormRow'
import Input from '../../ui/Input'
import {
  getSettings,
  updateSetting as updateSettingApi,
} from '../../services/apiSettings'
import Spinner from '../../ui/Spinner'
import toast from 'react-hot-toast'

function UpdateSettingsForm() {
  const QueryClient = useQueryClient()
  const {
    isLoading,
    data: settings = {},
    error,
  } = useQuery({ queryKey: ['settings'], queryFn: getSettings })
  const { minNights, maxNights, maxGuests, groomingPrice, mealPrice } = settings

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Settings sucessfully updated')
      QueryClient.invalidateQueries({
        queryKey: ['settings'],
      })
    },
    onError: err => toast.error(err.message, 'Settings could not be updated'),
  })

  if (isLoading) return <Spinner />

  function handleUpdate(e) {
    const { value, id: field } = e.target
    console.log('value', value)
    if (!value) return
    updateSetting({ [field]: value })
  }

  return (
    <Form>
      <FormRow label="Minimum nights">
        <Label htmlFor="minNights">Minimum nights</Label>
        <Input
          type="number"
          id="minNights"
          defaultValue={minNights}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e)}
        />
      </FormRow>
      <FormRow label="Maximum nights">
        <Label htmlFor="maxNights">Maximum nights</Label>
        <Input
          type="number"
          id="maxNights"
          defaultValue={maxNights}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e)}
        />
      </FormRow>
      <FormRow label="Maximum guests">
        <Label htmlFor="maxGuests">Max guests per booking</Label>
        <Input
          type="number"
          id="maxGuests"
          defaultValue={maxGuests}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e)}
        />
      </FormRow>
      <FormRow label="Grooming price">
        <Label htmlFor="groomingPrice">Grooming price</Label>
        <Input
          type="number"
          id="groomingPrice"
          defaultValue={groomingPrice}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e)}
        />
      </FormRow>
      <FormRow label="Meal price">
        <Label htmlFor="mealPrice">Meal price</Label>
        <Input
          type="number"
          id="mealPrice"
          defaultValue={mealPrice}
          disabled={isUpdating}
          onBlur={e => handleUpdate(e)}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
