import { Application } from "pixi.js";

const app = new Application();

const bodies: { body: string; bodyArray: Float32Array }[] = [];

let ctx: CanvasRenderingContext2D | null = null;
let canvas: OffscreenCanvas | null = null;

const rotate = (ctx, added, x, y, width, height, angle) => {
	const centerX = x + width / 2;
	const centerY = y + height / 2;
	ctx.translate(centerX, centerY);
	ctx.rotate((angle * Math.PI) / 180);
	ctx.translate(-centerX, -centerY);
};
const drawRectangle = (bodyArray: Float32Array) => {
	const [added, x, y, width, height, angle] = bodyArray;
	ctx.fillStyle = "white";
	const centerX = x + width / 2;
	const centerY = y + height / 2;
	ctx.save();
	ctx.fillStyle = "white";
	if (angle) {
		rotate(ctx, ...body.bodyArray);
	}
	ctx.fillRect(x, y, width, height);
	ctx.restore();
};
const loop = () => {
	if (ctx) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < bodies.length; i++) {
			const body = bodies[i];
			const [added, x, y, width, height, angle] = body.bodyArray;
			if (!added) {
				continue;
			}
			ctx.fillStyle = "white";
			const centerX = x + width / 2;
			const centerY = y + height / 2;
			ctx.save();
			ctx.fillStyle = "white";
			if (angle) {
				rotate(ctx, ...body.bodyArray);
			}
			ctx.fillRect(x, y, width, height);
			ctx.restore();

			ctx.fillStyle = "red";
			ctx.fillRect(centerX - 2, centerY - 2, 4, 4);
			ctx.fillStyle = "white";
		}
	}
	requestAnimationFrame(loop);
};
requestAnimationFrame(loop);

type CanvasTransferMessage = {
	type: string;
	canvas: HTMLCanvasElement;
};

type AddObjectMessage = {
	type: string;
	buffer: SharedArrayBuffer;
	sprite: string;
};

const handlers = {
	canvas_transfer({ canvas }: CanvasTransferMessage) {
		app.init({
			antialias: false,
			canvas,
		});
	},
	add_object({ buffer, sprite }: AddObjectMessage) {
		const sharedArray = new Float32Array(message.buffer);
		bodies.push({
			body: message.body,
			bodyArray: sharedArray,
		});
	},
};

self.addEventListener(
	"message",
	($event: MessageEvent<AddObjectMessage, CanvasTransferMessage>) => {
		handlers[$event.data.type]($event.data);
	}
);
