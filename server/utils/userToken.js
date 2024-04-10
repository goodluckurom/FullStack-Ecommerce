//create token and saving that in  cookies
const sendToken = (user, statusCode, res) => {
  const user_token = user.getJwtToken();

  //options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("user_token", user_token, options).json({
    success: true,
    user,
    user_token,
  });
};
module.exports = sendToken;
