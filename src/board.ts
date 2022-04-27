import { Ball } from './ball';
import { Paddle, Position as PaddlePosition } from './paddle';
import { Scoreboard } from './scoreboard';

export class Board {
    public static readonly app: HTMLDivElement =
        document.querySelector<HTMLDivElement>('#app') as HTMLDivElement;

    private static _instance: Board;
    public static get instance() {
        if (!Board._instance)
            Board._instance = new Board();
        return Board._instance;
    }

    public static get maxY() {
        return +(window.innerHeight / 2);
    }
    public static get minY() {
        return -(window.innerHeight / 2);
    }
    public static get maxX() {
        return +(window.innerWidth / 2);
    }
    public static get minX() {
        return -(window.innerWidth / 2);
    }

    public readonly leftPaddle: Paddle;
    public readonly rightPaddle: Paddle;
    private _ball?: Ball | undefined;
    public get ball(): Ball | undefined {
        return this._ball;
    }
    private set ball(value: Ball | undefined) {
        this._ball = value;
    }
    private scoreboard: Scoreboard;

    private constructor() {
        this.scoreboard = new Scoreboard();
        this.leftPaddle = new Paddle(PaddlePosition.LEFT);
        this.rightPaddle = new Paddle(PaddlePosition.RIGHT);
        this.scoreboard.enable();
        this.leftPaddle.enable();
        this.rightPaddle.enable();
    }

    public spawnBall() {
        if (this.ball)
            throw new Error('A ball already exists on the board!');
        this.ball = new Ball();
        this.ball.enable();
    }

    public score(player: PaddlePosition) {
        if (!this.ball)
            throw new Error('No ball exists on the board yet!');
        this.scoreboard.incrementScore(player);
        this.ball.disable();
        this.ball = undefined;
        setTimeout(this.spawnBall.bind(this), 2000);
    }

}