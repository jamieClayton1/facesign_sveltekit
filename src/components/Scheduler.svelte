<script>
    import dayjs from 'dayjs';
    import { onMount } from 'svelte';
    import { Datepicker } from 'svelte-calendar';
    import PrimaryHeader from './PrimaryHeader.svelte';
    import SecondaryHeader from './SecondaryHeader.svelte';
    import {users, getUsers} from '../stores/users';
    import {schedules, getSchedules} from '../stores/schedules';
    import PrimaryCTAButton from './PrimaryCTAButton.svelte';
    import Schedule from '../models/Schedule';

    let userList = [];

    users.subscribe(userData => {
        userList = userData;
        console.log(users)
    });

    let scheduleList = [];
    let scheduleTotal = 0;

    schedules.subscribe(scheduleData => {
        scheduleList = scheduleData
        scheduleTotal = scheduleData?.reduce((a, b) => {
            const dateFrom = new Date(b.time_from);
            const dateTo = new Date(b.time_to);
            const hours =  Math.abs(dateFrom - dateTo) / 36e5;
            return a + hours;
        }, 0)
        console.log(scheduleTotal)
    })


    const theme = {
        calendar: {
            width: '35vw',
            shadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
            colors:{
                background: {
                primary: '#ffffff',
                highlight: '#31a072'
             }   
            }
        },
      
    };
    
    const handleScheduleSubmit = async (e) => {
        
        // const userID = e.target[0].value;
        const date = dayjs($store?.selected).format('MM/DD/YYYY');
        
        const schedule = new Schedule(userID, from, to, date);
        const response = await schedule.create();

        if (response){
            getSchedules(dayjs($store?.selected).format('MM/DD/YYYY'))
        }

        from = null;
        to = null;
    }

    onMount(() => {
        getUsers();
        getSchedules(dayjs($store?.selected).format('MM/DD/YYYY'));
    });

    $: getSchedules(dayjs($store?.selected).format('MM/DD/YYYY'));


    let userID;
    let store;
    let from;
    let to;
</script>

<main>
      
    <div class="scheduling">
        <div class="header">
            <SecondaryHeader text={'Schedule'} />
            <div class="calendar">
                <p>{dayjs($store?.selected).format('dddd D MMMM YYYY')}</p>
                <Datepicker theme={theme} bind:store let:key let:send let:receive>
                    <button class="secondary-cta" in:receive|local={{ key }} out:send|local={{ key }}>
                        Change
                    </button>
                </Datepicker>
            </div>  
        </div>
      
        <form class="schedule" on:submit|preventDefault={handleScheduleSubmit}>
            <div>
                <p>Employee</p>
                <select name="schedule-user" bind:value={userID}>
                    {#if userList}
                        {#each userList as user (user.id) }
                            <option value={user.id}>{user.name}</option>
                        {/each}
                    {/if}
                </select>
            </div>
            <div>
                <p>From</p>
                <input type="time" name="schedule-from" step="900" bind:value={from}/>
                
            </div>
            <div>
                <p>To</p>
                <input type="time" name="schedule-to" step="900" bind:value={to}/>
            </div>
            
            <PrimaryCTAButton label={'Add'}/>


        </form>
        
        <div class="schedule-header">
            <p>Employee</p>
            <p>From</p>
            <p>To</p>
            <p>Hours</p>
        </div>
        {#if scheduleList}
            {#each scheduleList as schedule (schedule.id) }
            <div class="schedule">
                <p>{userList?.filter(user => user.id === schedule.user_id)[0]?.name}</p>
                <p>{dayjs(schedule.time_from).format('HH:mm')}</p>
                <p>{dayjs(schedule.time_to).format('HH:mm')}</p>
                <p>{Math.abs(new Date(schedule.time_from) - new Date(schedule.time_to)) / 36e5}</p>
            </div>
            {/each}
        {/if}
        <div class="schedule total">
            <p>Total</p>
            <p></p>
            <p></p>
            <p>{scheduleTotal}</p>
        </div>
        
    </div>   
</main>

<style>

    .scheduling {
        background-color: #ffffff;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .header {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .calendar {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .calendar p {
        margin-right: 1rem;
        font-size: 20px;
        font-weight: normal;
    }

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

    form {
        display: flex;
        justify-content: start;
        align-items: end;
    }

    form > div {
        margin: 0 1rem 0 0;
    }

    input[type="time"], select {
        height: 30px;
        width: 10rem;
    }

    select {
       
    }

    .schedule, .schedule-header {
        display: grid;
        justify-content: start;
        align-items: end;
        grid-template-columns: 200px 200px 200px 160px;
    }

    .schedule-header {
        margin-top: 1rem;
    }

    .schedule-header p {
        color: #31a072;
    }

    .schedule p {
        margin-right: 1rem;
    }

    .total {
        border-top: 1px solid #888888;
    }

    .total p {
        color: #888888;
    }
</style>