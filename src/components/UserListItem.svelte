<script>
    import User from '../models/User';
    import {user} from '../stores/user';
    import { goto } from '$app/navigation';
    
    let userData;
    user.subscribe(userStore => {
		userData = userStore;
	});


    const handleUserClick = async () => {
        const userObj = new User();
        const userData = await userObj.get(id);
        user.set(userData[0]);
    }

    export let id;
    export let label;

</script>

<li on:click={handleUserClick} class:active={$user?.id == id}>
    {label}
</li>


<style>
    li {
        list-style: none;
        border-radius: 3px;
        background-color: white;
        border: 1px solid #31a07200;
        color: #31a072;
        width: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor:pointer;
        margin: 0.5rem 0;
        height: 30px;
    }

    li:hover, .active{
        border-color: #31a072;
    }
</style>