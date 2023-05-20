import DescriptionAboutUs from "../DescriptionAboutUs/DescriptionAboutUs"
import NavBar from "../NavBar/NavBar"

import "./aboutUs.css"

const AboutUs = () => {
    return (
        <div className='aboutUs-container'>
            <NavBar />
            <DescriptionAboutUs/>
        </div>
    )
}

export default AboutUs