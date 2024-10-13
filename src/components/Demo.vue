<script setup>
import { onMounted, ref } from "vue";
import { getArticleSummary } from "@/services/article";

const isLoading = ref(false);
const url = ref(null);
const articleSummary = ref(null);
const allArticles = ref([]);
const errorMessage = ref(null);
const setCopy = ref([])

const handleSubmit = async () => {
  try {
    const existingArticle = allArticles.value?.find((item) => {
      return item?.url === url.value;
    });

    if (existingArticle) {
      articleSummary.value = existingArticle?.summary;
      return;
    }
    const { summary } = await getArticleSummary(url.value);

    if (summary) {
      isLoading.value = true;
      articleSummary.value = summary;
      const newArticle = { url: url.value, summary: articleSummary.value };
      allArticles.value.push(newArticle);
      localStorage.setItem("articles", JSON.stringify(allArticles.value));
      errorMessage.value = null;
      console.log("articleSummary.value", articleSummary.value);
    }
  } catch (error) {
    console.error("Error fetching summary:", error);
    errorMessage.value = "Error fetching summary: " + error.message; // Store the error message
  } finally {
    isLoading.value = false;
  }
};

const setArticle = (article) => {
  url.value = article?.url;
  articleSummary.value = article?.summary;
};

const handleCopy = (copyUrl,index) => {
    setCopy.value[index] = true
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopy.value[index] = false, 3000);
  };


onMounted(async () => {
  const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles"));
  if (articlesFromLocalStorage) allArticles.value = articlesFromLocalStorage;
});
</script>

<template>
  <section class="mt-16 w-full max-w-xl">
    <!-- Search -->
    <div class="flex flex-col w-full gap-2">
      <form
        @submit.prevent="handleSubmit"
        class="relative flex justify-center items-center"
      >
        <img
          src="@/assets/images/link.svg"
          alt="link-icon"
          class="absolute left-0 my-2 ml-3 w-5"
        />

        <input
          type="url"
          placeholder="Paste the article link"
          required
          class="url_input peer"
          v-model="url"
        />
        <button
          type="submit"
          class="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
        >
          <p>↵</p>
        </button>
      </form>

      <!-- Browse History -->
      <div
        v-for="(article, index) in allArticles"
        :key="index"
        class="flex flex-col gap-1 max-h-60 overflow-y-auto"
      >
        <div class="link_card">
          <div @click="handleCopy(article?.url , index)" class="copy_btn">
            <img v-if="setCopy[index]"
              src="@/assets/images/tick.svg"
              alt=""
              class="w-[40%] h-[40%] object-contain"
            />
            <img v-else
              src="@/assets/images/copy.svg"
              alt=""
              class="w-[40%] h-[40%] object-contain"
            />
          </div>
          <p
            @click="setArticle(article)"
            class="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"
          >
            {{ article?.url }}
          </p>
        </div>
      </div>
    </div>

    <!-- Display Result -->

    <img
      v-if="isLoading"
      src="@/assets/images/loader.svg"
      alt="loader"
      className="w-20 h-20 object-contain"
    />
    <p
      v-else-if="errorMessage"
      class="font-inter font-bold text-black text-center"
    >
      Well, that wasn't supposed to happen...
      <span class="block font-satoshi font-normal text-gray-700">
        {{ errorMessage }}
      </span>
    </p>

    <div
      v-else-if="articleSummary"
      class="my-10 max-w-full flex justify-center items-center"
    >
      <div class="flex flex-col gap-3">
        <h2 class="font-satoshi font-bold text-gray-600 text-xl">
          Article <span class="blue_gradient">Summary</span>
        </h2>
        <div class="summary_box">
          <p class="font-inter font-medium text-sm text-gray-700">
            {{ articleSummary }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>