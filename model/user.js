import mongoose from "mongoose";

const studentListSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    registration_no:{
        type:String,
    },
    email:{
        type:String,
    },
    semester:{
        type:String
    }
})

const StudentList= new mongoose.model('StudentList',studentListSchema)

export default StudentList;