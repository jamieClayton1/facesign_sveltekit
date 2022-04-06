<script>
    import { onMount } from 'svelte';
    import VideoScanner from "../../components/VideoScanner.svelte";
    import PrimaryCTAButton from '../../components/PrimaryCTAButton.svelte';
    import PrimaryHeader from "../../components/PrimaryHeader.svelte";
    import * as faceapi from 'face-api.js';
    import { newUser } from '../../stores/newUser.js';
    import User from '../../models/User';
    import { goto } from '$app/navigation';
    import Navigation from '../../components/Navigation.svelte';

    let newUserData;
    newUser.subscribe(newUser => {
        newUserData = newUser;
	});
    
    const getFaceData = async () => {
        const video = document.getElementById('scanner-playback');
        
        let fullFaceDescriptions = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();
        const descriptor = fullFaceDescriptions.descriptor;
        const descriptorString = JSON.stringify(descriptor);
        newUserData.faceDescriptor = descriptorString;
        newUser.set(newUserData);
        const {name, email, faceDescriptor} = newUserData;
        const user = new User(name, email, faceDescriptor);
        user.create();

        goto('/');
    }

    onMount(async () => {
        const MODEL_URL = '../../models';

        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    })
</script>

<Navigation>
    <div class="scanner">
        <PrimaryHeader />
        <VideoScanner id={'scanner-playback'} height={380} width={500}/>
        <PrimaryCTAButton label={'Scan'} on:click={getFaceData}/>
    </div>    
</Navigation>

<style>
    .scanner {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>