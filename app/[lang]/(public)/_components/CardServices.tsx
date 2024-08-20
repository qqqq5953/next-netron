import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  // CardDescription,
  // CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";

type Props = {
  imgUrl: string | null
  title: string
  content?: string
  date?: string,
  url?: string | null
}

export default function CardServices(props: Props) {
  return (
    <Card className="flex flex-col shadow-md">
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
      <CardContent>
        {props.date && <div className="text-neutral-600">{props.date}</div>}
        <h4 className="mt-1 text-xl">{props.title}</h4>
        {props.content && <p>{props.content}</p>}
      </CardContent>
      {props.url && <CardFooter className="justify-end mt-auto">
        <Link href={props.url} className="text-sky-600 underline-offset-[6px]">查看更多</Link>
      </CardFooter>}
    </Card>

  )
}
