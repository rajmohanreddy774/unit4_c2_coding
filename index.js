
const  express= require('express');
const  mongoose=require('mongoose');

const app=express();

app.use(express.json());
const connect=()=>{
    return mongoose.connect("mongodb+srv://RajMohanReddy:LUh3sl7jMzWSHGh1@cluster0.jg2fm.mongodb.net/evaluation_2?retryWrites=true&w=majority")
};

const userSchema= new mongoose.Schema({
    firstName:{type:String, required:true},
    middleName:{type:String, required:false},
    lastName:{type:String, required:true},
    age:{type:Number, required:true},
    email:{type:String, required:true, unique:true},
    address:{type:String, required:true},
    gender:{type:String, default:true, required:false},
    type:{type:String, required:false},
    createdAt:{type:Date, required:true},
    updatedAt:{type:Date, required: true},
},
{
timeStamps:true

});

const user=mongoose.model("user",userSchema);

const branchSchema= new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String, required:true},
    IFSC:{type:String, required:true},
    MICR:{type:Number, required:true},
    createdAt:{type:Date, required:true},
    updatedAt:{type:Date, required: true},
},
{
timeStamps:true
});

const branch=mongoose.model("branch",branchSchema);

const masterSchema =new mongoose.Schema({
    balance:{type:Number, required:true},
    createdAt:{type:Date, required:true},
    updatedAt:{type:Date, required: true},
},
{
timeStamps:true

});

const master=mongoose.model("master",masterSchema);

const savingsSchema=new mongoose.Schema({
    account_number:{type:Number, required:true,unique:true},
    balance:{type:Number, required:true},
    interestRate:{type:Number, required:true},
    createdAt:{type:Date, required:true},
    updatedAt:{type:Date, required: true},
},
{
timeStamps:true

});

const savings=mongoose.model("savings",savingsSchema);

const fixedSchema= new mongoose.Schema({
    account_number:{type:Number, required:true, unique:true},
    balance:{type:Number, required:true},
    interestRate:{type:Number, required:true},
    startDate:{type:Date, required: true},
    maturityData:{type:Date,required: true},
    createdAt:{type:Date, required:true},
    updatedAt:{type:Date, required: true},
},
{
timeStamps:true

});

const fixed=mongoose.model("fixed",fixedSchema);


app.get("/users", async(req,res)=>{
    try {
        const users=await User.find().lean().exec();

        return res.status(200).send({users:users});
    } catch (err) {
        return res.status(500).send({message:"something is wrong"});
    }
})



app.listen(4000, async()=>{
try {
    await connect();
} catch (err) {
    console.log(error);
}
console.log("listening to port 4000");
})