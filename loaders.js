export function loadImage(url){
	return new Promise(resolve=>{
		const image = new Image();
		image.src = url;
		image.onload = ()=>{
			resolve(image);
		}
	}).catch(e=>{
		console.log(`Failed to load image at URL: "${url}"`);
	});
}

export function loadText(url){
	return fetch(url).then(res=>res.text());
}

export function loadJSON(url){
	return fetch(url).then(res=>res.json());
}