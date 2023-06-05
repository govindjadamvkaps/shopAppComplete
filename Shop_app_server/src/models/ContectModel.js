import mongoose from "mongoose";

const contectSchema= new mongoose.Schema({
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true},
    subject:{type:String, required:true},

    message:{type:String, required:true}
},
{
    timestamps:true
})

const ContactModel = new mongoose.model('contact', contectSchema)

export default ContactModel