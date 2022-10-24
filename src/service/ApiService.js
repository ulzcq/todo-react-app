import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json",
      });
    
    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken && accessToken !== null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    if (request) {
        // GET method
        options.body = JSON.stringify(request);
    }
    
    return fetch(options.url, options).then((response) => {
        if(response.status === 200){
            return response.json();
        } else if(response.status === 403) {
            window.location.href = "/login"; //redirect
        } else {
            Promise.reject(response);
            throw Error(response);
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
}

//로그인
export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
    .then((response) => {
        if(response.token) {
            //로컬 스토리지에 토큰 저장
            localStorage.setItem("ACCESS_TOKEN", response.token);
            //token이 존재하는 경우 Todo 화면으로 리디렉트
            window.location.href = "/";
        }
    });
}

export function signout(){
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
}

export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}