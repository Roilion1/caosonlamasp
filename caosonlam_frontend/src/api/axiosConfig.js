import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "", 
});

let hasRedirected = false;

if (!localStorage.getItem("hasRedirected")) {
    hasRedirected = true;
    localStorage.setItem("hasRedirected", true);
    window.location.href = "/Login";
}

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (!hasRedirected && !localStorage.getItem("hasRedirected")) {
                hasRedirected = true;
                localStorage.setItem("hasRedirected", true);
                window.location.href = "/Login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
