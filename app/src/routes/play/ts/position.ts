/**
 * Represents a point.
 */
export interface IPosition {
  x: number;
  y: number;
}

/**
 * Represents a point with an angle.
 */
export interface IAngledPosition
  extends IPosition {
  angle: number;
}

/**
 * Represents a point on the board.  
 * Can range between `{0, 0}` (top left corner)
 * and `{1920, 1080}` (bottom right corner).
 */
export class Position implements IPosition {
  public static readonly MAX_WIDTH = 1920;
  public static readonly MAX_HEIGHT = 1080;

  private _x: number;
  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = Position.clampX(value);
  }

  private _y: number;
  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = Position.clampY(value);
  }

  /**
   * Create a new position from an IPosition.
   * @param pos IPosition to copy
   */
  public constructor(pos: IPosition) {
    [this.x, this.y] = [pos.x, pos.y];
  }

  //limit the pos in case it's out of bounds

  /**
   * Clamp the x position to be between `[0..MAX_WIDTH]`
   * @param x Position to clamp
   * @returns Clamped position 
   */
  public static clampX(x: number) {
    if (x < 0)
      return 0;
    if (x > Position.MAX_WIDTH)
      return Position.MAX_WIDTH;
    return x; // already in bounds
  }

  /**
   * Clamp the y position to be between `[0..MAX_HEIGHT]`
   * @param y Position to clamp
   * @returns Clamped position 
   */
  public static clampY(y: number) {
    if (y > Position.MAX_HEIGHT)
      return Position.MAX_HEIGHT;
    if (y < 0)
      return 0;
    return y; // already in bounds
  }

  /**
   * Clamp the position.
   * @param pos The position to clamp
   * @returns Clamped position
   */
  public static clamp(pos: IPosition): IPosition {
    let { x, y } = pos;
    x = Position.clampX(x);
    y = Position.clampY(y);
    return { ...pos, x, y };
  }
}

/**
 * Represents a point on the board with an angle.  
 * The angle has a range of [0, 360).
 */
export class AngledPosition
  extends Position
  implements IAngledPosition {
  public static readonly MAX_ANGLE = 360; //deg

  private _angle: number;
  public get angle(): number {
    return this._angle;
  }
  public set angle(value: number) {
    this._angle = AngledPosition.snapAngle(value);
  }

  public constructor(apos: IAngledPosition) {
    super(apos);
    this.angle = apos.angle;
  }

  /**
   * Clamp the angle to `[0...360)`
   * @param angle Angle to clamp
   * @returns Clamped angle
   */
  public static clampAngle(angle: number) {
    while (angle >= AngledPosition.MAX_ANGLE)
      angle -= AngledPosition.MAX_ANGLE;
    while (angle < 0)
      angle += AngledPosition.MAX_ANGLE;
    return angle;
  }

  /**
   * Snap the angle to the nearest right-angle rotation of 45°,
   * when the angle is too sharp.  
   * ```
   * ( 45,  90] => 45
   * ( 90, 135] => 135
   * (225, 270] => 225
   * (270, 315] => 315
   * ```
   * Any angle outside the aforementioned ranges remains unchanged.
   * @param angle Angle to snap
   * @returns Snapped angle
   */
  public static snapAngle(angle: number) {
    angle = AngledPosition.clampAngle(angle);
    if (angle > 45 && angle <= 90) return 45;
    if (angle > 90 && angle <= 135) return 135;
    if (angle > 225 && angle <= 270) return 225;
    if (angle > 270 && angle <= 315) return 315;
    return angle;
  }

  /**
   * Clamp the position.
   * @param pos The position to clamp
   * @returns Clamped positions
   */
  public static clamp(pos: IAngledPosition): IAngledPosition {
    let { x, y, angle } = pos;
    x = AngledPosition.clampX(x);
    y = AngledPosition.clampY(y);
    angle = AngledPosition.clampAngle(angle);
    return { ...pos, x, y, angle };
  }

  /**
   * Calculate the angle between two points, parallel to the X axis.
   * @param src Source position (angle vertex)
   * @param dst Destination position (angle ray)
   * @returns The measured angle in degrees
   */
  public static getAngleBetween(src: IPosition, dst: IPosition) {
    const [dy, dx] = [src.y - dst.y, src.x - dst.x];
    const angle = AngledPosition.clampAngle(
      Math.atan2(dy, dx) / Math.PI * 180
    );
    return angle;
  }

  /**
   * Convert degrees into radians.
   * @param deg Degrees to convert
   * @returns Radians
   */
  public static toRadians = (deg: number) =>
    deg / 180 * Math.PI;

  /**
   * Convert radians into degrees.
   * @param rad Radians to convert
   * @returns Degrees
   */
  public static toDegrees = (rad: number) =>
    rad / Math.PI * 180;
}
