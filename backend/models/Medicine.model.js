const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    name: {
        type: String,
        required: [true, 'Medicine name is required'],
        trim: true
    },

    dosage: {
        type: String,
        required: [true, 'Dosage information is required'],
        trim: true
    },

    frequency: {
        type: String,
        required: [true, 'Frequency information is required'],
        trim: true
    },

    reminderTime: {
        type: String,
        required: [true, 'Reminder time is required']
    },

    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },

    endDate:{
        type: Date
    },

    status:{
        type:String,
        enum:["active","completed"],
        default:"active"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model("Medicine", medicineSchema);