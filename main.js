import SpriteSheet from './SpriteSheet.js';
import Camera from './Camera.js';
import Mouse from './Mouse.js';

import {loadMap} from './loaders/tiles.js';
import {loadTools} from './loaders/tools.js';
import {loadPlayer} from './loaders/players.js';

const canvas = document.querySelector('canvas#Screen');
const SCALE = 2;
canvas.setAttribute('width', 16 * 16 * SCALE);
canvas.setAttribute('height', 12 * 16 * SCALE);
const ctx = canvas.getContext('2d');
const FPSCounter = document.querySelector('#FPS');
const FPS = 30;
ctx.scale(SCALE, SCALE);
ctx.imageSmoothingEnabled = false;

let camera = new Camera();
let mouse = new Mouse(canvas);
let sprite, tm, tools, player;

async function setup(){
	sprite = await SpriteSheet.load('imgs/crops.png');
	tm = await loadMap();
	tools = await loadTools();
	player = await loadPlayer(40,40);
	// camera.dx = 0.1;

	console.log(player);
}

function update(){
	// camera.move();
	// console.log(camera.x);
	// player.y += 0.5;
	player.update();
}

function draw(){
	camera.draw(ctx);
	tm.draw(ctx, 0, 0);
	tools.forEach(tool=>{
		tool.draw(ctx);
	});

	player.draw(ctx);
}

let lastTime = performance.now(), unprocessedTime = 0;
let frames = 0, ticks = 0;
function animate(){
	const now = performance.now();
	unprocessedTime += (now - lastTime) / 1000 * FPS;
	lastTime = now;

	while(unprocessedTime >= 1){
		update();
		ticks++;
		if(ticks === FPS){
			FPSCounter.textContent = `${frames} FPS`;
			frames = 0;
			ticks = 0
		}
		unprocessedTime--;
	}

	frames++;
	draw();

	requestAnimationFrame(animate);
}

Promise.resolve(setup()).then(animate);