type Props = {
  defaultValues: {
    captions: string;
  },
  updatePost: (data: any) => void,
  register: any,
  handleSubmit: any
}
export default function Form({ defaultValues, updatePost, register, handleSubmit}:Props) {
  return (
    <form
    className='w-full p-3 flex'
    onSubmit={handleSubmit(updatePost)}
  >
    <input
      type='text'
      className='w-full py-2 px-3 bg-[#a8a8a817] rounded-lg'
      placeholder='Edit post'
      spellCheck='false'
      role='textbox'
      defaultValue={defaultValues.captions}
      {...register('updated', { required: true })}
    />
    <button
      className='p-2'
      type='submit'
      name='update'
      title='update'
      onClick={() => handleSubmit(updatePost)}
    >
      <span>Update</span>
    </button>
  </form>
  )
}
