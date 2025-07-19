import NextAuth from "next-auth";
import User from "@/lib/models/User";
import connectToDatabase from "@/lib/db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut} = NextAuth({
  session: {
    strategy: "jwt",
    },
    providers: [

        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password:{},
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials?.email });
                    if (!user) {
                        throw new Error("")
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password as string , user.password as string
                    ); 
                    if (!isValidPassword) {
                        throw new Error ("")
                    }
					

                    return user;
                }
                catch {
                    return null
                }
            }
        })

    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "google") {
                await connectToDatabase();
                const existingUser = await User.findOne({ email: profile?.email });
                if (!existingUser) {
                    await User.create({
                        name: profile?.name,
                        email: profile?.email,
                    })
                }
            }
            return true;
              },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
				token.name = user.name ;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email   ,
                    name: token.name,
                    image: token.picture,
                };
            };
            return session;
        }
        
    },
    pages: {
       signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET
    

  
});
