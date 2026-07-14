import { User } from "../models/user.model";

// Register User

const registerUser = async ({fullName, email, password}) =>{
    // check if user already exists
    const existingUser = await User.findOne({email});

    if(existingUser){
        throw new Error("user already exists");
    }

    // create new user
    const user = await User.create({
        fullName,
        email,
        password,
    });

    return user;
};

// Login User

const loginUser = async ({email, password}) =>{
    // get user with password
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new Error("Invalid email or password");
    }

    // compare password
    
    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new Error("Invalid email or password");
    }

    // Generate Access Token 
    const accessToken = user.generateAccessToken();

    // Remove password before returning
    user.password = undefined;

    return{
        user,
        accessToken,
    };
};

// Logout User

const logoutUser = async () =>{
    return true;
};

export {registerUser, loginUser, logoutUser};

