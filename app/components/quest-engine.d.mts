export type Point = {x:number;y:number};
export const spawn: Point;
export const doors: Point[];
export const paths: {x:number;y:number;width:number;height:number}[];
export function walkable(p:Point):boolean;
export function advance(p:Point,dx:number,dy:number,seconds:number,width:number,height:number):Point;
export function nearby(p:Point):number|null;
