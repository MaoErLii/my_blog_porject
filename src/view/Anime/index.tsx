import * as React from 'react'

import './index.scss'

const Example = () => {
    return (
        <div className="coin">
        </div>
    )
}

// 防抖示例
const Debounce = () => {
    function debounce(fn: Function, wait: number) {
        let timeout = null;
        return function() {
            if(timeout) {
                clearTimeout(timeout)
            }
            timeout = setTimeout(fn, wait)
        }
    }

    function checkOut() {
        console.log('check it out')
    }


    return(
        <div 
            className="debounce__example"
            onClick={debounce(checkOut, 1000)}
        >
            防抖
        </div>
    )
}

// 节流示例
const Throttle = () => {
    // 利用时间戳
    const dateThrottle = function (fn: Function, delay: number) {
        let prev = Date.now();
        return function(){
            let now = Date.now();
            let context = this;
            let args = arguments
            // console.log(now - prev)
            if(now - prev >= delay) {
                fn.apply(context, args);
                // fn;
                prev = Date.now();
            }
        }

    }

    // 利用定时器
    const timerThrottle = function (fn: Function, delay: number) {
        let timer = null
        return function() {
            if(!timer) {
                timer = setTimeout(function() {
                    let context = this;
                    let args = arguments;
                    timer = null;
                    // fn;
                    fn.apply(context, args);
                }, delay);
            }
        }
    }

    const checkOut = () => {
        console.log('check it outttt!')
    }

    return (
        <div className="throttle__example"> 
            <div onClick={dateThrottle(checkOut, 2000)}>
                时间戳实现节流
            </div>
            <div onClick={timerThrottle(checkOut, 2000)}>
                定时器实现节流
            </div>
        </div>
    )
}

const Anime = (props?: any) => {

    return (
        <div className={'anime'}>
            阿尼妹
            <Example></Example>
            <Debounce></Debounce>
            <Throttle></Throttle>
        </div>
    )
}

export default Anime