import SpriteSheet from './SpriteSheet.js';
import TileMap from './TileMap.js';

function ToInteger(str){
	return parseInt(str);
}

export function loadImage(url){
	return new Promise((resolve,reject)=>{
		const image = new Image();
		image.src = url;
		image.onload = ()=>{
			resolve(image);
		}
		image.onerror = (e)=>{ reject(e); }
	}).catch(e=>console.error('Failed to load image at URL: '+url));
}

export function loadText(url){
	return fetch(url).then(res=>res.text());
}

export function loadJSON(url){
	return fetch(url).then(res=>res.json());
}

export function loadMap(url){
	return loadText(url)
	.then(text=>{
		let rows, cols, map;
		text.split("\n").forEach((line, i)=>{
			if(i === 0){
				cols = parseInt(line.split(/\W/)[0]);
			}else if(i === 1){
				rows = parseInt(line.split(/\W/)[0]);
				map = Array(rows).fill().map(()=>Array(cols).fill());
			}else{
				line.split(/\s+/).map(ToInteger).forEach((col, j)=>{
					if(isNaN(col)) return;
					map[i-2][j] = col;
				});
			}
		});
		return {rows, cols, map};
	});
}

function loadTileMap(url, tileSize = 16){
	return loadJSON(url)
	.then(config=>{
		return Promise.all([
			config,
			SpriteSheet.load(config.sprite),
			loadMap(config.map),
		]);
	})
	.then(([config, sheet, {rows, cols, map}])=>{
		const images = [];
		const tiles = Array(rows).fill().map(()=>Array(cols).fill());
		for(let y=0;y<sheet.height;y+=tileSize){
			for(let x=0;x<sheet.width;x+=tileSize){
				images.push(sheet.subImage(x, y, tileSize, tileSize));
			}
		}
		for(let row=0;row<rows;row++){
			for(let col=0;col<cols;col++){
				tiles[row][col] = images[map[row][col]];
			}
		}
		return new TileMap(rows, cols, tiles);
	})
}

function loadTiles(url){
	return SpriteSheet.load(url)
	.then(sheet=>{
		const size = 16;
		const rows = (sheet.height / size) | 0;
		const cols = (sheet.width / size) | 0;
		const tiles = Array(rows).fill().map(()=>Array(cols).fill());
		for(let row=0;row<rows;row++){
			for(let col=0;col<cols;col++){
				tiles[row][col] = sheet.subImage(col * size, row * size, size, size);
			}
		}
		return tiles;
	});
}

export function loadRanchMap(){
	return Promise.all([
		loadTiles('imgs/home2.png'),
		loadTiles('imgs/livestock.png'),
		loadTiles('imgs/fence_store.png'),
		loadTileMap('config/ranch.json', 16),
	])
	.then(([ranchTiles, barnCoopTiles, fenceStoreTiles, tm])=>{
		for(let row=0;row<ranchTiles.length;row++){
			for(let col=0;col<ranchTiles[row].length;col++){
				tm.tiles[14+row][5+col] = ranchTiles[row][col];
			}
		}
		for(let row=0;row<barnCoopTiles.length;row++){
			for(let col=0;col<barnCoopTiles[row].length;col++){
				tm.tiles[15+row][17+col] = barnCoopTiles[row][col];
			}
		}
		for(let row=0;row<fenceStoreTiles.length;row++){
			for(let col=0;col<fenceStoreTiles[row].length;col++){
				tm.tiles[14+row][13+col] = fenceStoreTiles[row][col];
			}
		}
		return tm;
	});
}