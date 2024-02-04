import { environment } from "src/environments/environment";

export const  config = {
    googleClientId : '90832106606-pqtgjjtb6bs0u290d95hbf3ndsc0h1in.apps.googleusercontent.com',
    googleOauthRedirectUrl : 'http://localhost:8080/auth/oauth/google',

    api : {
        //login
        LOGIN : `${environment.apiUrl}/auth/login`,

        //quiz
        GET_QUIZ:  `${environment.apiUrl}/quiz`,
        QUIZ_COMPLETED:  `${environment.apiUrl}/quiz/completed`,
    }
}