export class Component {
	public running = false;
	public tags: string[] = [];
	constructor() {}
	public process(delta: number) {}
	public physicsProcess(delta: number) {}
	public beforeAdd() {}
	public beforeRemove() {}
	public add() {
		this.beforeAdd();
		this.running = true;
		return this;
	}
	public remove() {
		this.beforeRemove();
		this.running = false;
		return this;
	}
}
