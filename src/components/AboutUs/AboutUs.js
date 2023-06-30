import { useContext } from "react"
import { ThemeContext } from "../Context/ThemeContext"
import DescriptionAboutUs from "./DescriptionAboutUs/DescriptionAboutUs"
import "./aboutUs.css"

const AboutUs = () => {
    const {theme} = useContext(ThemeContext)

    return (
        <div className={theme}>
            <DescriptionAboutUs/>
        </div>
    )
}

export default AboutUs