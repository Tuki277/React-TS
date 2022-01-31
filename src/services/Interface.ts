export interface ListResponse<T> {
    object: T[];
    Error: boolean,
    Message: string
}

export interface DetailResponse<T> {
    object: T,
    Error: boolean,
    Message: string
}

export interface ITask {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    createdAt: Date,
    updatedAt: Date
}

export interface ITaskPost {
    name: string;
    description: string;
}

export interface ILogin {
    accessToken: string,
    refreshToken: string,
    sessionId: string,
    Message: boolean
}

export interface ILoginPost {
    email: string,
    password: string
}

export interface IProps<T> {
    notiProps?: T
}