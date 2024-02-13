import User from "@/models/User";
import connectToDb from "@/mongoDb"
import { hash } from "bcryptjs";


export const POST = async (req, res) => {
    try {
        await connectToDb();
        const body = await req.json();
        const { username, email, password } = body;

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return new Response('Email Already Registered', {
                status:400
            })
        }
        const hashPassword = await hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            password:hashPassword
        })
        await newUser.save()
        return new Response(JSON.stringify(newUser), { status: 201 })

    } catch (error) {
        console.log(error);
        return new Response("Failed to create", {
            status:500
        })
    }
    
}