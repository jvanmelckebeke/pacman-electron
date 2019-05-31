export declare class XY {
    constructor(x: number, y: number);
    private _x;
    x: number;
    private _y;
    y: number;
    is(o: XY): boolean;
    toString(): string;
    add(dxdy: XY): this;
    addNumbers(x: any, y: any): this;
    multiply(m1: number, m2?: number): this;
    tAdd(dirPred: XY): XY;
    isXY(t: XYT): boolean;
}
export declare class XYT extends XY {
    constructor(x: number, y: number, t: number);
    private _value;
    value: number;
    add(dxdy: XYT): this;
    addNumbers(x: any, y: any): this;
    is(o: XYT): boolean;
    toString(): string;
}
export declare function getDirectionArray(): XY[];
