import { environment } from "src/environments/environment";

export const  config = {
    googleClientId : environment.googleClientId,
    googleOauthRedirectUrl : `${environment.apiUrl}/auth/oauth/google`,

    api : {
        //login
        LOGIN : `${environment.apiUrl}/auth/login`,
        REFRESH : `${environment.apiUrl}/auth/refresh`,

        //logout
        LOGOUT : `${environment.apiUrl}/auth/logout`,

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