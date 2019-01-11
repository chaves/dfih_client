<template>
  <v-app>
    <v-toolbar dark color="primary" app>
      <v-toolbar-title class="headline text-uppercase white--text">
        <span>DFIH - interface</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>

<style>
.level-one {
  background: yellow;
}
.level-two {
  background: greenyellow;
}
.level-three {
  background: rgb(203, 144, 255);
}

.level-four {
  background: rgb(144, 174, 250);
}
</style>
