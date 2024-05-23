import { CustomSession, TimeSlot } from "../Models/CustomSession.Model.js";



// Create a new custom session
const createSession = async (req, res) => {
    console.log(req.body)
  try {
    const session = await CustomSession.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error creating session', details: error.message });
  }
};

// Get all custom sessions
const getAllSessions = async (req, res) => {
  try {
    const sessions = await CustomSession.find().populate('teacher').populate('user').populate('timeSlot').exec();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching sessions', details: error.message });
  }
};

// Get a specific custom session by ID
const getSessionById = async (req, res) => {
  const sessionId = req.params.id;
  try {
    const session = await CustomSession.findById(sessionId).populate('teacher').populate('user').populate('timeSlot').exec();
    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching session', details: error.message });
  }
};

// Update a custom session by ID
const updateSessionById = async (req, res) => {
  const sessionId = req.params.id;
  try {
    const session = await CustomSession.findByIdAndUpdate(sessionId, req.body, { new: true });
    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: 'Error updating session', details: error.message });
  }
};

// Delete a custom session by ID
const deleteSessionById = async (req, res) => {
  const sessionId = req.params.id;
  try {
    const session = await CustomSession.findByIdAndDelete(sessionId);
    if (!session) {
      res.status(404).json({ error: 'Session not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting session', details: error.message });
  }
};

const approveSession = async (req, res) => {
    const { sessionId } = req.params;
     const {status} = req.body;
    try {
      // Find the session by ID
      const session = await CustomSession.findById(sessionId);
  
      if (!session) {
        return res.status(404).json({ error: 'Session not found' });
      }
      session.sessionValue = status;
      await session.save();
      // Check if the session is already approved
   
  
      // Update the status to 'approved' and set 'approved' to true
     
    
  
      // Save the updated session
   
  
      // Return the updated session
      res.json(session);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // ===============================================================================================================

  const createTimeSlot = async (req, res) => {
    try {
      const { timeRange } = req.body;
      console.log("Tiem Slot  ===>",timeRange)
     
      const newTimeSlot = new TimeSlot({ timeRange });
      await newTimeSlot.save();
      res.status(201).json(newTimeSlot);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getAllTimeSlots = async (req, res) => {
    try {
      console.log("Data =====>")
      const timeSlots = await TimeSlot.find();
      res.json(timeSlots);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getTimeSlotById = async (req, res) => {
    try {
      const timeSlot = await TimeSlot.findById(req.params.id);
      if (timeSlot) {
        res.json(timeSlot);
      } else {
        res.status(404).json({ message: "Time slot not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateTimeSlot = async (req, res) => {
    try {
      const { timeRange } = req.body;
      await TimeSlot.findByIdAndUpdate(req.params.id, { timeRange });
      res.json({ message: "Time slot updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const deleteTimeSlot = async (req, res) => {
    try {
      await TimeSlot.findByIdAndDelete(req.params.id);
      res.json({ message: "Time slot deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateClassMeetingInfo = async (classId, newMeetingNumber, newMeetingPassword) => {
    try {
      // Find the class by ID
      const foundClass = await CustomSession.findById(classId);
  
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

 const EndSessionMeeting = async (req, res) => {
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
export {
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
};
