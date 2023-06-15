import { useContext } from "react"
import DescriptionAboutUs from "./DescriptionAboutUs/DescriptionAboutUs"

import "./aboutUs.css"
import { ThemeContext } from "../Context/ThemeContext"

const AboutUs = () => {

    const {theme} = useContext(ThemeContext)

    return (
        <div className={theme}>
            <DescriptionAboutUs/>
        </div>
    )
}

export default AboutUs