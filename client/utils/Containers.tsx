export const Container = ({ children }) => (
  <div className="relative">{children}</div>
)

export const ContentWithPaddingXl = ({ children }) => (
  <div className="max-w-screen-xl mx-auto py-20 lg:py-24">{children}</div>
)

export const ContentWithPaddingLg = ({ children }) => (
  <div className="max-w-screen-lg mx-auto py-20 lg:py-24">{children}</div>
)

export const ContentWithVerticalPadding = ({ children }) => (
  <div className="py-20 lg:py-24">{children}</div>
)

export const Content2Xl = ({ children }) => (
  <div className="max-w-screen-2xl mx-auto">{children}</div>
)
