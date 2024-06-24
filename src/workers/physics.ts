import Matter, { Body } from "matter-js";

const Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite;

// create an engine
const engine = Engine.create();

type AddMessage = {
	type: "add";
	body: keyof Bodies;
	isStatic: boolean;
	buffer: SharedArrayBuffer;
};
const bodyMap = new WeakMap<Matter.Body, Float32Array>();
self.addEventListener("message", ($event) => {
	const message = $event.data as AddMessage;
	if (message.type === "add") {
		const sharedArray = new Float32Array(message.buffer);
		const [added, x, y, width, height] = sharedArray;
		const body = Bodies[message.body](
			x + width / 2,
			y + height / 2,
			width,
			height,
			{ isStatic: message.isStatic }
		) as Matter.Body;
		Body.setAngle(body, sharedArray[5]);
		bodyMap.set(body, sharedArray);
		Composite.add(engine.world, body);
	}
});

// run the renderer
// Render.run(render);
// const rect = Bodies.rectangle(0,0,10,10)
// rect.an
let lastTime = performance.now();
const loop = (timestamp: number) => {
	const delta = timestamp - lastTime;
	lastTime = timestamp;
	Engine.update(engine, delta);
	const allBodies = Composite.allBodies(engine.world);
	for (let i = 0; i < allBodies.length; i++) {
		const body = allBodies[i];
		const bodyArray = bodyMap.get(body);
		if (bodyArray) {
			bodyArray[0] = 1;
			bodyArray[1] = body.position.x - bodyArray[3] / 2;
			bodyArray[2] = body.position.y - bodyArray[4] / 2;
			bodyArray[5] = body.angle * (180 / Math.PI);
		}
	}
	self.requestAnimationFrame(loop);
};
loop();

// self.addEventListener("message", ($event) => {
// 	const sharedArray = new Float32Array($event.data);
// 	let counter = 0;
// 	setInterval(() => {
// 		counter += 1;
// 		Atomics.store(sharedArray, 0, counter);
// 	}, 500);
// });
