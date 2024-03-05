import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { textArea, label, ...rest },
  ref
) {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:border-stone-600";
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textArea ? (
        <textarea className={classes} {...rest} ref={ref} />
      ) : (
        <input className={classes} {...rest} ref={ref} />
      )}
    </p>
  );
});

export default Input;