const { Exercise } = require('../models/exercise');

const HttpError = require('../helpers/HttpError');
const ctrlWrapper = require('../helpers/ctrlWrapper');

// const getAllExercises = async (req, res) => {
//   const { _id: owner } = req.user;
//   const { page = 1, limit = 20 } = req.query;
//   const skip = (page - 1) * limit;
//   const result = await Exercise.find({ owner }, '-createdAt -updatedAt', {
//     skip,
//     limit,
//   }).populate('owner', 'email');
//   res.status(200).json(result);
// };

const getAllExercises = async (req, res) => {
  
  const result = await Exercise.find();
  res.json(result);
};


const getExercisesById = async (req, res) => {
  const { id } = req.params;
  const result = await Exercise.findById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const addExercise = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Exercise.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = {
    getAllExercises: ctrlWrapper(getAllExercises),
    getExercisesById: ctrlWrapper(getExercisesById),
    addExercise: ctrlWrapper(addExercise),
};