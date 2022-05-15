import throttle from 'lodash.throttle'

const KEY_MESSAGE = 'feedback-form-state';
const savedMessage = localStorage.getItem(KEY_MESSAGE);

const refs = {
	form: document.querySelector('.feedback-form'),
	email: document.querySelector('input'),
	text: document.querySelector('textarea')
}

onPageLoad();

refs.form.addEventListener('input', throttle((onTextInput),500));
refs.form.addEventListener('submit', onFormSubmit);


function onTextInput(e) {
	console.log(e.target);
	const message = e.target.value;
	const name = e.target.name;
	
	let existing = JSON.parse(savedMessage)

	if (existing) {
		existing[name] = message;
	} else {
		existing = {};
		existing[name] = message;
	}

	localStorage.setItem(KEY_MESSAGE, JSON.stringify(existing));
}

function onPageLoad() {
	if (savedMessage) {
		const parsedMessage = JSON.parse(savedMessage);
		if (parsedMessage.email === undefined) {
			refs.email.value = '';
			refs.text.value = parsedMessage.message;
		} else if (parsedMessage.message === undefined) {
			refs.text.value = '';
			refs.email.value = parsedMessage.email;
		} else {
			refs.email.value = parsedMessage.email;
			refs.text.value = parsedMessage.message;
		}
	}

}

function onFormSubmit(e) {
	e.preventDefault();
	console.log(e.target);
	if (refs.email.value && refs.text.value) {
		console.log("Sending form");
	e.target.reset();
	localStorage.removeItem(KEY_MESSAGE);
	} else {
		alert('Please fill all fields')
	}
	
}