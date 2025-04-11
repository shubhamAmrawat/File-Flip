import jwt from 'jsonwebtoken'

const userAuth = async (req, res , next) => {
  try {
    const { token } = req.cookies; 

    if (!token) return res.json({ success: false, message: `Invalid/Missing token` }); 

    const decodeToken = jwt.verify(token, process.env.SECRET_KEY); 

    if (decodeToken.id) {
      req.body = req.body || {}; 
      req.body.userId=decodeToken.id;
    } else {
      return res.json({ success: false, message: "Not Authorized token not found" })
    }

    next(); 
    
  } catch (error) {
    res.json({ success: false, message: `error in  userAuth middleware ${error.message}` });
  }
}

export default userAuth; 