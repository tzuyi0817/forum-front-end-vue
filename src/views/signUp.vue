<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="passwordCheck">Password Check</label>
        <input
          id="passwordCheck"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="password-check"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">Sign In</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit(e) {
      try {
        // 如果 name、email、passwordCheck 或 password 為空，則使用 Toast 提示
        // 然後 return 不繼續往後執行
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            type: "warning",
            title: "請填入 name、email 和 password"
          });
          return;
        }

        // 如果 password 和 passwordCheck 不相同，則使用 Toast 提示
        // 然後 return 不繼續往後執行
        if (this.password !== this.passwordCheck) {
          // 將密碼欄位清空
          this.password = "";
          this.passwordCheck = "";
          Toast.fire({
            type: "warning",
            title: "請確認 password 和 password Check 是否相同"
          });
          return;
        }

        this.isProcessing = true;

        const response = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        });

        const { data, statusText } = response;

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.$router.push("/signin");
      } catch (error) {
        // 將密碼欄位清空
        this.password = "";
        this.passwordCheck = "";
        // 顯示錯誤提示
        Toast.fire({
          type: "warning",
          title: "您輸入的信箱已經註冊"
        });
        this.isProcessing = false;
      }
    }
  }
};
</script>
