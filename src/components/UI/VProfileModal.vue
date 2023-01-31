<template>
  <v-dialog :value="modalDialog" @click:outside="toggleDialog" width="500">
    <v-card class="card">
      <v-card-title class="text-h5 grey lighten-2">
        Please, download and crop the image
      </v-card-title>
      <div class="card__menu">
        <FormulateInput
          v-model="file"
          class="card__input"
          @file-upload-complete="uploadFile"
          @file-removed="imgSrc = ''"
          type="image"
          label="Post Image"
          validation="mime:image/jpeg,image/jpg,image/png"
          help="Download your image"
        />
        <Cropper
          class="cropper"
          :src="imgSrc"
          @change="onChange"
          :debounce="false"
          :stencil-props="{
            aspectRatio: 1,
          }"
          stencil-component="circle-stencil"
        />
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="registration__button" rounded @click="setImage"
          >Set image</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
export default {
  components: {
    Cropper,
  },

  props: {
    modalDialog: {
      type: Boolean,
    },
    modalFile: {
      type: Object,
    },
  },

  data() {
    return {
      file: null,
      imgSrc: "",
      result: {
        coordinates: null,
        image: null,
      },
    };
  },

  methods: {
    async uploadFile() {
      const reader = new FileReader();
      if (this.file) {
        reader.readAsDataURL(this.file.fileList[0]);
        reader.onload = () => {
          this.imgSrc = reader.result;
        };
      }
    },

    onChange({ coordinates, canvas }) {
      this.result = {
        coordinates,
        image: canvas.toDataURL(),
      };
    },

    setImage() {
      console.log(this.result);
    },

    toggleDialog() {
      this.$emit("toggle-func");
    },
  },
};
</script>

<style scoped lang="scss">
.v-dialog {
  border-radius: 10px;
}

.card {
  border-radius: 10px;

  &__menu {
    padding: 8px;
  }

  &__input {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
