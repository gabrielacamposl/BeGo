export interface IUser {
_id: string;
email: string;
password: string; // hash
createdAt: Date;
updatedAt: Date;
}


export interface PublicUser {
_id: string;
email: string;
createdAt: Date;
updatedAt: Date;
}


export type UserCreateInput = { email: string; password: string };
export type UserLoginInput = { email: string; password: string };