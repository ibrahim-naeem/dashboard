import { get, ref } from 'firebase/database'
import { firebaseDatabase } from './firebaseConfig' // Ensure the path is correct

// Generic function to fetch data from Firebase
export const fetchData = async (path) => {
  const dataRef = ref(firebaseDatabase, path) // Reference to the specified path
  try {
    const snapshot = await get(dataRef)
    if (snapshot.exists()) {
      console.log({
        fetchData: Object.values(snapshot.val()),
        length: Object.values(snapshot.val()).length,
      })
      return Object.values(snapshot.val())
    } else {
      console.log('No data available')
      return []
    }
  } catch (error) {
    console.error('Error reading data:', error)
    return []
  }
}
