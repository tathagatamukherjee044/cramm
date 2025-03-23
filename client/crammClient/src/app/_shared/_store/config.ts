import { environment } from "src/environments/environment";

export const  config = {
    googleClientId : '90832106606-pqtgjjtb6bs0u290d95hbf3ndsc0h1in.apps.googleusercontent.com',
    googleOauthRedirectUrl : `${environment.apiUrl}/auth/oauth/google`,

    api : {
        //login
        LOGIN : `${environment.apiUrl}/auth/login`,
        REFRESH : `${environment.apiUrl}/auth/refresh`,

        //user
        GET_USER : `${environment.apiUrl}/user/me`,

        //quiz
        GET_QUIZ:  `${environment.apiUrl}/quiz`,
        QUIZ_COMPLETED:  `${environment.apiUrl}/quiz/completed`,
        UPDATE_TIME_EXP:  `${environment.apiUrl}/quiz/updateTime`,
        ADD_QUIZ:  `${environment.apiUrl}/quiz/add`,

        //subject
        GET_SUBJECTS: `${environment.apiUrl}/subject/list`,
    }
}