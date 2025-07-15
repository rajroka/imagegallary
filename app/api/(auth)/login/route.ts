export const runtime = 'nodejs';
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma"

import bcrypt from "bcrypt";

const prisma = new PrismaClient();


export  async function POST( req : NextRequest , res : NextResponse) {
  const body = await  req.json()

    const { email , password  } = body

    if(!email || !password){

        return  NextResponse.json({ message : " you have to fill both email and password " } , {status : 400})
    }


    try {

        const user  = await prisma.user.findUnique({

            where : {
                email 
            }
        })

    
          if(!user || !user.password ){
             return NextResponse.json({ message : "credentials didnot match"} , {status:401})
          }


          
     const isCorrect =  await bcrypt.compare(password, user.password );

      if(!isCorrect){
        NextResponse.json({message : "Password didnot match"} , { status : 401})
      }
     

    } catch (error) {

         NextResponse.json({message : "Failed to login"} , {status : 500})

        
    }

}