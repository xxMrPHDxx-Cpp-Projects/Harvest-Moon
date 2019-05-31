import {loadImage} from './loaders.js';

export default class SpriteSheet {
	constructor(image){
		this.image = image;
	}

	subImage(x, y, width, height){
		const buffer = document.createElement('canvas');
		buffer.width = width;
		buffer.height = height;
		const ctx = buffer.getContext('2d');
		ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);
		return buffer;
	}

	static async load(url){
		const image = await loadImage(url);
		return new SpriteSheet(image);
	}
}