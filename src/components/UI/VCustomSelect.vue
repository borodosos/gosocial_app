<template>
  <Dropdown :placeholder="text" />
</template>

<script>
import Dropdown from "primevue/dropdown";
export default {
  props: {
    text: String,
  },

  data() {
    return {};
  },

  components: {
    Dropdown,
  },
};
</script>

<style>
.custom-select.p-dropdown {
  position: relative;
  display: inline-flex;
  height: 36px;
  min-width: 64px;
  text-align: center;
  font-family: "Rubik", sans-serif;
  border: none;
  border-radius: 50px;
  padding: 0 16px;
  text-transform: none;
  font-weight: normal;
  background: linear-gradient(0deg, rgb(158, 160, 255), rgb(253, 239, 239));
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  font-weight: 500;
  letter-spacing: 0.0892857143em;
  text-transform: uppercase;
}

.custom-select .p-dropdown-trigger {
  display: none !important;
}

.custom-select span {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-select.p-dropdown .p-dropdown-label.p-placeholder {
  font-family: "Rubik";
  color: #464646;
  font-size: 0.9em;
}

.custom-select.p-dropdown .p-dropdown-item {
  text-align: start;
}

.custom-select.p-dropdown .p-dropdown-items-wrapper::-webkit-scrollbar {
  opacity: 0;
  width: 4px;
}

.custom-select.p-dropdown .p-dropdown-items-wrapper::-webkit-scrollbar-thumb {
  display: block;
  border-radius: 10px;
  background-color: black;
}
</style>
