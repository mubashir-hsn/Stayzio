import generateToken from '../jwt/generateToken.js';
import { sendVerificationCode } from '../middleware/Email.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from "cloudinary";


// Register User
export const userSignup = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(401).send({ message: "Email already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    // Create and save the new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      verificationCode
    });

    await newUser.save();
    await sendVerificationCode(newUser.email,verificationCode)
    if (newUser) {
        return res.status(201).send({ 
        message: "User registered. Please verify your email to complete registration.",
      });

    }
  } catch (error) {

    // Handle duplicate key error (in case there are other unique fields)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).send({ message: `${field} already exists.` });
    }

    console.error('User registration error:', error);
    res.status(500).send({ message: "An unexpected error occurred during registeration." });
  }
};

// verify new user email
export const verifyEmail = async(req,res)=>{
  try {

    const {code} = req.body
    const user = await User.findOne({
      verificationCode: code,
    })
    
    if (!user) {
       return res.status(400).send({message : "Invalid or Expired code."})
    }

    user.isVerified = true;
    user.verificationCode = undefined;

    await user.save();

    return res.status(200).send({
      message: "Email verified. You can now log in.",
      user:{
        userId: user._id
      },
    })
  } catch (error) {
    res.status(500).send({message : "Failed to verify email."})
    console.log("Error in verifying email: " , error)
  }
}

// verify existed user email or existed email...
export const emailVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "Email does not exist." });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.verificationCode = verificationCode;
    await user.save();
    await sendVerificationCode(user.email, verificationCode);
    return res.status(200).send({
      message: "We have sent a verification code to your email. Please verify your email.",
    })
    

  } catch (error) {
    console.error("Error during email verification:", error);
    return res.status(500).send({ message: "Failed to send verification code. Please try again later." });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    // Compare provided password with stored hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send({ message: 'Invalid email or password.' });
    }

    // Generate token on successful login
    const token = await generateToken(user._id, res);

    return res.status(200).send({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImg: user.profileImg || { public_id: '', url: '' }
      },
      token:token
    });
  } catch (error) {
    console.error('User login error:', error);
    return res.status(500).send({ message: "Failed to user login." });
  }
};

// logout user
export const logout = async (req, res) => {
  try {
    // Clear the cookie containing the JWT token
    res.clearCookie('jwt');

    // Send success response
    res.status(200).send({ message: "User log out successfully" });
  } catch (error) {
    console.log("Error in logout: " + error.message);
    res.status(500).send({ message: "Failed to user logout" });
  }
};

export const getAllUsers = async(req,res)=>{
  try {
    const users = await User.find({})
    res.status(200).send(users)
    
  } catch (error) {
    console.log("Error in fetching all users: " + error.message);
    res.status(500).send({ message: "Failed to fetch users" });
  }
}

export const deleteUser = async(req,res)=>{
  try {
    const {id} = req.params
    const deleteUser = await User.findByIdAndDelete(id)
    if (!deleteUser) {
      res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted." });
  } catch (error) {
    console.log("Error in deleting user: " + error.message);
    res.status(500).send({ message: "Failed to delete user" });
  }
}
export const updateUserRole = async(req,res)=>{
  try {
    const {id} = req.params
    const {role} = req.body

    const user = await User.findByIdAndUpdate(id, {role} , {new:true})
    if (!user) {
      res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User role updated." , user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    } });
  } catch (error) {
    console.log("Error in update user role: " + error.message);
    res.status(500).send({ message: "Failed to update user role." });
  }
}

export const uploadUserImage = async (req, res) => {
  try {
    // Check if files are present in the request
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "User profile image is required." });
    }

    const { photo } = req.files;

    // Validate image format
    const allowedFormats = ["image/jpeg", "image/png"];
    if (!allowedFormats.includes(photo.mimetype)) {
      return res
        .status(400)
        .json({ message: "Invalid image format. Only JPEG or PNG is allowed." });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(photo.tempFilePath);

    // Check for errors in the Cloudinary response
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error("Cloudinary error: ", cloudinaryResponse.error);
      return res.status(500).json({ message: "Image upload failed. Please try again." });
    }

    // Update the user's profile image in the database
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          profileImg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url, // Use secure_url for HTTPS
          },
        },
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Respond with success
    return res
      .status(200)
      .json({ status: 200, user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImg: user.profileImg || { public_id: '', url: '' }
      },
      token: user.token,
      message: "Profile image uploaded successfully."
     });

  } catch (error) {
    // Handle unexpected errors
    console.error("Error in uploadUserImage: ", error);
    return res.status(500).json({ message: "An error occurred. Please try again." });
  }
};
