import { Person } from "../person/person";

export interface AstronautDetail
{
    id: number,
    currentRank: string,
    currentDutyTitle: string,
    careerStartDate: Date,
    careerEndDate?: Date,
}