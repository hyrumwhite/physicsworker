import { BodyConstructorParams } from "../shapes/Body";

type Shapes = "rectangle" | "circle" | "polygon" | "trapezoid";
export class CtxDrawer {
	constructor(private ctx: OffscreenCanvasRenderingContext2D) {}
	draw(
		shape: "rectangle",
		x: number,
		y: number,
		width: number,
		height: number
	): void;
	draw(shape: "circle", x: number, y: number, radius: number): void;
	draw(
		shape: "polygon",
		x: number,
		y: number,
		radius: number,
		sides: number
	): void;
	draw(
		shape: "trapezoid",
		x: number,
		y: number,
		width: number,
		height: number,
		slope: number
	): void;
	draw(
		...args:
			| ["circle", number, number, number]
			| ["rectangle", number, number, number, number]
			| ["polygon", number, number, number, number]
			| ["trapezoid", number, number, number, number, number]
	) {
		const [shape, x, y, widthOrRadius, heightOrSides, slope] = args;
		if (shape === "rectangle") {
			const width = widthOrRadius;
			const height = heightOrSides;
		} else if (shape === "circle") {
			const radius = widthOrRadius;
		} else if (shape === "polygon") {
			const radius = widthOrRadius;
			const sides = heightOrSides;
		} else if (shape === "trapezoid") {
			const width = widthOrRadius;
			const height = heightOrSides;
		}
	}
}
