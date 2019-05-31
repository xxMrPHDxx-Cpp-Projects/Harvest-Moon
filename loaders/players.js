import SpriteSheet from '../SpriteSheet.js';
import Player from '../Player.js';
import Animation from '../Animation.js';

import {loadJSON} from '../loaders.js';

export async function loadPlayer(x,y){
	let sheet = await SpriteSheet.load('imgs/jack.png');
	return loadJSON('config/jack.json')
	.then(config=>{
		const width = config.width;
		const height = config.height;
		let images = new Map();
		for(const {name,rect} of config.images){
			images.set(name,sheet.subImage(...rect, width, height));
		}
		const player = new Player(x,y);
		for(const {name,speed,frames} of config.animations){
			let imgs = [];
			for(const frame of frames){
				imgs.push(images.get(frame));
			}
			player.animations.set(name,new Animation(imgs,speed));
		}
		return player;
	});
}