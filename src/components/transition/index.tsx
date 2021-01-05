import * as React from 'react'

const Transition = (props) => {
    const { children } = props

    const classes = () => {
        let name = 'transition__container'
        return name
    }

    return (
        <div className={classes()}>
            {children}
        </div>
    )
}

export default Transition