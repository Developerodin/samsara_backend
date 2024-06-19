

// routes/eventRoutes.js
import express from 'express';
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../Controllers/Events.Controller.js';


const eventsRouter = express.Router();

// Create a new event
eventsRouter.post('/', createEvent);

// Get event by ID
eventsRouter.get('/:id', getEventById);

// Get all events
eventsRouter.get('/', getAllEvents);

// Update event
eventsRouter.put('/:id', updateEvent);

// Delete event
eventsRouter.delete('/:id', deleteEvent);

export default eventsRouter;
