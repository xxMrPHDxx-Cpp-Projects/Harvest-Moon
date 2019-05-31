export default class TileMap {
	constructor(rows, cols, tiles){
		this.rows = rows;
		this.cols = cols;
		this.tiles = tiles;
	}

	draw(ctx){
		for(let row=0;row<this.rows;row++){
			for(let col=0;col<this.cols;col++){
				ctx.drawImage(this.tiles[row][col], col * 16, row * 16);
			};
		};
	}
}