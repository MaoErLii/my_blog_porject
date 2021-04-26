export default class Snow {
    public color: string
    /**
     * 初始位置x轴
     */
    public x: number
    /**
     * 初始位置y轴
     */
    public y: number
    /**
     * 雪花半径
     */
    public radius: number
    /**
     * canvas上下文
     */
    public ctx: CanvasRenderingContext2D
    /**
     * canvas
     */
    public canvas: HTMLCanvasElement
    /**
     * x轴移动速度
     */
    public vx: number
    /**
     * y轴移动速度
     */
    public vy: number

    constructor(x: number, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.x = x;
        this.y = 0;
        this.ctx = ctx;
        this.canvas = canvas
        this.init()
    }

    /**
     * 初始化
     */
    init() {
        this.color = 'rgb(255, 255, 255)';
        this.radius =  4 + Math.random() * Math.floor(6);
        this.vy = 1;
        this.vx = 1;
    }

    /**
     * 绘制
     */
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.x, this.y, this.radius,  0, 2 * Math.PI);
        this.ctx.fill();
    }

    /**
     * 移动
     */
    move() {
        this.x = this.x + this.vx
        this.y = this.y + this.vy
    }

    /**
     * 冲突检测，边界处理
     */
     collisionDect() {
        // 雪花触碰边界消失
        if(this.x + this.radius > this.canvas.width) {
            console.log('撞到边界了')
        }
        if(this.y + this.radius > this.canvas.height) {
            console.log('撞到边界了')
        }
    }
}