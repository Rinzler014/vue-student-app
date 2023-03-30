<template>
  <v-app>
    <div>
      <v-app-bar color="primary" elevation="14" rounded>
        <v-img
          src="@/assets/logoTec.png"
          alt="logo"
          max-height="50"
          max-width="120"
        />

        <v-spacer></v-spacer>

        <v-btn to="/" text color="accent">Incio</v-btn>
        <v-btn
          :width="$vuetify.breakpoint.smAndDown ? '165' : ''"
          to="/courses"
          text
          color="accent"
          >Lista de Materias</v-btn
        >
      </v-app-bar>
    </div>

    <v-main>
      <v-slide-x-transition mode="out-in">
        <router-view></router-view>
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from "vue-router";

export default {
  name: "App",
  data: () => ({
    //
  }),
  components: { RouterView },
};
</script>
