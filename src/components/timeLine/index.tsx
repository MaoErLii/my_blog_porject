import * as React from 'react'

import './index.scss'

interface timeLineProps {
    className?: string,
    style?: React.CSSProperties,
    list?: Array<any>,
    currentIndex?: number
}

const TimeLine: React.FC<timeLineProps> = (props) => {
    const { className, style, list, currentIndex } = props

    const [active, setActive] = React.useState(currentIndex)

    const onSelect = (index: number) => {
        setActive(index)
    }

    const classes = () => {
        let name = 'time-line'
        if(className) {
            name += ' ' +  className
        }
        return name
    }

    const renderList = () => {
        // console.log('list', list)
        if(!list) return 
        return list.map((item, index) => {
            const iconClass = () => {
                let name = 'time-line__icon--circle'
                if(index === active) {
                    name += ' selected' 
                }
                return name
            }
            return (
                <li key={index} className="time-line__item">
                    <i 
                        className={iconClass()}
                        onClick={() => {
                            if(active !== index) {
                                // console.log('点击事件', index)
                                onSelect(index)
                            }
                        }}
                    >
                    </i>
                    <div className={'time-line__container'}>
                        <h3 className={'time-line__title'} onClick={() => {if(active !== index) {onSelect(index)}}}>
                            {item.title || '---'}
                        </h3>
                        {active === index? (
                            <p className={'time-line__content'}>
                                {item.content || '----'}
                            </p>
                        ) : ''}
                    </div>
                </li>
            ) 
        
        })
    }

    return (
        <ul className={classes()} style={style}>
            {renderList()}
        </ul>
    )
}
TimeLine.defaultProps = {
    currentIndex: 0,
    list: []
}

export default TimeLine