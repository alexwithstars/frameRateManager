import { Executor } from './Executor'

export interface ExecutorsType {
  [key: string]: Executor
}

export interface ExecutorEntry {
  name: string
  executor: () => void
  fps?: number
}

export class FrameRateManager {
  #executors: ExecutorsType
  #currentAnimationFrame: number
  constructor (executors: ExecutorEntry[] = []) {
    this.#executors = {}
    for (const { name, executor, fps } of executors) {
      if(!name) {
        throw new Error('Executor name is required')
      }
      this.#executors[name] = new Executor(executor, fps)
    }
    this.#currentAnimationFrame = 0
  }

  #loop () {
    this.#currentAnimationFrame = window.requestAnimationFrame(() => this.#loop())
    for (const name in this.#executors) {
      this.#executors[name].exec()
    }
  }

  stop () {
    window.cancelAnimationFrame(this.#currentAnimationFrame)
  }

  start () {
    window.requestAnimationFrame(() => this.#loop())
  }

  getFps (name: string) {
    return this.#executors[name]?.getFps() ?? 0
  }
}
