import mongoose from "mongoose";
import bcrypt from "bcrypt";


const userSchema=new mongoose.Schema({

   email:{
  type:String,
  required:true,
  unique:true,
  lowercase:true,
  trim:true,
  match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please provide a valid email address'] ,
  index:true
   },

   password:{
   type:String,
   required:true,
   },
      name:{
     type:String,
     trim:true
   },
},{
timestamps:true
});


    userSchema.pre("save",async function (){
 if(!this.isModified("password"))
    return;

 this.password=await bcrypt.hash(this.password,10);
    })

    userSchema.methods.isPasswordCorrect= async function(password){
        return await bcrypt.compare(password,this.password);
    }


const User=mongoose.model("User",userSchema);

export default User;