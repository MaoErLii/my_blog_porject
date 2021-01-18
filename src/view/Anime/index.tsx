import * as React from 'react'

import './index.scss'

const Example = () => {
    return (
        <div className="coin">
        </div>
    )
}

const Anime = (props?: any) => {

    return (
        <div className={'anime'}>
            阿尼妹
            <Example></Example>
        </div>
    )
}

export default Anime