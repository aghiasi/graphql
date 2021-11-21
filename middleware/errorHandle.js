
const errorHandle = (error,res) => {
  let errors = [

  ]
  if(error.code ===11000){
     
  return{"duplicatoin":"this name is exist"};
  }
  throw error.message;
};
module.exports = {errorHandle,};