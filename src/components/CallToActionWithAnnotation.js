import TeachablemachineCode from "./TeachablemachineCode"
import Head from 'next/head';
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    HStack,
    Icon,
    useColorModeValue,
    createIcon,
} from '@chakra-ui/react';
import { FcWebcam } from 'react-icons/fc';


export default function CallToActionWithAnnotation() {
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{ base: 8, md: 14 }}
                    py={{ base: 20, md: 36 }}>
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Prediction Your Medicine <br />
                        <HStack ml="100px">
                        <Text as={'span'} color={'green.400'}>
                            Via Your Camera 
                        </Text>
                        <FcWebcam/>
                        </HStack>
                        
                    </Heading>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}>
                        <TeachablemachineCode/>
                        
                    </Stack>
                </Stack>
            </Container>
        </>
    );
}