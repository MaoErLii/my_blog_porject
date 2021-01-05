import * as React from 'react'
import { MenuContext } from './index'

import './menuItem.scss'

// menu item 接口
interface menuItemProps {
    index?: string,
    disable?: boolean,
    className?: string,
    style?: React.CSSProperties,
    linkTo?: Function
}

// 绘制底线
const drawBaseLine = (ctx: any, width: number, height: number) => {
    // console.log('开始绘制动画')
    ctx.moveTo(0, height * .9)
    ctx.lineTo(width * .8, height * .9)
    ctx.lineTo(width * .8, height * .96)
    ctx.lineTo(width * .2, height * .96)
    ctx.lineTo(width * .2, height * .9)
    ctx.fillStyle = '#4d0fda'
    ctx.fill()
}

// 绘制侧边线
const drawSideLine = (ctx: any, width: number, height: number) => {
    // console.log('开始绘制动画')
    ctx.moveTo(1, height * .2)
    ctx.lineTo(5, height * .2)
    ctx.lineTo(5, height * .8)
    ctx.lineTo(1, height * .8)
    ctx.lineTo(1, height * .2)
    ctx.fillStyle = '#4d0fda'
    ctx.fill()
}

const clearCanvas = (ctx: any, width: number, height: number) => {
    // console.log('清空画布', ctx)
    ctx.clearRect(0, 0, width, height)
}

const MenuItem:React.FC<menuItemProps> = (props: any) => {
    const { index, disable, className, style, children, linkTo } = props
    const  context = React.useContext(MenuContext)

    // 当前类名
    const classes = () => {
        let name = 'menu__item'
        if(disable) {
            name += ' is-disable'
        }
        if(context.index === index) {
            name += ' is-selected'
        }
        if(className) {
            return name + ' ' + className
        }
        return name
    }

    const handleClick = () => {
        console.log('contex', context)
        if(linkTo) {
            linkTo()
        }
        if(context.onSelect && !disable && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }

    const canvasRef = React.useRef(null)

    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.clientWidth
        let height = canvas.clientHeight
        // 初始化宽高
        if(canvas.width !== width) {
            canvas.width = width
            canvas.height = height
        }
        clearCanvas(ctx, width, height)
        if(context.index === index) {
            if(context.mode === 'horizontal') {
                drawBaseLine(ctx, width, height)
            }
            if(context.mode === 'vertical') {
                drawSideLine(ctx, width, height)
            }
        }
    })

    return (
        <li className={classes()} style={style} onClick={handleClick} >
            {children}
            <canvas ref={canvasRef} className={"menu__item-back"}></canvas>
        </li>
    )
}

export default MenuItem
