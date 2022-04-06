
<script>
    import User from '../models/User';
    import { onMount } from 'svelte';
    import VideoScanner from "./VideoScanner.svelte";
    import PrimaryCTAButton from './PrimaryCTAButton.svelte';
    import PrimaryHeader from "./PrimaryHeader.svelte";
    import Navigation from './Navigation.svelte';
    import * as faceapi from 'face-api.js';
    import {user} from '../stores/user';
    import {status} from '../stores/status'
    import { goto } from '$app/navigation';

    let userData;
    user.subscribe(userStore => {
		userData = userStore;
	});

    let statusData = {};
    status.subscribe(statusStore => {
		statusData = statusStore;
	});

    let faceChecks = 0;

    const getFaceData = async (user) => {
    
        statusData.success = false;
        statusData.successMessage = null;

        if(faceChecks >= 10){
            statusData.success = false;
            statusData.successMessage = 'Verification failed';
            status.set(statusData);
            faceChecks = 0
            return;
        }

        if (!video){
            return;
        }

        let result = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();
        if (!result){
            setTimeout(() => getFaceData(user), 100);
            return;
        }

        const faceMatcher = new faceapi.FaceMatcher(result)

        const json = JSON.parse(user.description);
        const comparison = Object.values(json);

        const match = faceMatcher.findBestMatch(comparison);
    
        if (match.distance < 0.4){
            const userObj = new User();
            userObj.logVerification(user.id);
           
            statusData.success = true;
            statusData.successMessage = 'Sign in successfully verified!';
            status.set(statusData);

        } else {
            console.log('Scanning...')
            statusData.success = false;
            statusData.successMessage = 'Scanning...';
            status.set(statusData);
            faceChecks++
            setTimeout(() => getFaceData(user), 100);
        }
    }


    onMount(async () => {
        const MODEL_URL = './models';

        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

        video = document.getElementById('scanner-playback');
    })

    $: getFaceData($user)

    let video;
</script>
<div class="scanner">
    <VideoScanner id={'scanner-playback'} height={500} width={800}/>
</div>


<style>
    .scanner {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>