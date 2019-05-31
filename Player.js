export default class Player{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.animations = new Map();
	}
	get animation(){
		return this.animations.get('walk-side');
	}
	update(){
		this.animation.update();
	}
	draw(ctx){
		this.animation.draw(ctx, this.x, this.y);
	}
}