<script>
    import Button from './Button.svelte';
    
    export let label;
</script>

<Button on:click label={label} styleClass={'secondary-cta'}/>

<style>
    
</style>