<script>
    import SecondaryCTAButton from "./SecondaryCTAButton.svelte";
    import PrimaryCTAButton from "./PrimaryCTAButton.svelte";
    export let header;
    export let body;
    export let cssID;
    export let nextLabel;

    const close = () => {
        const modal = document.querySelector('.modal');
        modal.classList.add('hidden');
    }

</script>

<div id={cssID} class="hidden modal">
    <main>
        <aside>
            <h2>{header}</h2>
            {body}
        </aside>
        
        <section>
            <span></span>
            <PrimaryCTAButton label={nextLabel} on:click={close} />
        </section>
    </main>
   
</div>

<style>
    div {
        position: absolute;
        top: 0;
        width: 0;
        height: 100%;
        width: 100%;
        background-color: #31a07263;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    main {
        min-height: 30vh;
        width: 40vw;
        background-color: white;
        border-radius: 3px;
        padding: 30px 50px;
        color: #31a072;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

</style>