const position = {
	added: 0,
	x: 1,
	y: 2,
	width: 3,
	height: 4,
	angle: 5,
} as const;

type Position = {
	x: number;
	y: number;
	width: number;
	height: number;
	angle: number;
};

export class Entity {
	#buffer: SharedArrayBuffer;
	#position: Float32Array;
	static get _infoSize() {
		return Object.keys(info).length;
	}
	constructor({ x, y, width, height, angle }: Info) {
		this.#buffer = new SharedArrayBuffer(
			Float32Array.BYTES_PER_ELEMENT * Entity._infoSize
		);
		this.#position = new Float32Array(this.#buffer);
	}
	get _buffer() {
		return this.#buffer;
	}
	get position() {
		const { x, y, height, width, angle } = position;
		return {
			x: this.#position[x],
			y: this.#position[y],
			height: this.#position[height],
			width: this.#position[width],
			angle: this.#position[angle],
		};
	}
	setPosition(newPosition: Partial<Position>) {
		for (let key in newPosition) {
			this.#position[position[key]] = newPosition[key];
		}
	}
	get isAdded() {
		return this.#position[info.added] === 1;
	}
	set isAdded(value: boolean) {
		const { added } = position;
		this.#position[added] = +value;
	}
}
