import {loadJSON} from './loaders.js';
import {loadSprite} from './sprites.js';

export function loadBackground(){
	return loadJSON('config/ranch.json')
	.then(config=>{
		return Promise.all([
			config,
			loadSprite('config/tiles.json', true),
		]);
	}).then(([config, sprite])=>{
		const tileSize = sprite.tileSize;
		const width = tileSize * config.cols;
		const height = tileSize * config.rows;
		const buffer = document.createElement('canvas');
		buffer.setAttribute('width', width);
		buffer.setAttribute('height', height);
		const ctx = buffer.getContext('2d');

		const patterns = new Map();
		if(config.patterns){
			config.patterns.forEach(({name, type, rows, cols, tiles})=>{
				const pattern = document.createElement('canvas');
				pattern.setAttribute('width', cols * tileSize);
				pattern.setAttribute('height', rows * tileSize);
				tiles.forEach(({name, offset})=>{
					sprite.drawTile(name, pattern.getContext('2d'), ...offset);
				});
				patterns.set(name, pattern);
			})
		}

		for(const {name, pattern, type, ranges} of config.tiles){
			ranges.forEach(range=>{
				if(pattern){
					const [x, y] = range.map(val=>val*tileSize);
					ctx.drawImage(patterns.get(pattern), x, y);
				}else{
					const [x1, xLen, y1, yLen] = range.length === 4 ?
						[...range] : range.length === 2 ?
						[range[0], 1, range[1], 1] : Array(4).fill();
					if(x1 === undefined) return;
					for(let x=x1;x<x1+xLen;x++){
						for(let y=y1;y<y1+yLen;y++){
							if(name === 'grass_hill_top1' || name === 'grass_hill_top2' ||
								name === 'grass_hill_bottom1' || name === 'grass_hill_bottom2' ||
								name === 'grass_hill_middle1' || name === 'grass_hill_middle2'){
								for(let i=0;i<30;i++){
									sprite.drawTile(name, ctx, x, y+i*2);
								}
							}else{
								sprite.drawTile(name, ctx, x, y);
							}
						}
					}
				}
			});
		}

		return buffer;
	});
}