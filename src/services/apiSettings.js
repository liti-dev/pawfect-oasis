import supabase from './supabase'

export async function getSettings() {
  // There is only ONE row of settings, so we take one single obj instead of an array of obj
  const { data, error } = await supabase.from('settings').select('*').single()

  if (error) {
    console.error(error)
    throw new Error('Settings could not be loaded')
  }
  return data
}

// unlike cabins, updateSetting doesn't need id, so no need to pass id. We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error } = await supabase
    .from('settings')
    .update(newSetting)
    // there is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq('id', 1)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Settings could not be updated')
  }
  return data
}
