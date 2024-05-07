const mongoose =require('mongoose')

const employeeSchema =mongoose.Schema(
    {   
        empId:{
            type:String,
            required:true
        },
    
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        department:{
            type:String,
            required:true
        },
        salary:{
            type:Number,
            required:true
        }
    },
        {
            timestamps:true
        }
        )
const Employee= mongoose.model('Employee',employeeSchema)
module.exports=Employee;

