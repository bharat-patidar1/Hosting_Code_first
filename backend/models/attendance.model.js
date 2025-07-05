import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    date: {
        type: String,
        required: true
    },
    sessions: {
        type: [
            {
                clockIn: {
                    type: Date,
                    required: true,
                },
                clockOut: {
                    type: Date,
                    default: null,
                },
                duration: {
                    type: Number,
                    default: 0,
                },
            }
        ],
        default: []
    },
    totalHoursToday: {
        type: Number,
        default: 0
    },
    isCompleteDay: {
        type: Boolean,
        default: false
    }
},{
    collection : 'Attendance',
    timestamps : true 
})

export const Attendance = mongoose.model('Attendance' , attendanceSchema);