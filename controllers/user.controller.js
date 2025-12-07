const user = require("../Models/Users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../Models/roles.model");
const { sendOtp } = require("./otp.controller");
const axios = require("axios");

class userhandler {
    constructor() { }


    async getAll(req, res) {
        try {
            const found = await user.find();
            if (!found) return res.status(404).json({ msg: "user is not found" });
            return res.status(200).json({ "Found": found });
        } catch (error) {
            return res.status(500).json({ "error founding problem": error });
        }
    }


    async getById(req, res) {
        try {
            const id = req.params.id;
            const found = await user.findById(id);
            if (!found) return res.status(404).json({ msg: "user is not found" });
            return res.status(200).json({ "Found": found });
        } catch (error) {
            return res.status(500).json({ "error id fetching problem": error });
        }
    };


 async login(req, res) {
  try {
    const currentUser = await user.findOne({ email: req.body.email }).populate("role");

    if (!currentUser)
      return res.status(404).json({ message: "Invalid email or password" });

    const validPassword = await bcrypt.compare(req.body.password, currentUser.password);
    if (!validPassword)
      return res.status(404).json({ message: "Invalid email or password" });

    // If NOT verified → Send OTP
    if (!currentUser.isVerified) {

      await axios.post("http://localhost:5000/api/v1/otp/send", {
        email: currentUser.email,
      });

      return res.json({
        sendOtp: true,
        email: currentUser.email,
        message: "Please verify your email. OTP has been sent."
      });
    }

    // Generate token (FIXED ROLE)
    const token = jwt.sign(
      { _id: currentUser._id, role: currentUser.role?._id },
      process.env.SECRET_KEY,
      { expiresIn: Number(process.env.JWT_TOKEN_EXPIRES_IN) }
    );

    return res.status(200).json({
      token,
      user: currentUser,
      sendOtp: false
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed" });
  }
}




    async CreateUser(req, res) {
  try {
    const { name, email, password, contact, birthDate, role, image, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (isVerified = false)
    const created = await user.create({
      name,
      email,
      password: hashedPassword,
      contact,
      birthDate,
      role,
      image,
      address,
      isVerified: false
    });

    if (!created)
      return res.status(404).json({ msg: "user is not created" });

    // SEND OTP after signup
    await axios.post("http://localhost:5000/api/v1/otp/send", {
      email: created.email,
    });

    return res.status(200).json({
      success: true,
      sendOtp: true,
      email: created.email,
      message: "Account created. Please verify your email. OTP sent!"
    });

  } catch (error) {
    console.error("signup error ===>", error);
    return res.status(500).json({ error: error.message });
  }
}



    async updated(req, res) {        
        try {      
            
            const id = req.params.id;
            
            if(typeof req.body.role === "string"){
                const roleDoc = await Role.findOne({Name: new RegExp(`^${req.body.role}$` , 'i')});
                if (roleDoc) {
                    req.body.role = roleDoc._id;
                }else{
                    console.log("role not found:" , req.body.role);
                    
                    return res.status(400).json({msg: "invalid role string"});
                }
            }

             const {name, email, contact , birthDate , role } = req.body;

            const updated = await user.findByIdAndUpdate(req.params.id, { name , email, contact ,  birthDate , role }, { new: true });

            if (!updated) return res.status(404).json({ msg: "user is not updated" });

            const key = process.env.SECRET_KEY;
            const payload = {_id: updated._id, role: updated.role};
            const expiresInSeconds = Number(process.env.JWT_TOKEN_EXPIRES_IN);
            const token = jwt.sign(payload,key, {expiresIn: expiresInSeconds});

            return res.status(200).json({ 
                success: true,
                token,
                msg: "user updated successfully",
                user: updated ,
             });
        } catch (error) {
            // console.log("update error===>",error);
            console.error("update error:" , error.message);
            
            return res.status(500).json({ "error updating problem": error });
        }
    };

    async deleteUser(req, res) {
        try {
            const id = req.params.id;

            const deleted = await user.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ msg: "user is not deleted" });
            return res.status(200).json({ " user deleted": deleted });
        } catch (error) {
            return res.status(500).json({ "error deleting problem": error.message });
        }
    };





}

const userHandler = new userhandler();

module.exports = userHandler;