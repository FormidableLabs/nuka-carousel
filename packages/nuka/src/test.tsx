"use client"

import { useState } from "react"

export const Test = () => {
  const [counter, setCounter] = useState(0)
  return (
    <div>
      <button onClick={() => setCounter(counter + 1)}>INCREMENT</button>
      {counter}
    </div>
  )
}
