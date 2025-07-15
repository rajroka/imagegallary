
import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();


async function seed(){
  await prisma.user.create({
    data: {
      username: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    }
  })
}
