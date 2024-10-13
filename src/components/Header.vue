<script setup>
const goToGitHub = () => {
  window.open(
    "https://github.com/adrianhajdin/project_ai_summarizer",
    "_blank"
  );
};
</script>

<template>
  <header class="w-full flex justify-center items-center flex-col">
    <nav class="flex justify-between items-center w-full mb-10 pt-3">
      <img src="@/assets/images/logo.svg" alt="sumz_logo" class="w-28 object-contain" />

      <button type="button" @click="goToGitHub" class="black_btn">
        GitHub
      </button>
    </nav>

    <h1 class="head_text">
      Summarize Articles with <br class="max-md:hidden" />
      <span class="orange_gradient">OpenAI GPT-4</span>
    </h1>
    <h2 class="desc">
      Simplify your reading with Summize, an open-source article summarizer that
      transforms lengthy articles into clear and concise summaries
    </h2>
  </header>
</template>