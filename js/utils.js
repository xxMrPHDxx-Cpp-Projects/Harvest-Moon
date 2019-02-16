export function setupCanvas(id, SCALE=1){
	const canvas = document.querySelector(id);
	canvas.setAttribute('width', 16 * 18 * 2);
	canvas.setAttribute('height', 16 * 14 * 2);
	const ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.scale(SCALE, SCALE);
	return {canvas, ctx};
}