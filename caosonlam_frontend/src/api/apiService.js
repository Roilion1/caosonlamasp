import axiosInstance from "./axiosConfig";

function callApi(endpoint, method = "GET", body, params) {
    const token = localStorage.getItem("authToken");
    const queryString = new URLSearchParams(params).toString();
    const url = `${endpoint}?${queryString}`;

    const config = {
        method,
        url,
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : undefined,
        },
        data: body || null,
    };

    console.log("callApi url:", url);
    console.log("callApi token:", token);

    return axiosInstance(config)
        .then((response) => response.data)
        .catch((error) => {
            console.error("API call error:", error);
            throw error;
        });
}


export function GET_ALL(endpoint, params) {
    return callApi(endpoint, "GET", null, params);
}
export function GET_PAGE(endpoint, page = 0, size = 10, categoryId = null) {
    let url = `${endpoint}?page=${page}&size=${size}`;

    if (categoryId !== null) {
        url += `&categoryId=${categoryId}`;
    }
    return callApi(url, "GET");
}



export function GET_ID(endpoint, id) {
    return callApi(endpoint + "/" + id, "GET");
}
export function POST_ADD(endpoint, data) {
    return callApi(endpoint, "POST", data);
}
export function PUT_EDIT(endpoint, data) {
    return callApi(endpoint, "PUT", data);
}
export function DELETE_ID(endpoint) {
    return callApi(endpoint, 'DELETE');
}

export function LOGIN(body) {
    const API_URL_LOGIN = "http://127.0.0.1:7033/api/login";

    return axiosInstance.post(API_URL_LOGIN, body, {
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
    })
        .then((response) => response)
        .catch((error) => {
            console.log(error);
            throw error;
        });
}