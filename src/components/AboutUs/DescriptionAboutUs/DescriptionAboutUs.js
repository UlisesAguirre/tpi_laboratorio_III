import aboutUsImg from "../../../assets/img/about-us.webp"
import "./descriptionAboutUs.css"

const DescriptionAboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-us-description">
                <h3>¿Quiénes somos?</h3>
                <p>"En <b>Pizzeria Paradiso</b>, nos enorgullece de ofrecer pizzas caseras deliciosas con ingredientes frescos y de alta calidad. Nos esforzamos por crear sabores 
                    auténticos, ademas de brindar una experiencia gastronómica acogedora y única."</p>
                <h3>Misión:</h3>
                <p>"Ser reconocidos como el mejor lugar para disfrutar de una auténtica pizza en nuestra comunidad, 
                    ofreciendo un servicio excepcional y una variedad de opciones de pizzas creativas y deliciosas."
                </p>
                <h3>Visión:</h3>
                <p>"Convertirnos en un referente local en el mundo de la pizza, conocidos por nuestra calidad, 
                    creatividad y pasión por la excelencia culinaria."
                </p>
            </div>
            <img src={aboutUsImg} alt="" className="about-us-img" />
        </div>
    )
}

export default DescriptionAboutUs