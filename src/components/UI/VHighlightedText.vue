<template>
  <p v-html="highlight(text)"></p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    text: String,
  },

  computed: {
    ...mapGetters({
      storeKeywords: "getKeywords",
    }),
  },

  methods: {
    highlight(text) {
      if (this.storeKeywords) {
        return text.replace(
          new RegExp(this.storeKeywords, "gi"),
          '<span class="highlighted">$&</span>'
        );
      } else {
        return text;
      }
    },
  },
};
</script>

<style>
.highlighted {
  background-color: #00b7ff;
}
</style>
