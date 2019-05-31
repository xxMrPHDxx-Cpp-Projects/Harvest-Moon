export default class Camera {
	constructor(x=0,y=0){
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
	}
	move(){
		this.x += this.dx;
		this.y += this.dy;
		this.dx = this.dy = 0;
	}
	draw(ctx){
		ctx.translate(this.x+this.dx,this.y+this.dy);
	}
}