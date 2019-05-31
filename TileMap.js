export default class TileMap {
	constructor(rows, cols, tiles, tileSize=16){
		this.rows = rows;
		this.cols = cols;
		this.tiles = tiles;
		this.tileSize = tileSize;
		this.width = this.cols * this.tileSize;
		this.height = this.rows * this.tileSize;
	}

	draw(ctx, offsetX=0, offsetY=0){
		for(let x=0;x<this.width;x+=this.tileSize){
			const col = ((x+offsetX) / this.tileSize) | 0;
			if(col < 0 || col >= this.cols) continue;
			for(let y=0;y<this.height;y+=this.tileSize){
				const row = ((y+offsetY) / this.tileSize) | 0;
				if(row < 0 || row >= this.rows) continue;
				this.tiles[row][col].draw(ctx, row, col);
			}
		}
	}

}