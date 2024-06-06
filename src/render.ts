const ctx = canvas.getContext("2d");
let ctx: CanvasRenderingContext2D | null = null;
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
	window.requestAnimationFrame(loop);
};
window.requestAnimationFrame(loop);

self.addEventListener(
	"message",
	($event: MessageEvent<{ type: string; canvas: HTMLCanvasElement }>) => {
		if ($event.data.type === "canvas_transfer") {
			const canvas = $event.data.canvas;
		}

		// Use the canvas object here
		// For example, you can draw on the canvas using its rendering context:
		const ctx = canvas.getContext("2d");
		ctx.fillStyle = "red";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
);
