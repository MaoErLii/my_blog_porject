import * as React from 'react'
import './index.scss'

interface FooterProps {
    className?: string,
    children?: any
}

const Footer:React.FC<FooterProps> = (props: FooterProps) => {
    const {className, children} = props

    /**
     * 类名
     */
    const classes = () => {
        let name = 'footer-wrapper'
        if(className) {
            name += ' ' + className
        }
        return name
    }

    return(
        <div className={classes()}>
            <div  className="footer__container">
                {children}
            </div>
        </div>
    )
}

export default Footer