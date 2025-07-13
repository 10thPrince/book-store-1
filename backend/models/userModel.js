import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter a name!"]
    },
    email:{
        type: String,
        required: [true, "Please enter a email!"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please enter a name!"]
    },
},{
    timestamps: true
})

export const User = mongoose.model('User', userSchema)