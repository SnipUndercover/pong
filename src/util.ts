export enum CSSUnit {
    PIXELS = 'px',
    VIEWPORT_HEIGHT = 'vh',
    VIEWPORT_WIDTH = 'vw'
}

export const convertUnits = (amount: number, sourceUnit: CSSUnit, destinationUnit: CSSUnit) => {
    let px: number;
    switch (sourceUnit) {
        case CSSUnit.PIXELS:
            px = amount;
            break;
        case CSSUnit.VIEWPORT_HEIGHT:
            px = amount / 100 * window.innerHeight;
            break;
        case CSSUnit.VIEWPORT_WIDTH:
            px = amount / 100 * window.innerWidth;
            break;
        default: throw new Error(`Unknown CSSUnit ${sourceUnit}`);
    }
    switch (destinationUnit) {
        case CSSUnit.PIXELS:
            return px;
        case CSSUnit.VIEWPORT_HEIGHT:
            return px / window.innerHeight * 100;
        case CSSUnit.VIEWPORT_WIDTH:
            return px / window.innerWidth * 100;
        default: throw new Error(`Unknown CSSUnit ${destinationUnit}`);
    }
};

export type KeypressHandler = (e: KeyboardEvent) => void;