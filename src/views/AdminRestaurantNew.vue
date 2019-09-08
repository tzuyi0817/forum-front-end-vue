<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm :is-processing="isProcessing" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      isProcessing: false
    };
  },
  methods: {
    async handleAfterSubmit(formData) {
      this.isProcessing = true;
      try {
        const { data, statusText } = await adminAPI.restaurants.create({
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        //成功的話則轉址到 `/admin/restaurants`
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          type: "error",
          title: "無法建立餐廳，請稍後再試"
        });
      }
    }
  }
};
</script>
