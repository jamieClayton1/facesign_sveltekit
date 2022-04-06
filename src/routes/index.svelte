<script>
    import SecondaryHeader from '../components/SecondaryHeader.svelte';
    import Navigation from '../components/Navigation.svelte';
    import PrimaryHeader from '../components/PrimaryHeader.svelte';
    import UserList from '../components/UserList.svelte';
    import {status} from '../stores/status';
    import Scanner from '../components/scanner.svelte';
        
    let statusData = {};
    status.subscribe(statusStore => {
		statusData = statusStore;
	});

</script>

<Navigation>
    <SecondaryHeader text={'Verify'} />
    <div class="landing">
        <section class="users">
            
            <div class="user-list">
                <UserList header={'Sign In'} />
            </div>
        </section>
        <section>
            <Scanner />
            <p>{$status.successMessage||''}</p>
        </section>
       
    </div>   
</Navigation>

<style>
    .landing {
        display: grid;
        grid-template-columns: 200px 1fr;
        justify-content: start;
        align-items: start;

    }

    .landing > section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }

    .landing-cta {
        width: 100%;
        text-align: center;
    }

    .user-list {
        margin-top: 1rem;
    }
</style>