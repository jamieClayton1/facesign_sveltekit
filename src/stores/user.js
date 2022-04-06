import { writable } from 'svelte/store';

/* Empty user store */
let userData = {
    id: null
}
export const user = writable(userData);

