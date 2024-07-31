<template>
  <div class="min-h-screen bg-blue-100 p-4">
    <header class="flex justify-between items-center mb-4">
      <h1 class="text-3xl font-bold text-gray-800">
        <router-link to="/" class="text-lg text-blue-600 hover:underline"
          >Nth Space</router-link
        >
      </h1>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* You can add any global styles here if needed */
</style>
