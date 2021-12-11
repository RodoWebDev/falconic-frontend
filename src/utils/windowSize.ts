import { useState, useLayoutEffect } from 'react'

const useWindowMode = (): number => {
  const [size, setSize] = useState(0)

  useLayoutEffect(() => {
    function updateSize(): void {
      setSize(window.innerWidth)
    }
    window.addEventListener('resize', updateSize)
    updateSize()
    return (): void => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export default useWindowMode
