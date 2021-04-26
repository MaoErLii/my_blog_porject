// 颜色数组
const colors: Array<string> = ["rgb(94,213,209)","rgb(255,110,151)","rgb(199,255,236)","rgb(0,255,128)","rgb(208,233,255)"]  // 气泡颜色数组

// 气泡类实现
/**
 * 参考代码：http://jsrun.net/NuqKp/edit
 */
export class Bubble {
    public color: string // 气泡颜色
    public x: number // x轴
    public y: number // y轴
    public vx: number  // x轴移动方向
    public vy: number   // y轴移动方向
    public radius: number   // 气泡半径
    public ctx: CanvasRenderingContext2D // canvas context 2d对象
    constructor(x: number,y: number, ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.vx = Math.random() * -4 + 2
        this.vy = Math.random() * -4 + 2
        // 初始化
        this.init()
    }

    // 初始化
    public init() {
        // console.log('初始化气泡')

        // 气泡颜色
        this.color = colors[Math.floor(Math.random() * Math.floor(5))]  // colors[int:0~5]

        // 气泡半径
        this.radius = 3 + Math.random() * Math.floor(5) // flot: 3 ~ 8
        // console.log('初始化', this.radius)
    }

    // 绘制气泡
    public draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color
        this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI)
        this.ctx.fill()
    }

    // 气泡移动
    public move() {
        // x轴位置移动
        this.x += this.vx
        // y轴位置移动
        this.y += this.vy
    }

    // 冲突处理 边界控制
    public collisionDect() {
        if(this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) {
            this.vx = -this.vx
        }
        if(this.y - this.radius < 0 || this.y + this.radius > window.innerHeight) {
            this.vy = -this.vy
        }
    }
}