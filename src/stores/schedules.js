import { writable } from 'svelte/store';
import Schedule from '../models/Schedule';

let list;
 
export const getSchedules = async (date) => {
    const schedule = new Schedule();
    const list = await schedule.list(date);
    schedules.set(list);
    console.log(list);
    return list;
}


export const schedules = writable(list);


