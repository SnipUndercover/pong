import { Vector } from './vector';
import { Board } from './board';
import { Paddle, Position as PaddlePosition } from './paddle';
import { getAngleBetween, PI2, restrictAngle } from './angle';

import './style/ball.css';

export class Ball {
    public static readonly MOVEMENT_DELTA = 2;
    public static readonly SIZE = 5;

    public readonly pos: Vector;

    public static get maxY() {
        return +(window.innerHeight - Ball.SIZE) / 2;
    }
    public static get minY() {
        return -(window.innerHeight - Ball.SIZE) / 2;
    }
    public static get maxX() {
        return +(window.innerWidth - Ball.SIZE) / 2;
    }
    public static get minX() {
        return -(window.innerWidth - Ball.SIZE) / 2;
    }

    private _angle: number;
    public get angle(): number {
        return this._angle;
    }
    public set angle(value: number) {
        this._angle = restrictAngle(value);
    }
    
    public readonly element: HTMLDivElement;
    private handler: () => void;
    private initializer?: (e: KeyboardEvent) => void;
    private loopID?: number;

    public constructor() {
        this.pos = new Vector();
        this._angle = restrictAngle(Math.random() * PI2);
        this.element = document.createElement('div');
        this.element.id = 'ball';
        this.handler = () => {
            [this.element.style.left, this.element.style.bottom] = this.cssPosition.map(el => `${el}px`);

            const paddleWidth_2 = Paddle.WIDTH / 2;

            const [leftPaddle, rightPaddle] = [Board.instance.leftPaddle, Board.instance.rightPaddle];
            // bounce off left paddle
            if (leftPaddle.isPositionInside(this.pos)) {
                this.angle = getAngleBetween(this.pos, new Vector(leftPaddle.x, leftPaddle.y));
                this.pos.x = leftPaddle.x + paddleWidth_2;
            }
            // bounce off right paddle
            if (rightPaddle.isPositionInside(this.pos)) {
                this.angle = getAngleBetween(this.pos, new Vector(rightPaddle.x, rightPaddle.y));
                this.pos.x = rightPaddle.x - paddleWidth_2;
            }
            // wall bounce:
            this.pos.y += Math.sin(this.angle) * Ball.MOVEMENT_DELTA;
            if (this.pos.y > Ball.maxY) {
                this.pos.y = Ball.maxY;
                this.angle = -this.angle;
            }
            else if (this.pos.y < Ball.minY) {
                this.pos.y = Ball.minY;
                this.angle = -this.angle;
            }

            this.pos.x += Math.cos(this.angle)  * Ball.MOVEMENT_DELTA;
            if (this.pos.x > Ball.maxX) 
                Board.instance.score(PaddlePosition.LEFT);
            else if (this.pos.x < Ball.minX)
                Board.instance.score(PaddlePosition.RIGHT);
        };
    }

    public enable() {
        if (this.loopID || this.initializer)
            throw new Error('Ball is already enabled!');
        Board.app.appendChild(this.element);
        this.initializer = (e: KeyboardEvent) => { // hook to space keypress
            if (e.code === 'Space') {
                this.loopID = setInterval(this.handler, 1); // run handler
                document.removeEventListener('keydown', this.initializer as (e: KeyboardEvent) => void); // remove hook
                this.initializer = undefined;
            }
        };
        document.addEventListener('keydown', this.initializer); // register hook
    }
    public disable() {
        if (!this.loopID && !this.initializer)
            throw new Error('Ball is already disabled!');
        Board.app.removeChild(this.element);
        if (this.initializer) { // unregister hook in case we didn't press space yet
            document.removeEventListener('keydown', this.initializer);
            this.initializer = undefined;
        }
        if (this.loopID) { // remove handler in case we pressed space
            clearInterval(this.loopID);
            this.loopID = undefined;
        }
    }
    public get cssPosition(): [number, number] {
        return [(window.innerWidth - Ball.SIZE) / 2 + this.pos.x, (window.innerHeight - Ball.SIZE) / 2 + this.pos.y];
    }
}