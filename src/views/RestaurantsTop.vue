<template>
  <div class="container py-5">
    <!-- 使用 NavTabs 元件 -->
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">人氣餐廳</h1>
      <hr />
      <div class="card mb-3" style="max-width: 540px;margin: auto;">
        <div class="row no-gutters" v-for="restaurant in restaurants" :key="restaurant.id">
          <div class="col-md-4">
            <router-link :to="{ name: 'restaurant', params: {id: restaurant.id}}">
              <img class="card-img" :src="restaurant.image" />
            </router-link>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ restaurant.name }}</h5>
              <span class="badge badge-secondary">收藏數：{{ restaurant.FavoriteCount }}</span>
              <p class="card-text">{{ restaurant.description }}</p>
              <router-link
                :to="{ name: 'restaurant', params: {id: restaurant.id}}"
                class="btn btn-primary mr-2"
              >Show</router-link>

              <button
                v-if="restaurant.isFavorited"
                type="button"
                class="btn btn-danger mr-2"
                @click.stop.prevent="deleteFavorite(restaurant.id)"
              >移除最愛</button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                @click.stop.prevent="addFavorite(restaurant.id)"
              >加到最愛</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";
import Spinner from "./../components/Spinner";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import usersAPI from "./../apis/users";

export default {
  components: {
    NavTabs,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      isLoading: true
    };
  },
  created() {
    this.fetchrestaurants();
  },
  methods: {
    async fetchrestaurants() {
      try {
        const { data, statusText } = await restaurantsAPI.getTopRestaurants();

        if (statusText !== "OK") {
          throw new Error(statusText);
        }

        this.restaurants = data.restaurants;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          type: "error",
          title: "無法取得資料，請稍後再試"
        });
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.addFavorite({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurants = this.restaurants
          .map(restaurant => {
            if (restaurant.id !== restaurantId) {
              return restaurant;
            }

            return {
              ...restaurant,
              FavoriteCount: restaurant.FavoriteCount + 1,
              isFavorited: true
            };
          })
          .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法將餐廳加入最愛，請稍後再試"
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.deleteFavorite({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurants = this.restaurants
          .map(restaurant => {
            if (restaurant.id !== restaurantId) {
              return restaurant;
            }

            return {
              ...restaurant,
              FavoriteCount: restaurant.FavoriteCount - 1,
              isFavorited: false
            };
          })
          .sort((a, b) => b.FavoriteCount - a.FavoriteCount);
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法將餐廳從最愛移除，請稍後再試"
        });
      }
    }
  }
};
</script>