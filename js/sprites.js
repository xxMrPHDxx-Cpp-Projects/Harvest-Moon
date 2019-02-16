import SpriteSheet from './SpriteSheet.js';

import {loadJSON, loadImage} from './loaders.js';

export function loadSprite(url){
	return loadJSON(url)
	.then(config=>{
		return Promise.all([
			loadImage(config.spritesheet),
			config.tileSize,
			config.tiles,
		]);
	})
	.then(([image, tileSize, tiles])=>{
		const sprite = new SpriteSheet(image, tileSize);
		for(const {name, rect} of tiles){
			sprite.defineTile(name, ...rect);
		}
		return sprite;
	});
}