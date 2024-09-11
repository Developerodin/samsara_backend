

// routes/eventRoutes.js
import express from 'express';
import { EndEventMeeting, createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../Controllers/Events.Controller.js';
import path from 'path';
import multer from 'multer';

const eventsRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'media/'); // Adjust the destination folder as needed
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });  

// Create a new event
// eventsRouter.post('/', createEvent);
eventsRouter.post('/',upload.array('image',2), createEvent);

// Get event by ID
eventsRouter.get('/:id', getEventById);

// Get all events
eventsRouter.get('/', getAllEvents);

// Update event
eventsRouter.put('/:id',upload.single('image') ,updateEvent);

// Delete event
eventsRouter.delete('/:id', deleteEvent);

eventsRouter.post('/end_meeting/:classId' ,EndEventMeeting);



export default eventsRouter;
