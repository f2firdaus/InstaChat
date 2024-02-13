import User from "@/models/User";
import connectToDb from "@/mongoDb"

export const GET = async (req, res) => {
    try {
        await connectToDb();
        const allUsers = await User.find();

        return new Response(JSON.stringify(allUsers),{status:200})
    } catch (error) {
        return new Response("failed to get all Users",{status:400})
    }
}