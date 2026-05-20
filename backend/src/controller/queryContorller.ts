import type { NextFunction, Request, Response } from "express";
import { safeParse } from "zod";
import { querySchema } from "../validation/queryValidation";
import  { tavily } from '@tavily/core'
import { PROMPT_TEMPLATE ,SYSTEM_PROMPT } from "../prompt/prompt";
import Groq from "groq-sdk";
import { parse } from "node:path";
import prisma from "../../db";



const client = tavily({apiKey:process.env.TAVILY_API_KEY !})

type Query={
    query:string
    
}

export const purplexityAsk = async (req:Request,res:Response,next:NextFunction)=>{
    try {
    
    
    const response = querySchema.safeParse(req.body)
    const userId = req.user?.id
    if(!userId){
        throw new Error("Unauthorized")
    }
    
    
    
    
    if(!response.success){
        return res.status(400).json({
            success:false,
            message:"Write a valid query"
        })
    }
    
    
    const query = response.data.query
    const webSearchResponse = await client.search(query,{
        searchDepth:"advanced"

    })
    
    const webSearchResult = (await webSearchResponse).results.slice(0,3).map((res,index)=>{
        return `[Source ${index+1}]: ${res.title}\ncontent: ${res.content}\nURL: ${res.url}`
    }).join(`\n\n---\n\n`)

    
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const finalPrompt = PROMPT_TEMPLATE
    .replace('{{WEB_SEARCH_RESULTS}}',webSearchResult)
    .replace('{{USER_QUERY}}',query)

   

    const llm_response =  await groq.chat.completions.create({
        messages: [
            {
                role:"system",
                content:SYSTEM_PROMPT
            },
            {
                
            role: "user",
            content: finalPrompt,
                  

            },

        ],
        model:"llama-3.3-70b-versatile",
        response_format:{type:"json_object"}
    })
    
    
    const rawContent = llm_response.choices[0]?.message?.content || "{}"
    
    const parsedData = JSON.parse(rawContent)
   

    await prisma.query.create({
    data:{
        query:query,
        answer:parsedData.answer,
        followUp:parsedData.followUps,
        user:{
            connect:{id:userId}
        }
    }

   })


    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      answer: parsedData.answer,
      followUps: parsedData.followUps
    }));

    res.end()
        
    } catch (error) {
        console.log("control reaching here")
        console.log(error)
        
    }

}