import { ref } from 'vue'

export default function fetchAuth(url){
    const data = ref(null)

    const fetchData = async () =>{
        try {
            const res = await fetch(url);
            const result = await res.json();
            data.value = result.data;
        } catch (error) {
            console.log("fetchAuth error: ", error);
        }
    }
    fetchData()
    return { data };
}