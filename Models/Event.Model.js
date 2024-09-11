import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
    },
    image: [{
        filename: String, 
        path: String,
    } ],
    startDate: {
        type: Date,
    },
    startTime: {
        type: String,
    },
    eventType: {
        type: String,
    },
    details: {
        type: String,
    },
    password: {
        type: String,
        default: ""
    },
    meeting_number: {
        type: String,
        default: ""
    },
    status: {
        type: Boolean,
        default: false,
    },
    endDate: {
        type: Date, 
    },
    endTime: {
        type: String, 
    },
    address: {
        type: String, 
    },
    state: {
        type: String, 
    },
    city: {
        type: String, 
    },
    coHosts: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Teacher'
        }
    ]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
