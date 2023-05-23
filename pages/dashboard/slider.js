import { Box, Text, Flex, HStack, VStack, useMediaQuery } from '@chakra-ui/react';
import { useAppSelector } from '../../public/redux/store';
import Slider from "react-slick";
import { Carousel } from '@trendyol-js/react-carousel';
import Image from 'next/image';
import style from "../../styles/quickaction.module.css"


const Slider_ = () => {
    const [isLargerThan600] = useMediaQuery('(min-width: 600px)');
    const { promotions } = useAppSelector(
        ({ authReducer }) => authReducer
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            {
                isLargerThan600 ?
                    <Box
                        overflow='scroll'
                        height='200px'
                        width='100%'
                    // display='flex'
                    >
                        {/* <HStack height='100%' width='2700px'> */}
                            <div>
                                        <Box className={style.banner}
                                            width='100%'
                                            height='200px'
                                            marginRight='10px'
                                            bgSize='cover'
                                            borderRadius='20px'
                                            backgroundRepeat='no-repeat'
                                            bgPos='center'
                                            position='relative'
                                        >
                                            <Text style={{color: "#fff", fontFamily:"Poppins", textAlign: "center", position: "absolute", top:"17%", left: "23%"}}
                                            fontSize={{lg: "2.8rem", md:"2.5rem", base: "1.8rem"}}
                                            fontWeight={{lg: "600", md: "500", base: "400"}}>Work from home while <br/> you earn!</Text>
                                        {/* <img style={{borderRadius: "20px", width:"100%", height:"200px"}} className={style.banner} src='/images/img/driveway.jpg'/> */}
                                            </Box>
                                    
                            </div>
                        {/* </HStack> */}
                    </Box>
                    :
                    (
                        <VStack
                            width={{ base: '100%', lg: '800px', md: '100%' }}
                            height={{ base: '130px', lg: '200px', md: '200px' }}
                            borderRadius='20px'
                            align='flex-start'
                            paddingLeft='20px'
                            justify='center'
                            backgroundColor='#1D4079'
                            bgSize='cover'
                            backgroundRepeat='no-repeat'
                            bgPos='right'
                            bgImage={{
                                base: 'url("/images/img/img4.png")'
                            }}
                        >
                            <Text
                                color='#fff'
                                fontSize='16px'
                                fontWeight={700}
                                fontFamily='Poppins'
                            >
                                Refer and Earn
                            </Text>
                            <Text
                                color='#F7F8F9'
                                fontSize='12px'
                                fontWeight={400}
                                fontFamily='Poppins'
                            >
                                Earn cash gifts for every friend and family
                            </Text>
                            <HStack
                                width='100px'
                                height='20px'
                                borderRadius='10px'
                                align='center'
                                justify='center'
                                backgroundColor='#CEE0FD'
                            >
                                <Text
                                    color='#1D4079'
                                    fontSize='11px'
                                    fontWeight={700}
                                    fontFamily='Poppins'

                                >Read more</Text>
                            </HStack>

                        </VStack>
                    )
            }
        </>
    )
}

export default Slider_