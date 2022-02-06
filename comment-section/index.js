const comments = [];
const addNewCommentElement = document.querySelector('.comments__new_comment').cloneNode(true);

const dfs = (comment, parent) => {
	const listItem = document.createElement('li');
	const childWrapper = document.createElement('ul');
	listItem.textContent = comment.text;
	listItem.id = comment.id;
	const anchor = document.createElement('button');
	anchor.textContent = 'Reply'
	const clonnedNode = addNewCommentElement.cloneNode(true);
	clonnedNode.classList.add('hidden');
	anchor.onclick = function () {
		clonnedNode.classList.toggle('hidden');
	};
	listItem.appendChild(anchor);
	parent.appendChild(listItem);
	parent.appendChild(clonnedNode);
	for (let reply of comment.replies) {
		dfs(reply, childWrapper);
	}
	if (childWrapper.childNodes.length > 0)
		parent.appendChild(childWrapper);
}
const render = (updatedComments) => {
	const commentsWrapper = document.querySelector('.comments-wrapper')
	commentsWrapper.innerHTML = '';
	console.log(updatedComments);
	for (let comment of updatedComments) {
		dfs(comment, commentsWrapper);
	}
}

const dfsInsert = (comment, id, value) => {
	if (comment.id === Number(id)) {
		comment.replies.push({id: Date.now(), text: value, replies: []})
		return;
	}
	for (let i of comment.replies) {
		dfsInsert(i, id, value );
	}
}

function addNewComment() {
	const {value} = this.querySelector('input');
	const {id} = this.previousSibling;
	if (id)
		comments.forEach(comment => {
			dfsInsert(comment, id, value);
		})
	else {
		comments.push({id: Date.now(), text: value, replies: []})
	}
	render(comments);
}

render(comments);
