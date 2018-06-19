export declare class Game {
    private canvas;
    private ctx;
    private player;
    private points;
    private enemies;
    private pathfinding;
    private vis;
    private _score;
    score: number;
    constructor();
    movePlayer(movedir: any): void;
    moveEnemies(): void;
    trainAI(win: any): void;
    evaluateGameOver(): boolean;
    editScore(): void;
    private checked(x, y);
    private generateMap();
}
