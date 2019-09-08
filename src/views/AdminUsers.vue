<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="200">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{user.id}}</th>
          <td>{{user.email}}</td>
          <td v-if="user.isAdmin">admin</td>
          <td v-else>user</td>
          <td v-if="user.id === currentUser.id"></td>
          <td v-else>
            <template v-if="user.isAdmin">
              <button
                type="button"
                class="btn btn-link"
                @click.stop.prevent="toggleUserRole(user.id)"
              >set as user</button>
            </template>
            <template v-else>
              <button
                type="button"
                class="btn btn-link"
                @click.stop.prevent="toggleUserRole(user.id)"
              >set as admin</button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "@/components/AdminNav";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root test",
      email: "root@example.com",
      password: "$2a$10$OJ3jR93XlEMrQtYMWOIQh.EINWgaRFTXkd0Xi5OC/Vz4maztUXEPe",
      isAdmin: true,
      image: "https://i.imgur.com/58ImzMM.png",
      createdAt: "2019-07-30T16:24:54.983Z",
      updatedAt: "2019-08-07T04:09:56.622Z"
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$oNyp9cr8jG7NulbUr56g6e3yvwnttFkoBAmtUYAeQuXkcdFz0Ko6y",
      isAdmin: false,
      image: "https://i.imgur.com/Q14p2le.jpg",
      createdAt: "2019-07-30T16:24:55.204Z",
      updatedAt: "2019-08-07T06:16:00.171Z"
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$tsvcnSFsJvdvs2NLm9rW.uYbah93Xl5cTYcQnSeK3sjEopj.NGzk2",
      isAdmin: false,
      image: "https://i.imgur.com/OezkRwO.jpg",
      createdAt: "2019-07-30T16:24:55.422Z",
      updatedAt: "2019-08-07T06:16:40.100Z"
    },
    {
      id: 4,
      name: "123",
      email: "123@gmail.com",
      password: "$2a$10$3DgQkLtWS7ud3ewuWdmRuOiFhRsgcE1SzOYAzo4/wV.rOWP3rNcRC",
      isAdmin: null,
      image: null,
      createdAt: "2019-08-13T05:00:15.406Z",
      updatedAt: "2019-08-13T05:00:15.406Z"
    },
    {
      id: 5,
      name: "123",
      email: "123+v1@gmail.com",
      password: "$2a$10$aFObNZTWYpkh86oGEz647OCCg27GkIEqOBZUzBHttZavLtw2PosJO",
      isAdmin: null,
      image: null,
      createdAt: "2019-08-13T05:01:17.528Z",
      updatedAt: "2019-08-13T05:01:17.528Z"
    },
    {
      id: 6,
      name: "cjl19670@aklqo.com",
      email: "cjl19670@aklqo.com",
      password: "$2a$10$mlS72JE7IffnhMTp7HGyfORzvpVrl.0zUNWxveHWo8/OiA.Stl8Ne",
      isAdmin: null,
      image: null,
      createdAt: "2019-08-15T09:10:17.401Z",
      updatedAt: "2019-08-15T09:10:17.401Z"
    }
  ]
};

const dummyUser = {
  currentUser: {
    id: 1,
    name: "root test",
    email: "root@example.com",
    password: "$2a$10$OJ3jR93XlEMrQtYMWOIQh.EINWgaRFTXkd0Xi5OC/Vz4maztUXEPe",
    isAdmin: true,
    image: "https://i.imgur.com/58ImzMM.png",
    createdAt: "2019-07-30T16:24:54.983Z",
    updatedAt: "2019-08-07T04:09:56.622Z"
  }
};

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      users: [],
      currentUser: dummyUser.currentUser
    };
  },
  created() {
    this.fetchUsers();
    console.log("this.currentUser.id", this.currentUser.id);
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users;
    },
    toggleUserRole(userId) {
      this.users = this.users.map(user => {
        if (user.id !== userId) return user;

        return {
          ...user,
          isAdmin: !user.isAdmin
        };
      });
    }
  }
};
</script>