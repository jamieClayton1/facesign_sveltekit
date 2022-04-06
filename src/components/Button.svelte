<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const handleClick = (e) => {
       dispatch('click');
    }

    export let styleClass;
    export let label;
</script>

<button class={styleClass} on:click={handleClick}>{label}</button>

<style>
    
button {
    height: 30px;
    width: 10rem;
    border-radius: 3px;
    font-size: 16px;
    box-shadow: 0px 0px 10px #72807607;
    cursor: pointer;
}

button:hover {
    opacity: 0.6;
}
</style>