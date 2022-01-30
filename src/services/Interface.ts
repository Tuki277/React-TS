export interface ListResponse<T> {
    object: T[];
    Error: boolean
}

export interface DetailResponse<T> {
    object: T,
    Error: boolean
}

export interface ITask {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    createdAt: Date,
    updatedAt: Date
}

export interface TodoSelector {
    tasks: ITask[]
}