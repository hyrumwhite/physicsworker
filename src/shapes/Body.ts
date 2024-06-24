export type CommonBodyProps = {
	x: number;
	y: number;
	sprite?: string;
	zIndex?: number;
	isStatic?: boolean;
};
export type BodyConstructorParams = {
	shape: "circle" | "rectangle" | "trapezoid" | "polygon";
	width?: number;
	height?: number;
	sides?: number;
	slope?: number;
	radius?: number;
} & CommonBodyProps;
export class Body {
	constructor(params: BodyConstructorParams) {}
}
