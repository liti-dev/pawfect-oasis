import supabase, { supabaseUrl } from './supabase'

export default async function getSuites() {
  const { data, error } = await supabase.from('suites').select('*')
  if (error) {
    console.error(error)
    throw new Error('suites could not be loaded')
  }
  return data
}

export async function createSuite(suite, id) {
  console.log('suite', suite, 'id', id)
  // Check if image has path
  // const hasImagePath = suite.image?.startsWith(supabaseUrl)
  const hasImagePath = typeof suite.image === 'string'

  const imageName = `suite-${Date.now()}`
  const imagePath = hasImagePath
    ? suite.image
    : `${supabaseUrl}/storage/v1/object/public/suite-images/${imageName}`

  // Create or edit suite
  // Create
  let query = supabase.from('suites')
  if (!id) {
    query = query.insert([{ ...suite, image: imagePath }])
  }
  // Edit
  if (id) {
    query = query
      .update({ ...suite, image: imagePath })
      .eq('id', id)
      .select()
  }

  const { data, error } = await query.select().single()
  if (error) {
    console.error(error)
    throw new Error('suite could not be added')
  }
  // Upload image
  const { error: storageError } = await supabase.storage
    .from('suite-images')
    .upload(imageName, suite.image, {
      cacheControl: '3600',
      upsert: false,
    })
  if (storageError) {
    throw new Error('Image could not be uploaded')
  }
  return data
}

export async function deleteSuite(id) {
  const { data, error } = await supabase.from('suites').delete().eq('id', id)
  if (error) {
    console.error(error)
    throw new Error('suite could not be deleted')
  }
  return data
}
