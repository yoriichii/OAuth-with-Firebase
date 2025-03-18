<template>
    <div>
      <input type="text" v-model="newData.newUser" placeholder="Enter text here" @keyup.enter="addUser" />
      <div v-for="(user, index) in newData.users" :key="index" class="multi-input-box">
        <span>{{ user }}</span>
        <button @click="removeUser(user)">❌</button>
      </div>
    </div>
    <button @click="signOutUser">Logout</button>
  </template>
  
  <script setup lang="ts">
  
  interface User{
    users: string[];
    newUser: string;
  }
  
  import { ref } from "vue";
  import { signOut, getAuth } from "firebase/auth";
  import { useRouter } from "vue-router";	

  
  const newData = ref<User>({
    users: [],
    newUser: ""
  });
  
  const addUser = () =>{
      newData.value.users.push(newData.value.newUser.trim());
      newData.value.newUser = "";
  }
  
  const removeUser = (id: number) => {
    newData.value.users.splice(id, 1); // Removes the item at index `id`
  };

  const router = useRouter();
  
  const signOutUser = async() => {
    await signOut(getAuth());
    router.push("/login");
  };
  
  </script>
  
  <style scoped>
  
  </style>
  
  