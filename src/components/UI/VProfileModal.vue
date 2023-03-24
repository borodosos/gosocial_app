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
          @file-removed="imageProfile.src = null"
          type="image"
          label="Post Image"
          validation="mime:image/jpeg,image/jpg,image/png,image/gif"
          help="Download your image"
        />
        <div class="cropper__container">
          <Cropper
            ref="cropper"
            class="cropper"
            :src="imageProfile.src"
            @change="onChange"
            :debounce="false"
            :default-size="{
              width: 400,
              height: 400,
            }"
            :stencil-props="{
              aspectRatio: 1,
            }"
            stencil-component="circle-stencil"
          />
        </div>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="registration__button" rounded @click="setImage"
          >Set image</v-btn
        >
      </v-card-actions>
      <Toast position="top-center" group="dialog" />
    </v-card>
  </v-dialog>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import Toast from "primevue/toast";

export default {
  components: {
    Cropper,
    Toast,
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
      result: null,
      imageProfile: {
        src: null,
        type: null,
      },
    };
  },

  methods: {
    uploadFile(event) {
      const { file } = event;
      URL.revokeObjectURL(this.imageProfile.src);
      const blob = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageProfile = {
          src: blob,
          type: this.getMimeType(e.target.result, file),
        };
      };
      reader.readAsArrayBuffer(file);
    },

    onChange() {
      const { canvas } = this.$refs.cropper.getResult();
      canvas.toBlob((blob) => {
        this.result = blob;
      }, this.imageProfile.type);
    },

    setImage() {
      const urlId = this.$route.params.id;
      const { canvas } = this.$refs.cropper.getResult();
      const formData = new FormData();
      canvas.toBlob((blob) => {
        formData.append("image_profile", blob);
        formData.append("image_type", this.imageProfile.type);
        this.$store
          .dispatch("fetchUpdateUserInfo", { urlId, formData })
          .then(() => {
            setTimeout(() => {
              location.reload();
            }, 2000);
            this.$toast.add({
              severity: "success",
              summary: "Success",
              detail: "Your image profile was updated!",
              group: "dialog",
              life: 1800,
            });
          });
      }, this.imageProfile.type);
    },

    toggleDialog() {
      this.imageProfile = {
        src: null,
        type: null,
      };
      this.file = null;
      this.$emit("toggle-func");
    },

    // -- Check type of the image
    getMimeType(file, fallback = null) {
      const byteArray = new Uint8Array(file).subarray(0, 4);
      let header = "";
      for (let i = 0; i < byteArray.length; i++) {
        header += byteArray[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          return "image/png";
        case "47494638":
          return "image/gif";
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          return "image/jpeg";
        default:
          return fallback;
      }
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
    max-height: 470px;
    overflow-y: auto;
  }

  &__menu::-webkit-scrollbar {
    opacity: 0;
    width: 10px;
  }

  &__menu::-webkit-scrollbar-thumb {
    display: block;
    border-radius: 10px;
    background-color: black;
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
