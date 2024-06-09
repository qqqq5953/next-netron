import { Button } from "./button";
import { FaAnglesLeft } from "react-icons/fa6";

type Props = {
  isOpen: boolean
  toggle: () => void
}

export default function MenuToggle(props: Props) {
  return <div className={`${props.isOpen ? 'ml-auto -mr-2' : 'mr-0 -ml-6'}`}>
    <Button
      size="sm"
      variant="ghost"
      onClick={() => props.toggle()}

    >
      <FaAnglesLeft
        className={`duration-300 transition-all ${props.isOpen ? 'rotate-0 delay-[70ms]' : 'rotate-180 delay-0'}`} />
    </Button>
  </div>
}
