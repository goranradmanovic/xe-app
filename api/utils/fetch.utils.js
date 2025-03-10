require('dotenv').config()

// Set the API URL and key
const apiUrl = process.env.API_URL,
      apiKey = process.env.API_KEY

// Fetch data from the API with the 'id' string param
const fetchData = async id => {
  try {
    const res = await fetch(`${apiUrl}${id}`, {
      headers: { "X-Master-Key": apiKey },
    })

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`)
    }

    return await res.json()
  } catch (err) {
    console.error("Error fetching data:", err.message)
    return null
  }
}

module.exports = fetchData