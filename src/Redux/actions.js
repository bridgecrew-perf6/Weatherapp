import {CITY} from "./actionTypes"

export const AddCity = (cityname) =>{
    return {
        type:CITY,
        payload: cityname,
    }
}