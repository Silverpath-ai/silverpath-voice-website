export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, email, businessType } = req.body;
  if (!name || !email || !businessType) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Web Demo Leads';

  if (!apiKey || !baseId) {
    console.error('Airtable config parameters are missing in env');
    return res.status(500).json({ error: 'Internal Server Error: API missing dependencies' });
  }

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            'Business Type': businessType,
            Source: 'Web Demo',
            'Submitted At': new Date().toISOString(),
          }
        })
      }
    );

    if (!airtableRes.ok) {
      const errorText = await airtableRes.text();
      console.error('Airtable API Error:', errorText);
      return res.status(500).json({ error: 'Failed to write lead data' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Exception in capture-lead handler:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
