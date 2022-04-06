import { writable } from 'svelte/store';
import User from '../models/User';

let list;
 
export const getUsers = async () => {
    const user = new User();
    const list = await user.list();
    users.set(list);
    console.log(list);
    return list;
}


export const users = writable(list);







