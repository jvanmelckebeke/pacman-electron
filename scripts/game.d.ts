export declare class Game {
    private canvas;
    private ctx;
    private player;
    private readonly points;
    private readonly enemies;
    private pathfinding;
    private readonly vis;
    private _score;
    score: number;
    constructor();
    movePlayer(movedir: any): void;
    moveEnemies(): void;
    trainAI(win: any): void;
    evaluateGameOver(): boolean;
    editScore(): void;
    private checked;
    private generateMap;
}
