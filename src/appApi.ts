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
    Accept: '*/*',
    'User-Agent': 'Thunder ',
  }

  let response = await fetch(
    // `https://nominatim.openstreetmap.org/search?q=${address}&format=json`,
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
      import.meta.env.VITE_MAP_API_KEY
    }`,
    {
      method: 'GET',
      headers: headersList,
    }
  )

  let { results } = await response.json()
  const { geometry } = results[0]
  const obj = {
    latitude: geometry.location.lat,
    longitude: geometry.location.lng,
  }
  return obj
}
