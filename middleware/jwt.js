const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken =async (id) => {
  console.log(id);
 const token = await jwt.sign(id,process.env.SECRET_KEY);
 return token;
}
const validToken = async (token) => {
  const isValid = await jwt.verify(token,process.env.SECRET_KEY)
  return isValid;
}
module.exports = {createToken,validToken,};