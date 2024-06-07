import "./style.css";

import PhysicsWorker from "./physics?worker";
import RenderWorker from "./render?worker";

const sharedBuffer = new SharedArrayBuffer(Float32Array.BYTES_PER_ELEMENT * 10);
const sharedArray = new Float32Array(sharedBuffer);

const physicsWorker = new PhysicsWorker();
const renderWorker = new RenderWorker();
const canvas = document.querySelector("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const offscreenCanvas = canvas?.transferControlToOffscreen();
renderWorker.postMessage(
	{
		type: "canvas_transfer",
		canvas: offscreenCanvas,
	},
	[offscreenCanvas]
);
// physicsWorker.postMessage(sharedBuffer);

const bodies = [];
const addBody = (body, x, y, width, height, angle = 0, isStatic = false) => {
	const sharedBuffer = new SharedArrayBuffer(
		Float32Array.BYTES_PER_ELEMENT * 6
	);
	const bodyArr = new Float32Array(sharedBuffer);
	bodyArr[0] = 0;
	bodyArr[1] = x;
	bodyArr[2] = y;
	bodyArr[3] = width;
	bodyArr[4] = height;
	bodyArr[5] = angle;
	bodies.push({
		type: body,
		bodyArray: bodyArr,
	});
	renderWorker.postMessage({
		type: "add_object",
		buffer: sharedBuffer,
	});
	physicsWorker.postMessage({
		type: "add",
		body: body,
		isStatic,
		buffer: sharedBuffer,
	});
};
// Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

let x = 0;

if (canvas) {
	addBody("rectangle", x, 550, 810, 60, 0);
	addBody("rectangle", 400, 610, 810, 60, 0, true);
	canvas.addEventListener("click", ($event) => {
		addBody("rectangle", $event.clientX - 40, $event.clientY - 40, 80, 80);
		x += 25;
	});
}
