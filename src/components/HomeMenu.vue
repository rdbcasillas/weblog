<template>
  <div>
    <nav class="mb-8">
      <ul class="space-y-2 pt-8 pl-8">
        <li>
          <router-link
            to="/writing"
            class="text-lg text-lightbrown hover:underline"
            >Writings</router-link
          >
        </li>
        <li>
          <router-link
            to="/links"
            class="text-lg text-lightbrown hover:underline"
            >Links</router-link
          >
        </li>
        <!-- <li>
          <router-link
            to="/portal"
            class="text-lg text-lightbrown hover:underline"
            >Portal</router-link
          >
        </li>
        <li>
          <router-link
            to="/music"
            class="text-lg text-lightbrown hover:underline"
            >Music</router-link
          >
        </li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
