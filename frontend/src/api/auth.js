import {apiClient} from "./client";
export const authApi={
    register:(payload)=>
        apiClient.post("/register",payload)
                .then((response)=>response.data),

                login:(payload)=>
                    apiClient.post("/login",payload)
                .then((response)=> response.data),

                logout:()=>
                    apiClient.post("/logout")
                .then((response)=>response.data),

                  me: () => apiClient
                .get("me")
                .then((response) => response.data),

}