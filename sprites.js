import SpriteSheet from './SpriteSheet.js';

import {loadJSON, loadImage} from './loaders.js';

export function loadSprite(url,isTile=false){
	return loadJSON(url)
	.then(config=>{
		return Promise.all([
			loadImage(config.spritesheet),
			isTile ? config.tileSize : config.width,
			isTile ? config.tileSize : config.height,
			config.tiles,
			isTile
		]);
	})
	.then(([image, width, height, tiles, isTile])=>{
		const sprite = new SpriteSheet(image, width, height);
		for(const {name, rect} of tiles){
			if(!isTile)
				sprite.define(name, ...rect, width, height);
			else
				sprite.defineTile(name, ...rect);
		}
		return sprite;
	});
}