<template>
    <div class="login-container">
      <h2>Login</h2>
      
      <input type="email" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      
      <button @click="login">Login</button>
      <div>
      <button @click="loginWithGoogle" class="google-btn">
      <img src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--brands-pack-logos-icons-189824.png?f=webp&w=256" alt="Google Logo" class="google-logo" />
      Login with Google
    </button>
  </div>
      <p>Don't have an account? <a @click="goToRegister" class="go-to-register">Register</a></p>
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

.google-btn {
  display: flex;
  align-items: center;  /* Vertically center the items */
  justify-content: center; /* Horizontally center the content */
  color: black;
  border-radius: 4px;
  width: 300px; /* Optional: you can adjust the width */
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid gray;
}
.go-to-register{
  cursor: pointer;
}
.go-to-register:hover{
  text-decoration: underline;
}

.google-logo {
  width: 20px; /* Adjust size of the logo */
  margin-right: 10px; /* Space between logo and text */
}
  </style>