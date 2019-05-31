export default class Animation {
	constructor(images,speed){
		this.images = images;
		this.speed = speed * 1000;
		this.length = images.length;
		this.index = 0;
		this.startTime = performance.now();
		this.timer = 0;
	}
	update(){
		if(this.length == 1) return;
		this.timer += performance.now() - this.startTime;
		if(this.timer > this.speed){
			this.index++;
			this.timer = 0;
			this.startTime = performance.now();
			if(this.index >= this.length){
				this.index = 0;
			}
		}
	}
	draw(ctx,x,y){
		ctx.drawImage(this.images[this.index],x,y);
	}
}