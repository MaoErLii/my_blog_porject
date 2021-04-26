import * as React from "react"
import { useEffect, useRef } from "react"

import './index.scss'

const ABG:React.FC<any> = (porps: any) => {
    const {children, animeFunc} = porps

    const canvasRef = useRef(null)

    useEffect(() => {
        console.log('画布ref', canvasRef)
        let canvas = canvasRef.current
        console.log(canvasRef.current.clientWidth)
        console.log(canvasRef.current.clientHeight)
        // window.addEventListener('resize', () => {})
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        addEventListener('resize', () => {
            canvas.width = canvas.clientWidth
            canvas.height = canvas.clientHeight
        })
        animeFunc && animeFunc(canvas)
    }, [])

    return (
        <div className="anime-background__wrap">
            {children}
            <canvas className="anime-background__canvas" ref={canvasRef}></canvas>
        </div>
    )
}

export default ABG