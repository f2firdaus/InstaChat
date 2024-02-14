import NextAuth from "next-auth";
import User from "@/models/User";
import connectToDb from "@/mongoDb";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id:"Credentials",
      name: "Credentials",
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Please Enter your email and password");
          }
          
        await connectToDb();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user?.password) {
          throw new Error("Invalid Email or Password");
        }
        const isMatch = await compare(credentials.password, user.password);
        if (!isMatch) {
          throw new Error("Invalid email or Password");
          }
        
        return user;
      },
    }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const mongodbUser = await User.findOne({ email: session.user.email });
      session.user.id = mongodbUser._id.toString();
      session.user = { ...session.user, ...mongodbUser._doc }
      return session
    }
  }
});
export { handler as GET, handler as POST };
