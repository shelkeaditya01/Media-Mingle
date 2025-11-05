// /api/news.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { country = 'us', category = 'general', page = 1, pageSize = 8 } = req.query;

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch news' });
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
