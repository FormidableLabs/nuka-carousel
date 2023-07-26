// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Nuka from "nuka-carousel"
import { Card } from "@/components/card"

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">
        Nuka Carousel Demo App
      </h1>
      <Nuka>
        <Card className="bg-amber-400 text-amber-700">Card 1</Card>
        <Card className="bg-indigo-400 text-indigo-800">Card 2</Card>
        <Card className="bg-green-400 text-green-800">Card 3</Card>
        <Card className="bg-rose-400 text-rose-800">Card 4</Card>
      </Nuka>
    </div>
  )
}
