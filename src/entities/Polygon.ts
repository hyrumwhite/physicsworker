import { Body, CommonBodyProps } from "./Body";

type PolygonConstructorParams = {
	sides: number;
	width: number;
	height: number;
	radius: number;
} & CommonBodyProps;

export class Polygon extends Body {
	constructor(params: PolygonConstructorParams) {
		super({
			shape: "polygon",
			...params,
		});
	}
}
