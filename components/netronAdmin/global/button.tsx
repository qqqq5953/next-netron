import { HTMLAttributes, forwardRef } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  size?: ButtonProps['size'];
  variant?: ButtonProps['variant'];
  className?: string;
  onClick?: () => void;
} & ButtonProps;

const ButtonCustom = forwardRef<HTMLButtonElement, Props>((props, _ref) => {
  if (!props.variant) {
    return (
      <Button
        {...props}
        size={props.size}
        onClick={props.onClick}
        className={cn(
          "bg-sky-500 hover:bg-sky-500/90",
          props.className
        )}
      >
        {props.children}
      </Button>
    );
  } else if (props.variant === 'outline') {
    return (
      <Button
        {...props}
        variant="outline"
        size={props.size}
        onClick={props.onClick}
        className={cn(
          "text-sky-500 border-current hover:text-sky-500/90 hover:border-current",
          props.className
        )}
      >
        {props.children}
      </Button>
    );
  } else {
    return (
      <Button
        {...props}
        variant={props.variant}
        size={props.size}
        onClick={props.onClick}
        className={props.className}
      >
        {props.children}
      </Button>
    );
  }
});

export { ButtonCustom as Button };
