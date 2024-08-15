import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";

type Props = {
  imgUrl: string | null
  title: string
  content?: string
}

export default function CardComponent(props: Props) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="relative min-h-32">
          {props.imgUrl ? <Image
            src={"/" + props.imgUrl}
            alt={props.title}
            fill
            className="w-full"
          /> :
            "no image"
          }
        </div>
      </CardHeader>
      {props.content && <CardContent>
        <p>{props.content}</p>
      </CardContent>}
      <CardFooter>
        <CardTitle>{props.title}</CardTitle>
      </CardFooter>
    </Card>

  )
}
