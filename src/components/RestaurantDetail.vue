<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">{{ restaurant.categoryName }}</p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image"
        style="width: 250px;margin-bottom: 25px;"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        :to="{ name: 'restaurant-dashboard', params: {id: restaurant.id}}"
        class="btn btn-primary btn-border mr-2"
      >Dashboard</router-link>

      <button
        v-if="restaurant.isFavorited"
        type="button"
        class="btn btn-danger btn-border mr-2"
        @click.stop.prevent="deleteFavorite(restaurant.id)"
      >移除最愛</button>
      <button
        v-else
        type="button"
        class="btn btn-primary btn-border mr-2"
        @click.stop.prevent="addFavorite(restaurant.id)"
      >加到最愛</button>
      <button
        v-if="restaurant.isLiked"
        type="button"
        class="btn btn-danger like mr-2"
        @click.stop.prevent="deleteLike(restaurant.id)"
      >Unlike</button>
      <button
        v-else
        type="button"
        class="btn btn-primary like mr-2"
        @click.stop.prevent="addLike(restaurant.id)"
      >Like</button>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  props: {
    initialRestaurant: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant
    };
  },
  watch: {
    initialRestaurant(restaurant) {
      this.restaurant = {
        ...this.restaurant,
        ...restaurant
      };
    }
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.addFavorite({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        };
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

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        };
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法將餐廳移除最愛，請稍後再試"
        });
      }
    },
    async addLike(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.addLike({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        };
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法讚此餐廳，請稍後再試"
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        const { data, statusText } = await usersAPI.deleteLike({
          restaurantId
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        };
      } catch (error) {
        Toast.fire({
          type: "error",
          title: "無法取消此讚，請稍後再試"
        });
      }
    }
  }
};
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>
