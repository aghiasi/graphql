const ghraphql= require('graphql');
const {createToken,validToken,} = require('../../middleware/jwt');
const {errorHandle} = require('../../middleware/errorHandle');
const{ GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull,GraphQLBoolean,GraphQLInt } = ghraphql;
//importing models
const User = require('../user/userModel');
const Product = require('../product/productModel');
const {userType,itemType}=require('./graphTypes');
const {Mutation}=require('./mutation');
//query types
const RootQuery = new GraphQLObjectType({
 name:"RootQuery",
 fields:{
  login:{
   type:userType,
   args:{
    name:{type:GraphQLString},
    email:{type:GraphQLString},
    password:{type:GraphQLString}
   },
    async resolve(parent,args,{res}){
      const userInput = {email:args.email,name:args.name};
      const user =await User.login(userInput,args.password);
      const token =await createToken(user.id);
      res.cookie('jwt',token,{maxAge:1000*60*60});
      return user
 } },
  logout:{
    type:GraphQLString,
    resolve(parent,args,{res}){
    res.cookie('jwt','',{maxAge:1});
      return 'user loged out';
    }
  },  
  allitems:{
    type :new GraphQLList(itemType),
    args:{
      id:{type:GraphQLString},
      name:{type:GraphQLString},
    },
    async resolve(parent,arg,{res}){
      const product = await Product.find({});
      return product;
    }
  },
  item:{
    type:itemType,
    args:{
      id:{type:GraphQLString},
      name:{type:GraphQLString}
    },
    async resolve(parent,args){
      const product = await Product.findOne(args);
      return product;
    }
  },
} });
//graph schema
const schema = new GraphQLSchema({
 query:RootQuery,
  mutation:Mutation,
});
//exporting moduel
module.exports ={
  schema,
} 