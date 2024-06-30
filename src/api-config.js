let backendHost;

const hostname = window && window.location && window.location.hostname;

if( hostname === "localhost") {
    backendHost = "http://localhost:8080"; // 하드 코딩 하지 않고 동적으로 가져오기 위해
}

export const API_BASE_URL = `${backendHost}`;