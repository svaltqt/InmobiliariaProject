import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        minLength:6,
    },
    fullName:{
        type: String,
        required:false,
    }
    ,
    address:{
        type: String,
        required: false
    },
    tel:{
        type: String
    },
    type:{
        type: String
    },
    favorites:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[]
        }
    ],
    profileImg:{
        type: String,
        default:"",
    },
    bio:{
        type:String,
        default:"",
    }
},{
    timestamps: true
})

const User = mongoose.model("User", UserSchema);
export default User;