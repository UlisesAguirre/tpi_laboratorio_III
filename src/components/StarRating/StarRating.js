
import "./starRating.css"

//mode = true; para renderizar comentario hecho
//mode = false; para renderizar a la hora de comentar la calificación
//rate: valor de la calificacion (1-5) 

const StarRating = ({ rate, mode }) => {

    const rating = () => {

        const stars = []

        for (let i = 1; i <= 5; i++) {
            if (i <= rate) {
                stars.push(<span className="colored-stars">★</span>)
            } else {
                stars.push(<span className="stars">★</span>)
            }
        }

        return stars;

    }

    return (
        <div className="starRating-container">
            {mode ? <p>{rating()}</p> : (
                <div className="stars-container">
                    <form action="">
                        <input type="radio" name="stars" id="radio1" value="1" />
                        <label for="radio1">★</label>
                        <input type="radio" name="stars" id="radio2" value="2" />
                        <label for="radio2">★</label>
                        <input type="radio" name="stars" id="radio3" value="3" />
                        <label for="radio3">★</label>
                        <input type="radio" name="stars" id="radio4" value="4" />
                        <label for="radio4">★</label>
                        <input type="radio" name="stars" id="radio5" value="5" />
                        <label for="radio5">★</label>
                    </form>
                </div>

            )}

        </div>
    )
}

export default StarRating