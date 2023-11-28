// pages/api/chat.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const userInput = req.body.userInput;

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    });

    const data = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userInput },
      ],
      max_tokens: 2000,
      presence_penalty: 0.0,
      frequency_penalty: 0.0,
    };

    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    };

    const response = await fetch(apiUrl, requestOptions);
    const responseData = await response.json();

    res.status(200).json({ response: responseData.choices[0].message.content || 'No response available' });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
