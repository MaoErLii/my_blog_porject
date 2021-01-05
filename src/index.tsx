import * as React from 'react'
import * as ReactDom from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'

import App from '@/view/App'
import '@/styles/index.scss'

ReactDom.render(
    <Router>
        <App></App>
    </Router>,
    document.getElementById('root')
)