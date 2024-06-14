export async function sendmail(email: string, sub: string, content: string) {
  try {
    const response = await fetch('http://localhost:3000/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        sub,
        content,
      }),
    })

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
