interface Props {
  children?: React.ReactNode
  onClick?: () => void
  className: string
}

const Button: React.FC<Props> = ({ className, children, onClick }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{
        display: 'inline-block',
        border: 'none',
        borderRadius: '7px',
        fontWeight: 'bold',
      }}
    >
      {children}
    </button>
  )
}

export default Button
