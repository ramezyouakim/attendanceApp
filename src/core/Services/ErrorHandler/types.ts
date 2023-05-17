import { Errors } from "./constants";

export type BackendErrorStatus = {
    [Errors.NotFound]: 404
    [Errors.Unauthenticated]: 401
    [Errors.ServerError]: 500
}

export type InAppErrorStatus = {
    // [Errors.NotFound]: 404,
}


export type ErrorCodes =
    BackendErrorStatus &
    InAppErrorStatus
