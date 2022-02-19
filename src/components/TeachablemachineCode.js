import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tmImage from '@teachablemachine/image';
import {
    Text,
    Stack,
    HStack,
    VStack,
    Box,
    Button,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'
import {
    ViewOffIcon,
    ViewIcon
} from '@chakra-ui/icons'


// const listOfFruits = [
//     { "name": "apple", "price": "10SR", "description": "An apple is an edible fruit produced by an apple tree.", "emoji": "🍎" },
//     { "name": "mango", "price": "43SR", "description": "A mango is a sweet tropical fruit, and it's also the name of the trees on which the fruit grows. Ripe mangoes are juicy.", "emoji": "🥭" },
//     { "name": "orange", "price": "54SR", "description": "Oranges are round orange-coloured fruit that grow on a tree which can reach 10 metres (33 ft) high.", "emoji": "🍊" },
//     { "name": "strawberry", "price": "80SR", "description": "A strawberry is both a low-growing, flowering plant and also the name of the fruit that it produces. Strawberries are soft, sweet, bright red berries.", "emoji": "🍓" },
//     { "name": "grape", "price": "38SR", "description": "Grapes are fleshy, rounded fruits that grow in clusters made up of many fruits of greenish, yellowish or purple skin.", "emoji": "🍇" }
// ]

const listOfFruits = [

    { "name": "ROFENAC", "Type": " To reduce pain and inflammation like rheumatoid", "Description": " Taken with or without food, but it is better to take it at a fixed time.", "emoji":"🤕" },
    { "name": "Neuro-B", "Type": " For Vitamin B deficiency", "Description": " Take this medicine in the dose and duration as advised by your doctor,Swallow the whole or split tablet without crushing or chewing.", "emoji":"🍊" },
    { "name": "Astatin", "Type": " To lower cholesterol", "Description": "Swallow the tablet whole. Do not break, crush, or chew it. Take this medicine with or without food.", "emoji":"🍔"  },
    { "name": "ASPIRIN", "Type": " To lower the risk of heart attack", "Description": "Take this medication by mouth. Drink a full glass of water, Do not lie down for at least 10 minutes after you have taken this drug. Do not crush or chew enteric-coated tablets.", "emoji":"💔" },
    { "name": "Panadrex", "Type": " For headache, migraine", "Description": "Taken with or without food,Do not crush,chew or dissolve the medicine in water.", "emoji":"🤕" },
    { "name": "Panadol", "Type": " Fast pain relief", "Description": " Taken with or without food, Do not take more than 8 tablets.", "emoji":"🤕" },
    { "name": "Panadol Extra", "Type": " Analgesic and antipyretic", "Description": " Taken with or without food, drink plenty of cool or warm fluids.", "emoji":"🤕" },
]

function TeachablemachineCode() {

    const [result, setResult] = useState({ "name": "", "Type": "", "Description": "" ,"emoji":""});

    // the link to your model provided by Teachable Machine export panel
    const URL = "https://teachablemachine.withgoogle.com/models/q95FfVHHn/";

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
            // const classPrediction =
            //     prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            if (prediction[i].probability.toFixed(2) >= 0.80) {
                setResult(findTheFruits(prediction[i].className));
            }
            // labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }

    function findTheFruits(fruitNmae) {
        return listOfFruits.find(o => o.name === fruitNmae);
    }

    return (
        <>
            <VStack>

                <Button leftIcon={<ViewIcon />} colorScheme={'green'}
                    bg={'green.400'}
                    rounded={'full'}
                    px={6}
                    _hover={{
                        bg: 'green.500',
                    }} onClick={() => { init() }}>
                    Get Started
                </Button>

                <div id="webcam-container"></div>
                <div id="label-container"></div>


                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Type</Th>
                            <Th>Description</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{result.emoji} {result.name}</Td>
                            <Td>{result.Type}</Td>
                            <Td>{result.Description}</Td>
                        </Tr>
                    </Tbody>
                    
                </Table>
                {/* <VStack
                    spacing={1}
                    align='stretch'
                >
                    <Box h='40px' >
                        <Text fontSize='30px' fontWeight='bold'>Results :</Text>
                    </Box>
                    <Box h='40px' >
                        <Text fontSize='15px' fontWeight='bold'>Name:{result.name}</Text>
                        <Text fontSize='15px' fontWeight='bold'>Emoji:{result.emoji}</Text>
                        <Text fontSize='15px' fontWeight='bold'>Price:{result.price}</Text>
                        <Text fontSize='15px' fontWeight='bold'>Description:{result.description}</Text>
                    </Box>
                </VStack> */}
            </VStack>
        </>
    );
};

export default TeachablemachineCode;
