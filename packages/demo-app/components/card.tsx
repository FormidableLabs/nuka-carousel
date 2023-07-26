import React, { PropsWithChildren } from "react"
import clsx from "clsx"

type CardProps = {
  className: string
}

export const Card = ({ className, children }: PropsWithChildren<CardProps>) => (
  <div
    className={clsx(
      className,
      "flex justify-center w-full flex-row",
      "py-10 px-5 border-8 border-solid"
    )}
  >
    {children}
  </div>
)
