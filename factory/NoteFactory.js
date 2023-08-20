class Note {
	constructor(data) {
		this.type = 'note';
	}
	createNote() {
		return `"Note has been created with type ${this.type}"`;
	}
}

class PersonalNote extends Note {
	constructor(data) {
		super();
		this.type = 'Personal';
		this.user = data.user;
		this.text = data.text;
	}
	createNote() {
		return `"Note has been created with type ${this.type}"`;
	}
}

class WorkNote extends Note {
	constructor(data) {
		super();
		this.type = 'Work';
		this.user = data.user;
		this.text = data.text;
	}
	createNote() {
		return `"Note has been created with type ${this.type}"`;
	}
}

class NoteFactory {
	getNote(data) {
		switch (data.type) {
		case 'personal':
			return new PersonalNote(data);
		case 'work':
			return new WorkNote(data);
			// Add more cases for other note types
		default:
			throw new Error(`Unsupported note type: ${data.type}`);
		}
	}
}

module.exports = {
	Note,
	NoteFactory,
	WorkNote,
	PersonalNote
};
