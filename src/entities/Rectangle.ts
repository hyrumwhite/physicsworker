import { Body, CommonBodyProps } from "./Body";

type RectangleConstructorParams = {
	width: number;
	height: number;
} & CommonBodyProps;
export class Rectangle extends Body {
	constructor(params: RectangleConstructorParams) {
		super({
			shape: "rectangle",
			...params,
		});
	}
}
