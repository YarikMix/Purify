import highlight from './highlight/highlight';


async function create(color, selection = window.getSelection()) {
	const selectionString = selection.toString();
	if (!selectionString) return;

	let container = selection.getRangeAt(0).commonAncestorContainer as HTMLElement;

	// Sometimes the element will only be text. Get the parent in that case
	// TODO: Is this really necessary?
	while (!container.innerHTML) {
		container = container.parentNode as HTMLElement;
	}

	highlight(selectionString, container, selection, color.color, color.textColor);
}

export default create;
