const { Note, joiNoteSchema } = require("../../models/noteSchema");
const createError = require("http-errors");

const updateNoteById = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const { error } = joiNoteSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const data = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });

    if (!data) {
      throw createError(404, `Note id:${noteId} was not found`);
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = updateNoteById;