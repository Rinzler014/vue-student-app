<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold text-center py-10 primary--text">
          Materias Inscritas
        </h1>
        <v-container v-for="(course, index) in courses" :key="index">
          <v-card class="mx-auto rounded-xl" max-width="800" height="150">
            <v-card-title class="pb-0 pl-7">
              <h2
                :class="
                  $vuetify.breakpoint.smAndDown
                    ? 'body-1 primary--text font-weight-bold pb-0'
                    : 'title primary--text font-weight-bold pb-0'
                "
              >
                {{ course.name }}
              </h2>
            </v-card-title>

            <v-card-text
              :class="
                $vuetify.breakpoint.smAndDown
                  ? 'body-2 secondary--text font-weight-bold pb-7 pl-7'
                  : 'title secondary--text font-weight-bold pb-0 pl-7'
              "
            >
              <p>Profesor: {{ course.teacher }}</p>
            </v-card-text>

            <v-card-actions class="pt-0 pr-5">
              <v-spacer></v-spacer>

              <v-dialog v-model="dialogs[course.name]" max-width="800px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="body-2 font-weight-bold text-capitalize"
                    color="primary"
                    text
                    >Ver Detalles
                  
                  </v-btn>
                </template>

                <v-card class="rounded-xl">
                  <v-card-title class="justify-center">
                    <h2
                      :class="
                        $vuetify.breakpoint.smAndDown
                          ? 'text-h5 font-weight-bold text-center py-3 primary--text'
                          : 'font-weight-bold text-center py-3 primary--text'
                      "
                    >
                      {{ course.name }}
                    </h2>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row class="">
                        <v-col cols="12">
                          <h2
                            :class="
                              $vuetify.breakpoint.smAndDown
                                ? 'text-h6 font-weight-bold mb-0  secondary--text'
                                : 'font-weight-bold mb-5 secondary--text'
                            "
                          >
                            Profesor: {{ course.teacher }}
                          </h2>
                        </v-col>

                        <v-col cols="12">
                          <h2
                            :class="
                              $vuetify.breakpoint.smAndDown
                                ? 'text-h6 font-weight-bold mb-0  secondary--text'
                                : 'font-weight-bold mb-5 secondary--text'
                            "
                          >
                            Salón: {{ course.classroom }}
                          </h2>
                        </v-col>

                        <v-col cols="12">
                          <h2
                            :class="
                              $vuetify.breakpoint.smAndDown
                                ? 'text-h6 font-weight-bold mb-0  secondary--text'
                                : 'font-weight-bold mb-5 secondary--text'
                            "
                          >
                            Días: {{ course.classDates }}
                          </h2>
                        </v-col>

                        <v-col cols="12">
                          <h2
                            :class="
                              $vuetify.breakpoint.smAndDown
                                ? 'text-h6 font-weight-bold mb-0  secondary--text'
                                : 'font-weight-bold mb-5 secondary--text'
                            "
                          >
                            Horario: {{ course.classTime }}
                          </h2>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="justify-center">
                    <v-spacer></v-spacer>
                    <v-btn
                      :class="
                        $vuetify.breakpoint.smAndDown
                          ? 'text-h5 font-weight-bold mb-3'
                          : 'body-2 font-weight-bold '
                      "
                      color="primary"
                      text
                      @click="dialogs[course.name] = false"
                      >Cerrar</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { courses } from "../data/courses.js";
import firebase from "firebase/compat";

export default {
  name: "CoursesLists",
  async mounted() {
    await this.login();
    await this.createFirestoreDocForNewUser();
  },
  data() {
    return {
      courses: courses,
      dialogs: {},
    };
  },
  methods: {
    async login() {
      await firebase
        .auth()
        .signInWithEmailAndPassword(
          "ricardo_glez_14@icloud.com",
          "Peluche343@"
        );
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.email)
        .update({
          lastLogIn: firebase.firestore.FieldValue.serverTimestamp(),
        });
    },

    async logout() {
      await firebase.auth().signOut();
    },

    async createFirestoreDocForNewUser() {
      const email = firebase.auth().currentUser.email;

      await firebase.firestore().collection("users").doc(email).set({
        name: "Ricardo",
        email: email,
        lastLogIn: firebase.firestore.FieldValue.serverTimestamp(),
      });
    },
  },
};
</script>
