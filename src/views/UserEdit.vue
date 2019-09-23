<template>
  <div class="container py-5">
    <UserFrom :initial-user="user" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import UserFrom from "./../components/UserFrom";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    UserFrom
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        image: ""
      }
    };
  },
  computed: {
    ...mapState(["currentUser"])
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        const { data, statusText } = await usersAPI.update({
          userId: this.user.id,
          formData
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$router.push({ name: "user" });
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法修改資料，請稍後再試"
        });
      }
    },
    async fetchUser(userId) {
      try {
        const { data, statusText } = await usersAPI.get({ userId });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        const { profile } = data;

        this.user = {
          ...this.user,
          id: profile.id,
          name: profile.name,
          image: profile.image
        };
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取得使用者資料，請稍後再試"
        });
      }
    }
  }
};
</script>


