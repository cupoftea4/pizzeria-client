type QueueFunction = () => void;

// TODO: Plan queue functions for future execution

export class FunctionQueue {
  private readonly queue: QueueFunction[] = [];
  private readonly delay: number;
  private isRunning: boolean = false;

  constructor(delay: number = 1000) { // Default delay is 1 second
    this.delay = delay;
  }

  // Add a function to the queue
  enqueue(func: QueueFunction): void {
    this.queue.push(func);
    this.run();
  }

  // Run the next function in the queue
  private run(): void {
    if (this.isRunning) return;
    if (this.queue.length === 0) return;

    this.isRunning = true;
    const func = this.queue.shift();

    if (func) {
      func();
      setTimeout(() => {
        this.isRunning = false;
        this.run();
      }, this.delay);
    }
  }
}

