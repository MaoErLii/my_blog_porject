// 颜色数组
const colors: Array<string> = ["rgb(94,213,209)","rgb(255,110,151)","rgb(199,255,236)","rgb(0,255,128)","rgb(208,233,255)"]  // 气泡颜色数组

export class WaterCircle {
    public x: number // 生成位置x轴
    public y: number // 生成位置y轴
    public radious: number // 水波纹半径
    public ctx: any // canvas context 对象
    public color: string // 水波纹颜色
    public speed: number // 速度
    public lineWidth: number // 波纹线宽度
    public count: number
    constructor(x: number, y: number, ctx: any) {
        this.x = x
        this.y = y
        this.ctx = ctx
        this.count = 0
    }

    // 初始化
    public init() {
        this.radious = 5 + Math.floor(Math.random() * Math.floor(5))
        this.color = colors[Math.floor(Math.random() * 4)]
        this.speed = Math.random() + 1
        this.lineWidth = 5 + Math.random() * Math.floor(10)
    }

    // 绘制水波纹
    public draw() {
        this.ctx.beginPath()
        this.ctx.lineWidth = this.lineWidth
        this.ctx.strokeStyle = this.color
        this.ctx.arc(this.x, this.y, this.radious, 0, Math.PI * 2)
        this.ctx.stroke()
    }

    // 水波纹扩散
    public explod() {
        this.radious += this.speed
        this.lineWidth -= 0.5
        this.count ++
    }

    // 循环
    public loop() {
        if(this.radious > 50) {
            this.init()
        }
    }
}