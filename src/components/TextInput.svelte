
<script>
    export let label;
    export let id;
</script>

<div class="text-input">
    <label for="{id}">{label}</label>
    <input type="text" id="{id}">
</div>

<style>
    .text-input {
        display: flex;
        justify-content: center;
        align-items: start;
        flex-direction: column;
        margin: 1rem 0;
    }

    input {
        height: 30px;
        width: 300px;
        padding: 0 5px;
        border: 1px solid #a6adaa;
        border-radius: 3px;
    }

    input:focus {
        outline: none;
    }

    label {
        color: #31a072;
    }
</style>