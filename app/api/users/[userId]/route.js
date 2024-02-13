import Chat from "@/models/Chat";
import Message from "@/models/Message";
import User from "@/models/User";
import connectToDb from "@/mongoDb";

export const GET = async (req, { params }) => {
  try {
    await connectToDb();
    const { userId } = params;
    const allchats = await Chat.find({ members: userId })
      .sort({ lastMessage: -1 })
      .populate({
        path: "members",
        model: User,
      }).populate({
        path: "messages",
        model: Message,
        populate: {
          path: "sender seenBy",
          model:User
        }
      })
      .exec();
    return new Response(JSON.stringify(allchats), { status: 200 });
  } catch (error) {
    console.log(error);
    return (
      new Response("Failed to get all chats of current user"), { status: 500 }
    );
  }
};
