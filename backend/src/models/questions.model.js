import mongoose , {Schema} from "mongoose";

const QuestionSchema = new Schema({
tittle :{
    type:String,
    required:true
},
},
{
    timestamps:true
}
)

export const Question = mongoose.model("Question",QuestionSchema)