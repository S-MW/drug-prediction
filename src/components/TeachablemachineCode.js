import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';

const listOfFruits = [
    { "name": "apple", "price": "20SR", "description": "An apple is an edible fruit produced by an apple tree." },
    { "name": "mango", "price": "20SR", "description": "A mango is a sweet tropical fruit, and it's also the name of the trees on which the fruit grows. Ripe mangoes are juicy." },
    { "name": "orange", "price": "20SR", "description": "Oranges are round orange-coloured fruit that grow on a tree which can reach 10 metres (33 ft) high." },
    { "name": "strawberry", "price": "20SR", "description": "A strawberry is both a low-growing, flowering plant and also the name of the fruit that it produces. Strawberries are soft, sweet, bright red berries." },
    { "name": "grape", "price": "15SR", "description": "Grapes are fleshy, rounded fruits that grow in clusters made up of many fruits of greenish, yellowish or purple skin." }
]

function TeachablemachineCode() {

    const [result, setResult] = useState({ "name": "Test", "price": "Test", "description": "TestTestTestTestTestTestTestTestTestTestTestTestTestTest" });

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/XB9TPbR3H/";

    let model, webcam, labelContainer, maxPredictions;

    // Load the image model and setup the webcam
    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const flip = true; // whether to flip the webcam
        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
        try {
            await webcam.setup(); // request access to the webcam
        }
        catch (e) {
            alert("you have to open the camera")
        }
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append elements to the DOM
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) { // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop() {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            if (prediction[i].probability.toFixed(2) >= 0.80) {
                setResult(findTheFruits(prediction[i].className));
            }
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }

    function findTheFruits(fruitNmae) {
        return listOfFruits.find(o => o.name === fruitNmae);
    }

    return (
        <>
            <div>Teachable Machine Image Model</div>
            <button type="button" onClick={() => { init() }}>Start</button>
            <div id="webcam-container"></div>
            <div id="label-container"></div>
            <div>
                <h1>Result :</h1>
                <h4>Name:{result.name}</h4>
                <h4>Price:{result.price}</h4>
                <h4>Description:{result.description}</h4>
            </div>
        </>
    );
};

export default TeachablemachineCode;
