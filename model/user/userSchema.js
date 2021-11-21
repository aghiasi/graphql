const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const {isEmail}= require('validator');
const product = require('../product/productModel');
const Schema = mongoose.Schema;
const {validator,ValidationError,validItem,} = require('../../middleware/validatior');
//userCart nested shema
const Itme = new Schema({
  itemId:{
    type:String,
    required:[true,'شما هیچ محصولی را انتخاب نکرده اید'],
  },
  payment:{
    type:Boolean,
    default:false
  },
  date:{
    type:Date,
    default:Date.now()
  }
})
//user schema for saving data
const userSchema = new Schema({
 name:{ 
  type:String,
  requireq:[true, 'لطفا نام کاربری وارد کنید.'],
  unique:[true,'این نام کاربری وجود دارد'],
  minLength:[3,'نام کاربری کوتاه است']
 },
 email:{
  type:String,
  require:[true,'لطفاایمیل خود را وارد کنید.'],
  unique:true,
  // for development this is off 
  // validate:[isEmail,'این ایمیل قبلا استفاده شده .']
 },
 password:{
  type:String,
  requireq:[true,'لطفا کلمه عبور وارد کنید'],
  minLength:[8,'این کلمه عبور کوتاه است'],
  validate:[validator,'کلمه عبور باید شامل حروف بزرگ ,کوچک,عداد و یک سمبل باشد.'],
 },
 userCart:{
   type:[Itme],
   maxlength:[20,'سبد خرید شما تکمیل شده لطفا بعد از خرید و تصفیه حساب اقدام به خرید نمایید.'],
   default:[],

 },
});

module.exports = userSchema;