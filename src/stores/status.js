import { writable } from 'svelte/store';

/* Empty status store */

let statusData = {};
export const status = writable(statusData);

