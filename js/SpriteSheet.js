export default class SpriteSheet {
	constructor(image, tileSize=16){
		this.image = image;
		this.tileSize = tileSize;
		this.sprites = new Map();
	}

	subImage(x, y, width, height){
		const buffer = document.createElement('canvas');
		buffer.setAttribute('width', width);
		buffer.setAttribute('height', height);
		buffer.getContext('2d').drawImage(this.image, x, y, width, height, 0, 0, width, height);
		return buffer;
	}

	define(name, x, y, width, height){
		this.sprites.set(name, this.subImage(x, y, width, height));
	}

	defineTile(name, row, col){
		this.define(name, col * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
	}

	draw(name, ctx, x, y){
		ctx.drawImage(this.sprites.get(name), x, y);
	}

	drawTile(name, ctx, row, col){
		this.draw(name, ctx, col * this.tileSize, row * this.tileSize);
	}

	get width(){ return this.image.width; }
	get height(){ return this.image.height; }
}