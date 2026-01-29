import { StaticImageData } from "next/image";

export default interface Character {
    id: string;
    name: string,
    image: string | StaticImageData,
    initiativeRoll: number,
    initiativeBonus: number
}