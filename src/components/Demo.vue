<script setup>
import { onMounted, ref } from "vue";
import { useArticleStore } from "@/stores/article";
import { useLocalStorage } from "@/composables/useLocalStorage";
import { storeToRefs } from 'pinia'
import BaseInput from '@/components/base/Input.vue'

const store = useArticleStore()
const { isLoading, url, articleSummary, allArticles, errorMessage } = storeToRefs(store)
const { getItem } = useLocalStorage()

const setCopy = ref([])

const handleSubmit = async () => {
 await store.getArticleSummary()
}

const handleCopy = (copyUrl,index) => {
    setCopy.value[index] = true
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopy.value[index] = false, 3000);
}

onMounted(async () => {
  const articlesFromLocalStorage = getItem("articles");
  if (articlesFromLocalStorage) allArticles.value = articlesFromLocalStorage;
})
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
        <BaseInput 
        type="url"
        placeholder="Paste the article link"
        required
        class="url_input peer"
        v-model="url"
        />
        <button
          type="submit"
          class="submit_btn peer-focus:border-gray-700 text-xl peer-focus:text-gray-700"
        >
        ↵
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
              class="w-[16px] h-[16px] object-contain"
            />
            <img v-else
              src="@/assets/images/copy.svg"
              alt=""
              class="w-[16px] h-[16px] object-contain"
            />
          </div>
          <p
            @click="store?.saveArticleHistory(article)"
            class="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate"
          >
            {{ article?.url }}
          </p>
          <div @click="store?.deleteArticleHistory(article?.url)" class="copy_btn ms-auto">
            <img
              src="@/assets/images/trash.png"
              alt=""
              class="w-[14px] h-[14px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Display Result -->

    <img
      v-if="isLoading"
      src="@/assets/images/loader.svg"
      alt="loader"
      className="w-20 h-20 object-contain mx-auto mt-12"
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