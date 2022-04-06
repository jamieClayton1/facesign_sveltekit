import { writable } from 'svelte/store';
import Schedule from '../models/Schedule';

let list;

/* Get schedules from database */
export const getSchedules = async (date) => {
    const schedule = new Schedule();
    const list = await schedule.list(date);
    schedules.set(list);
  
    return list;
}

/* Empty schedules store */
export const schedules = writable(list);


