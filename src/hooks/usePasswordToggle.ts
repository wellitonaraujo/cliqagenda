import { useState } from 'react'

export function usePasswordToggle() {
  const [visible, setVisible] = useState(false)
  const toggle = () => setVisible(v => !v)

  return { visible, toggle }
}
