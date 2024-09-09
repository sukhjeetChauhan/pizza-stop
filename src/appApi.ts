export async function sendmail(email: string, sub: string, content: string) {
  try {
    // const response = await fetch('http://localhost:3000/sendmail', {
    const response = await fetch(
      'https://us-central1-pizza-stop-wellsford.cloudfunctions.net/api/sendmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          sub,
          content,
        }),
      }
    )

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
  } catch (error) {
    if (error instanceof Error) {
      alert('Error sending email: ' + error.message)
    } else {
      alert('An unknown error occurred')
    }
  }
}

export async function getCoords(address: string) {
  let headersList = {
    Accept: 'application/json',
  }

  try {
    let response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
        import.meta.env.VITE_MAP_API_KEY
      }`,

      {
        method: 'GET',
        headers: headersList,
      }
    )

    if (!response.ok) {
      throw new Error('HTTP error! Status: ${response.status}')
    }

    let { results } = await response.json()
    if (results.length === 0) {
      throw new Error('No results found for the address')
    }

    const { geometry } = results[0]

    const obj = {
      latitude: geometry.location.lat,
      longitude: geometry.location.lng,
    }

    return obj
  } catch (error) {
    if (error instanceof Error) {
      console.log(
        `Error fetching coordinates for address '${address}': ${error.message}`
      )
    }
    throw error // Propagate the error to handle it further if needed
  }
}

export async function refund(Id: string) {
  const url =
    'https://us-central1-pizza-stop-wellsford.cloudfunctions.net/api/refund'

  const data = {
    id: Id,
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const result = await response.json()
    console.log('Success:', result)
  } catch (error) {
    console.error('Error:', error)
  }
}
