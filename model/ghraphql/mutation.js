const ghraphql= require('graphql');
const {createToken,validToken,} = require('../../middleware/jwt');
const {errorHandle} = require('../../middleware/errorHandle');
const{ GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull,GraphQLBoolean,GraphQLInt } = ghraphql;
//importing models
const User = require('../user/userModel');
const Product = require('../product/productModel');
const {userType,itemType}=require('./graphTypes');
//mutation types
const Mutation = new GraphQLObjectType({
  name:"Mutation",
  fields:{
//sing up the users 
    singup:{
      type:userType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
      },
     async resolve(parent,args,{res}){
        const user =await User(args).save();
        const token = await createToken(user.id)
        res.status(201)
        .cookie('jwt',token,{httpOnly:true,maxAge:1000*60*60});
        return user;
 } },
 //admin mutation : adding products
    addproduct:{
      type:itemType,
      args:{
        name:{type:GraphQLString},
        price:{type:GraphQLString},
        information:{type:GraphQLString},
        summery:{type:GraphQLString},
      },
      async resolve(parent,args,{res}){
        const newProduct = await Product(args).save();
        res.status(201);
        return newProduct;
      },
    },
//user mutation : user adding product
    userAddItem:{
      type:userType,
      args:{
        itemId:{type:GraphQLString},
        }, 
        async resolve(parent,args,context){
          const validation = await validToken(context.cookies["jwt"]);
          context.res.status(201);
           return User.addProduct(validation,args.itemId);
          }
  },
} });

module.exports={Mutation,}