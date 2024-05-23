import express from 'express';

import {
  createSession,
  getAllSessions,
  getSessionById,
  updateSessionById,
  deleteSessionById,
  approveSession,
  createTimeSlot,
  getAllTimeSlots,
  getTimeSlotById,
  updateTimeSlot,
  deleteTimeSlot,
  EndSessionMeeting
} from '../Controllers/CustomSession.Controller.js';

const CustomSessionRouter = express.Router();

// Routes
CustomSessionRouter.get('/time-slots', getAllTimeSlots);
CustomSessionRouter.post('/', createSession);
CustomSessionRouter.get('/', getAllSessions);
CustomSessionRouter.get('/:id', getSessionById);
CustomSessionRouter.put('/:id', updateSessionById);
CustomSessionRouter.delete('/:id', deleteSessionById);
CustomSessionRouter.put('/approve/:sessionId',approveSession);

CustomSessionRouter.post('/time-slots', createTimeSlot);

// Route for getting all time slots


// Route for getting a specific time slot by ID
CustomSessionRouter.get('/time-slots/:id', getTimeSlotById);

// Route for updating a time slot by ID
CustomSessionRouter.put('/time-slots/:id', updateTimeSlot);

// Route for deleting a time slot by ID
CustomSessionRouter.delete('/time-slots/:id', deleteTimeSlot);

CustomSessionRouter.post('/end_meeting/:classId', EndSessionMeeting);

export default CustomSessionRouter;