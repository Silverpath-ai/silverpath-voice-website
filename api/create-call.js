export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Dynamically load the agent ID from server env variables with client fallback
  const agentId = process.env.RETELL_AGENT_ID || req.body?.agentId;

  if (!agentId) {
    return res.status(400).json({ error: 'agentId is required (missing from environment and request body)' });
  }

  const apiKey = process.env.RETELL_API_KEY;

  if (!apiKey) {
    console.error('RETELL_API_KEY is not set');
    return res.status(500).json({ error: 'Internal Server Error: API Key missing' });
  }

  try {
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Retell API Error:', errorText);
      return res.status(response.status).json({ error: 'Failed to create call' });
    }

    const data = await response.json();
    
    // The response should contain an access_token that the frontend will use
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in create-call:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
