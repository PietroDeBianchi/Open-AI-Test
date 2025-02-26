const openai = require("../config/openaiConfig");
const testSystemContent = require("../utils/systemContent")
//////////////////////////////////////////////////
// ASSISTANT INTERACTIONS
//////////////////////////////////////////////////

// In-memory storage for user sessions
const sessions = {};

exports.testSession = async (req, res) => {
    try {
        const { prompt, chatId } = req.body;
        // Check if the prompt is valid
        if (!prompt) {
            return res.status(400).json({ message: "Invalid or missing prompt" });
        }
        // Initialize a new session if it doesn't exist
        if (!sessions[chatId]) {
            // Add initial system content
            sessions[chatId] = [{ role: "system", content: testSystemContent.test1 }];
        }
        // Add user's prompt to the session history
        sessions[chatId].push({ role: "user", content: prompt });
        // Send conversation history to OpenAI for processing
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: sessions[chatId],
            max_tokens: 800, // Limit the response length
        });
        // Extract assistant's response
        const assistantMessage = response.choices[0]?.message?.content;
        // Handle cases where no valid response is returned
        if (!assistantMessage) {
            return res.status(500).json({ message: "Invalid response from OpenAI" });
        }
        // Add assistant's response to the session history
        sessions[chatId].push({ role: "assistant", content: assistantMessage });
        // Return assistant's response to the client set sessions[chatId] for full chat
        res.status(200).json({ message: assistantMessage });
    } catch (err) {
        console.error("Error in movieSession:", err);
        res.status(500).json({ message: "Server error" });
    }
};
