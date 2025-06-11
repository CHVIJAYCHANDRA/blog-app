import mongoose from "mongoose";

export const ConnectDB = async () =>{
    await mongoose.connect('mongodb+srv://vijay:<vijaychakka123456>@cluster0.4wpwjhd.mongodb.net/blog-app');
    console.log("DB Connected");
}