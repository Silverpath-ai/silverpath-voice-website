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

  // Resilient check: If Airtable credentials are not set up yet in Vercel env,
  // we log the error but STILL return 200 so the user is not blocked from the demo.
  if (!apiKey || !baseId) {
    console.error('Airtable configuration missing in Vercel environment variables:', {
      hasApiKey: !!apiKey,
      hasBaseId: !!baseId
    });
    return res.status(200).json({
      success: true,
      warning: 'Lead registered (Airtable configuration pending)'
    });
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
      console.error('Airtable API Error Response:', errorText);
      // Resilient Fallback: If Airtable rejected the write (e.g. column name mismatch, field type validation failed),
      // we log the error details but STILL return 200 success so the visitor is not blocked.
      return res.status(200).json({ 
        success: true, 
        warning: 'Lead accepted with database sync warning' 
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Exception in capture-lead handler:', error);
    // Graceful fallback for complete network/fetch exceptions
    return res.status(200).json({ 
      success: true, 
      warning: 'Lead accepted with fallback protocol' 
    });
  }
}
