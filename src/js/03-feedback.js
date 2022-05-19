import throttle from 'lodash.throttle'

const KEY_MESSAGE = 'feedback-form-state';
const savedMessage = localStorage.getItem(KEY_MESSAGE);
const parsedMessage = JSON.parse(savedMessage);

const refs = {
	form: document.querySelector('.feedback-form'),
	email: document.querySelector('input'),
	textarea: document.querySelector('textarea')
}

onPageLoad();

const formData = {
	email: refs.email.value,
	message: refs.textarea.value,
};

refs.form.addEventListener('input', throttle((onTextInput),500));
refs.form.addEventListener('submit', onFormSubmit);


function onTextInput(e) {
	let name = e.target.name;
	let value = e.target.value;

		formData[name] = value,

	localStorage.setItem(KEY_MESSAGE, JSON.stringify(formData));
}

function onPageLoad() {

			if(!parsedMessage) {
				return;
			}

			refs.email.value = parsedMessage.email || "";
			refs.textarea.value = parsedMessage.message || "";
	}

function onFormSubmit(e) {
	e.preventDefault();

	const submitResult = {
		[e.target.email.name]: e.target.email.value,
		[e.target.message.name]: e.target.message.value 
	}

	console.log(submitResult);

		e.target.reset();
	localStorage.removeItem(KEY_MESSAGE);
}