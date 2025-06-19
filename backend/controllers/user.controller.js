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
    console.log("Solicitud recibida para actualizar:", req.body); // 👈

    const { fullName, username, email, currentPassword, newPassword, address, tel, type, bio } = req.body;
    let { profileImg } = req.body;

    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Validar cambio de contraseña si se solicita
        if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Proporcione tanto la contraseña actual como la nueva" });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: "La contraseña actual es incorrecta" });
            }
            if (newPassword.length < 6) {
                return res.status(400).json({ error: "La nueva contraseña debe tener al menos 6 caracteres" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        if (email && email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists && emailExists._id.toString() !== user._id.toString()) {
                return res.status(400).json({ error: "Este correo ya está en uso" });
            }
        }

        if (username && username !== user.username) {
            const usernameExists = await User.findOne({ username });
            if (usernameExists && usernameExists._id.toString() !== user._id.toString()) {
                return res.status(400).json({ error: "Este nombre de usuario ya está en uso" });
            }
        }

        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.email = email || user.email;
        user.address = address || user.address;
        user.tel = tel || user.tel;
        user.type = type || user.type;
        user.bio = bio || user.bio;
        user.profileImg = profileImg || user.profileImg;

        await user.save();

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            address: user.address,
            tel: user.tel,
            type: user.type,
            profileImg: user.profileImg,
            bio: user.bio
        });

    } catch (error) {
        console.log("Error in updateUser controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.clearCookie('token');
        res.status(200).json({
            success: true,
            message: "Cuenta eliminada permanentemente"
        });

    } catch (error) {
        console.log("Error in deleteUser controller", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const deactivateUser = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. Marcar como desactivado en DB
        await User.findByIdAndUpdate(userId, {
            active: false,
            deactivatedAt: new Date()
        });

        // 2. Invalidar el token actual
        res.clearCookie("jwt");

        // 3. Responder con flag especial
        res.status(200).json({
            success: true,
            message: "Account deactivated",
            deactivated: true  // Para manejo en frontend
        });

    } catch (error) {
        console.error("Error in deactivateUser:", error);
        res.status(500).json({ error: "Error al desactivar la cuenta" });
    }
};