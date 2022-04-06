<script>
    import {onMount} from 'svelte';

    /* Stream the video media input playback to screen */
    const streamPlayback = () => {
        const video = document.getElementById('scanner-playback');
        setTimeout(() => window.navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            video.onloadedmetadata = (e) => {
                video.play();
            };
        })
        .catch( (err) => {
            streamPlayback()
        }), 2000)
        
    };

    onMount(() => streamPlayback())


    export let id;
    export let height;
    export let width;
</script>

<div class="scanner-video-container">
    <video id={id} height={height} width={width} muted></video>
</div>

<style>
    video {
        border-radius: 10px;
        margin-bottom: 30px;
    }
</style>