import User from "@/models/User";
import connectToDb from "@/mongoDb";

export const POST = async (req, { params }) => {
  try {
    await connectToDb();
    const { userId } = params;
    const body = await req.json();
    const { username, profileImage } = body;
    const updateUser = await User.findByIdAndUpdate(userId, {
      username,

      profileImage,
    }, { new: true });
      
      return new Response(JSON.stringify(updateUser),{status:200})
  } catch (error) {
      console.log(error);
      return new Response("Failed to update user",{status:500})
  }
};
