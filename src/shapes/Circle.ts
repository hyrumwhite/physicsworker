import { Body, CommonBodyProps } from "./Body";

type CircleConstructorParams = {
	radius: number;
} & CommonBodyProps;

export class Circle extends Body {
	constructor(params: CircleConstructorParams) {
		super({
			shape: "circle",
			...params,
		});
	}
}
