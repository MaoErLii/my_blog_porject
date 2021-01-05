import * as React from 'react'

// scroll 钩子
const useScroll = (scrollRef: any) => {
    const [pos, setPos] = React.useState([0, 0])

    const handleScroll = (e: any) => {
        setPos([scrollRef.current.scrollLeft, scrollRef.current.scrollTop])
    }

    React.useEffect(() => {
        // console.log(scrollRef.current)
        scrollRef.current.addEventListener('scroll', handleScroll, false)
        return () => {
            scrollRef.current.addEventListener('scroll', handleScroll, false)
        }
    }, [])

    return pos
}

export default useScroll