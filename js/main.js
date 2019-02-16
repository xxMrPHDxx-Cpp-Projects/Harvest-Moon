import {loadBackground} from './layers.js';
import {setupCanvas} from './utils.js';

const WIDTH = 1024, HEIGHT = 992;
const SCALE = 4;
const {canvas, ctx} = setupCanvas('#Screen', SCALE);

loadBackground()
.then(background=>{
	ctx.drawImage(background, 0, 0);
});