import { writable } from "svelte/store";
import type { AngledPosition, Position } from "./position";

export const ballPosition = writable<AngledPosition>(null);
export const leftPaddlePosition = writable<Position>(null);
export const rightPaddlePosition = writable<Position>(null);