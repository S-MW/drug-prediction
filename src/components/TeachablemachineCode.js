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


const listOfFruits = [
    { "name": "apple", "price": "10SR", "description": "An apple is an edible fruit produced by an apple tree.", "emoji": "🍎" },
    { "name": "mango", "price": "43SR", "description": "A mango is a sweet tropical fruit, and it's also the name of the trees on which the fruit grows. Ripe mangoes are juicy.", "emoji": "🥭" },
    { "name": "orange", "price": "54SR", "description": "Oranges are round orange-coloured fruit that grow on a tree which can reach 10 metres (33 ft) high.", "emoji": "🍊" },
    { "name": "strawberry", "price": "80SR", "description": "A strawberry is both a low-growing, flowering plant and also the name of the fruit that it produces. Strawberries are soft, sweet, bright red berries.", "emoji": "🍓" },
    { "name": "grape", "price": "38SR", "description": "Grapes are fleshy, rounded fruits that grow in clusters made up of many fruits of greenish, yellowish or purple skin.", "emoji": "🍇" }
]

function TeachablemachineCode() {

    const [result, setResult] = useState({ "name": "", "price": "", "description": "", "emoji": "" });

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
                            <Td>{result.name} {result.emoji}</Td>
                            <Td>{result.price}</Td>
                            <Td>{result.description}</Td>
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
