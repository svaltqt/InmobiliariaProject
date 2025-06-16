import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req, res) => {
    const {username} = req.params; // Extract username from request parameters
    try {
        const user = await User.findOne({username}).select("-password"); // Find user by username and exclude password field
        if (!user) return res.status(404).json({error: "User not found"}); // If user not found, return 404

        res.status(200).json(user); // Return user profile data

    } catch (error) {
        console.log("Error in getUserProfile controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const updateUser = async (req, res) => {
    const {fullName, username, email, currentPassword, newPassword, address, tel, type, bio} = req.body; // Extract user data from request body
    let {profileImg} = req.body; // Extract profile image from request body

    const userId = req.user._id; // Get user ID from authenticated request
    try {
       const user = await User.findById(userId); // Find user by ID
       if(!user) return res.status(404).json({error: "User not found"}); // If user not found, return 404

         // Check if current password is provided and matches the user's password
        if((!currentPassword || newPassword) && (!newPassword || currentPassword)) {
            return res.status(400).json({error: "Please provide both current password and new password"}); // If current password or new password is missing, return 400
        }
        if(currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password); // Compare current password with user's password
            if(!isMatch) {
                return res.status(400).json({error: "Current password is incorrect"}); // If current password does not match, return 400
            }
            if(newPassword.length < 6) {
                return res.status(400).json({error: "New password must be at least 6 characters long"}); // If new password is too short, return 400
            }
            const salt = await bcrypt.genSalt(10); // Generate salt for hashing
            user.password = await bcrypt.hash(newPassword, salt); // Hash new password

        }
        if(!profileImg) {
            profileImg = user.profileImg; // If no new profile image is provided, keep the existing one
        }
        



    } catch (error) {
        console.log("Error in updateUserProfile controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }

}