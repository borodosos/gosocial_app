<template>
  <div class="field">
    <v-form
      class="form"
      ref="form"
      @submit="acceptChangedValue"
      v-model="valid"
    >
      <div class="field__content">
        <span v-if="!modelValueChangeable">{{ modelValue }}</span>
        <v-text-field
          v-else-if="modelValueChangeable && !loading"
          v-model="changedValue"
          :rules="setRules"
          autofocus
          outlined
          :name="nameField"
          :type="typeField"
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
    <Toast position="bottom-left" group="bprofilefield" />
  </div>
</template>

<script>
import Toast from "primevue/toast";

export default {
  components: {
    Toast,
  },

  props: {
    valueChangeable: Boolean,
    valueProp: String,
    nameField: String,
    typeField: String,
    isAmI: Boolean,
    otherValueChangeable: Array,
  },

  data() {
    return {
      modelValue: this.valueProp,
      modelValueChangeable: this.valueChangeable,
      changedValue: "",
      loading: false,
      valid: true,
    };
  },

  computed: {
    setRules() {
      if (this.typeField === "email") {
        return [
          (value) => !!value || "E-mail is required.",
          (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
        ];
      } else if (this.typeField === "password") {
        return [
          (value) => !!value || "Required.",
          (value) => value.length >= 8 || "Min 8 characters",
        ];
      } else {
        return [(value) => !!value || "The field is required."];
      }
    },
  },

  methods: {
    changeValue() {
      // this.otherValueChangeable.forEach((value) => value === false);
      // console.log(this.otherValueChangeable);
      this.$emit("closeOtherValue");
      this.modelValueChangeable = !this.modelValueChangeable;
    },

    acceptChangedValue(event) {
      event.preventDefault();
      if (!this.valid) {
        return;
      }
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
            group: "bprofilefield",
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

.form {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
