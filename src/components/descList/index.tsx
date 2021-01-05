import * as React from 'react'

interface listProps {
    className?: string,
    style?: React.CSSProperties,
    list?: Array<any>
}

import './index.scss'

const DescList: React.FC<listProps> = (props: any) => {
    const { className, style, list } = props

    // class类目集合
    const classes = () => {
        let name ='desc-list__container'
        if(className) {
            name += ' ' + className
        }

        return name
    }

    // 模拟componentDidmount 生命周期
    React.useEffect(() => {
        // console.log('入参', props)
    }, [])

    return (
        <div className={classes()} style={style}>
            {list.map((item: any, index: number) => {
                return (
                    <div key={index} className='desc-list__item'>
                        <h1>{item.title? item.title : '标题'}</h1>
                        <p>{item.desc? item.desc : '描述'}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default DescList