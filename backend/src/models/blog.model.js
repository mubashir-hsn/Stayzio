import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description: String,
    content:{
        type: Object,
        required: true
    },
    coverImg: String,
    category: String,
    rating : Number,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    comment:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }

},{timestamps:true})

const Blog = mongoose.model("Blog",blogSchema)

export default Blog