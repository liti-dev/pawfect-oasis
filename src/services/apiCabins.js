import supabase, { supabaseUrl } from './supabase'

export default async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')
  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }
  return data
}

export async function createCabin(cabin) {
  // What's the better way to name uploaded files?
  const imageName = `cabin-${Math.random()}`
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...cabin, image: imagePath }])
    .select()
  if (error) {
    console.error(error)
    throw new Error('Cabin could not be added')
  }
  // Upload image

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabin.image, {
      cacheControl: '3600',
      upsert: false,
    })
  return data
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id)
  if (error) {
    console.error(error)
    throw new Error('Cabin could not be deleted')
  }
  return data
}
