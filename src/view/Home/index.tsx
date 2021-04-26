import * as React from 'react'

import './index.scss'

import List from '@/components/descList/index'
import TimeLine from '@/components/timeLine/index'

import AnimeBG from '@/components/AnimeBackground/index'

import Footer from '@/layout/Footer/index'

import Snow from '@/anime/snow'

const snowList = []
let animeId = true
let frameId = undefined

function generateSnow(canvas: HTMLCanvasElement) {
    let snow = new Snow(Math.random() * Math.floor(canvas.width), canvas.getContext('2d'), canvas)
    // console.log('实例雪花', snow)
    // snow.draw()
    if(snowList.length < canvas.height) {
        snowList.push(snow)

    } else if(snowList.length === canvas.height) {
        snowList.shift()
    }
    snowList.forEach(el => {
        el.move();
        el.draw()
    })
    if(animeId) {
        requestAnimationFrame(() => {
            let ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            generateSnow(canvas)
        })
        // snwoAniem(canvas)
    }
}   

function snwoAniem(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext('2d');
    // console.log('画布', ctx);
    requestAnimationFrame((e) => {
        if(frameId === undefined) {
            frameId = e
        }
        if(animeId) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            generateSnow(canvas)
        }
    })
    // ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

const Home = (props: any) => {
    const { location, history } = props

    // let timeLineList = []
    const [timeLineList, setTimeLineList] = React.useState([])

    // 模拟componentDidMount()
    React.useEffect(() => {
        animeId = true
        console.log('首页: \n', 'location: \n', location, 'history: \n', history)
        // timeLineList = [1, 2, 3, 4]
        setTimeLineList([{title: '芜湖', content: '薪带路'}, {title: '哇偶', content: '苦力怕'}])
        let req = new XMLHttpRequest()
        console.log('发送请求', req)
        req.open('GET', 'http://localhost:8090/home');
        req.send()
        return () => {
            // cancelAnimationFrame(animeId)
            animeId = false
            cancelAnimationFrame(frameId)
        }
        // console.log(req.DONE)
    }, [])

    return (
        <div className={'home'}>
            <div className={'home__head'}>
                <AnimeBG animeFunc={snwoAniem}></AnimeBG>
            </div>
            <div className={'home__content'}>
                <div className={'home__list'}>
                    <List list={[{title: 'User', desc: '你好'}, {title: 'Article', desc: 'check it out'}, {title: 'Anime', desc: 'fofo~'}]} />
                </div>
                <div className={'home__list'}>
                    <div className="home__list--time-line">
                        <TimeLine list={timeLineList}></TimeLine>
                    </div>
                </div>
                <div className={'home__list'}>
                    <List list={[{title: '尼玛嘶', desc: '压力马斯奈'}, {title: '我到河北省来', desc: '法Q'}, {title: '打屁股裂了', desc: '芜湖'}]} />
                </div>
            </div>
            <Footer></Footer>
        </div>
    )

}

// class Home extends React.Component {
//     componentDidMount() {
//         console.log('首页')
//     }

//     render() {
//         return (
//             <div className='home'></div>
//         )
//     }
// } 

export default Home