import * as React from 'react'
// 动效组件
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// 路由相关
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import routes from '@/router/index'
// 页面
// import Home from '@/view/Home/index'
// import Anime from '@/view/Anime/index'
// import Games from '@/view/Games/index'
// import Gbf from '@/view/Gbf/index'
// 组件
import Header from '@/layout/Header/index'
import Menu from '@/components/menu/index'
import MenuItem from '@/components/menu/menuItem'
// 动画
import { Bubble } from '@/anime/bubble'
import { WaterCircle } from '@/anime/waterCircle'

let bubbleList = []
let waterCircleList = []

let timer: any = ''

// 监听鼠标移动，并实现鼠标轨迹动画
const listenMouseMove = (canvas?: any, e?: any) => {
    const c = canvas.current
    const ctx = c.getContext('2d')
    // console.log('e: client', e.clientX)
    // console.log('window: innerHeight', window.innerWidth)
    // console.log('window: clientHeight', document.documentElement.clientWidth)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    let bubble: Bubble
    // waterCircleList = []
    if(bubbleList.length < 10) {
        bubble = new Bubble(e.clientX, e.clientY, ctx)
        bubbleList.push(bubble)
        bubble.draw()
        bubble.collisionDect()
    }
    if(bubbleList.length > 0 || waterCircleList.length > 0) {
        bubbleList.forEach((bubble) => {
            bubble.move()
            bubble.draw()
            bubble.collisionDect()
        })
        waterCircleList.forEach((waterCircle) => {
            waterCircle.explod()
            waterCircle.draw()
            waterCircle.loop()
            if(waterCircle.count >= 5) {
                waterCircleList.shift()
            }
        })
    }
    if(bubbleList.length === 10) {
        bubbleList.shift()
    }
    if(bubbleList.length > 0) {
        animeTimer(ctx)
    }
}

// 动画anime
const animeTimer = (ctx: any) => {
    if(timer) {
        clearInterval(timer)
    }
    if(bubbleList.length > 0 || waterCircleList.length > 0) {
        let count = 0
        timer = setInterval(() => {
            // console.log('定时器方法')
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
            // 气泡移动
            if(bubbleList.length > 0) {
                bubbleList.forEach((bubble) => {
                    bubble.move()
                    bubble.draw()
                    bubble.collisionDect()
                })
            } else {
                if(waterCircleList.length === 0) {
                    clearInterval(timer)
                    count = 0
                }
            }
            // 水波纹扩散
            if(waterCircleList.length > 0) {
                waterCircleList.forEach((waterCircle) => {
                    waterCircle.explod()
                    waterCircle.draw()
                    waterCircle.loop()
                })
            } else {
                if(bubbleList.length === 0) {
                    clearInterval(timer)
                    count = 0
                }
            }
            count ++
            if(count >= 2) {
                if(bubbleList.length > 0) {
                    if(waterCircleList.length === 0) {
                        count = 0
                    }
                    bubbleList.shift()
                }
            }
            if(count >= 10) {
                count = 0
                waterCircleList.shift()
            }
        }, 20)
    }
}

// 鼠标点击效果
const clickCanvasAnime = (canvas?: any, e?: any) => {
    bubbleList = []
    const c = canvas.current
    const ctx = c.getContext('2d')
    let waterCircle: WaterCircle
    waterCircle = new WaterCircle(e.clientX, e.clientY, ctx)
    waterCircle.init()
    waterCircle.draw()
    waterCircleList.push(waterCircle)
    if(waterCircleList.length > 0) {
        animeTimer(ctx)
    }
    if(waterCircleList.length === 3) {
        waterCircleList.shift()
    }
     // console.log('水波纹列表', waterCircleList)
    // console.log('要绘制的canvas 2d内容', ctx)
}

const App = () => {

    let location = useLocation()
    let history = useHistory()
    let [direction, setDirection] = React.useState('forward')

    // console.log('路由location', location)

    // 路由列表
    const menuList = routes

    // 默认下标
    const defaultIndex = () => {
        let pos = '-1'
        menuList.forEach((item, index) => {
            if(item.path === location.pathname) {
                pos = index + ''
            }
        })

        // console.log('当前下标', pos)
        return pos
    }

    // canvas背景ref
    const canvasRef = React.useRef(null)

    // 初始化canvas宽高
    React.useEffect(() => {
        console.log('hooks')
        // console.log('App: \n', 'location:', location, '\n', 'history:', history)
        window.addEventListener('resize',() => {
            console.log('resize')
            let canvas = canvasRef.current
            // const ctx = canvas.getContext('2d')
            let width = canvas.clientWidth
            let height = canvas.clientHeight
            // 初始化宽高
            if(canvas.width !== width) {
                canvas.width = width
                canvas.height = height
            }
        })
        let canvas = canvasRef.current
        // const ctx = canvas.getContext('2d')
        let width = canvas.clientWidth
        let height = canvas.clientHeight
        // 初始化宽高
        canvas.width = width
        canvas.height = height
    }, [])

    // let direction = 'forward'

    return (
        <div 
            className={"app"}
            onMouseMove={(e) => {
                listenMouseMove(canvasRef, e)
            }}
            onClick={(e) => {
                clickCanvasAnime(canvasRef, e)
            }}
        >   
            <Header onMain={() => {
                setDirection('backward')
                history.push('/')
            }}>
                <Menu mode={"horizontal"} defaultIndex={defaultIndex()}>
                {   
                //** 渲染menu */
                    menuList.map((item, index) => {
                        return( <MenuItem key={index} linkTo={() => {
                            // console.log('之前的下标', defaultIndex())
                            // console.log('要跳转的下标', index)
                            // console.log('页面跳转')
                            if(index < parseInt(defaultIndex())) {
                                setDirection('backward')
                                history.push(item.path)
                            } else if (index > parseInt(defaultIndex())){
                                setDirection('forward')
                                history.push(item.path)
                            }
                        }}>
                            {item.name}
                        </MenuItem>
                    )
                    })
                }
            </Menu>
            </Header>
            {/* <Switch location={location}>
                {menuList.map((route, index) => {
                    return <Route exact key={index} {...route}></Route>
                })}
            </Switch> */}
            {/* 带过渡动画的路由 */}
            <TransitionGroup 
                className={'router'}
                childFactory={child => React.cloneElement(
                    child, {classNames: history.action === 'POP'? 'backward' : direction}
                )}
            >
                <CSSTransition
                    timeout={500}
                    key={location.pathname}
                >   
                <Switch location={location}>
                    {menuList.map((route, index) => {
                        return (
                            <Route exact={true} key={index} path={route.path} component={route.component}></Route>
                        ) 
                            
                    })}
                </Switch>
                </CSSTransition>
            </TransitionGroup>
            <canvas
                className="canvas__background"
                ref={canvasRef}
            >
            </canvas>
        </div>
    )
}

export default App