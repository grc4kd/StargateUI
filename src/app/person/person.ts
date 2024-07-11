import { AstronautDetail } from "../astronaut-detail/astronaut-detail";

export interface Person
{
    id: number,
    name: string,
    astronautDetail: AstronautDetail
}