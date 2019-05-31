import SpriteSheet from '../SpriteSheet.js';
import {WateringCan, Sickle, Hoe, Hammer, Axe} from '../Tool.js';

import {loadJSON} from '../loaders.js'; // That's all for today... Bye ^_^

export async function loadTools(){
	return loadJSON('config/tools.json')
	.then(toolSpec=>{
		return Promise.all([
			SpriteSheet.load(toolSpec.spritesheet),
			toolSpec.width,
			toolSpec.height,
			toolSpec
		]);
	}).then(([sheet, width, height, config])=>{
		const tools = [];
		for(const {name, rect, x, y} of config.tools){
			let Tool;
			switch(name){
				case 'watering_can':
					Tool = WateringCan;
					break;
				case 'sickle':
					Tool = Sickle;
					break;
				case 'hoe':
					Tool = Hoe;
					break;
				case 'hammer':
					Tool = Hammer;
					break;
				case 'axe':
					Tool = Axe;
					break;
			}
			tools.push(new Tool(name, sheet.subImage(...rect, width, height), x, y));
			tools.push(new Tool(`powered_${name}`, sheet.subImage(rect[0], rect[1] + height, width, height), x, y+16));
		}
		return tools;
	});
}