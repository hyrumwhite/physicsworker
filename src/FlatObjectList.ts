const ARRAY_SIZE = 500;

export class FlatObjectList {
	buffer: SharedArrayBuffer;
	#rawlength: number;
	#stride: number;
	#cursor = 0;
	#array: Float32Array;
	#shapeKeys: string[];
	length = 0;
	#activeSymbol = "$__active__";
	constructor<T extends Record<string, number>>(
		shape: T,
		buffer?: SharedArrayBuffer
	) {
		this.#shapeKeys = [this.#activeSymbol, ...Object.keys(shape)];
		this.#stride = this.#shapeKeys.length;
		this.#rawlength = ARRAY_SIZE - (ARRAY_SIZE % this.#stride);
		this.buffer = buffer
			? buffer
			: new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * this.#rawlength);
		this.#array = new Float32Array(this.buffer);
	}
	at<T extends Record<string, number>>(index: index): T {
		let obj: T = {};
		const start = index * this.#stride;
		for (let i = 0; i < this.#stride; i++) {
			const arrayIndex = start + i;
			const keyIndex = i;
			const key = this.#shapeKeys[keyIndex];
			const value = this.#array[arrayIndex];
			if (key === this.#activeSymbol) {
				if (value === 0) {
					return undefined;
				}
				continue;
			}
			obj[key] = this.#array[arrayIndex];
		}
		return obj;
	}

	add(item: Record<string, number>) {
		for (let i = 0; i < this.#stride; i++) {
			const arrayIndex = i + this.#cursor;
			const keyIndex = i;
			if (i === 0) {
				this.#array[arrayIndex] = 1;
				continue;
			}
			const key = this.#shapeKeys[keyIndex];
			const value = item[key];
			this.#array[arrayIndex] = value;
		}
		this.length += 1;
		const index = this.#cursor;
		this.#findNextSlot();
		return index;
	}
	#findNextSlot = () => {
		for (let i = this.#cursor; i < this.#rawlength; i += this.#stride) {
			if (this.#array[i] === 0) {
				this.#cursor = i;
				return;
			}
		}
		console.warn("Physics items exceed limit in CONFIG. Increase limit.");
	};
	update<T extends Record<string, number>>(
		index: number,
		key: keyof T,
		value: number
	) {
		let keyIndex = -1;
		for (let i = 0; i < this.#shapeKeys.length; i++) {
			if (this.#shapeKeys[i] === key) {
				keyIndex = i;
			}
		}
		const start = index * this.#stride;
		if (keyIndex !== -1) {
			this.#array[start + keyIndex] = value;
		}
	}
	remove(index: number) {
		const start = index * this.#stride;
		this.#array[start] = 0;
		this.length -= 1;
		this.#cursor = index;
	}
}
