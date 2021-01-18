import * as React from 'react'

import './index.scss'

import List from '@/components/descList/index'
import TimeLine from '@/components/timeLine/index'

import Footer from '@/layout/Footer/index'

const Home = (props: any) => {
    const { location, history } = props

    // let timeLineList = []
    const [timeLineList, setTimeLineList] = React.useState([])

    // 模拟componentDidMount()
    React.useEffect(() => {
        console.log('首页: \n', 'location: \n', location, 'history: \n', history)
        // timeLineList = [1, 2, 3, 4]
        setTimeLineList([{title: '芜湖', content: '呵，蓝人'}, {title: '哇偶', content: '呵，旅人'}])
    }, [])

    return (
        <div className={'home'}>
            <div className={'home__head'}>
            </div>
            <div className={'home__content'}>
                <div className={'home__list'}>
                    <List list={[{title: '下北泽', desc: '压力马斯奈'}, {title: '新日暮里', desc: '法Q'}, {title: '幻想乡', desc: '芜湖'}]} />
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