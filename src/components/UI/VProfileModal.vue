<template>
  <v-dialog :value="modalDialog" class="profile__dialog" width="500">
    <v-card class="profile__dialog">
      <v-card-title class="text-h5 grey lighten-2">
        Please, download and crop the image
      </v-card-title>
      <div class="pa-5">
        <FormulateInput
          v-model="file"
          class="file-input"
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

    onChange({ coordinates, image }) {
      this.result = {
        coordinates,
        image,
      };
    },
    setImage() {
      console.log(this.imgSrc);
    },
  },
};
</script>

<style lang=""></style>
