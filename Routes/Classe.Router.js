import express from 'express';
import { addStudentToClass, assignTeacherToClass, createClass, deleteClass, getAllClasses, getClassById, getClassesByTeacher, removeStudentFromClass, updateClass } from '../Controllers/Classes.Controller.js';


const classRouter = express.Router();

// Route for creating a new class
classRouter.post('/', createClass);

// Route for getting all classes
classRouter.get('/', getAllClasses);

// Route for getting a class by ID
classRouter.get('/:classId', getClassById);

// Route for updating a class
classRouter.put('/:classId', updateClass);

// Route for deleting a class
classRouter.delete('/:classId', deleteClass);

// Route for assigning a teacher to a class
classRouter.put('/:classId/assign-teacher/:teacherId', assignTeacherToClass);

// Route for adding a student to a class
classRouter.put('/:classId/add-student/:studentId', addStudentToClass);

// Route for removing a student from a class
classRouter.put('/:classId/remove-student/:studentId', removeStudentFromClass);

// Route for getting classes by teacher
classRouter.get('/teacher/:teacherId', getClassesByTeacher);

export default classRouter;
