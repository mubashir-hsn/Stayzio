import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

const generateToken =  async (userId,res) => {

    const JWT_SECRET_KEY = process.env.JWT_SECRETKEY;

    try {
        const token = jwt.sign( {userId} , JWT_SECRET_KEY , {
            expiresIn: '2d',
        })
       
        res.cookie('jwt',token,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict"
        })
        
        await User.findByIdAndUpdate(userId , {token});
        return token;
    } catch (error) {
        console.log("Error while generating token." , error)
        res.status(500).send({message:"Internal server error."})
    }
}

export default generateToken;