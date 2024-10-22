import { Executor } from './Executor';
export interface ExecutorsType {
    [key: string]: Executor;
}
export interface ExecutorEntry {
    name: string;
    executor: () => void;
    fps?: number;
}
export declare class FrameRateManager {
    #private;
    constructor(executors?: ExecutorEntry[]);
    stop(): void;
    start(): void;
    getFps(name: string): number;
}
