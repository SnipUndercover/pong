import { convertUnits, CSSUnit } from './util';
import { Board } from './board';
import { Vector } from './vector';

import './style/paddle.css';

export enum Position {
    LEFT = -1,
    RIGHT = 1
}

export type Handler = {
    up: boolean;
    down: boolean;
    keydown: (e: KeyboardEvent) => void;
    keyup: (e: KeyboardEvent) => void;
    loop: () => void;
}

export class Paddle {
    public static readonly CSS_CLASS_NAME = 'paddle';
    public static readonly HEIGHT = 10; //vh
    public static readonly WIDTH = 10; //px
    public static readonly PADDING = 5; //vw
    public static readonly MOVEMENT_DELTA = 2; //px

    // can't reuse (window.innerHeight - vhToPx(Paddle.HEIGHT)) / 2
    // need to recalculate in case of different viewport size
    public static get maxY() {
        return +(window.innerHeight - convertUnits(Paddle.HEIGHT, CSSUnit.VIEWPORT_HEIGHT, CSSUnit.PIXELS)) / 2;
    }
    public static get minY() {
        return -(window.innerHeight - convertUnits(Paddle.HEIGHT, CSSUnit.VIEWPORT_HEIGHT, CSSUnit.PIXELS)) / 2;
    }

    private _y: number;
    public get y(): number {
        return this._y;
    }
    private set y(value: number) {
        this._y = value;
    }
    public readonly x: number;
    public readonly element: HTMLDivElement;
    public readonly position: Position;
    private readonly handler: Handler;
    private loopID?: number;

    public constructor(pos: Position) {
        this.position = pos;
        this._y = 0;
        this.element = document.createElement('div');
        this.element.classList.add(Paddle.CSS_CLASS_NAME);

        let keyUp: 'ArrowUp' | 'KeyW';
        let keyDown: 'ArrowDown' | 'KeyS';
        switch (pos) {
            case Position.LEFT:
                this.x = Board.minX
                    + convertUnits(Paddle.PADDING, CSSUnit.VIEWPORT_WIDTH, CSSUnit.PIXELS)
                    + (Paddle.WIDTH / 2);
                this.element.id = 'paddle-left';
                [keyUp, keyDown] = ['KeyW', 'KeyS'];
                break;
            case Position.RIGHT:
                this.x = Board.maxX
                    - convertUnits(Paddle.PADDING, CSSUnit.VIEWPORT_WIDTH, CSSUnit.PIXELS)
                    - (Paddle.WIDTH / 2);
                this.element.id = 'paddle-right';
                [keyUp, keyDown] = ['ArrowUp', 'ArrowDown'];
                break;
            default:
                throw new Error(`Unknown PaddlePosition ${pos}`);
        }

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const paddle = this; //need a 'this' object for handler

        this.handler = {
            up: false,
            down: false,
            keydown: function (e: KeyboardEvent) {
                if (e.code === keyUp) {
                    this.up = true;
                    e.preventDefault();
                    return;
                }
                if (e.code === keyDown) {
                    this.down = true;
                    e.preventDefault();
                    return;
                }
            },
            keyup: function (e: KeyboardEvent) {
                if (e.code === keyUp) {
                    this.up = false;
                    e.preventDefault();
                    return;
                }
                if (e.code === keyDown) {
                    this.down = false;
                    e.preventDefault();
                    return;
                }
            },
            loop: function () {
                paddle.element.style.top = `${paddle.cssPosition}px`;

                // return if max/min y reached
                if (paddle.y === Paddle.maxY && this.up)
                    return;
                if (paddle.y === Paddle.minY && this.down)
                    return;

                // return if both or neither up/down are held
                if ((this.up && this.down) || (!this.up && !this.down))
                    return;

                if (this.up)
                    paddle.y += Paddle.MOVEMENT_DELTA;

                if (this.down) 
                    paddle.y -= Paddle.MOVEMENT_DELTA;

                //keep in bounds if needed
                if (paddle.y < Paddle.minY)
                    paddle.y = Paddle.minY;
                else if (paddle.y > Paddle.maxY)
                    paddle.y = Paddle.maxY;
            }
        };
        this.handler.keydown = this.handler.keydown.bind(this.handler);
        this.handler.keyup = this.handler.keyup.bind(this.handler);
        this.handler.loop = this.handler.loop.bind(this.handler);
    }
    public enable() {
        if (this.loopID)
            throw new Error('Paddle is already enabled!');
        Board.app.appendChild(this.element);
        document.addEventListener('keydown', this.handler.keydown);
        document.addEventListener('keyup', this.handler.keyup);
        this.loopID = setInterval(this.handler.loop, 1);
    }
    public disable() {
        if (!this.loopID)
            throw new Error('Paddle is already disabled!');
        Board.app.removeChild(this.element);
        document.removeEventListener('keydown', this.handler.keydown);
        document.removeEventListener('keyup', this.handler.keyup);
        clearInterval(this.loopID);
        this.loopID = -1;
    }
    public get cssPosition() {
        return (window.innerHeight - convertUnits(Paddle.HEIGHT, CSSUnit.VIEWPORT_HEIGHT, CSSUnit.PIXELS)) / 2 - this.y;
    }
    public isPositionInside(vec: Vector) {
        const heightHalved = convertUnits(Paddle.HEIGHT, CSSUnit.VIEWPORT_HEIGHT, CSSUnit.PIXELS) / 2;
        const widthHalved = Paddle.WIDTH / 2;
        const insideX = 
            vec.x > this.x - widthHalved && vec.x < this.x + widthHalved;
        const insideY =
            vec.y > this.y - heightHalved && vec.y < this.y + heightHalved;
        return insideX && insideY;
    }
}