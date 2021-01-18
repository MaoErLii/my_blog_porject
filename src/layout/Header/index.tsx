import * as React from 'react'

import './index.scss'

interface HeaderProps {
    className?: string,
    style?: React.CSSProperties
    /**
     * 用户点击标题事件
     */
    onMain?: () => void
}

const Header: React.FC<HeaderProps> = (props: any) => {
    const {children, className, onMain} = props
    
    const classes = () => {
        let name = 'header-wrapper'
        if(className) {
            name += ' ' + className
        }
        return name
    }

    return (
        <div className={classes()}>
            <div className={'header__container'}>
                <div className={'header__main-content'} onClick={() => {
                    if(onMain) {
                        onMain()
                    }
                }}>
                    主title
                </div>
                {children}
                <div className={'header__last-content'}>
                </div>
            </div>
        </div>
    )
}

export default Header