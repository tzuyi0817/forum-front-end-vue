<template>
  <div class="container py-5">
    <UserFrom :initial-user="user" @after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import UserFrom from "./../components/UserFrom";

const dummyUser = {
  user: {
    id: 1,
    name: "管理者",
    image: "https://i.pravatar.cc/300"
  }
};

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
  created() {
    const { id } = this.$route.params;
    this.fetchUser(id);
  },
  methods: {
    handleAfterSubmit(formData) {
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
    fetchUser(userId) {
      console.log("fetchUser id:", userId);
      const { user } = dummyUser;
      this.user = {
        ...this.user,
        id: user.id,
        name: user.name,
        image: user.image
      };
    }
  }
};
</script>


