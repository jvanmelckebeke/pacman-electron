export declare function clone(obj: any): any;
export declare const config: {
    moveSprites: {
        pacman: {
            right: any[];
            up: any[];
            down: any[];
            left: any[];
        };
        enemy: {
            right: any;
            up: any;
            down: any;
            left: any;
        };
    };
    map: number[][];
    grid: {
        x: number;
        y: number;
    };
    speed: number;
    entities: {
        enemy: {
            width: number;
            height: number;
        };
        player: {
            width: number;
            height: number;
        };
        point: {
            width: number;
            height: number;
        };
    };
    sprites: {
        point: any;
    };
};
export declare function isValidMapPlace(x: number, y: number): boolean;
