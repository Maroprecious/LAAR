import Quick from "../../public/quick-links";
import { useRouter } from "next/router";
import Image from "next/image";
import style from "../../styles/quickaction.module.css"
import { Text } from "@chakra-ui/react";
const QuickActions = () => {
    const router = useRouter();
    return (
        <>
        <Text style={{paddingBottom: ".6rem"}}>Quick Actions</Text>
        <div className={style.quickcontainer}>
            {
                Quick.map((elem, idx) => (
                    <div className={style.quickdiv} key={elem.id}
                        onClick={() => {
                            if (elem.name === 'All Drivers') {
                                router.push('/all-drivers')
                            } else if (elem.name === 'All Users') {
                                router.push('/all-users')
                            } else {
                                router.push('/dashboard')
                            }
                        }}>
                        <div style={{width: "60%", marginLeft: "5%", marginTop: "-2rem"}}>
                            <Text style={{color: "rgb(4, 77, 102)"}}
                            fontSize={{lg: "1.2rem", md:"1.1rem", base: ".8rem"}}
                            fontWeight={{lg: "500"}}>{elem.name}</Text>
                            <Text fontSize={{lg: ".95rem", md: ".85rem", base: ".8rem"}}>{elem.description}</Text>
                        </div>
                        <Image className={style.quickimg} width={50} height={100} src={elem.image} alt="" />

                    </div>
                ))
            }
        </div>
        </>
    )
}
export default QuickActions;