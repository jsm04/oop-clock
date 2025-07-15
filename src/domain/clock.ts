import { EventEmitter } from 'events';

type ClockState = {
	hour: number;
	minute: number;
	second: number;
};

export class Clock extends EventEmitter {
	private hour: number;
	private minute: number;
	private second: number;
	private timerId?: ReturnType<typeof setInterval>;

	constructor(
		{ hour = 0, minute = 0, second = 0 }: ClockState,
		autoStart: boolean = true
	) {
		super();

		this.hour = hour % 24;
		this.minute = minute % 60;
		this.second = second % 60;

		if (autoStart) this.start();
	}

	tick(): void {
		this.second += 1;
		if (this.second === 60) {
			this.second = 0;
			this.minute += 1;
		}
		if (this.minute === 60) {
			this.minute = 0;
			this.hour += 1;
		}
		if (this.hour === 24) {
			this.hour = 0;
		}

		this.emit('tick', this.stringifyState());
	}

	start(intervalMs: number = 1000): void {
		if (this.timerId) return;
		this.timerId = setInterval(() => this.tick(), intervalMs);
	}

	stop(): void {
		if (this.timerId) {
			clearInterval(this.timerId);
			this.timerId = undefined;
		}
	}

	update({ hour = 0, minute = 0, second = 0 }: ClockState ){
		this.hour = hour % 24;
		this.minute = minute % 60;
		this.second = second % 60;
		return this
	}

	stringifyState(): string {
		const pad = (n: number) => n.toString().padStart(2, '0');
		return `${pad(this.hour)}:${pad(this.minute)}:${pad(this.second)}`;
	}

	compare(other: Clock): number {
		const totalThis = this.hour * 3600 + this.minute * 60 + this.second;
		const totalOther = other.hour * 3600 + other.minute * 60 + other.second;

		return Math.sign(totalThis - totalOther);
	}
}

