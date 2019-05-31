import {loadBackground} from './layers.js';
import {setupCanvas} from './utils.js';
import {loadPlayer} from './players.js';

const WIDTH = 1024, HEIGHT = 992;
const SCALE = 4;
const {canvas, ctx} = setupCanvas('#Screen', SCALE);
const FPSCounter = document.querySelector('#FPS');
const FPS = 30;

let player, background;

async function setup(){
	background = await loadBackground();
	player = await loadPlayer(10, 10);
	console.log(player);
}

function update(){
	console.log('updating...')
	player.update();
}

function draw(){
	ctx.drawImage(background, 0, 0);
	player.draw(ctx);
	// ctx.drawImage(player.animation.image,0,0);
}

let lastTime = performance.now(), now, unprocessedTime = 0;
let ticks = frames = 0;
function animate(){
	now = performance.now();
	unprocessedTime += (now - lastTime) / 1000 * FPS;
	lastTime = now;

	while(unprocessedTime >= 1){
		update();
		ticks++;
		if(ticks === 60){
			FPSCounter.innerText = `${frames} FPS`;
			ticks = frames = 0;
		}
		unprocessedTime--;
	}

	frames++;
	draw();

	requestAnimationFrame(animate);
}

Promise.resolve(setup()).then(animate);