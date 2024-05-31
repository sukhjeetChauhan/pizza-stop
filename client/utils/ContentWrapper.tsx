// ContentWrapper.js

import { ReactNode, useEffect, useState } from 'react'
import Spinner from './Spinner'

type ContentWrapperProps = {
  children: ReactNode
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate a network request or some asynchronous task
    setTimeout(() => {
      setIsLoading(false)
    }, 1500) // Adjust the timeout as needed
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return <>{children}</>
}

export default ContentWrapper
