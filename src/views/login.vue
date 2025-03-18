<template>
    <div class="login-container">
      <h2>Login</h2>
      
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      
      <button @click="login">Login</button>
      <button @click="loginWithGoogle">Login with Google</button>
      
      <p>Don't have an account? <a @click="goToRegister" style="cursor: pointer;">Register</a></p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from "vue-router";
  import { ref } from "vue";
  import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup , getAuth } from "firebase/auth";

  const router = useRouter();

  const email = ref("");
  const password = ref("");


  const login = async () => {
      try {
        await signInWithEmailAndPassword(getAuth(), email.value, password.value);
        alert("Login successful!");
        router.push("/blog");
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            alert("Invalid email address format");
            break;
          case "auth/user-not-found":
            alert("User not found");
            break;
          case "auth/wrong-password":
            alert("Wrong password");
            break;
          default:
            alert(error.message);
        }
      }
    };

    const loginWithGoogle = async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(getAuth(), provider);
        alert("Google login successful!");
        router.push("/blog");
      } catch (error) {
        alert(error.message);
      }
    };
  const goToRegister = () => {
    router.push("/register");
  };    
  
  </script>
  
  <style scoped>

  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
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
}
  </style>