import * as React from "react"
import { useEffect, useRef } from "react"

import './index.scss'

const ABG:React.FC<any> = (porps: any) => {
    const {children} = porps

    const canvasRef = useRef(null)

    useEffect(() => {
        console.log('画布ref', canvasRef)
        console.log(canvasRef.current.clientWidth)
        console.log(canvasRef.current.clientHeight)
        window.addEventListener('resize', () => {})
        canvasRef.current.width = canvasRef.current.clientWidth
        canvasRef.current.height = canvasRef.current.clientHeight
    }, [])

    return (
        <div className="anime-background__wrap">
            <canvas className="anime-background__canvas" ref={canvasRef}></canvas>
            {children}
        </div>
    )
}

export default ABG