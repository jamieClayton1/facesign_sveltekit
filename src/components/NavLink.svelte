<script>
    import { page } from '$app/stores';
    export let title;
    export let href;
</script>

<a href={href} class:active={$page.url.pathname == href}>
  <p>{title}</p>
  <span>></span>
</a>
  
<style>

    a {
        cursor: pointer;
        text-decoration: none;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 10px;
        border-radius: 3px;
        margin: 0.5rem 0;
    }

    a:hover,  a.active {
        background-color: white;
        color: #31a072;
 
    }

</style>