import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import userRoutes from './src/routes/user.routes.js'
import blogRoutes from './src/routes/blog.routes.js'
import commentRoutes from './src/routes/comment.routes.js'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from "cloudinary";

// env config
dotenv.config()
const PORT = process.env.PORT || 4000;

// Middlewares
const app = express()
app.use(express.json({limit : '50mb'}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors(
   {
       origin : "http://localhost:5173",
       credentials : true,
   }
))

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir: "/tmp/"
}))


// MongooDB Connection

const MONGODB_URL = process.env.MONGODB_URL

try {

  await mongoose.connect(MONGODB_URL)
  console.log('Mongoodb is connected successfully.')
  
} catch (error) {
  console.log('Mongoodb connection error: ',error)
}

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//  user , blog & comments routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})