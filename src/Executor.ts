export class Executor {
  fps: number
  msPrev: number
  msFPSPrev: number
  msPerFrame: number
  frames: number
  framesPerSec: number
  currentFrame: number
  executor: () => void
  constructor (
    executor: () => void = () => {},
    fps: number = Infinity
  ) {
    this.executor = executor
    this.fps = fps
    this.msPrev = window.performance.now()
    this.msFPSPrev = window.performance.now() + 1000
    this.msPerFrame = 1000 / this.fps
    this.frames = 0
    this.framesPerSec = 0
    this.currentFrame = 0
  }

  exec () {
    const msNow = window.performance.now()
    const msPassed = msNow - this.msPrev

    if (msPassed < this.msPerFrame) return

    const excessTime = msPassed % this.msPerFrame
    this.msPrev = msNow - excessTime

    this.frames++

    if (this.msFPSPrev < msNow) {
      this.msFPSPrev = window.performance.now() + 1000
      this.framesPerSec = this.frames
      this.frames = 0
    }

    this.executor()
  }

  getFps () {
    return this.framesPerSec
  }
}