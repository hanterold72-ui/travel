// api/cheap.js
export default async function handler(req, res) {
  // Разрешаем CORS только для нашего домена (или всем для простоты)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { origin, destination, currency } = req.query;
  
  // Берём токен из переменных окружения Vercel (безопасно!)
  const token = process.env.TP_TOKEN || 'e51c9a9e76a62b326714401e1be8fc43';

  if (!origin || !destination) {
    return res.status(400).json({ success: false, error: 'Missing origin or destination' });
 }

  const url = `https://api.travelpayouts.com/v1/prices/cheap?origin=${origin}&destination=${destination}&currency=${currency || 'rub'}&token=${token}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('TP API Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}
