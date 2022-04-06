<script>
    import TextInput from "./TextInput.svelte";
    import PrimaryCTAButton from './PrimaryCTAButton.svelte';
   
    import { goto } from '$app/navigation';
    import { newUser } from '../stores/newUser.js';

    let newUserData;
    newUser.subscribe(newUser => {
        newUserData = newUser;
	});
    
    const handleSubmit = (e) => {
        const name = e.target[0].value;
        const email = e.target[1].value;
        newUserData.name = name;
        newUserData.email = email;

        newUser.set(newUserData);
        
        goto('/user/register_face');
    }

</script>

<form id="add-user" on:submit|preventDefault={handleSubmit}>
    <TextInput label={'Name'} id={'add-user-name'}/>
    <TextInput label={'Email'} id={'add-user-email'} />
    <PrimaryCTAButton on:click label={'Next'} />
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1rem 0;
    }
</style>