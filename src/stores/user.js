import { writable } from 'svelte/store';


let userData = {
    id: null
}
export const user = writable(userData);

