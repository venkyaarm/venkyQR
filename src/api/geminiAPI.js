// src/api/geminiAPI.js
export const getGeminiSuggestion = async (prompt) => {
  const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDsDZJmml18dqhEwVDPSoZdhesZStaBDJ0', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Try again!';
};
