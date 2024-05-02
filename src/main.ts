import "./style.css";

import PhysicsWorker from "./physics?worker";

const sharedBuffer = new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * 10);
const sharedArray = new Float32Array(sharedBuffer);

const physicsWorker = new PhysicsWorker();
// physicsWorker.postMessage(sharedBuffer);

const bodyMap = new WeakMap();
const bodies = [];
const addBody = (body, x, y, width, height, angle = 0, isStatic = false) => {
	const sharedBuffer = new SharedArrayBuffer(
		Float32Array.BYTES_PER_ELEMENT * 5
	);
	const bodyArr = new Float32Array(sharedBuffer);
	bodyArr[0] = x;
	bodyArr[1] = y;
	bodyArr[2] = width;
	bodyArr[3] = height;
	bodyArr[4] = angle;
	bodies.push({
		type: body,
		bodyArray: bodyArr,
	});
	physicsWorker.postMessage({
		type: "add",
		body: body,
		isStatic,
		buffer: sharedBuffer,
	});
};
// Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
const canvas = document.querySelector("canvas");
const rotate = (ctx, x, y, width, height, angle) => {
	const centerX = x + width / 2;
	const centerY = y + height / 2;
	ctx.translate(centerX, centerY);
	ctx.rotate((angle * Math.PI) / 180);
	ctx.translate(-centerX, -centerY);
};
let x = 400;
if (canvas) {
	addBody("rectangle", 400, 610, 810, 60, 0, true);
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
	canvas.addEventListener("click", () => {
		addBody("rectangle", x, 200, 80, 80);
		x += 25;
	});
	const ctx = canvas.getContext("2d");
	if (ctx) {
		ctx.fillStyle = "white";
		const loop = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < bodies.length; i++) {
				const body = bodies[i];
				const bodyArray = body.bodyArray;
				ctx.fillStyle = "white";
				const centerX = bodyArray[0] + bodyArray[2] / 2;
				const centerY = bodyArray[1] + bodyArray[3] / 2;
				ctx.save();
				ctx.fillStyle = "white";
				if (bodyArray[4]) {
					rotate(ctx, ...bodyArray);
				}
				ctx.fillRect(bodyArray[0], bodyArray[1], bodyArray[2], bodyArray[3]);
				ctx.restore();

				ctx.fillStyle = "red";
				ctx.fillRect(centerX - 2, centerY - 2, 4, 4);
				ctx.fillStyle = "white";
			}
			window.requestAnimationFrame(loop);
		};
		window.requestAnimationFrame(loop);
	}
}
