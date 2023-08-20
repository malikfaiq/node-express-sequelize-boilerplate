class Note {
	constructor(text) {
		this.text = text;
		this.type = 'Normal';
	}

	getNote() {
		return { type: this.type, text: this.text };
	}
}

class PersonalNote extends Note {
	constructor(text) {
		super();
		this.text = text;
		this.type = 'PersonalNote';
	}
}

modules.export = Note;
