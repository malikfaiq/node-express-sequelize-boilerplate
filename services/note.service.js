const httpStatus = require('http-status');
const { Note } = require('../models');
const ApiError = require('../utils/apiError');

/**
 * Create a note
 * @param {Object} noteBody
 * @returns {Promise<Note>}
 */
const createNote = async (noteBody, userId) => {
	return Note.create({
		text: noteBody.text,
		type: noteBody.type,
		userId: userId
	});
};

/**
 * Query for notes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNotes = async (userId) => {
	console.log('---1---');
	const notes = await Note.findAll({ where: { userId } });
	return notes;
};

/**
 * Get note by id
 * @param {ObjectId} id
 * @returns {Promise<Note>}
 */
const getNoteById = async (noteId, userId) => {
	return Note.findOne({ where: { id: noteId, userId } });
};

/**
 * Update note by id
 * @param {ObjectId} noteId
 * @param {Object} updateBody
 * @returns {Promise<Note>}
 */
const updateNoteById = async (noteId, userId, updateBody) => {
	const note = await getNoteById(noteId, userId);
	if (!note) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
	}
	Object.assign(note, updateBody);
	await note.save();
	return note;
};

/**
 * Delete note by id
 * @param {ObjectId} noteId
 * @returns {Promise<Note>}
 */
const deleteNoteById = async (noteId, userId) => {
	const note = await getNoteById(noteId, userId);
	if (!note) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
	}
	await note.destroy();
	return note;
};

module.exports = {
	createNote,
	queryNotes,
	getNoteById,
	updateNoteById,
	deleteNoteById
};
