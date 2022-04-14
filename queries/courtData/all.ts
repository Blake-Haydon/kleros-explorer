import court0 from "./court0"
import court1 from "./court1"
import court2 from "./court2"
import court3 from "./court3"
import court4 from "./court4"
import court5 from "./court5"
import court6 from "./court6"
import court7 from "./court7"
import court8 from "./court8"
import court9 from "./court9"
import court10 from "./court10"
import court11 from "./court11"
import court12 from "./court12"
import court13 from "./court13"
import court14 from "./court14"
import court15 from "./court15"
import court16 from "./court16"
import court17 from "./court17"
import court18 from "./court18"
import court19 from "./court19"
import court20 from "./court20"
import court21 from "./court21"
import court22 from "./court22"
import court23 from "./court23"


export interface ICourt {
    id: string;
    name: string;
    description?: string;
    summary?: string;
    requiredSkills?: string;
};

export const allCourts = [
    court0, court1, court2, court3, court4,
    court5, court6, court7, court8, court9,
    court10, court11, court12, court13, court14,
    court15, court16, court17, court18, court19,
    court20, court21, court22, court23,
]