import mongoose from 'mongoose'

const catergorySchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Catergory = mongoose.model("Catergory", catergorySchema)

export default Catergory