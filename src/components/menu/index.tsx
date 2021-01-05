import * as React from 'react'
import './index.scss'

/**
 * 背景绘制
 */

type MenuMode = 'horizontal' | 'vertical'

interface MenuProps {
    defaultIndex?: string,
    className?: string,
    mode?: MenuMode,
    style?: React.CSSProperties,
    /** 点击事件 */
    onSelect?: (selectedIndex: string) => void,
    /** 纵向默认打开子菜单 */
    defaultOpenSubMenus?: string[]
}

// menu item 内容
interface MenuItemContext {
    index?: string,
    onSelect?: (selectedIndex: string) => void,
    mode?: MenuMode,
    defaultOpenSubMenus?: string[]
}

export const MenuContext = React.createContext<MenuItemContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
    const [ currentActive, setActive ] = React.useState(defaultIndex)

    const classes = () => {
        const name = 'menu__container'

        const desc = mode

        if(className) {
            return name + ' ' + desc + ' ' + className
        }
        return name + ' ' + desc
    }

    // 只渲染menuItem相关组件
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<any>
            const {name} = childElement.type
            // if(name) {
            //     console.log('组件名', name)
            // }
            // console.log('组件', childElement)
            // if(name === 'MenuItem' || name === 'SubMenuItem') {
            // } else {
            //     // throw new Error('')
            //     console.error('Warning: Menu has a child which is not a MenuItem component')
            // }
            return React.cloneElement(childElement, {
                index: index.toString()
            })
        })
    }

    const handleClick = (index: string) => {
        // console.log('index', defaultIndex, index)
        // console.log('跳转前下标', defaultIndex)
        setActive(index)
        if(onSelect) {
            onSelect(index)
        }
    }

    const canvasRef = React.useRef(null)

    // 初始化
    React.useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let width = canvas.clientWidth
        let height = canvas.clientHeight
        // // 初始化宽高
        if(canvas.width !== width) {
            canvas.width = width
            canvas.height = height
        }
        // 初始化选中内容
        if(parseInt(defaultIndex) >= 0) {
            return setActive(defaultIndex)
        }
    })

    // menu 内容
    const passedContext: MenuItemContext = {
        index: currentActive? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    return (
        <ul className={classes()} style={style} >
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
            <li className="move"></li>
            <canvas className={"menu__back"} ref={canvasRef}></canvas>
        </ul>
    )
}
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu