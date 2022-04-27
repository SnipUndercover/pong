import { Board } from './board';
import { Position as PaddlePosition } from './paddle';
import './style/scoreboard.css';

export class Display {
    private readonly element: HTMLParagraphElement;
    private _score: number;
    public get score(): number {
        return this._score;
    }
    public set score(value: number) {
        this._score = value;
        this.element.textContent = value.toString();
    }

    public constructor(parent: Scoreboard) {
        this.element = document.createElement('p');
        this.element.classList.add('display');
        this.element.textContent = '0';
        this._score = 0;
        parent.element.appendChild(this.element);
    }
}

export class Scoreboard {
    private enabled: boolean;
    public readonly element: HTMLDivElement;
    public readonly display: {
        left: Display,
        right: Display
    };

    public constructor() {
        this.element = document.createElement('div');
        this.element.id = 'scoreboard';
        this.display = {
            left: new Display(this),
            right: new Display(this)
        };
        this.enabled = false;
    }

    public incrementScore(player: PaddlePosition) {
        if (player == PaddlePosition.LEFT)
            this.display.left.score++;
        else if (player == PaddlePosition.RIGHT)
            this.display.right.score++;
        else throw new Error(`Unknown PaddlePosition ${player}`);
    }

    public enable() {
        if (this.enabled)
            throw new Error('Scoreboard already enabled!');
        Board.app.appendChild(this.element);
    }

    public disable() {
        if (!this.enabled)
            throw new Error('Scoreboard already disabled!');
        Board.app.removeChild(this.element);
    }

}