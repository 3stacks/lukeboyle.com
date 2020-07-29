const editor = new window.toastui.Editor({
	el: document.querySelector('#editor'),
	height: '500px',
	initialEditType: 'markdown',
	previewStyle: 'vertical'
});

document.getElementById('editor_form').addEventListener('submit', event => {
	event.preventDefault();

	console.log('asdfasdf');
	console.log(editor.getHtml());
});
