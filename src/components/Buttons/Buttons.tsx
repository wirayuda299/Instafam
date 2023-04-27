interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLButtonElement>;
}

export default function Buttons({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button disabled={props.disabled} className={className} {...props}>
      {children}
    </button>
  );
}
