import { IAngledPosition, IPosition, Position } from "./position";

/**
 * Convert a horizontal board value to
 * the client's viewport.
 * @param x Horizontal value to convert
 * @returns Result viewport value
 */
export function toViewportX(x: number) {
  x = Position.clampX(x);  // [0, MAX_WIDTH]
  x /= Position.MAX_WIDTH;     // [0, 1]
  x *= window.innerWidth;  // [0, innerWidth]
  return x;
}

/**
 * Convert a vertical board value to
 * the client's viewport.
 * @param y Vertical value to convert
 * @returns Result viewport value
 */
export function toViewportY(y: number) {
  y = Position.clampY(y);  // [0, MAX_HEIGHT]
  y /= Position.MAX_HEIGHT;    // [0, 1]
  y *= window.innerHeight; // [0, innerHeight]
  return y;
}

/**
 * Converts the board `{x, y}` positions into
 * the client's viewport `{x, y}` positions.
 * @param pos IPosition
 * @returns Viewport position
 */
export function toViewport(pos: IPosition): IPosition;
export function toViewport(pos: IAngledPosition): IAngledPosition;
export function toViewport(pos: IPosition | IAngledPosition): IPosition | IAngledPosition {
  let { x, y } = pos;
  x = toViewportX(x);
  y = toViewportY(y);
  return { ...pos, x, y };
}