type Props = any
export function MyButton(props: Props) {
  const { children, ...all_props } = props
  return (
    <button className="btn btn-outline btn-accent" {...all_props}>
      {children}
    </button>
  )
}
