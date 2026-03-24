const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/sendToken");

//Register a user
exports.signup = async (req, res) => {
    const { name, email, password, passwordConfirm, phoneNumber } = req.body;
    let avatar = {};

    //image upload is pending.



    const user = await User.create({
        name,
        email, 
        password,
        passwordConfirm,
        phoneNumber,
        avatar
    });

    sendToken(user, 200, res);
};


//login
exports.login = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Request body is empty. Set Content-Type: application/json and send JSON payload."
        });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password"
        });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    sendToken(user, 200, res);

};

//logout
exports.logout = async (req, res) => {
    res.cookie("jwt", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({  
        success: true,
        message: "Logged out successfully"
    });
};

//get profile
exports.getMe = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: { user }
    });
};
