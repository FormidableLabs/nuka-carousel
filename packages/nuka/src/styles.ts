import { CSSProperties } from "react"

export const styles: Record<string, CSSProperties | Record<string, string>> = {
  container: {
    "scroll-snap-type": "x mandatory",
    "overflow-x": "scroll",
    display: "flex",
    width: 500,
  },
  card: {
    "scroll-snap-align": "center",
    "flex-shrink": "0",
    width: 500,
  },
}
