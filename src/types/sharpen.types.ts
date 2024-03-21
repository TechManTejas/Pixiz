import { Dispatch, SetStateAction } from "react";

export interface ISharpen {
    value: number;
    image?: string;
    setImage: Dispatch<SetStateAction<string>>;
}
