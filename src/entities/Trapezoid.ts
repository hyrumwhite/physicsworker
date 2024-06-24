import { Body, CommonBodyProps } from "./Body";

type TrapezoidConstructorParams = {
	width: number;
	height: number;
	slope: number;
} & CommonBodyProps;

export class Trapezoid extends Body {
	constructor(params: TrapezoidConstructorParams) {
		super({
			shape: "trapezoid",
			...params,
		});
	}
}
