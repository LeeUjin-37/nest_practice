// 일관성 있는 응답
// response = 응답해주는거니까 실무에서 DTO 안 붙여도 된다.
export class ApiResponse<T = any>{
   message: string;
   data?: T

   // 초기화 생성자
   constructor(message: string, data?: T){
    this.message = message;
    this.data = data;
   }
}