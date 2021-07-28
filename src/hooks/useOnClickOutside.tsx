import { useEffect, useState } from 'react'

export default function useOnClickOutside(ref: any, handler: () => void) {
    const [clickOutsideCount, setClickOutsideCount] = useState(0)

    useEffect(() => {
        const listener: EventListener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                setClickOutsideCount(0)
                return
            }

            setClickOutsideCount(clickOutsideCount + 1)
            handler()
        }

        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler, clickOutsideCount, setClickOutsideCount])

    return { clickOutsideCount }
}