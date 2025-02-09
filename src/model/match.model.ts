import mongoose,{Schema,Document} from "mongoose"

export interface Match extends Document{
   userName:string;
   companyName:string;
   compatibilityScore:number;
   compatibility:string;
   createdAt:Date
   udpatedAt:Date
}


const MatchSchema:Schema<Match> = new Schema({
    userName:{
        type:String,
        required:[true,"User Name is Required"]
    },
    companyName:{
        type:String,
        required:[true,"Company Name is Required"]
    },
    compatibilityScore:{
        type:Number
    },
    compatibility:{
        type:String
    }
},{
    timestamps:true
})


export const MatchModel = mongoose.model<Match>('Match',MatchSchema)