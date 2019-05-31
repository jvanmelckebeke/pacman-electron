export class XY {
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    private _x: number;

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    private _y: number;

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    is(o: XY) {
        return (this.x == o.x && this.y == o.y);
    }

    toString() {
        return `XY(${this.x}, ${this.y})`;
    }

    add(dxdy: XY) {
        this.x += dxdy.x;
        this.y += dxdy.y;
        return this;
    }

    addNumbers(x, y) {
        return this.add(new XY(x, y));
    }


    multiply(m1: number, m2?: number) {
        this.x *= m1;
        this.y *= m2 | m1;
        return this;
    }

    tAdd(dirPred: XY) {
        return new XY(dirPred.x + this.x, dirPred.y + this.y);
    }

    isXY(t: XYT) {
        return (this.x === t.x && this.y === t.y)
    }
}

export class XYT extends XY {
    constructor(x: number, y: number, t: number) {
        super(x, y);
        this.value = t;
    }

    private _value: number;

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    add(dxdy: XYT) {
        this.x += dxdy.x;
        this.y += dxdy.y;
        return this;
    }

    addNumbers(x, y) {
        return this.add(new XYT(x, y, 0));
    }

    is(o: XYT): boolean {
        return (o.y === this.y && o.x === this.x && o.value === this.value);
    }

    toString(): string {
        return `XYT(${this.x}, ${this.y}, ${this.value})`;
    }

}

export function getDirectionArray() {
    return [new XY(0, -1), new XY(0, 1), new XY(-1, 0), new XY(1, 0)];
}