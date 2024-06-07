const bodies = [];

let ctx: CanvasRenderingContext2D | null = null;
let canvas: OffscreenCanvas | null = null;
const rotate = (ctx, added, x, y, width, height, angle) => {
	const centerX = x + width / 2;
	const centerY = y + height / 2;
	ctx.translate(centerX, centerY);
	ctx.rotate((angle * Math.PI) / 180);
	ctx.translate(-centerX, -centerY);
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

self.addEventListener(
	"message",
	(
		$event: MessageEvent<{
			type: string;
			canvas: HTMLCanvasElement;
			buffer: SharedArrayBuffer;
			body: string;
		}>
	) => {
		const message = $event.data;
		if (message.type === "canvas_transfer") {
			canvas = message.canvas;
			ctx = canvas.getContext("2d");
		}
		if (message.type === "add_object") {
			const sharedArray = new Float32Array(message.buffer);
			bodies.push({
				body: message.body,
				bodyArray: sharedArray,
			});
		}
	}
);
