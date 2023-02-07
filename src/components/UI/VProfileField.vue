<template>
  <div class="field">
    <v-form class="form" ref="form" @submit="acceptChangedValue">
      <div class="field__content">
        <span v-if="!modelValueChangeable">{{ modelValue }}</span>
        <InputText
          v-else-if="modelValueChangeable && !loading"
          v-model="changedValue"
          type="text"
          autofocus
          :name="nameField"
        />
        <v-progress-circular
          v-else
          :size="20"
          color="primary"
          indeterminate
        ></v-progress-circular>
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
        <v-btn icon text small type="submit">
          <v-icon size="18">fa-check</v-icon>
        </v-btn>
        <v-btn icon text small @click="changeValue">
          <v-icon size="18">fa-xmark</v-icon>
        </v-btn>
      </div>
    </v-form>
    <Toast position="bottom-left" group="bl" />
  </div>
</template>

<script>
import InputText from "primevue/inputtext/InputText";
import Toast from "primevue/toast";

export default {
  components: {
    InputText,
    Toast,
  },

  props: {
    valueChangeable: Boolean,
    valueProp: String,
    nameField: String,
    isAmI: Boolean,
  },

  data() {
    return {
      modelValue: this.valueProp,
      modelValueChangeable: this.valueChangeable,
      changedValue: "",
      loading: false,
    };
  },

  methods: {
    changeValue() {
      this.modelValueChangeable = !this.modelValueChangeable;
    },

    acceptChangedValue(event) {
      event.preventDefault();
      this.loading = true;

      const urlId = this.$route.params.id;
      const form = this.$refs.form.$el;
      const formData = new FormData(form);
      this.$store
        .dispatch("fetchUpdateUserInfo", { urlId, formData })
        .then(() => {
          setTimeout(() => {
            this.loading = false;
            location.reload();
          }, 2000);
          this.$toast.add({
            severity: "success",
            summary: "Success",
            detail: "Your profile is updated!",
            group: "bl",
            life: 1800,
          });
        });
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

.form {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
