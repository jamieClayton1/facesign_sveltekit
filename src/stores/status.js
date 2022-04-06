import { writable } from 'svelte/store';


let statusData = {};
export const status = writable(statusData);

