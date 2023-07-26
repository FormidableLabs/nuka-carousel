import { PropsWithChildren } from "react"
import clsx from "clsx"

export type NukaProps = PropsWithChildren<{
  className?: string
}>

const Nuka = ({ children, className }: NukaProps) => (
  <div className={clsx(className, "")}>{children}</div>
)

export default Nuka
