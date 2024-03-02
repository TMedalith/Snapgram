const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../Models/user");


module.exports.Register = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        if (!email || !name || !password || !username) {
            return res.status(422).json({ error: "please add all the fields" })
        }
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(422).json({ error: "user already exists with that email or username" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({ name, email, username, password: hashedPassword });
        await user.save();

        res.json({ message: "saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.Login = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) return res.status(422).json({ error: "please add email or password" })


        let user;
        if (usernameOrEmail.includes('@')) {
            user = await User.findOne({ email: usernameOrEmail });
        } else {
            user = await User.findOne({ username: usernameOrEmail });
        }

        if (!user) {
            return res.status(422).json({ error: "Invalid Email or Username or password" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(422).json({ error: "Invalid Email or Username or password" })
        }

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
        const { _id, name, email, username, profilePicture } = user;
        return res.json({ token, user: { _id, name, email, username, profilePicture } })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}