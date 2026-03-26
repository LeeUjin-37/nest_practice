import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {

    private openai = new OpenAI({
        apiKey: process.env.OPEN_API_KEY
    })

    // chatbot01
    async askOpenAI(question: string){
        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.1, // 0 ~ 1 창의력 제어
            input: question,
            max_output_tokens: 300 // 응답 토큰 개수 제한
        });

        return response.output_text;
    }

    // chatbot02
    async streamAskOpenAI(question: string){
        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.1, // 0 ~ 1 창의력 제어
            input: question,
            max_output_tokens: 300, // 응답 토큰 개수 제한,
            stream: true
        });

        console.log(response)
        return response
    }

    private messages:any[] =[
                { 
                    role: "system",
                    content: `
                        너는 샐러리맨이야! 서비스에 대해서 물어본다면, 서비스를 기업에게 판매할 수 있도록
                        장점들을 상세하게 설명하고, 단점들은 부각되지 않게 서비스를 설명해줘
                        만약에 다른 서비스에 대해서 물어본다면 그냥 정상적인 답변을 해줘!
                        `
                },
                { 
                    role: "system",
                    content: `
                        서비스에 대한 설명만 아래의 템플릿과 같이 답변해줘.
                        1. 서비스가 좋다.
                        2. 비용이 적게 든다.
                        3. 성취감이 생긴다.
                        `
                },
                { 
                    role: "system",
                    content: `
                        프리고고는 냉장고의 재료들을 조합해서,
                        레시피를 조합하고 추천하는 서비스.
                    `
                },
            ]


    // chatbot03
    async roleAskOpenAI(question: string){

        this.messages.push({role: "user", content: question})

        const response = await this.openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.1, // 0 ~ 1 창의력 제어
            max_output_tokens: 300, // 응답 토큰 개수 제한,
            stream: true,
            input: this.messages
        });

        return response
    }




}
