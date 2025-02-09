import dbConnect from "@/lib/dbConnect";
import { MatchModel } from "@/model/match.model";
import { OpenAI } from "openai";


export async function POST(request:Request){
    //await dbConnect()

    try {
        const data = await request.json()
        console.log(data)
        const userName = data.params.userName;
        const companyName = data.params.companyName;
        
        console.log("User Name",userName)
        console.log("Company Name", companyName)
        if(!userName || !companyName){
            return new Response("User Name and Company Name are required",{
                status:400
            })
        }
        const openai = new OpenAI({
            apiKey:process.env.OPENAI_API_KEY
        })
        // const prompt = `Generate an extremely funny and viral compatibility score (0-100) between a person named "${userName}" and a company called "${companyName}". Make it hilarious, over-the-top, and shareable on social media.`;
        // const prompt = `
        //     Generate an extremely funny and viral compatibility score (0-100) between a person named "${userName}" and a company called "${companyName}". 
        //     Match "${userName}" with their Sanskrit Rashi (based on their name), and then use this cosmic energy to calculate the compatibility with "${companyName}".
        //     Make it hilarious, over-the-top, and shareable on social media. If the match is too powerful, create an absurdly chaotic outcome!

        //     For example, if the person's name is "Amir," assign the appropriate Rashi, then say something like:
        //     - "Amit, born under the fiery and unpredictable rashi of 'Mesha' (Aries), is destined for a wild ride with this company. Compatibility score: 72%. It’s like a rollercoaster with a rocket booster. Buckle up!"

        //     Go wild. Make it an unforgettable viral moment!
        //     `;
        const prompt = `
            Generate an extremely funny and viral compatibility score (0-100) between "${userName}" and "${companyName}". 
            Match "${userName}" with their name based on Zodiac Signs, then calculate the compatibility with "${companyName}". 
            Make it wildly hilarious, brutal, trolling . make response short 200 character max`;
        

        const aiResponse = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
            temperature: 1.2, // Making it more creative and fun
        });
        const funnyResponse = aiResponse.choices[0].message.content || "Your compatibility is so intense, the AI just sent us a resignation letter. Try again!";
        //insert into db - not now
        console.log(funnyResponse)
        return Response.json({
            success:true,
            message:funnyResponse
        },{
            status:200
        })

    } catch (error) {
        console.error('Error Matching....',error)
        return Response.json(
            {
                success:false,
                message:"Error Matching"
            },{
                status:500
            }
        )
    }
}