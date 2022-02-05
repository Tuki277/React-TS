export interface timeDefault {
    createdAt: Date,
    updatedAt: Date
}

export interface IRole  extends timeDefault {
    name: string,
    roleNumber: number,
}

export interface IPosition extends timeDefault {
    name: string
}

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

export interface ITask extends timeDefault {
    _id: string;
    name: string;
    description: string;
    status: boolean;
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

export interface ILogout {
    Error: boolean,
    Message: string;
}

export interface IUserprofile<T, U> extends timeDefault {
    _id: string,
    email: string,
    username: string,
    password: string,
    role: T[],
    position: U[],
}

export interface ISession extends timeDefault {
    _id: string,
    user: string,
    valid: boolean,
    userAgent: string
}

export interface ITaskRedux {
    task: ListResponse<ITask> | undefined,
    loading: boolean,
    message: string,
    taskDetail: DetailResponse<ITask> | undefined
}

export interface ITaskUpdateRedux<T> {
    model: T,
    id: string
}