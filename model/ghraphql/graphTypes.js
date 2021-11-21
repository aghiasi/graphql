const ghraphql= require('graphql');
const {createToken,validToken,} = require('../../middleware/jwt');
const {errorHandle} = require('../../middleware/errorHandle');
const{ GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull,GraphQLBoolean,GraphQLInt } = ghraphql;
//importing models
const User = require('../user/userModel');
const Product = require('../product/productModel');
//schema types
const userType = new GraphQLObjectType({
 name:"User",
 fields:() =>({
   id:{type:GraphQLString},
   name:{type:GraphQLString},
   email:{type:GraphQLString},
   password:{type:GraphQLString},
   Cart:{
    type:new GraphQLList(itemType),
     async resolve(parent,args,{res}){
        const found= parent.userCart.map(async(item)=>{
         const items = await Product.findById(item.itemId);
         return items; 
        })
        return found;
     } } }) });
//
const itemType= new GraphQLObjectType({
 name:"Item",
 fields:() => ({
  id:{type:GraphQLString},
  name:{type:GraphQLString},
  price:{type:GraphQLInt},
  information:{type:GraphQLString},
  summery:{type:GraphQLString},
  snipet:{type:GraphQLString},
  available:{type:GraphQLBoolean},
  userItems:{
    type:userType,
    async resolve(parent,args,context){
      const validation = await validToken(context.cookies["jwt"]);
      const peyment = await User.peymentCheck(validation,parent.id);
    }
  }
 }) });
//exporting modules
module.exports = {userType,itemType,};