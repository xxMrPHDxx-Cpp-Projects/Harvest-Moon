export default class Tile {
	constructor(image, width, height){
		this.image = image;
		this.width = width;
		this.height = height;
	}

	draw(ctx, row, col){
		ctx.drawImage(this.image, col * this.width, row * this.height);
	}
}