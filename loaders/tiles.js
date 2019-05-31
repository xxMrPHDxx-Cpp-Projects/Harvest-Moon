import SpriteSheet from '../SpriteSheet.js';
import TileMap from '../TileMap.js';
import Tile from '../Tile.js';

import {loadText, loadJSON} from '../loaders.js';

function ToNumber(str){
	return parseInt(str);
}

function createTile(sprite, x, y, width, height){
	return new Tile(sprite.subImage(x, y, width, height), width, height);
}

export async function loadMap(){
	const sheet = await SpriteSheet.load('imgs/crops.png');
	const config = await loadJSON('config/tiles.json');
	const map = await loadText('map/farm.map');

	let rows, cols, tiles;
	const tile = [];

	for(const {name, rect} of config.tiles){
		const [w, h] = [rect[2], rect[3]];
		tile.push(new Tile(sheet.subImage(...rect), w, h));
	}

	map.split('\n').forEach((line, i)=>{
		if(i === 0){ // Get cols
			cols = parseInt(line.split(/\s+/)[0]);
		}else if(i === 1){ // Get rows
			rows = parseInt(line.split(/\s+/)[0]);
			tiles = Array(rows).fill().map(_=>Array(cols).fill());
		}else{
			line.split(/\s+/).map(ToNumber).forEach((col, j, arr)=>{
				if(j >= cols) return;
				tiles[i-2][j] = tile[col];
			});
		}
	});

	return new TileMap(rows, cols, tiles);
}