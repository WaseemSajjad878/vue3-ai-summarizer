<template>
  <div class="base-input">
    <label v-if="isLabel" :for="inputId" class="form-label">{{ label }}</label>
    <input
      :type="type"
      class=""
      :placeholder="placeholder"
      v-model="model"
    />
  </div>
</template>

<script setup>
defineProps({
  isLabel: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: 'Label'
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: 'Post A Comment'
  }
})

const model = defineModel()
</script>

<style scoped>
.base-input  input:focus {
    outline: none;
  }

</style>
