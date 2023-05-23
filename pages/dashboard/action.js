import { Box, Text, HStack, VStack, Image } from "@chakra-ui/react";
import { useAppSelector } from "../../public/redux/store";
import { useRouter } from "next/router";
import { useNavigation } from "../../public/context/navigationContext";

const Actions = () => {
    const router = useRouter();
    const { active, setActive } = useNavigation();

    const { services } = useAppSelector(
        ({ authReducer }) => authReducer
    )
    return (
        <HStack
            width='100%'
            justify='center'
            align='center'
            gap='20px'
            // border='1px solid red'
            flexWrap='wrap'
            marginInlineStart={0}
        >
            <HStack
                width='100%'
                justify='flex-start'
                align='center'
            >
                <Text
                    color='#000'
                    fontSize='12px'
                    textAlign='left'
                    justify='flex-start'
                    alignSelf='flex-start'
                    fontWeight={500}
                    fontFamily='Poppins'
                >
                    Quick Actions
                </Text>
            </HStack>
            {
                services.slice(0, 4).map((element, idx) => (
                    <VStack
                        key={element.id}
                        spacing='0px'
                        width={{ base: '100%', md: '46%', lg: '48%' }}
                        height={{lg: '120px', md: '120px', base: '180px'}}
                        borderRadius='15px'
                        align='flex-start'
                        padding='30px'
                        backgroundColor='#E6F2F6'
                        bgSize='contain'
                        cursor='pointer'
                        backgroundRepeat='no-repeat'
                        bgPos='right'
                        onClick={() => {

                            if (element.title === 'All Drivers') {
                                setActive('All Drivers')
                                router.push('/all-drivers')
                            } else if (element.title === 'All Users') {
                                setActive('All Users')
                                router.push('/all-users')
                            } else {
                                setActive('Dashboard')
                                router.push('/dashboard')
                            }
                        }}
                        bgImage={{
                            // base: `url(${element.icon})`
                            base: `url(/images/img/img${idx + 1}.png)`
                        }}
                    >
                        <Box>
                            <Text
                                color='#3D7D98'
                                fontSize='17px'
                                fontWeight={500}

                                fontFamily='Poppins'
                                width={{ base: '80%' }}
                            >{element.title}</Text>
                            
                            <Text
                                color='#000'
                                fontSize='14px'
                                fontWeight={400}
                                fontFamily='Poppins'
                                width={{ base: '60%' }}
                            >{element.description}</Text>
                        </Box>
                    </VStack>
                ))
            }
           

        </HStack>
    )
}

export default Actions