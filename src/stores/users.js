import { writable } from 'svelte/store';
import User from '../models/User';

let list;
 
/* Get users from database */
export const getUsers = async () => {
    const user = new User();
    const list = await user.list();
    users.set(list);

    return list;
}

/* Empty user store */
export const users = writable(list);







