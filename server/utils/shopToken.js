//create token and saving that in  cookies
const sendShopToken = (shop, statusCode, res) => {
  const shop_token = shop.getJwtToken();

  //options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("shop_token", shop_token, options).json({
    success: true,
    shop,
    shop_token,
  });
};
module.exports = sendShopToken;
