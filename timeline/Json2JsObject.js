async function Json2JsObject(file) {

	let myObject = await fetch(file);
	
	let JsObject = await myObject.json();
	
	return JsObject;