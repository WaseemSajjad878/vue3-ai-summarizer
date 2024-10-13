
import { defineStore } from 'pinia'
import { useLocalStorage } from "@/composables/useLocalStorage";
import { fetchArticleSummary } from "@/services/article";

const { setItem } = useLocalStorage()

export const useArticleStore = defineStore('article', {
  state: () => ({
    isLoading: false,
    url: null,
    articleSummary: null,
    allArticles: [],
    errorMessage: null,
  }),
  getters: {
  },
  actions: {
    async getArticleSummary() {
      try {
        const existingArticle = this.allArticles?.find((item) => {
          return item?.url === this.url;
        });

        if (existingArticle) {
          this.articleSummary = existingArticle?.summary;
          return;
        }
        this.isLoading = true;
        const { summary } = await fetchArticleSummary(this.url);
        if (summary) {
          this.articleSummary = summary;
          const newArticle = { url: this.url, summary: this.articleSummary };
          this.allArticles.push(newArticle);
          setItem("articles", this.allArticles)
          this.errorMessage = null;
          console.log("articleSummary.value", this.articleSummary);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
        this.articleSummary = "Error fetching summary: " + error.message;
      } finally {
        this.isLoading = false;
      }
    },
    saveArticleHistory(article){
      this.url = article?.url;
      this.articleSummary = article?.summary;
    },
    deleteArticleHistory(url) { 
      this.allArticles = this.allArticles?.filter(article=> article?.url !== url)
      setItem("articles", this.allArticles)
    }
  },
})