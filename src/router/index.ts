import Home from '../view/Home/index'
import Anime from '../view/Anime/index'

const routes = [
    {
        path: '/',
        name: 'Blog',
        component: Home
    },
    {
        path: '/anime',
        name: 'Anime',
        component: Anime
    },
    // {
    //     path: '/games',
    //     name: 'gay姆嘶',
    //     component: Games
    // },
    // {
    //     path: '/gbf',
    //     name: '古兰布鲁范特西',
    //     component: Gbf
    // }
]

export default routes