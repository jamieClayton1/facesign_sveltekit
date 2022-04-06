<script>
import NavLink from "./NavLink.svelte";
import PrimaryHeader from "./PrimaryHeader.svelte";
</script>

<main>
    <nav>
        <PrimaryHeader />
        <NavLink href='/' title="Verify" />
        <NavLink href='/schedule' title="Schedule" />
        <NavLink href='/report' title="Analyse" />
    </nav>
    <section>
        <slot></slot>
    </section>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 200px 1fr;
        height: 100vh;
        width: 100vw;
        background-color: #31a072;
    }

    nav {
        padding: 20px;
    }

    section {
        padding: 20px;
        background-color: white;
        /* background-image: url('images/background.svg'); */
        background-size: 400px auto;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        box-shadow: 0px 0px 30px #5e5e5ed0;
    }
</style>