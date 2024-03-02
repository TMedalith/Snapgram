const User = require("../Models/user");

module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } });
        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
    }
};

module.exports.editProfile = async (req, res) => {
    try {
        const { name, username, email, profilePicture } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.name = name;
        user.username = username;
        user.email = email;
        user.profilePicture = profilePicture;
        await user.save();
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error(error);
    }
}

module.exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.deleteOne();
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error(error);
    }
}

module.exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.error(error);
    }
}
