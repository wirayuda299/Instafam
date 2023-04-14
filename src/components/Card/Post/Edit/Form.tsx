type Props = {
  defaultValues: {
    captions: string;
  };
  updatePost: (data: any) => void;
  register: any;
  handleSubmit: any;
};
export default function Form({
  defaultValues,
  updatePost,
  register,
  handleSubmit,
}: Props) {
  return (
    <form className="flex w-full p-3" onSubmit={handleSubmit(updatePost)}>
      <input
        type="text"
        className="w-full rounded-lg bg-[#a8a8a817] px-3 py-2"
        placeholder="Edit post"
        spellCheck="false"
        role="textbox"
        defaultValue={defaultValues.captions}
        {...register("updated", { required: true })}
      />
      <button
        className="p-2"
        type="submit"
        name="update"
        title="update"
        onClick={() => handleSubmit(updatePost)}
      >
        <span>Update</span>
      </button>
    </form>
  );
}
