import { PropsWithChildren } from "react"
import { styles } from "./styles"
import { Test } from "./test"

export type NukaProps = PropsWithChildren<{
  className?: string
}>

const Nuka = ({ children, className }: NukaProps) => (
  <div className={className} style={styles.container}>
    {Array.isArray(children) &&
      children.map((card, index) => (
        <div style={styles.card} key={`card-${index}`}>
          {card}
          <Test />
        </div>
      ))}
  </div>
)

export default Nuka
