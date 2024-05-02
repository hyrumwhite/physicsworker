import Matter, { Body } from "matter-js";

const Engine = Matter.Engine,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Bodies = Matter.Bodies,
	Composite = Matter.Composite;

// create an engine
const engine = Engine.create();

// create a renderer
// const render = Render.create({
// 	element: document.body,
// 	engine: engine,
// });

// create two boxes and a ground
// const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
// add all of the bodies to the world
// Composite.add(engine.world, [ground]);
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
		console.log(message.isStatic);
		const body = Bodies[message.body](
			sharedArray[0],
			sharedArray[1],
			sharedArray[2],
			sharedArray[3],
			{ isStatic: message.isStatic }
		) as Bodies.Body;
		body.angle = sharedArray[4];
		bodyMap.set(body, sharedArray);
		Composite.add(engine.world, body);
	}
});

// run the renderer
// Render.run(render);

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
			bodyArray[0] = body.position.x;
			bodyArray[1] = body.position.y;
			bodyArray[4] = body.angle * (180 / Math.PI);
			// Atomics.store(bodyArray, 0, body.position.x);
			// Atomics.store(bodyArray, 1, body.position.y);
			// Atomics.store(bodyArray, 4, Math.floor(body.angle * (180 / Math.PI)));
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
