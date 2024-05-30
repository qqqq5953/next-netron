import { cn } from "@/lib/utils"
import { LuLoader2 } from 'react-icons/lu'

type Props = {
  size?: number
  className?: string
  wrapperClassName?: string
}

export default function Loader(props: Props) {
  return (
    <div className={cn(
      "grid place-items-center h-full",
      props.wrapperClassName
    )}>
      <div
        className={cn(
          "animate-spin text-muted-foreground",
          props.className
        )}>
        <LuLoader2 size={props.size ?? 16} />
      </div>
    </div>
  )
}