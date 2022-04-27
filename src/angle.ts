import { Vector } from './vector';

//Convenience constants
/**
 * π = 180°
 */
export const PI = Math.PI;
/**
 * π/2 = 90°
 */
export const PI_2 = PI / 2;
/** 
 * π/4 = 45°
 */
export const PI_4 = PI_2 / 2;
/** 
 * 3π/4 = 135°
 */
export const PI3_4 = PI - PI_4;
/**
 * 2π = 360°
 */
export const PI2 = PI * 2;
/**
 * 3π/2 = 270°
 */
export const PI3_2 = PI + PI_2;
/**
 * 5π/4 = 225°
 */
export const PI5_4 = PI + PI_4;
/**
 * 7pi/4 = 315°
 */
export const PI7_4 = PI2 - PI_4;


export const getAngleBetween = (p1: Vector, p2: Vector) => {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    if (dx === 0 && dy === 0)
        return NaN;
    let rad = Math.atan2(dy, dx);
    while (rad < PI2) rad += PI2; 
    while (rad > PI2) rad -= PI2; 
    return rad;
};

export const restrictAngle = (theta: number) => {

    //force angle to be within [0...2π]
    while (theta < 0) theta += PI2; 
    while (theta > PI2) theta -= PI2; 

    //return early if in bounds already
    if ((theta >= 0 && theta <= PI_4)         // [  0°... 45°]
        || (theta >= PI3_4 && theta <= PI5_4) // [135°...225°]
        || (theta >= PI7_4 && theta <= PI2))  // [315°...360°]
        return theta;

    // [ 45°... 90°] -> [  0°... 45°]
    if (theta > PI_4 && theta <= PI_2)
        theta -= PI_4; 

    // [ 90°...135°] -> [135°...180°]
    else if (theta > PI_2 && theta <= PI3_4)
        theta += PI_4;

    // [225°...270°] -> [135°...180°]
    else if (theta > PI5_4 && theta <= PI3_2)
        theta -= PI_4;

    // [270°...315°] -> [315°...360°]
    else
        theta += PI_4;
    return theta;
};