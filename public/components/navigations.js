import { CgMenuGridR } from 'react-icons/cg';
import { AiFillCreditCard } from 'react-icons/ai';
import { RiHandCoinFill, RiExchangeFill, RiCustomerService2Fill, RiLogoutCircleFill } from 'react-icons/ri';
import { IoNewspaperSharp } from 'react-icons/io5';
import { BsPersonFill } from 'react-icons/bs';
import { MdPayments } from 'react-icons/md'
import { FaSlideshare } from 'react-icons/fa'
import { FaBus } from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'


export const navigations = [
    {
        route: '/dashboard',
        icon: CgMenuGridR,
        name: 'Dashboard'
    },
    {
        route: '/all-drivers',
        icon: FaBus,
        name: 'All Drivers'
    }, {
        route: '/all-users',
        icon: IoIosPeople,
        name: 'All Users'
    }, {
        route: '/transactions',
        icon: IoNewspaperSharp,
        name: 'Transactions'
    },
    //  {
    //     route: '/account',
    //     icon: BsPersonFill,
    //     name: 'Account'
    // }, 
    {
        route: '/',
        icon: RiLogoutCircleFill,
        name: 'Logout'
    },
]