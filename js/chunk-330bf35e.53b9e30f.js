(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-330bf35e"],{be6c:function(t,e,r){"use strict";r("7f7f");var n=r("2fa3");e["a"]={categories:{get:function(){return n["b"].get("/admin/categories")},create:function(t){var e=t.name;return n["b"].post("/admin/categories",{name:e})},update:function(t){var e=t.categoryId,r=t.name;return n["b"].put("/admin/categories/".concat(e),{name:r})},delete:function(t){var e=t.categoryId;return n["b"].delete("/admin/categories/".concat(e))}},restaurants:{getDetail:function(t){var e=t.restaurantId;return n["b"].get("/admin/restaurants/".concat(e))},get:function(){return n["b"].get("/admin/restaurants")},create:function(t){var e=t.formData;return n["b"].post("/admin/restaurants",e)},update:function(t){var e=t.restaurantId,r=t.formData;return n["b"].put("/admin/restaurants/".concat(e),r)},delete:function(t){var e=t.restaurantId;return n["b"].delete("/admin/restaurants/".concat(e))}},users:{get:function(){return n["b"].get("/admin/users")},update:function(t){var e=t.userId,r=t.isAdmin;return n["b"].put("/admin/users/".concat(e),{isAdmin:r})}}}},f91c:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[t.isLoading?r("Spinner"):r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("h1",[t._v(t._s(t.restaurant.name))]),r("p",[t._v("["+t._s(t.restaurant.categoryName)+"]")])]),r("div",{staticClass:"col-md-4"},[r("img",{staticClass:"img-responsive center-block",staticStyle:{width:"250px","margin-bottom":"25px"},attrs:{src:t._f("emptyImage")(t.restaurant.image)}}),r("div",{staticClass:"well"},[r("ul",{staticClass:"list-unstyled"},[r("li",[r("strong",[t._v("Opening Hour:")]),t._v("\n            "+t._s(t.restaurant.openingHours)+"\n          ")]),r("li",[r("strong",[t._v("Tel:")]),t._v("\n            "+t._s(t.restaurant.tel)+"\n          ")]),r("li",[r("strong",[t._v("Address:")]),t._v("\n            "+t._s(t.restaurant.address)+"\n          ")])])])]),r("div",{staticClass:"col-md-8"},[r("p",[t._v(t._s(t.restaurant.description))])])]),r("hr"),r("a",{attrs:{href:"#"},on:{click:function(e){return t.$router.back()}}},[t._v("回上一頁")])],1)},a=[],s=(r("8e6e"),r("ac6a"),r("456d"),r("7f7f"),r("bd86")),i=(r("96cf"),r("3b8d")),c=r("2708"),o=r("2375"),u=r("be6c"),d=r("2fa3");function p(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function f(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?p(r,!0).forEach(function(e){Object(s["a"])(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):p(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}var m={components:{Spinner:o["a"]},name:"AdminRestaurant",mixins:[c["a"]],data:function(){return{restaurant:{id:-1,name:"",categoryName:"",image:"",openingHours:"",tel:"",address:"",description:""},isLoading:!0}},mounted:function(){var t=this.$route.params.id;this.fetchRestaurant(t)},beforeRouteUpdate:function(t,e,r){var n=t.params.id;this.fetchRestaurant(n),r()},methods:{fetchRestaurant:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(e){var r,n,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.isLoading=!0,t.prev=1,t.next=4,u["a"].restaurants.getDetail({restaurantId:e});case 4:if(r=t.sent,n=r.data.restaurant,a=r.statusText,"OK"===a){t.next=9;break}throw new Error(a);case 9:this.restaurant=f({},this.restaurant,{id:n.id,name:n.name,categoryName:n.Category.name,image:n.image,openingHours:n.opening_hours,tel:n.tel,address:n.address,description:n.description}),this.isLoading=!1,t.next=17;break;case 13:t.prev=13,t.t0=t["catch"](1),this.isLoading=!1,d["a"].fire({type:"error",title:"無法取得餐廳資料，請稍後再試"});case 17:case"end":return t.stop()}},t,this,[[1,13]])}));function e(e){return t.apply(this,arguments)}return e}()}},l=m,g=r("2877"),v=Object(g["a"])(l,n,a,!1,null,null,null);e["default"]=v.exports}}]);
//# sourceMappingURL=chunk-330bf35e.53b9e30f.js.map