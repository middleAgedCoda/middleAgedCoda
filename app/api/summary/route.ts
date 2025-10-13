import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const mockSummary = {
    summary: `Here's what happened in the last 24 hours:
  **📈 Tech News:**
  - Apple announced new AI features for iOS 18, focusing on privacy. This might impact your project.
  - A critical update was released for a React library you use. Consider updating by Friday.
  **👨‍💻 Project "Echo":**
  - Your team in the 'Dev-Channel' Discord decided on using WebSockets for real-time updates. The vote was 5-1.
  - Anna completed the UI design task. Your next task, "API Integration," is now ready.
  **🎮 Personal:**
  - The "Gaming Buddies" group is planning a raid for Saturday night. 8 people have confirmed.`,
  };

  return NextResponse.json(mockSummary);
}
