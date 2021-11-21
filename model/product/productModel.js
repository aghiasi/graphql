const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
 name:{
  type:String,
  maxlength:[20,'max character should be less than 20'],
  require:true,
 },
 price:{
  type:Number,
  maxlength:[50,'max price for this item'],
  default:0,
 },
 information:{
  type:String,
  requireq:true,
  maxlength:[120,'max length of information is 120 '],
 },
 summery:{
  type:String,
  maxlength:[50,'max char of summery is less than 50'],
  default:'new product',
 },
 snipet:{
  type:String,
  maxlength:[30,'max char of snipet is less than 30'],

 },
 available:{
  type:Boolean,
  default:true
 }
});
productSchema.pre('save',async function(next){
this.snipet = this.information.slice(0,25) + ' ...';
next();
});
module.exports = mongoose.model('Product',productSchema);
