// api/direct.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { origin, destination, date, currency } = req.query;
  const token = process.env.TP_TOKEN || 'e51c9a9e76a62b326714401e1be8fc43';

  if (!origin || !destination || !date) {
    return res.status(400).json({ success: false, error: 'Missing params' });
  }

  const url = `https://api.travelpayouts.com/v2/prices/direct?origin=${origin}&destination=${destination}&depart_date=${date}&currency=${currency || 'rub'}&token=${token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('TP API Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
