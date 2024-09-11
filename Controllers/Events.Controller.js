// controllers/eventController.js

import axios from "axios";
import Event from "../Models/Event.Model.js";
import mongoose from 'mongoose';


// Create a new event

export const createEvent = async (req, res) => {
  console.log("body events  ==>", req.body);
  try {
      const eventData = { ...req.body };

      // Handle coHosts field
      if (typeof eventData.coHosts === 'string') {
          // Parse if coHosts is received as a JSON string
          eventData.coHosts = JSON.parse(eventData.coHosts);
      }

      // Ensure coHosts is an array of ObjectId values
      if (Array.isArray(eventData.coHosts)) {
          // Convert the array of Teacher IDs (coHosts) to ObjectId
          eventData.coHosts = eventData.coHosts.map(id => new mongoose.Types.ObjectId(id));
      } else {
          eventData.coHosts = [];
      }

      // Handle image file upload if exists

      console.log("req.files ==>", req.files);
      if (req.files && req.files.length > 0) {
        eventData.image = req.files.map(file => ({
            filename: file.filename,
            path: file.path.replace(/\\/g, '/')
        }));
    } else {
        eventData.image = [];
    }

      const event = new Event(eventData); // Create a new event with the processed data
      await event.save(); // Save the event in the database

      // Respond with the created event
      res.status(201).json(event);
  } catch (error) {
      console.log("error ==<.", error);
      res.status(500).json({ error: error.message });
  }
};



// Get event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update event
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete event
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateClassMeetingInfo = async (classId, newMeetingNumber, newMeetingPassword) => {
    try {
      // Find the class by ID
      const foundClass = await Event.findById(classId);
  
      if (!foundClass) {
        throw new Error("Class not found");
      }
  
      // Update meeting number and password
      foundClass.meeting_number = "";
      foundClass.status = false;
      // Save the updated class
      await foundClass.save();
  
      // console.log("Class meeting information updated successfully",foundClass);
    } catch (error) {
      console.error("Error updating class meeting information:", error.message);
      throw error; // You can choose to handle or propagate the error as needed
    }
  };

   const deleteMeeting =async(token,meetingId)=> {
    // console.log("Token ====>",token);
    // console.log("MeetingId ====>",meetingId);
    try {
      const result = await axios.delete("https://api.zoom.us/v2/meetings/" + meetingId, {
        headers: {
          'Authorization': 'Bearer ' + token,
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json'
        }
      });
      // console.log("Meeting delete Successfully =======>",result)
      // sendResponse.setSuccess(200, 'Success', result.data);
      return result;
    } catch (error) {
      console.log(error);
     
    }
  }

 export const EndEventMeeting = async (req, res) => {
    const { classId } = req.params;
    const {token,meetingId} = req.body;
    try {
      updateClassMeetingInfo(classId);
      // console.log("End meeting ====>",token,"ID ==================>",meetingId)
      deleteMeeting(token,meetingId);
      res.json({ success: true, message:"Metting End" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };