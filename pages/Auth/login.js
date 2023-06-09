import AuthLayout from '../../public/components/AuthLayout'
import { Text, Flex, HStack, VStack, InputGroup, Input, InputRightElement, Button, Image, Box, FormControl, FormErrorMessage, } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible, AiFillAccountBook } from 'react-icons/ai'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import PhoneInput from 'react-phone-input-2'
import { CheckboxIcon } from '@chakra-ui/react';
import 'react-phone-input-2/lib/style.css'
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../public/redux/store';
import { login, loginNofitication, getHomeData } from '../../public/redux/reducers/auth/thunkAction';
import * as Yup from 'yup'
import { useFormik } from 'formik';
import Link from 'next/link';
import { useToast } from '@chakra-ui/react';
import ip from 'ip'
import DeviceDetector from "device-detector-js";


const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Email'),
    password: Yup.string().required('Password is required')
})



const Login = () => {
    const [value, setValue] = useState();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const toast = useToast();
    const router = useRouter();


    const { loading } = useAppSelector(
        ({ authReducer }) => authReducer
    )


    const handleSendLoginNotification = () => {
        const deviceDetector = new DeviceDetector();
        const agent = navigator.userAgent;
        const device = deviceDetector.parse(agent);

        const data = {
            os: device?.os?.name,
            time: new Date().toDateString(),
            device: device?.client?.name,
            ip: ip.address()
        }

        dispatch(loginNofitication(data))

    }

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        isSubmitting,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            await dispatch(login(values)).then(async res => {
               
                        if (res.meta.requestStatus === 'fulfilled') {
                            toast({
                                title: 'Login success.',
                                description: "Welcome back",
                                status: 'success',
                                duration: 3000,
                                isClosable: true,
                                position: 'top-right'
                            })
                            router.push('/dashboard')
                        }
                    })
                }
                
            })
        

    return (
        <AuthLayout>
            <VStack
                width={{
                    base: '90%', md: '60%', lg: '60%'
                }}
                spacing='30px'
                align='center'
                justify='center'
            >
                <Image src='/images/img/logoo.png' style={{width: "50px", height: "50px"}}/>
                <Text
                    color='#000'
                    fontSize='20px'
                    fontWeight={700}
                    fontFamily='Poppins'
                >
                    Welcome back, Sign in.
                </Text>

                <FormControl
                    isInvalid={!!errors.email && touched.email}
                >
                    <VStack
                        spacing='5px'
                        align='flex-start'
                        width='100%'
                    >
                        <Text
                            fontSize='16px'
                            color='#000'
                            fontWeight={500}
                            fontFamily='Poppins'
                        >Email Address</Text>
                        <Input
                            color='rgba(0,0,0,5)'
                            fontWeight={500}
                            fontSize='15px'
                            paddingLeft='20px'
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='youremail@gmail.com'
                            width='100%'
                            height='50px'
                            borderRadius='10px'
                            backgroundColor='#F7F8F9'
                            border='1px solid rgba(0,0,0,0.4)'
                        />

                    </VStack>
                    <FormErrorMessage
                        color={"red"}
                        alignSelf="flex-start" fontSize={14}>
                        {errors.email}
                    </FormErrorMessage>
                </FormControl>

                <FormControl
                    isInvalid={!!errors.password && touched.password}
                >
                    <VStack
                        spacing='5px'
                        align='flex-start'
                        width='100%'
                    >
                        <Text
                            fontSize='16px'
                            color='#000'
                            fontWeight={500}
                            fontFamily='Poppins'
                        >Password</Text>
                        <InputGroup>
                            <Input
                                color='rgba(0,0,0,5)'
                                fontWeight='bold'
                                fontSize='15px'
                                paddingLeft='20px'
                                name='password'
                                type={show ? 'text' : 'password'}
                                placeholder='Your password'
                                width='100%'
                                height='50px'
                                onBlur={handleBlur}
                                onChange={handleChange}
                                borderRadius='10px'
                                backgroundColor='#F7F8F9'
                                border='1px solid rgba(0,0,0,0.4)'
                            />
                            <InputRightElement
                                onClick={() => setShow(!show)} padding={'30px'}
                                children={<Text>{show ? <AiFillEye size='20px' fill='#69ACD1' /> : <AiFillEyeInvisible size='20px' fill='#69ACD1' />}</Text>}
                            />
                        </InputGroup>

                    </VStack>

                    <FormErrorMessage
                        color={"red"}
                        alignSelf="flex-start" fontSize={14}>
                        {errors.password}
                    </FormErrorMessage>
                </FormControl>
{/* 
                <HStack alignSelf='flex-end'>
                    <Link href='/Auth/forgot-password'>
                        <Text fontFamily='Poppins' textAlign='left' fontWeight={500} padding='10px 0px' color='#69ACD1'>Forgot Password</Text>
                    </Link>
                </HStack> */}
                <Button
                    outline='none'
                    color='#fff'
                    fontSize='20px'
                    fontWeight={400}
                    isLoading={loading === 'pending' ? true : false}
                    onClick={handleSubmit}
                    width='100%' height='60px' borderRadius='10px' backgroundColor='#1EB0D9' border='none'
                >Login</Button>
                <Text style={{display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".9rem"}}>
                    Don't have an account? <p onClick={() => router.push('/Auth/signup')} style={{color: "#69ACD1", marginLeft: ".4rem", cursor: "pointer"}}>
                        Sign up
                    </p>
                </Text>
            </VStack>
        </AuthLayout>
    )
            }

export default Login