<template>
  <div class="field">
    <div class="field__content">
      <span v-if="!modelValueChangeable">{{ modelValue }}</span>
      <InputText v-else v-model="changedValue" type="text" autofocus />
    </div>
    <v-btn
      v-if="!modelValueChangeable && isAmI"
      icon
      text
      small
      @click="changeValue"
    >
      <v-icon size="18">mdi-pencil</v-icon>
    </v-btn>
    <div v-else-if="modelValueChangeable && isAmI">
      <v-btn icon text small @click="acceptChangedValue">
        <v-icon size="18">fa-check</v-icon>
      </v-btn>
      <v-btn icon text small @click="changeValue">
        <v-icon size="18">fa-xmark</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext/InputText";

export default {
  components: {
    InputText,
  },

  props: {
    valueChangeable: Boolean,
    valueProp: String,
    isAmI: Boolean,
  },

  data() {
    return {
      modelValue: this.valueProp,
      modelValueChangeable: this.valueChangeable,
      changedValue: "",
    };
  },

  methods: {
    changeValue() {
      this.modelValueChangeable = !this.modelValueChangeable;
    },

    acceptChangedValue() {
      console.log(this.changedValue);
    },
  },
};
</script>

<style scoped>
.field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
}

.field__content {
  font-weight: normal;
}

.field__content input {
  padding: 0 8px;
  border-radius: 24px;
}
</style>
