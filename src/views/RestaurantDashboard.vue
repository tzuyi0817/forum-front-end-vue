<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <div class="col-md-12">
        <h1>{{restaurant.name}}</h1>
        <p>[{{restaurant.categoryName}}]</p>
      </div>

      <br />
      <br />

      <div class="dashboard">
        <ul class="list-dashboard">
          <li>
            <strong>評論數 :</strong>
            {{restaurant.commentsLength}}
          </li>
          <li>
            <strong>瀏覽次數 :</strong>
            {{restaurant.viewCounts}}
          </li>
          <li>
            <strong>收藏數 :</strong>
            {{restaurant.favoritedUsersLength}}
          </li>
        </ul>
      </div>

      <br />
      <br />
      <a href="#" @click="$router.back()">回上一頁</a>
    </template>
  </div>
</template>

<script>
import restaurantsAPI from "./../apis/restaurants";
import Spinner from "./../components/Spinner";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    Spinner
  },
  name: "restaurantDashboard",
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryName: "",
        commentsLength: 0,
        favoritedUsersLength: 0,
        viewCounts: 0
      },
      isLoading: true
    };
  },
  created() {
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: restaurantId } = to.params;
    this.fetchRestaurant(restaurantId);
    next();
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const {
          data: { restaurant },
          statusText
        } = await restaurantsAPI.getRestaurant({
          restaurantId
        });

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryName: restaurant.Category.name,
          commentsLength: restaurant.Comments.length,
          favoritedUsersLength: restaurant.FavoritedUsers.length,
          viewCounts: restaurant.viewCounts
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得餐廳資料，請稍後再試"
        });
      }
    }
  }
};
</script>

