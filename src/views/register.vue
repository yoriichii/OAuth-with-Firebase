<template>
  <div class="register-container">
    <h1>Register</h1>
    
    <input type="email" v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <input type="password" v-model="cfPassword" placeholder="Confirm password">
    
    <button @click="register">Register</button>
    
    <p>Already have an account? <a @click="goToLogin" class="go-to-login">Login</a></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useRouter } from "vue-router";
   const router = useRouter();
    const email = ref("");
    const password = ref("");
    const cfPassword = ref("");

    // 🔹 Register User
    const register = async () => {
      try {
        await createUserWithEmailAndPassword(getAuth(), email.value, password.value, cfPassword.value);
        alert("Registration successful!");
        router.push("/blog");
      } catch (error) {
        alert(error.message);
      }
    };

    const goToLogin = () => {
      router.push("/login");
};
</script>

<style scoped>
.register-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 300px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  margin: 10px auto;
  padding: 8px;
  width: 100%;
}
button {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid gray;
}
.go-to-login{
  cursor: pointer;
}
.go-to-login:hover{
  text-decoration: underline;
}
</style>
