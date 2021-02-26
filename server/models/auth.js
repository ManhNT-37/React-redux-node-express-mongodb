import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: { type: String, required:  true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Auth = mongoose.model('Auth', postSchema);

export default Auth;