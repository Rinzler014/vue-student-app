<template>

    <v-container >
        
        <v-row justify="center" >

            <v-col cols="12" md="6">

                <v-dialog v-model="dialog" max-width="800px">

                    <v-card class="rounded-xl">
                        <v-card-title class="justify-center">
                        <h2
                            :class="
                            $vuetify.breakpoint.smAndDown
                                ? 'text-h5 font-weight-bold text-center py-3 primary--text'
                                : 'font-weight-bold text-center py-3 primary--text'
                            "
                        >
                            {{ message.title }}
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
                                        {{ message.text }}
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
                                @click="dialog = false"
                                >Cerrar</v-btn
                            >

                        </v-card-actions>
                    </v-card>

                </v-dialog>

                <div class="pa-10 mt-10" >

                    <h1 class="display-1 text-center ma-5 mb-10 primary--text font-weight-bold text-uppercase">Inicio de Sesión</h1>
                    <v-form>
                        <v-text-field
                            v-model="email"
                            :error-messages="emailErrors"
                            label="Correo"
                            outlined
                            required
                            dense
                            type="email"
                            color="primary"
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()">
                        </v-text-field>
                        <v-text-field
                            v-model="password"
                            :error-messages="passwordErrors"
                            label="Contraseña"
                            outlined
                            required
                            color="primary"
                            dense
                            type="password"
                            @input="$v.password.$touch()"
                            @blur="$v.password.$touch()">
                        </v-text-field>
                    </v-form>
                    
                    <v-btn :loading="loading" class="rounded-lg" width="100%" color="primary" @click="login">Iniciar Sesión</v-btn>
                    
                </div>

            </v-col>
        </v-row>

    </v-container>

</template>

<script>

    import { validationMixin } from 'vuelidate'
    import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'
    import firebase from "firebase/compat";

    const institutional_mail_validator = (value) => /^[aA]+[0-9]+@tec.mx$/.test(value)

    export default {

        name: "Login",
        mixins: [validationMixin],

        validations: {
            email: {
                required,
                institutional_mail_validator
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(14)
            }
        },

        computed: {

            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.required && errors.push('Correo requerido.')
                !this.$v.email.institutional_mail_validator && errors.push('Correo no válido.')
                return errors
            },
            passwordErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('Contraseña requerida.')
                !this.$v.password.minLength && errors.push('Contraseña muy corta.')
                !this.$v.password.maxLength && errors.push('Contraseña muy larga.')
                return errors
            }
        },

        data: () => ({
            email: "",
            password: "",
            loading: false,
            dialog: false,
            message: {
                title: "",
                text: ""
            }
        }),

        methods: {
            async login() {

                try {
                    this.$v.$touch();
                    if (this.$v.$invalid) {
                        return;
                    }

                    this.loading = true
                    await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                    await firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
                        last_login: firebase.firestore.FieldValue.serverTimestamp()
                    })

                    this.$router.push("/home");


                } catch (error) {
                    
                    this.loading = false;
                    this.dialog = true;

                    if (error.code == "auth/user-not-found") {
                        this.message.title = "Usuario no encontrado";
                        this.message.text = "El usuario no existe o no está registrado.";
                        return;
                    }

                    if (error.code == "auth/wrong-password") {
                        this.message.title = "Contraseña incorrecta";
                        this.message.text = "La contraseña ingresada no es correcta.";
                        return;
                    }

                    else {
                        this.message.title = "Error";
                        this.message.text = "Ha ocurrido un error al iniciar sesion:\n" + error.message
                        return;
                    }

                }

            }
        }

        
    }

</script>