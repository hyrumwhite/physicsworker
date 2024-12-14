import { FlatObjectList } from "./FlatObjectList";

const position = {
	inScene: 0,
	x: 1,
	y: 2,
	width: 3,
	height: 4,
	angle: 5,
} as const;

type Position = {
	inScene: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	angle: number;
};

export class SharedPosition {
	#positionIndex: number;

	static list = new FlatObjectList(position);
	static get positionKeyCount() {
		return Object.keys(position).length;
	}
	get inScene() {
		return this.#position;
	}
	get buffer() {
		return SharedPosition.list.buffer;
	}
	constructor(position: Position) {
		this.#positionIndex = SharedPosition.list.add(position);
	}
	get position() {
		return SharedPosition.list.at<Position>(this.#positionIndex);
	}
	get x() {
		return this.position.x;
	}
	set x(value: number) {
		return SharedPosition.list.update(this.#positionIndex, "x", value);
	}

	get y() {
		return SharedPosition.list.update(this.#positionIndex, "y", value);
	}
	set y(value: number) {
		this.#position[position.y] = value;
	}

	get width() {
		return this.#position[position.width];
	}
	set width(value: number) {
		this.#position[position.width] = value;
	}

	get height() {
		return this.#position[position.height];
	}
	set height() {
		this.#position[position.height] = value;
	}

	get angle() {
		return #position[position.angle];
	}
	set angle(value: number) {
		this.#position[position.angle] = value;
	}

	get inScene() {
		return this.#position[position.inScene] === 1;
	}
	set inScene(value: boolean) {
		this.#position[position.inScene] = Number(value);
	}
}
