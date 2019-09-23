<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        id="name"
        v-model="user.name"
        type="text"
        name="name"
        class="form-control"
        placeholder="Enter Name"
        required
      />
    </div>

    <div class="form-group">
      <label for="image">Image</label>
      <img
        v-if="user.image"
        :src="user.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      />

      <input
        id="image"
        type="file"
        name="image"
        accept="image/*"
        class="form-control-file"
        @change="handleFileChange"
      />
    </div>

    <button
      type="submit"
      class="btn btn-primary"
      :disabled="isProcessing"
    >{{ isProcessing ? "處理中..." : "送出" }}</button>
  </form>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    initialUser: {
      type: Object,
      default: () => ({
        name: "",
        image: ""
      })
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: {
        name: "",
        image: ""
      }
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  watch: {
    initialUser(user) {
      this.user = {
        ...this.user,
        ...user
      };
    }
  },
  created() {
    this.user = {
      ...this.user,
      ...this.initialUser
    };
  },
  methods: {
    handleFileChange(e) {
      const files = e.target.files;
      if (!files.length) return; // 如果沒有檔案則離開此函式
      // 否則產生預覽圖...
      const imageURL = window.URL.createObjectURL(files[0]);
      this.user.image = imageURL;
    },
    handleSubmit(e) {
      if (!this.user.name) {
        Toast.fire({
          type: "warning",
          title: "請填寫餐廳名稱"
        });
        return;
      }

      const form = e.target; // <form></form>
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    }
  }
};
</script>

