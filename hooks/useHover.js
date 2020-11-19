import { useState, useRef, useEffect } from "react"

function useHover() {
    const [hovered, setHovered] = useState(false);
    const ref = useRef();

    function enter() {
        setHovered(true);
    }

    function leave() {
        setHovered(false);
    }

    useEffect(() => {
        const instance = ref.current;
        instance.addEventListener('mouseenter', enter);
        instance.addEventListener('mouseleave', leave);
        return () => {
            instance.removeEventListener('mouseenter', enter);
            instance.removeEventListener('mouseleave', leave);
        }
    }, [])

    return { hovered, ref };
}

export default useHover

/**
     * Challenge:
     * 
     * Using useEffect and useRef, make it so when this hook first loads,
     * it sets up the "mouseenter" and "mouseleave" event listeners on the ref.
     * 
     * Remember: the ref.current will represent the DOM node, which is where you can
     * do imperative commands like `.addEventListener` and `removeEventListener`.
     */
