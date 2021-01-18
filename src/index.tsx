import * as React from 'react'
import * as ReactDom from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'

import App from '@/view/App'
import '@/styles/index.scss'

window.onload = () => {
    console.log('首屏时间', (new Date() as any) - performance.timing.navigationStart)
}

ReactDom.render(
    <Router>
        <App></App>
    </Router>,
    document.getElementById('root')
)