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
  m_url: string
}

export default function CardBrand(props: Props) {
  return (
    <Link href={`/brand/${props.m_url}`} className="group">
      <Card className="shadow-md h-full">
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
          <h4 className="mt-1 text-xl font-medium group-hover:text-sky-500 transition-colors duration-200">{props.title}</h4>
          {props.content && <p>{props.content}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}
