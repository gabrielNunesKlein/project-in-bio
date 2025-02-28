import { useEffect } from "react";

export default function useOnClickOutside(
    ref: React.RefObject<HTMLDivElement>,
    handler?: (event: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        const listner = (event: MouseEvent | TouchEvent) => {
            const target = event.target as HTMLElement

            if(!ref.current || ref.current.contains(target)){
                return
            }

            if(handler){
                handler(event)
            }

            document.addEventListener("mousedown", listner)
            document.addEventListener("touchstart", listner)

            return () => {
                document.removeEventListener("mousedown", listner)
                document.removeEventListener("touchstart", listner)
            }
        }
    }, [])
}