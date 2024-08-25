import { BodyConstructorParams } from "../shapes/Body";
import { drawCircle } from "./drawCircle";
import { drawRectangle } from "./drawRectangle";

type Shapes = "rectangle" | "circle" | "polygon" | "trapezoid";
export class CtxDrawer {
	constructor(private ctx: OffscreenCanvasRenderingContext2D) {}
	draw(
		shape: "rectangle",
		x: number,
		y: number,
		width: number,
		height: number,
		angle: number
	): void;
	draw(
		shape: "circle",
		x: number,
		y: number,
		radius: number,
		angle: number
	): void;
	draw(
		shape: "polygon",
		x: number,
		y: number,
		radius: number,
		sides: number,
		angle: number
	): void;
	draw(
		shape: "trapezoid",
		x: number,
		y: number,
		width: number,
		height: number,
		slope: number,
		angle: number
	): void;
	draw(
		...args:
			| ["circle", number, number, number, number]
			| ["rectangle", number, number, number, number, number]
			| ["polygon", number, number, number, number, number]
			| ["trapezoid", number, number, number, number, number, number]
	) {
		const [shape, x, y] = args;
		if (shape === "rectangle") {
			const [, , , width, height, angle] = args;
			drawRectangle(this.ctx, x, y, width, height);
		} else if (shape === "circle") {
			const [, , , radius, angle] = args;
			drawCircle(this.ctx, x, y, radius, angle);
		} else if (shape === "polygon") {
			const [, , , radius, sides, angle] = args;
		} else if (shape === "trapezoid") {
			const [, , , width, height, slope, angle] = args;
		}
	}
}
