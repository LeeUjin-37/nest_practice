import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {

   private openai = new OpenAI({
      apiKey: process.env.OPEN_API_KEY
   })


   async askOpenAI(question:string){
    

   }




}