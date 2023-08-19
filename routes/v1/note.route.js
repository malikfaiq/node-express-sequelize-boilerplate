const express = require('express');
const {jwtAuth} = require('../../middlewares/auth');
const noteController = require('../../controllers/note.controller');
const {checkCache}  = require('../../caching/redis.client')
const router = express.Router();

router
  .route('/')
  .post(jwtAuth('manageNotes'), noteController.createNote)
  .get(jwtAuth('getNotes'), checkCache, noteController.getNotes);

router
.route('/:noteId')
.get(jwtAuth('getNotes'), noteController.getNote)
.patch(jwtAuth('manageNotes'), noteController.updateNote)
.delete(jwtAuth('manageNotes'), noteController.deleteNote);

module.exports = router;

/**
 * @swagger
 * /api/notes:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create a new note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             required:
 *               - text
 *               - type
 *             properties:
 *                text:
 *                 type: string
 *                 format: text
 *                type:
 *                 type: string
 *                 format: text
 *             example:
 *               text: example text
 *               type: exampe type
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Note created successfully
 */


/**
 * @swagger
 * /api/notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Get user specific notes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of Notes
 */