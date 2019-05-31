import SpriteSheet from './SpriteSheet.js';
import Player from './Player.js';
import Animation from './Animation.js';

import {loadJSON} from './loaders.js';
import {loadSprite} from './sprites.js';

export async function loadPlayer(x,y){
	return loadSprite('config/jack.json')
	.then(sheet=>{
		return Promise.all([
			sheet,
			loadJSON('config/jack.json')
		]);
	})
	.then(([sheet,config])=>{
		console.log(sheet);
		const player = new Player(x,y);
		for(const {name,speed,frames} of config.animations){
			let imgs = [];
			for(const frame of frames){
				imgs.push(sheet.sprites.get(frame));
			}
			player.animations.set(name,new Animation(imgs,speed));
		}
		return player;
	});
}