import mongoose from 'mongoose'

const comentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Blog",
        required: true
    }
},{timestamps:true})

const Comment = mongoose.model("Comment", comentSchema)

export default Comment