<template>
  <v-container>

    <v-row justify="center">

      <v-col cols="12">
        <h1 class="display-2 font-weight-bold text-center py-10 primary--text">
          Informacion del Alumno
        </h1>
        <div
          style="display: flex; justify-content: center; align-items: center"
        >
          <v-avatar width="150" height="150" align="center">
            <img :src="user.image" alt="" srcset="" />
          </v-avatar>
        </div>
      </v-col>

      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <div style="height: 70px; width: 100%">
          <h1
            :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'"
            class="title font-weight-bold primary--text"
          >
            Nombre Completo
          </h1>
          <p :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'">
            {{ user.name }}
          </p>
        </div>
      </v-col>

      <v-col cols="12" sm="12" md="1" lg="1" xl="2">
        <div style="height: 70px; width: 100%">
          <h1
            :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'"
            class="title font-weight-bold primary--text"
          >
            Matricula
          </h1>
          <p :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'">
            {{ user.student_id }}
          </p>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="12" md="4" lg="4" xl="4">
        <div style="height: 70px; width: 100%">
          <h1
            :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'"
            class="title font-weight-bold primary--text"
          >
            Correo Institucional
          </h1>
          <p :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'">
            {{ user.institutional_mail }}
          </p>
        </div>
      </v-col>

      <v-col cols="12" sm="12" md="1" lg="1" xl="1">
        <div style="height: 70px; width: 100%">
          <h1
            :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'"
            class="title font-weight-bold primary--text"
          >
            Carrera
          </h1>
          <p :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'">
            ITC
          </p>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" sm="12" md="5" lg="5" xl="5">
        <div style="height: 70px; width: 100%">
          <h1
            :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'"
            class="title font-weight-bold primary--text"
          >
            Correo Personal
          </h1>
          <p :class="$vuetify.breakpoint.xsOnly ? 'text-center' : 'text-start'">
            {{ user.personal_mail }}
          </p>
        </div>
      </v-col>
    </v-row>

    
    
  </v-container>
</template>

<script>

  import firebase from "firebase/compat";
  
  export default {
    name: "Home",

    async created() {
      
      this.user = await this.getUser();

    },

    data: () => ({
      
      user: null,

    }),

    methods: {

      async getUser() {
        const user = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get();
        return user.data();
      },

      async logout() {
      
        await firebase.auth().signOut();
        this.$router.push("/");
      
      },

    },

  };
</script>
