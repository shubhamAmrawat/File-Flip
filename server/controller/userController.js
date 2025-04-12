import userModel from "../models/usermodel.js";

export const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.json({ success: false, message: `UserId is missing` });

    const user = await userModel.findById(userId);

    if (!user) return res.json({ success: false, message: 'User not found ' })


    return res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified
      }
    })
  } catch (error) {
    return res.json({ success: false, message: `Error in getUserData controller ${error.message}` })
  }
}