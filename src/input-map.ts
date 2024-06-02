export const actions = [
	"MoveUp",
	"MoveLeft",
	"MoveDown",
	"MoveRight",
	"Jump",
	"Interact",
] as const;

export class InputHandler {
	#keysDownBuffer: SharedArrayBuffer;
	#sharedKeysDown: Int32Array;
	#keysPressedBuffer: SharedArrayBuffer;
	#sharedKeysPressed: Int32Array;
	#actions: string[];
	#actionPostionMap: Record<string, number> = {};
	#keysDown: number[] = [];
	#keysPressed: number[] = [];
	constructor(concurrentActions = 10) {
		this.#actions = actions;
		for (let i = 0; i < actions.length; i++) {
			const action = actions[i];
			this.#actionPostionMap[action] = i;
		}
		this.#keysDownBuffer = new SharedArrayBuffer(
			Int32Array.BYTES_PER_ELEMENT * concurrentActions
		);
		this.#sharedKeysDown = new Int32Array(this.#keysDownBuffer);
		this.#sharedKeysDown.fill(0);
		window.addEventListener("keydown", ($event) => {
			this.#keysDown.push($event.code);
			this.updateInputs();
		});
		window.addEventListener("keyup", ($event) => {
			this.removeInput($event.code);
			this.updateInputs();
		});
		window.addEventListener("keypress", ($event) => {});
	}
	removeInput(keyCode: number) {
		const keysDown = [];
		for (let i = 0; i < this.#keysDown.length; i++) {
			const heldKey = this.#keysDown[i];
			if (keyCode !== heldKey) {
				keysDown.push(this.#keysDown[i]);
			}
		}
	}
	updateInputs() {
		for (let i = 0; i < this.#sharedKeysDown.length; i++) {
			Atomics.store(this.#sharedKeysDown, i, this.#keysDown[i]);
		}
	}
	connect(worker: Worker) {
		worker.postMessage({
			type: "init_input",
			buffer: this.#keysDownBuffer,
			actions: this.#actions,
		});
	}
}
