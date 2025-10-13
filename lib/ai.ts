const MOCK = `Here's what happened in the last 24 hours:
**📈 Tech News:**
- Apple announced new AI features for iOS 18, focusing on privacy. This might impact your project.
- A critical update was released for a React library you use. Consider updating by Friday.
**👨‍💻 Project "Echo":**
- Your team in the 'Dev-Channel' Discord decided on using WebSockets for real-time updates. The vote was 5-1.
- Anna completed the UI design task. Your next task, "API Integration," is now ready.
**🎮 Personal:**
- The "Gaming Buddies" group is planning a raid for Saturday night. 8 people have confirmed.`;

export async function getAiSummary(): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return MOCK;
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "Summarize user digital activity succinctly." },
          { role: "user", content: "Generate a realistic daily summary like the example." },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });
    if (!res.ok) return MOCK;
    const json = await res.json();
    return json.choices?.[0]?.message?.content?.trim() || MOCK;
  } catch {
    return MOCK;
  }
}
