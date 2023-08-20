const httpStatus = require('http-status');
const ApiError = require('../utils/apiError');
const catchAsync = require('../utils/catchAsync');
const { noteService } = require('../services');
const logger = require('../logging/logger');
const { checkCache, cacheData } = require('../caching/redis.client');

const createNote = catchAsync(async (req, res) => {
	let note = null;

	try {
		note = await noteService.createNote(req.body, req.user.id);
		res.status(httpStatus.CREATED).send(note);
	} catch (error) {
		logger.error(error);
		res
			.status(httpStatus.INTERNAL_SERVER_ERROR)
			.send({ message: 'Please provide valid data' });
	}
});

const getNotes = catchAsync(async (req, res) => {
	const userId = req.user.id;
	try {
		const results = await noteService.queryNotes(userId);
		cacheData(req, results);
		res.send({ data: results });
	} catch (error) {
		logger.error(error);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error });
	}
});

const getNote = catchAsync(async (req, res) => {
	const note = await noteService.getNoteById(req.params.noteId, req.user.id);
	if (!note) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Note not found');
	}
	res.send(note);
});

const updateNote = catchAsync(async (req, res) => {
	try {
		const note = await noteService.updateNoteById(
			req.params.noteId,
			req.user.id,
			req.body
		);
		res.send(note);
	} catch (error) {
		logger.error(error);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error });
	}
});

const deleteNote = catchAsync(async (req, res) => {
	try {
		await noteService.deleteNoteById(req.params.noteId, req.user.id);
		res.status(httpStatus.NO_CONTENT).send();
	} catch (error) {
		logger.error(error);
		res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: error });
	}
});

module.exports = {
	createNote,
	getNotes,
	getNote,
	updateNote,
	deleteNote
};
