<template>
        <v-container >
        
        <v-row justify="center" >

            <v-col cols="12" md="6">

                <div class="mt-4">

                    <h1 class="display-1 text-center ma-5 primary--text font-weight-bold text-uppercase">Crea una Cuenta</h1>

                    <form novalidate>
                        <v-text-field
                            v-model="name"
                            :error-messages="nameErrors"
                            label="Nombre Completo"
                            outlined
                            required
                            dense
                            type="text"
                            color="primary"
                            @input="$v.name.$touch()"
                            @blur="$v.name.$touch()"
                        ></v-text-field>
                        
                        <v-text-field
                            v-model="student_id"
                            :error-messages="student_idErrors"
                            label="Matricula"
                            outlined
                            required
                            dense
                            type="text"
                            color="primary"
                            @input="$v.student_id.$touch()"
                            @blur="$v.student_id.$touch()">
                        </v-text-field>
                        <v-text-field
                            v-model="institutional_mail"
                            :error-messages="institutional_mailErrors"
                            label="Correo Institucional"
                            outlined
                            required
                            dense
                            type="email"
                            color="primary"
                            @input="$v.institutional_mail.$touch()"
                            @blur="$v.institutional_mail.$touch()">
                        </v-text-field>

                        <v-text-field
                            v-model="email"
                            :error-messages="emailErrors"
                            label="Correo Personal"
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
                        
                        <v-text-field
                            v-model="password_confirmation"
                            :error-messages="password_confirmationErrors"
                            label="Confirmar Contraseña"
                            outlined
                            required
                            color="primary"
                            dense
                            type="password"
                            @input="$v.password_confirmation.$touch()"
                            @blur="$v.password_confirmation.$touch()">
                        </v-text-field>

                        <v-checkbox
                            class="mb-4"
                            v-model="terms"
                            :error-messages="termsErrors"
                            label="Acepto los términos y condiciones"
                            color="primary"
                            required
                            @input="$v.terms.$touch()"
                            @blur="$v.terms.$touch()">
                        </v-checkbox>

                        <v-btn class="rounded-lg" :loading="loading" width="100%" color="primary" @click="submit">Registrarse</v-btn>

                    </form>
                    
                    
                    
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

        name: "Register",
        mixins: [validationMixin],

        validations: {
            name: {
                required,
                maxLength: maxLength(50)
            },
            student_id: {
                required,
                minLength: minLength(9),
                maxLength: maxLength(9)
            },
            institutional_mail: {
                required,
                institutional_mail_validator
            },
            email: {
                required,
                email
            },
            password: {
                required,
                minLength: minLength(6),
                maxLength: maxLength(14)
            },
            password_confirmation: {
                required,
                sameAsPassword: sameAs("password")
            },
            terms: {
                checked (value) {
                    return value
                }
            }
        },
        
        data: () => ({
            name: "",
            student_id: "",
            institutional_mail: "",
            email: "",
            password: "",
            password_confirmation: "",
            terms: false,
            loading: false,
        }),

        computed: {
            nameErrors() {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.required && errors.push('El nombre es requerido.')
                !this.$v.name.maxLength && errors.push('El nombre debe tener menos de 50 caracteres.')
                return errors
            },

            student_idErrors() {
                const errors = []
                if (!this.$v.student_id.$dirty) return errors
                !this.$v.student_id.required && errors.push('La matricula es requerida.')
                !this.$v.student_id.minLength && errors.push('La matricula debe tener al menos 9 caracteres.')
                !this.$v.student_id.maxLength && errors.push('La matricula debe tener menos de 9 caracteres.')
                return errors
            },

            institutional_mailErrors() {
                const errors = []
                if (!this.$v.institutional_mail.$dirty) return errors
                !this.$v.institutional_mail.required && errors.push('El correo institucional es requerido.')
                !this.$v.institutional_mail.institutional_mail_validator && errors.push('El correo institucional debe ser de la forma')
                return errors
            },

            emailErrors() {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.required && errors.push('El correo personal es requerido.')
                !this.$v.email.email && errors.push('El correo personal debe ser de la forma')
                return errors
            },

            passwordErrors() {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push('La contraseña es requerida.')
                !this.$v.password.maxLength && errors.push('La contraseña debe tener menos de 14 caracteres.')
                !this.$v.password.minLength && errors.push('La contraseña debe tener mas de 6 caracteres.')
                return errors
            },

            password_confirmationErrors() {
                const errors = []
                if (!this.$v.password_confirmation.$dirty) return errors
                !this.$v.password_confirmation.required && errors.push('El campo es requerido.')
                !this.$v.password_confirmation.sameAsPassword && errors.push('Las contraseñas no coinciden.')
                return errors
            },

            termsErrors() {
                const errors = []
                if (!this.$v.terms.$dirty) return errors
                !this.$v.terms.checked && errors.push('Debe aceptar los terminos y condiciones.')
                return errors
            },
        },

        methods: {
            
            async submit() {

                try {

                    this.loading = true;
                
                    this.$v.$touch();
                    if (this.$v.$invalid) {
                        this.loading = false;
                        return;
                    }

                    await firebase.auth().createUserWithEmailAndPassword(this.institutional_mail, this.password)
                    const image = await firebase.storage().ref("user.png").getDownloadURL()
                    await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                        name: this.name,
                        image: image,
                        student_id: this.student_id,
                        institutional_mail: this.institutional_mail,
                        personal_mail: this.email,
                        last_login: firebase.firestore.FieldValue.serverTimestamp(),
                    })

                    alert('Te has registrado exitosamente!')
                    this.$router.push('/');
                    
                } catch (error) {

                    this.loading = false;
                    alert("A ocurrido un error al registrar el usuario: " + error.message)
                    return;
                    
                }

            },
        }
    }

    

</script>