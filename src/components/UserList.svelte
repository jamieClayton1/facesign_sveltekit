<script>
    import UserListItem from './UserListItem.svelte';
    import {users, getUsers} from '../stores/users';
    import { onMount } from 'svelte';   
    import PrimaryCTAButton from './PrimaryCTAButton.svelte';
    import { goto } from '$app/navigation';
    
    let userList = [];

    users.subscribe(userData => {
		userList = userData;
	});

    const handleCreateUser = () => {
        goto('/user/create');
    }

    onMount(async () => await getUsers());

    export let header;
</script>

<h2>{header}</h2>

{#if userList}
{#each userList as user (user.id)}
    <UserListItem label={user.name} id={user.id}/>
{/each}
{/if}
<PrimaryCTAButton label={'Add User'} on:click={handleCreateUser}/>

<style>
    h2 {
        color: #a6adaa;
    }
</style>