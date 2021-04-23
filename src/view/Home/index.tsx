import * as React from 'react'

import './index.scss'

import List from '@/components/descList/index'
import TimeLine from '@/components/timeLine/index'

import AnimeBG from '@/components/AnimeBackground/index'

import Footer from '@/layout/Footer/index'

const Home = (props: any) => {
    const { location, history } = props

    // let timeLineList = []
    const [timeLineList, setTimeLineList] = React.useState([])

    // 模拟componentDidMount()
    React.useEffect(() => {
        console.log('首页: \n', 'location: \n', location, 'history: \n', history)
        // timeLineList = [1, 2, 3, 4]
        setTimeLineList([{title: '芜湖', content: '薪带路'}, {title: '哇偶', content: '苦力怕'}])
        let req = new XMLHttpRequest()
        console.log('发送请求', req)
        req.open('GET', 'http://localhost:8090/home');
        req.send()
        
        // console.log(req.DONE)
    }, [])

    return (
        <div className={'home'}>
            <div className={'home__head'}>
                <AnimeBG></AnimeBG>
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