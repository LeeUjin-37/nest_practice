import { ApiProperty } from "@nestjs/swagger";
import { AuthProvider } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class MemberRegisterDTO {

 // model Member
 @ApiProperty({example: "test123@gmail.com", description: "회원 이메일"})
 @IsString()
 memberEmail: string;
 
 @ApiProperty({example: "이유진", description: "회원 이름"})
 @IsString() @IsNotEmpty()
 memberName: string;
 
 @ApiProperty({example: 20, description: "회원 나이"})
 @IsOptional() @IsNumber()
 memberAge?: number;
 
 @ApiProperty({example: "서울시 강남구", description: "회원 주소"})
 @IsOptional() @IsString()
 memberAddress?: string;
 
 @ApiProperty({example: "https://myprofile.com/myprofile.jpg", description: "회원 이미지"})
 @IsOptional() @IsString()
 memberProfile?: string;
 
 // model AuthAccount
 @ApiProperty({example: "LOCAL", description: "회원 가입 경로"})
 @IsEnum(AuthProvider)
 memberProvider: AuthProvider;
 
 @ApiProperty({example: "test123!@#", description: "회원 비밀번호"})
 @IsString() @IsOptional()
 memberPassword?: string;
 
 @ApiProperty({example: "100120415434", description: "회원 비밀번호"})
 @IsString() @IsOptional()
 memberProviderId?: string;

}

export class MemberUpdateDTO {
 @ApiProperty({example: "이유진", description: "회원 이름"})
 @IsString() @IsNotEmpty()
 memberName: string;
 
 @ApiProperty({example: 20, description: "회원 나이"})
 @IsOptional() @IsNumber()
 memberAge?: number;
 
 @ApiProperty({example: "서울시 강남구", description: "회원 주소"})
 @IsOptional() @IsString()
 memberAddress?: string;
 
 @ApiProperty({example: "https://myprofile.com/myprofile.jpg", description: "회원 이미지"})
 @IsOptional() @IsString()
 memberProfile?: string;

 @ApiProperty({example: "test123!@#", description: "회원 비밀번호"})
 @IsString() @IsOptional()
 memberPassword?: string;

}


// 로컬에서 로그인 하는 경우
export class LocalLoginDTO {
 @ApiProperty({example: "test123@gmail.com", description: "회원 이메일"})
 @IsString()
 memberEmail: string;

 @ApiProperty({example: "test123!@#", description: "회원 비밀번호"})
 @IsString()
 memberPassword: string;

}

// 소셜 로그인
export class OAuthLoginDTO {
 @ApiProperty({example: "test123@gmail.com", description: "회원 이메일"})
 @IsString()
 memberEmail: string;
 
 @ApiProperty({example: "이유진", description: "회원 이름"})
 @IsString() @IsNotEmpty()
 memberName: string;

 @ApiProperty({example: "https://myprofile.com/myprofile.jpg", description: "회원 이미지"})
 @IsOptional() @IsString()
 memberProfile?: string;
 
 // model AuthAccount
 @ApiProperty({example: "LOCAL", description: "회원 가입 경로"})
 @IsEnum(AuthProvider)
 memberProvider: AuthProvider;

 @ApiProperty({example: "100120415434", description: "회원 비밀번호"})
 @IsString() @IsOptional()
 memberProviderId?: string;

}

// 회원 조회
export class MemberResponseDTO {

 @ApiProperty({example: 1, description: "회원 아이디"})
 @IsNumber()
 id: number;

 @ApiProperty({example: "test123@gmail.com", description: "회원 이메일"})
 @IsString()
 memberEmail: string;
 
 @ApiProperty({example: "이유진", description: "회원 이름"})
 @IsString() @IsNotEmpty()
 memberName: string;
 
 @ApiProperty({example: 20, description: "회원 나이"})
 @IsOptional() @IsNumber()
 memberAge?: number;
 
 @ApiProperty({example: "서울시 강남구", description: "회원 주소"})
 @IsOptional() @IsString()
 memberAddress?: string;
 
 @ApiProperty({example: "https://myprofile.com/myprofile.jpg", description: "회원 이미지"})
 @IsOptional() @IsString()
 memberProfile?: string;
}

// 파일 입출력용 추가
export type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer; 
}




