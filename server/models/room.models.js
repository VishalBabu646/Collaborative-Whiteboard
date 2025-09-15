import mongoose, { model } from "mongoose"

const DrawingCommandSchema = new mongoose.Schema({
  type: {
    type: String,
    enum:["stroke","clear"], // 'stroke' or 'clear'
    required: true,
  },
  data: {
    type: Object, // path points, color, width, etc.
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const RoomSchema=new mongoose.Schema({
    roomId:{
        required:true,
        type:String,
        unique:true,
    },
   lastActivity:{
        type:Date,
        default:Date.now,
    },

    drawingData:{
        type:[DrawingCommandSchema],
        default:[],

    }
    
},{timestamps:true})
export const Room=mongoose.model("Room",RoomSchema)
