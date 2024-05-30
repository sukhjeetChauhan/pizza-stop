import { ReactNode } from 'react'

interface ChildrenProps {
  children: ReactNode
}

export const Container: React.FC<ChildrenProps> = ({ children }) => (
  <div className="relative">{children}</div>
)

export const ContentWithPaddingXl: React.FC<ChildrenProps> = ({ children }) => (
  <div className="max-w-screen-xl mx-auto py-20 lg:py-24">{children}</div>
)

export const ContentWithPaddingLg: React.FC<ChildrenProps> = ({ children }) => (
  <div className="max-w-screen-lg mx-auto py-20 lg:py-24">{children}</div>
)

export const ContentWithVerticalPadding: React.FC<ChildrenProps> = ({
  children,
}) => <div className="py-20 lg:py-24">{children}</div>

export const Content2Xl: React.FC<ChildrenProps> = ({ children }) => (
  <div className="max-w-screen-2xl mx-auto">{children}</div>
)
