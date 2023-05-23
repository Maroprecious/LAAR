import AuthLayout from '../../public/components/AuthLayout'
import { Text, Flex, HStack, VStack, InputGroup, Input, InputRightElement, Button, Checkbox, Image, Box, FormControl, FormLabel, FormErrorMessage, theme } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible, AiFillInfoCircle } from 'react-icons/ai'
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import ReactFlagsSelect from "react-flags-select";
import '../../styles/Home.module.css'
import { checksuername, signUp, checkreferer } from '../../public/redux/reducers/auth/thunkAction'
import { useSelector, useDispatch } from 'react-redux';
import { BsCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import SyncLoader from "react-spinners/SyncLoader";
import { useAppSelector } from '../../public/redux/store'
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import { useUser } from '../../public/context/userContext'
import { useRouter } from 'next/router';

import Link from 'next/link';


Yup.addMethod(Yup.string, "nameTypeSpace", function (errorMessage) {
    return this.test(`fullname-space`, errorMessage, function (value) {
        const { path, createError } = this;
        return (
            (value && value.trim().split(' ').length >= 2) ||
            createError({ path, message: errorMessage })
        );
    });
});


Yup.addMethod(Yup.string, "nameTypeSLength", function (errorMessage) {
    return this.test(`fullname-length`, errorMessage, function (value) {
        const { path, createError } = this;

        const firstName = value && value.trim().split(' ')[0] || '';
        const lastName = value && value.trim().split(' ')[1] || '';

        return (
            (firstName.length >= 3 && lastName.length >= 3) ||
            createError({ path, message: errorMessage })
        );
    });
});


const validationSchema = Yup.object().shape({
    firstName: Yup
        .string()
        .required('First name is required'),
    email: Yup.string().email().required('Email is required'),
    lastName: Yup.string().required('Last name is required'),
    password: Yup.string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is required"),
})



const Signup = () => {
    const [value, setValue] = useState();
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState(false)
    const [selected, setSelected] = useState('NG');
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useToast();
    const { setEmail } = useUser();

    const { message, isChecking, loading, isCheckingRef, msg } = useAppSelector(
        ({ authReducer }) => authReducer
    )

    const handleCheck = async (event) => {
        const { value } = event.target;
        dispatch(checksuername(value))
    }

    const handleCheckRef = async (event) => {
        const { value } = event.target;
        dispatch(checkreferer(value))
    }


    const {
        handleSubmit,
        handleChange,
        handleBlur,
        validateField,
        setFieldError,
        setFieldValue,
        isSubmitting,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            firstName: "",
            email: "",
            password: "",
            lastName: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values, "tchewwwww")
            await dispatch(signUp(values)).then(res => {
                console.log(values)
                if (res.meta.requestStatus === 'fulfilled') {
                    toast({
                        title: 'Account created.',
                        description: "Account created successfully",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                        position: 'top-right'
                    })
                    router.push('/Auth/login')
                }
            })
        },
    });


    return (
        <AuthLayout>
            <VStack
                width={{
                    base: '90%', md: '60%', lg: '60%'
                }}
                spacing='30px'
                align='center'
                justify='center'
                marginBottom='100px'
                height='fit-content'
            >
                <Image src='/images/svg/logo.svg' paddingTop='700px' />
                <Text
                    color='#000'
                    fontSize='20px'
                    fontWeight={700}
                    fontFamily='Poppins'


                >
                    Create an account, it's free
                </Text>



                {/* <VStack
                    spacing='5px'
                    align='flex-start'
                    width='100%'
                >

                    <Text
                        fontSize='16px'
                        color='#000'
                        fontWeight={500}
                        fontFamily='Poppins'
                    >Country</Text>
                    <ReactFlagsSelect
                        selected={selected}
                        fullWidth={true}
                        className='select_country'
                        onSelect={(code) => setSelected(code)}
                    />


                </VStack> */}
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
                    isInvalid={!!errors.firstName && touched.firstName}
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
                        >FirstName</Text>
                        <Input
                            color='rgba(0,0,0,5)'
                            fontWeight={500}
                            fontSize='15px'
                            name='firstName'
                            paddingLeft='20px'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='First name'
                            width='100%'
                            height='50px'
                            border='1px solid rgba(0,0,0,0.4)'
                            borderRadius='10px'
                            backgroundColor='#F7F8F9'
                        />

                    </VStack>
                    <FormErrorMessage
                        color={"red"}
                        alignSelf="flex-start" fontSize={14}>
                        {errors.firstName}
                    </FormErrorMessage>
                </FormControl>


                <FormControl
                    isInvalid={
                        !!errors.lastName && touched.lastName
                    }
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
                        >Lastname</Text>
                        <Input
                            color='rgba(0,0,0,5)'
                            fontWeight={500}
                            fontSize='15px'
                            paddingLeft='20px'
                            placeholder='Last name'
                            width='100%'
                            height='50px'
                            name='lastName'
                            onBlur={handleBlur}
                            borderRadius='10px'
                            backgroundColor='#F7F8F9'
                            border='1px solid rgba(0,0,0,0.4)'
                            onChange={(event) => {
                                handleCheck(event)
                                handleChange(event)
                            }}
                        />
                    </VStack>
                    <FormErrorMessage
                        color={"red"}
                        alignSelf="flex-start" fontSize={14}>
                        {errors.lastName}
                    </FormErrorMessage>
                </FormControl>


                <FormControl
                    isInvalid={!!errors.password && touched.password}
                >
                    <VStack
                        spacing='0px'
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
                                onChange={handleChange}
                                onBlur={handleBlur}
                                height='50px'
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

                {/* <Checkbox size='md' defaultChecked padding='20px 0px'>
                    <Text
                        fontSize='14px'
                        color='#000'
                        fontWeight={500}
                        fontFamily='Poppins'
                    >
                        I agree to the <span style={{ color: '#69ACD1', fontWeight: 500 }}>Terms & Conditions</span> and <span style={{ color: '#69ACD1', fontWeight: 500 }}>Privacy Policy </span>
                    </Text>
                </Checkbox> */}

                <Button
                    outline='none'
                    color='#fff'
                    onClick={handleSubmit}
                    fontSize='20px'
                    isLoading={loading === 'pending' ? true : false}
                    fontWeight={400}
                    width='100%' height='60px' borderRadius='10px' backgroundColor='#1EB0D9' border='none'
                >Register</Button>
                <HStack spacing='10px' justify='center' align='center'>
                    <Text
                        color='rgba(0,0,0.0.4)'
                        fontSize='15px'
                        fontWeight={500}
                    >Already have an account?</Text>
                    <Link href='/Auth/login'>
                        <Text
                            color='#69ACD1'
                            fontSize='15px'
                            fontWeight={500}
                        >Login</Text>
                    </Link>

                </HStack>
            </VStack>
        </AuthLayout >
    )
}

export default Signup