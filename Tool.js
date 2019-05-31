class Tool {
	constructor(name, image, x, y){
		this.name = name;
		this.image = image;
		this.x = x;
		this.y = y;
	}

	draw(ctx){
		ctx.drawImage(this.image, this.x, this.y);
	}
}

export class WateringCan extends Tool {

	

}

export class Sickle extends Tool {

	

}

export class Hoe extends Tool {

	

}

export class Hammer extends Tool {

	

}

export class Axe extends Tool {

	

}