<template>
  <v-app>

    <div v-if="routeName == 'Login' || routeName == 'Registro'" >
      <v-app-bar  color="primary" elevation="14" rounded>
        <v-img
          src="@/assets/logoTec.png"
          alt="logo"
          max-height="50"
          max-width="120"
          :width="$vuetify.breakpoint.smAndDown ? '100' : ''"
        />

        <v-spacer></v-spacer>

        <v-btn :width="$vuetify.breakpoint.smAndDown ? '150' : ''" to="/" text color="accent">Inicio de Sesion</v-btn>
        <v-btn
          :width="$vuetify.breakpoint.smAndDown ? '115' : ''"
          to="/register"
          text
          color="accent"
          >Registrarse</v-btn
        >
      </v-app-bar>
    </div>

    <div v-if="routeName == 'Home' || routeName == 'Mis Materias'" >
      <v-app-bar color="primary" elevation="14" rounded>
        <v-img
          src="@/assets/logoTec.png"
          alt="logo"
          max-height="50"
          max-width="120"
          :width="$vuetify.breakpoint.smAndDown ? '100' : ''"
        />

        <v-spacer></v-spacer>

        <v-btn :width="$vuetify.breakpoint.smAndDown ? '65' : ''" to="/home" text color="accent">Inicio</v-btn>
        <v-btn
          :width="$vuetify.breakpoint.smAndDown ? '160' : ''"
          to="/courses"
          text
          color="accent"
          >Lista de Materias</v-btn
        >
        <v-btn @click="logout" text icon color="accent"><v-icon>mdi-logout</v-icon></v-btn>
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

    import { RouterView } from "vue-router"
    import firebase from "firebase/compat"

    export default {
      name: "App",
      data: () => ({
        
      }),
      components: { RouterView },
      computed: {
        
        routeName() {
          return this.$route.name;
        },

      },

      methods: {
        
        async logout() {
          
          await firebase.auth().signOut();
          this.$router.push("/");
        
        },

      },
    };
</script>
