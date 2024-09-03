import supabase, { supabaseUrl } from './supabase'

export default async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*')
  if (error) {
    console.error(error)
    throw new Error('Cabins could not be loaded')
  }
  return data
}

export async function createCabin(cabin, id) {
  console.log('cabin', cabin, id)
  // Check if image has path
  const hasImagePath = cabin.image?.startsWith(supabaseUrl)
  console.log(hasImagePath)

  const imageName = `cabin-${Date.now()}`
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // Create or edit cabin
  // Create
  let query = supabase.from('cabins')
  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }])
  }
  // Edit
  if (id) {
    query = query
      .update({ ...cabin, image: imagePath })
      .eq('id', id)
      .select()
  }

  const { data, error } = await query.select().single()
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
