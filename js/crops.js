import {loadSprite} from './sprites.js';

export function loadCrops(){
	return loadJSON('config/crops.json')
	.then(config=>{
		return Promise.all([
			SpriteSheet.load(config.sheet),
			config,
		]);
	})
	.then(([sheet, config])=>{
		const size = config.tileSize;
		for(const {name, states} of config.crops){
			states.forEach(({type, rect})=>{
				sheet.define(`${name}_${type}`, ...rect, size, size);
				sheet.define(`${name}_${type}`, ...rect, size, size);
			});
		}
		return sheet;
	});
}