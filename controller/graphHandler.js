const {graphqlHTTP} = require('express-graphql');
const {schema} = require('../model/ghraphql/schema');
//contorllers
//home controller
const homepageHandler= (req,res) => {
  res.send('home page');
}
//404 controller
const _404 =(req,res) => {
  res.status(404).send('page not found');
}
//graphql ocntroller
const graphHandler = graphqlHTTP((req,res)=>({
schema,
graphiql:true,
constext:{req,res},
customFormatErrorFn: (err) => {
  res.status(400)
  console.log(err)
  return {message:err,statusCode:403};
},
}));
//exporting modules
module.exports= {graphHandler,homepageHandler,_404};