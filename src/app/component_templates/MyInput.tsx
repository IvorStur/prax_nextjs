type Props = {
  children: any
  onClick: any
}
export function MyInput(props: Props) {
  return (
    <input
      {...register('name')}
      name="name"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
  )
}
