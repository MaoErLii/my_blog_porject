import * as React from 'react'

import './index.scss'

interface HeaderProps {
    className?: string,
    style?: React.CSSProperties
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
            <div className={'main-content'} onClick={() => {
                if(onMain) {
                    onMain()
                }
            }}>
                主title
            </div>
            {children}
            <div className={'last-content'}>
            </div>
        </div>
    )
}

export default Header