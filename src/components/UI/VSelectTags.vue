<template lang="">
  <Dropdown
    class="custom-select"
    :options="options"
    :placeholder="placeholder"
    @change="addTag"
  >
    <template #value="slotProps">
      <span>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div>
        <span>{{ slotProps.option }}</span>
      </div>
    </template>
  </Dropdown>
</template>

<script>
import Dropdown from "primevue/dropdown";

export default {
  components: {
    Dropdown,
  },

  props: {
    placeholder: String,
    options: Array,
    value: String,
  },

  methods: {
    addTag(event) {
      this.$emit("add-tag", event);
    },
  },
};
</script>

<style scoped></style>
