import axios from 'axios';
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

const apiClient = axios.create({
  baseURL: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
  headers: {
    'X-RapidAPI-Key': rapidApiKey,
    'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com',
  },
});

export const fetchArticleSummary = async (articleUrl, length = 3) => {
    try {
      const response = await apiClient.get(`/summarize`, {
        params: {
          url: articleUrl,
          length,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching article summary:', error);
      throw error;
    }
  };