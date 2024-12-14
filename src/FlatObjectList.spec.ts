import { test, expect } from "vitest";
import { FlatObjectList } from "./FlatObjectList";

test("creates an array of length 0", () => {
	const list = new FlatObjectList({ x: 11, y: 0 });
	expect(list.length).toEqual(0);
});

test("adds an item", () => {
	const list = new FlatObjectList({ x: 0, y: 0 });
	list.add({ x: 11, y: 11 });
	expect(list.length).toEqual(1);
	const item = list.at(0);
	expect(list.at(0)).toEqual({ x: 11, y: 11 });
});

test("removes an item", () => {
	const list = new FlatObjectList({ x: 0, y: 0 });
	list.add({ x: 11, y: 11 });
	list.add({ x: 12, y: 13 });
	list.add({ x: 15, y: 16 });
	list.remove(1);
	expect(list.at(0)).toEqual({ x: 11, y: 11 });
	expect(list.at(1)).toEqual(undefined);
	expect(list.at(2)).toEqual({ x: 15, y: 16 });
	expect(list.length).toEqual(2);
	//update so at() skips removed indices... maybe...
});

test("iterates a list", () => {
	const list = new FlatObjectList({ x: 0, y: 0 });
	for (let i = 0; i < 10; i++) {
		list.add({ x: i, y: i });
	}
	expect(list.length).toEqual(10);
	for (let i = 0; i < list.length; i++) {
		const item = list.at(i);
		expect(item).toEqual({ x: i, y: i });
	}
});

test("updates a value", () => {
	type Coord = { x: number; y: number };
	const list = new FlatObjectList({ x: 0, y: 0 });
	for (let i = 0; i < 10; i++) {
		list.add({ x: i, y: i });
	}
	list.update(2, "x", 22);
	expect(list.at<Coord>(2).x).toEqual(22);
	list.update<Coord>(8, "y", 266);
	expect(list.at<Coord>(8).y).toEqual(266);
});
