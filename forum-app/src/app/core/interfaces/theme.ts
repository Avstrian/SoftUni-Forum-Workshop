import { IBase } from "./base";
import { IPost } from "./post";
import { IUser } from "./user";

export interface ITheme extends IBase {
    subscribers: string[];
    posts: IPost[];
    themeName: string;
    userId: IUser,
}