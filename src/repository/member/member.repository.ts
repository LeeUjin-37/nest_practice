import { Injectable } from "@nestjs/common";
import { MemberEntity } from "src/domain/entity/member.entity";
import { MemberRegisterDTO, MemberUpdateDTO, OAuthLoginDTO } from "src/domain/member/dto/member.dto";
import { PrismaService } from "src/service/prisma/prisma.service";

@Injectable()
export class MemberRepository {
   
   // 생성자 주입
   constructor(private readonly prisma:PrismaService){;}

   // 회원 추가
   async save(member:MemberRegisterDTO):Promise<MemberEntity>{
      const memberCreate = {
         memberEmail: member.memberEmail,
         memberName : member.memberName,
         memberAge: member.memberAge,
         memberAddress: member.memberAddress,
         memberProfile: member.memberProfile
      }

      // 소셜
      const memberSocialCreate = {
         memberProviderId: member.memberProviderId,
         memberProvider: member.memberProvider,
         memberPassword: member.memberPassword
      }

      return await this.prisma.member.create({
        data: {
          ...memberCreate,
          socials: {
           create: memberSocialCreate
          }
        },
        include: {
         socials: true
        }
      })

   }

   // 회원 전체 조회
   async findMemberAll():Promise<MemberEntity[]>{
    return await this.prisma.member.findMany({
       include: {socials: true}
    })
   }

   // 회원 단일 조회(ID)
   async findMemberById(id:number):Promise<MemberEntity | null>{
    return await this.prisma.member.findUnique({
       where: {id},
       include: {socials: true}
    })
   }

   // 회원 단일 조회(MemberEmail: 소셜로그인은 ID가 없기 때문에 email 조회 필요)
   async findMemberByMemberEmail(memberEmail:string):Promise<MemberEntity | null>{
    return await this.prisma.member.findFirst({
       where: {memberEmail},
       include: {socials: true}
    })
   }

   // 소셜 로그인으로 로그인 했을 때 회원을 조회하는 방법
   // 회원 단일 조회(MemberProvider: naver로그인ID와 kakao로그인ID 동일할 수도 있지만 다른 소셜인 것을 비교하기 위함)
   async findByProvider(socialsMember:OAuthLoginDTO):Promise<MemberEntity | null>{
     return await this.prisma.member.findFirst({
        where:{
         socials: {
          some: {
           memberProviderId: socialsMember.memberProviderId,
           memberProvider: socialsMember.memberProvider
          }
         }
        },
        include: {
         socials: true
        }
     })
   }

   // 회원 비밀번호 수정
   async updatePassword(id: number, memberPassword:string){
      await this.prisma.authAccount.update({
         where: {id},
         data: { memberPassword }
      })
   }


   // 회원 수정
   async updateProfile(id: number, member:MemberUpdateDTO):Promise<MemberEntity | null>{
      const {memberPassword, ...removedPasswordMember} = member;

     await this.prisma.member.update({
       data: removedPasswordMember,
       where: {id}
    })
     return await this.findMemberById(id)
   }

   // 회원 삭제
   async delete(id:number){
     try {
      await this.prisma.member.delete({
         where: {id}
      })
      return true
     } catch (err) {
      console.log("member repository delete failed", err)
      return false
     }
   }



 
}

