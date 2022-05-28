import type { IPosition } from "./position";

/**
 * Defines a rectangle with an arbitrary position, width and height.
 */
export interface IRect<T extends IPosition> {
  pos: T;
  width: number;
  height: number;
}

/**
 * Check if two rects are intersecting.
 * @param src Source rect
 * @param dst Destination rect
 */
export function isIntersecting<
  T extends IPosition,
  U extends IPosition
>(src: IRect<T>, dst: IRect<U>) {
  // define top, bottom, left and right boundaries
  const [srcT, srcB] = [src.pos.y, src.pos.y + src.height];
  const [srcL, srcR] = [src.pos.x, src.pos.x + src.width];

  const [dstT, dstB] = [dst.pos.y, dst.pos.y + dst.height];
  const [dstL, dstR] = [dst.pos.x, dst.pos.x + dst.width];

  // https://stackoverflow.com/questions/2752349/fast-rectangle-to-rectangle-intersection
  return !(dstL > srcR || dstR < srcL || dstT > srcB || dstB < srcT);
}

/**
 * Check if an arbitrary position is inside a rect.
 * @param pos Position to check
 * @param rect Rectangle to check whether the position is inside
 * @returns True if position is inside the rect; else false
 */
export function isInside<
  T extends IPosition,
  U extends IPosition
>(pos: T, rect: IRect<U>) {
  if (pos.x < rect.pos.x || pos.x > rect.pos.x + rect.width)  // is pos outside horizontally?
    return false;
  if (pos.y < rect.pos.y || pos.y > rect.pos.y + rect.height) // is pos outside vertically?
    return false;
  return true;
}
