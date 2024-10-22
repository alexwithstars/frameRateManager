export declare class Executor {
    fps: number;
    msPrev: number;
    msFPSPrev: number;
    msPerFrame: number;
    frames: number;
    framesPerSec: number;
    currentFrame: number;
    executor: () => void;
    constructor(executor?: () => void, fps?: number);
    exec(): void;
    getFps(): number;
}
