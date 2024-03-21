import { Dispatch, SetStateAction } from "react";

export interface IBlur {
    value: number;
    image?: string;
    setImage: Dispatch<SetStateAction<string>>;
}
