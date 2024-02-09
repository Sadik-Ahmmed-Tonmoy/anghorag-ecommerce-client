import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import axios from "axios";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router.jsx";
import { getFromLocalStorage } from "./utilities/getFromLocalStorage.js";
import Provider from "./provider/Provider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

axios.defaults.baseURL = "https://application.anghorag.com/api/";
// axios.defaults.baseURL = "http://192.168.1.61/api/";
// axios.defaults.baseURL = "http://192.168.1.120:88/api/";

// const token = getFromLocalStorage();
// if (token) {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// } else {
//     // Handle the case when the token is not available or empty
//     console.error("Token not found in local storage");
// }

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Provider>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </Provider>
    // </React.StrictMode>
);
