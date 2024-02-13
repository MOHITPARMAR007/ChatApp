const mongoose= require('mongoose')


// Connect to MongoDB
const ConnectDB = async() =>
{
 
 const connectionParams = {
    // useNewUrlParser : true ,
    // useUnifiedTopology : true,
 };
mongoose.connect (process.env.dburl, connectionParams).then(()=>
{
    console.info(" monodo db is connectedd succefull ");
    
})
.catch ((e)=>{
    console.log ("Error :",e);
});
}

module.exports = ConnectDB;
/////