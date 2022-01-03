import jwt from 'jsonwebtoken'
const verify = (req,res,next)=>{
const authHeader = req.headers.token;//getting token from the header
if(authHeader){
    //getting jwt token from authHeader
const token = authHeader.split(" ")[1]
//verify the Jwt token
jwt.verify(token,process.env.SECRECT_KEY,(err,user)=>{
    if(err)res.status(403).json("token is not valid !")
    // return user if token is valid
    console.log(user)
    req.user = user;
    next();
})
}
else return res.status(401).json("you are not authenticated")
}
export default verify;