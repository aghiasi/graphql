const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const {isEmail}= require('validator');
const product = require('../product/productModel');
const Schema = mongoose.Schema;
const {validator,ValidationError,validItem,} = require('../../middleware/validatior');
const userSchema = require('./userSchema');
//hashing pasword befor saving in database
userSchema.pre('save',async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password,10);
    next();
  };
  next();
});
//loging user function
userSchema.statics.login = async function(userInput,password){
  if(userInput==null)throw new ValidationError('لطفا نام کاربری یا ایمیل خود را وارد کنید');
  let input;
  if(userInput.name){input = {name:userInput.name }}else{ input = {email:userInput.email}};
  const user = await this.findOne(input);
  if(user){
    const validpass = await bcrypt.compare(password,user.password);
    if(validpass)return user;
  }
  throw new ValidationError('کلمه نام کاربری یا کلمه عبور اشتباه است');
};
//adding product function
userSchema.statics.addProduct= async function(id,userItem){
if (id&&userItem == null) throw new ValidationError('شما محصولی انتخاب نکرده اید');
const user = await this.findById(id);
if(user){
  if(user.userCart.length>10)throw new ValidationError('سبد خرید شما پر شده است')
 const item =await product.findById(userItem);
 if(item){
   user.userCart.push({itemId:userItem});
   user.save();
    return user;  
 }
 throw new ValidationError('ایتم انتخابی موجود نیست.');
}
throw new ValidationError('لطفا وارد شوید یا ثبت نام کنید .')
};
//exporting modules
module.exports = mongoose.model('User',userSchema);