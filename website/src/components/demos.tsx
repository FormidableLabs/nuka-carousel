import React from "react"
import clsx from "clsx"

type Props = {
  wrapAround?: boolean
  autoplay?: boolean
  startIndex?: number
  className?: string
}

export const BasicDemo = ({
  wrapAround = false,
  autoplay = false,
  startIndex = 0,
  className = "",
}: Props) => {
  return (
    <div className={clsx(className, "w-full md:w-[600px] lg:w-[750px]")}></div>
  )
}
