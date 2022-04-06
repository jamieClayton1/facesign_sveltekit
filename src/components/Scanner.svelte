
<script>
    import User from '../models/User';
    import { onMount } from 'svelte';
    import VideoScanner from "./VideoScanner.svelte";
    import * as faceapi from 'face-api.js';
    import {user} from '../stores/user';
    import {status} from '../stores/status'


    /* Subscribe to stores */
    let userData;
    user.subscribe(userStore => {
		userData = userStore;
	});

    let statusData = {};
    status.subscribe(statusStore => {
		statusData = statusStore;
	});

    /* Init face check counter */
    let faceChecks = 0;
    /**
     * Get face data from video input
     * @param {object} user
     */
    const getFaceData = async (user) => {
    
        /* Default status */
        statusData.success = false;
        statusData.successMessage = null;

        /* If we've checked the data more than 10 times, fail the operation */
        if (faceChecks >= 10){

            statusData.success = false;
            statusData.successMessage = 'Verification failed';

            status.set(statusData);
            faceChecks = 0

            return;
        }

        /* If no video input exists, fail the operation */
        if (!video){
            return;
        }

        /* Get face results in input media */
        let result = await faceapi.detectSingleFace(video).withFaceLandmarks().withFaceDescriptor();

        /* If no result, try again in 0.1 second */
        if (!result){
            setTimeout(() => getFaceData(user), 100);
            return;
        }

        /* Check face against the currently selected user's face */
        const faceMatcher = new faceapi.FaceMatcher(result)

        const json = JSON.parse(user.description);
        const comparison = Object.values(json);

        const match = faceMatcher.findBestMatch(comparison);
        
        /* If it's a match, log verification isntance in the database and set success message */
        if (match.distance < 0.4){
            const userObj = new User();
            userObj.logVerification(user.id);
           
            statusData.success = true;
            statusData.successMessage = 'Sign in successfully verified!';
            status.set(statusData);
        
        /* Else, try again */
        } else {
          
            statusData.success = false;
            statusData.successMessage = 'Scanning...';

            status.set(statusData);

            faceChecks++

            setTimeout(() => getFaceData(user), 100);
        }
    }

    onMount(async () => {

        /* Load machine learning models for face recognition */
        const MODEL_URL = './models';

        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceLandmarkModel(MODEL_URL);
        await faceapi.loadFaceRecognitionModel(MODEL_URL);
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);

        /* Assign video to the media input */
        video = document.getElementById('scanner-playback');
    })

    /* Get face data when user store data changes on this component*/
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