function addButtonBorders(Obj, isOver) {
	if (isOver) { // onMouseOver
		Obj.style.border = 'thick inset';
	}
	else { // onMouseOut
		Obj.style.border = 'thick outset';
	}
}