import mongoose from "mongoose";

export function dbConnection() {
    return mongoose.connect('mongodb+srv://noureldin:2662002nour@cluster0.ghoe1dy.mongodb.net/NotesApp').then(()=>{
        console.log("NotesApp DB connected");
    }).catch((err)=>{
        console.log("DB error "+err);
    })
}