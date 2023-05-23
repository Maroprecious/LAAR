import Layout from "../../public/components/Layout";
import { Box, Text, VStack, HStack, useTheme, Select, Input, Button, InputGroup, InputLeftElement, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../public/redux/reducers/cards/thunkAction";
import { useAppSelector } from "../../public/redux/store";
import { AiOutlineUser } from 'react-icons/ai'
import { Preloader } from "../Auth/otp";
import Pagination from "./pagination";
import DriversList from "../../public/drivers-file";
import { BsThreeDotsVertical } from "react-icons/bs"
import CurrencyFormat from 'react-currency-format';
import { drivers, SuspendDrivers, deleteDrivers } from "../../public/redux/reducers/drivers/thunkAction";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import { FaCalendarTimes } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"

const Drivers = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [showed, setShow] = useState([])
    const { text_2, btn } = theme.colors.brand;
    const [paginatedValues, setPaginatedValues] = useState(
        []
    );

    const { loading, allDrivers } = useAppSelector(
        ({ driverReducer }) => driverReducer
    )

    const suspendUser = async (id) => {
        const delUser = {
            id: id,
            type: "suspend"
        }
        await dispatch(SuspendDrivers(delUser)).then(
            res => {
                if (res.meta.requestStatus === "fulfilled") {
                    dispatch((drivers()))
                }
            }
        )
    }
    const deleteUser = async (id) => {
      await dispatch(deleteDrivers(id)).then(
        res => {
            if(res.meta.requestStatus === "fulfilled"){
                dispatch((drivers()))
            }
        }
      )
    }

    useEffect(() => {
        dispatch((drivers()))
    }, [])
    return (
        <Layout>
            {
                loading === 'pending'
                    ? <Preloader />
                    : (
                        <>
                            {
                                (
                                    <Box
                                        padding={{
                                            lg: '45px 30px', md: '45px 30px', base: '100px 20px'
                                        }}
                                    >
                                        <VStack
                                            align='flex-start'
                                            spacing='20px'
                                        >
                                            <Text
                                                color={text_2}
                                                fontSize={'28px'}
                                                fontWeight={500}
                                            >
                                                All Drivers
                                            </Text>
                                            <Text
                                                color={text_2}
                                                fontSize={'14px'}
                                                fontWeight={400}
                                            >
                                                List of all your drivers
                                            </Text>
                                        </VStack>

                                        {
                                            allDrivers?.length === 0
                                                ?
                                                <Text
                                                    color={text_2}
                                                    textAlign='center'
                                                    paddingTop={'50px'}
                                                    fontSize={'30px'}
                                                    fontWeight={500}
                                                >No drivers</Text>
                                                :
                                                (
                                                    <VStack
                                                        marginTop='40px'
                                                        padding={{ base: "60px 20px", lg: '30px', md: '60px 40px' }}
                                                        width='100%'
                                                        borderRadius='7px'
                                                        align='center'
                                                        justify='center'
                                                        backgroundColor='#FFFFFF'
                                                        border='1px solid #DFE6E9'
                                                    >

                                                        <HStack
                                                            justify='space-between'
                                                            width='100%'
                                                            flexWrap='wrap'
                                                        >
                                                            <Text

                                                                color={text_2}
                                                                fontSize={'20px'}
                                                                fontWeight={500}
                                                            >
                                                                Drivers
                                                            </Text>
                                                            <HStack
                                                                spacing='15px'
                                                                align='center'
                                                                justify='center'
                                                            >
                                                                <Select
                                                                    height='40px'
                                                                    width='140px'
                                                                    borderRadius='10px'
                                                                    border='1px solid #DFE6E9'
                                                                >
                                                                    <option>Latest</option>

                                                                </Select>
                                                                <InputGroup>
                                                                    <InputLeftElement>
                                                                        <AiOutlineUser />
                                                                    </InputLeftElement>
                                                                    <Input

                                                                        fontSize='14px'
                                                                        color='#B2BEC3'
                                                                        placeholder="Search"
                                                                        height='40px'
                                                                        width={{ lg: '240px', md: '240px', base: '150px' }}
                                                                        borderRadius='10px'
                                                                        border='1px solid #DFE6E9'
                                                                    />
                                                                </InputGroup>
                                                            </HStack>
                                                        </HStack>

                                                        <TableContainer width='100%' paddingTop='30px'>
                                                            <Table variant='simple'>
                                                                <Thead>
                                                                    <Tr>
                                                                        <Th>ID</Th>
                                                                        <Th>Date</Th>
                                                                        <Th>First Name</Th>
                                                                        <Th>Last Name</Th>
                                                                        <Th>Email</Th>
                                                                        <Th>Account No.</Th>
                                                                        <Th>Phone No.</Th>
                                                                        <Th>Account Bal.</Th>
                                                                        <Th>Bank</Th>
                                                                        <Th>Status</Th>
                                                                        <Th>Actions</Th>
                                                                    </Tr>
                                                                </Thead>
                                                                <Tbody>
                                                                    {
                                                                        paginatedValues?.map((element, index) => {
                                                                            return (
                                                                                <Tr key={element.id}>

                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {index}
                                                                                        </Text>

                                                                                    </Td>
                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {new Date(element.createdAt).toLocaleDateString()}
                                                                                        </Text>
                                                                                    </Td>
                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {element.firstName}
                                                                                        </Text>
                                                                                    </Td>
                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {element.lastName}
                                                                                        </Text>
                                                                                    </Td>
                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {element.email}
                                                                                        </Text>
                                                                                    </Td>
                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {element.accountNumber}
                                                                                        </Text>
                                                                                    </Td>
                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {element.phone}
                                                                                        </Text>
                                                                                    </Td>

                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {element.accountBalance}
                                                                                        </Text>
                                                                                    </Td>
                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            {
                                                                                                (element?.cards[0]?.cards?.bank) ? (element?.cards[0]?.cards?.bank) : "No Bank"
                                                                                            }

                                                                                        </Text>
                                                                                    </Td>
                                                                                    <Td>
                                                                                        <HStack
                                                                                            align='center'
                                                                                            justify='center'
                                                                                            padding='4px 7px'
                                                                                            borderRadius='10px'
                                                                                            border={
                                                                                                `1px solid ${element.accountStatus === 'active' ?
                                                                                                    '#FF9500'
                                                                                                    : element.accountStatus === 'suspended'
                                                                                                        ? '#10B6E8'
                                                                                                        // : element.status === 'Failed'
                                                                                                        //     ? '#FF3B30'
                                                                                                        : '#FF3B30'
                                                                                                }`
                                                                                            }
                                                                                            backgroundColor={
                                                                                                element.accountStatus === 'active'
                                                                                                    ? '#FCF6E8'
                                                                                                    : element.accountStatus === 'suspended'
                                                                                                        ? '#EBF3FE'
                                                                                                        // : element.status === 'Failed'
                                                                                                        //     ? '#FCE8EC'
                                                                                                        : '#FCE8EC'
                                                                                            }
                                                                                        >
                                                                                            <Text
                                                                                                color={
                                                                                                    element.accountStatus === 'active' ?
                                                                                                        '#FF9500'
                                                                                                        : element.accountStatus === 'suspended'
                                                                                                            ? '#10B6E8'
                                                                                                            // : element.status === 'Failed'
                                                                                                            //     ? '#FF3B30'
                                                                                                            : '#FF3B30'
                                                                                                }
                                                                                                fontSize={'12px'}
                                                                                                fontWeight={400}
                                                                                                fontFamily='Poppins'
                                                                                            >{element.accountStatus}</Text>
                                                                                        </HStack>
                                                                                    </Td>
                                                                                    <Td>
                                                                                        <Text
                                                                                            color={'#2D3436'}
                                                                                            fontSize={'14px'}
                                                                                            fontWeight={300}
                                                                                            fontFamily='Poppins'
                                                                                        >
                                                                                            <Popover>
                                                                                                <PopoverTrigger>
                                                                                                    <Button><BsThreeDotsVertical /></Button>
                                                                                                </PopoverTrigger>
                                                                                                <PopoverContent width={160} height={90}>
                                                                                                    <PopoverArrow />
                                                                                                    <PopoverBody>
                                                                                                        <Box style={{ position: 'relative' }}>

                                                                                                            <Box style={{ display: "flex", alignItems: "center", height: "50%", marginTop: ".4rem", cursor: "pointer" }} onClick={() => deleteUser(element._id)}>
                                                                                                                <AiFillDelete style={{ color: '#c30101', fontSize: '1rem' }} />
                                                                                                                <Text style={{ marginLeft: ".6rem" }}>
                                                                                                                    Delete
                                                                                                                </Text>
                                                                                                            </Box>
                                                                                                            <hr style={{ marginTop: ".6rem" }} />
                                                                                                            <Box style={{ display: "flex", alignItems: "center", marginTop: ".4rem", cursor: "pointer" }} onClick={() => suspendUser(element._id)}>
                                                                                                                <FaCalendarTimes />
                                                                                                                <Text style={{ marginLeft: ".6rem" }}>
                                                                                                                    Suspend
                                                                                                                </Text>
                                                                                                            </Box>
                                                                                                        </Box>
                                                                                                    </PopoverBody>
                                                                                                </PopoverContent>
                                                                                            </Popover>
                                                                                        </Text>
                                                                                    </Td>
                                                                                </Tr>
                                                                            )
                                                                        })
                                                                    }


                                                                </Tbody>

                                                            </Table>
                                                        </TableContainer>


                                                    </VStack>
                                                )
                                        }
                                        <Pagination
                                            values={allDrivers}
                                            pageLength={5}
                                            setNewValues={setPaginatedValues}
                                        />

                                    </Box>
                                )
                            }
                        </>
                    )
            }
        </Layout>
    )
}

export default Drivers;