export default class Mouse {
	constructor(elem){
		this.elem = elem;
		this.lastX = null;
		this.lastY = null;
		this.x = null;
		this.y = null;
		this.dx = 0;
		this.dy = 0;
		this.pressed = false;

		this._onPressed = (e) => {
			this.pressed = true;
			this.lastX = e.clientX;
			this.lastY = e.clientY;
		}
		this._onReleased = (e) => {
			this.pressed = false;
			this.lastX = e.clientX;
			this.lastY = e.clientY;
			this.dx = this.dy = 0;
		}
		this._onMoved = (e) => {
			this.x = e.clientX;
			this.y = e.clientY;
			if(!this.pressed) return;
			this.dx = this.x - this.lastX;
			this.dy = this.y - this.lastY;
		}
		elem.addEventListener('mousedown',this._onPressed.bind(this));
		elem.addEventListener('mouseup',this._onReleased.bind(this));
		elem.addEventListener('mousemove',this._onMoved.bind(this));
	}
}