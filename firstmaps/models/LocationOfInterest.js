import mongoose from 'mongoose'


const LocationsOfInterestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide name of point of interest'],
        unique: true,
        trim: true,
        maxlength: [50, 'name can not be more than 50 characters']
    },
    description: {
        type: String,
        required: true,
        maxlength: [500, 'description can not be more than 500 characters'],
    },
    category: {
        type: String,
        required: true,
        maxlength: [50, 'description can not be more than 500 characters'],
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type:{
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
})

// if the LocationsOfInterestSchema db exists, export it. if not, create it and export it
module.exports = mongoose.models.LocationOfInterest || mongoose.model('LocationOfInterest', LocationsOfInterestSchema)

