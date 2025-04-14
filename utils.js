import jwt from "jsonwebtoken";

//generating a token
export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });


//sending token to user in a http-only cookie    
    res.cookie("jwt", token, {
        maxAge: 7* 24*60*60*1000,//millisecond
        httpOnly: true, //prevent Xss attack cross-site scripting attacks
        sameSite: "strict", //CSRF attack cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
};