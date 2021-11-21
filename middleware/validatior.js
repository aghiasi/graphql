//password validator for saving in data base
const validator =(password) => {
  let valid = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  if(valid.test(password)) return true;
  return false;
}
//validationError
class ValidationError extends Error {
  constructor(message){
    super(message);
    this.name = 'ValidationError';
    this.message = message;
  }
}
//item validation
const validItem = async(id) => {
 const item = await product.findById(id);
 if(item &&item.available)return true;
 return false;
}
//exporting modules
module.exports = {validator,ValidationError,validItem,}