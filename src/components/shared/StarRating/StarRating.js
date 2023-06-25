import "./starRating.css"

//mode = true; para renderizar comentario hecho
//mode = false; para renderizar a la hora de comentar la calificación
//rate: valor de la calificacion (1-5) 

const StarRating = ({ rate, mode, setRating}) => {

    const showRating = () => {

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

    const ratingHandler = (event) => {
        const value = event.target.value;
        setRating(value)
    };

    return (
        <div className="starRating-container">
            {mode ? <p>{showRating()}</p> : (
                <div className="stars-container">
                    <form action="">
                        <input type="radio" name="stars" id="radio1" value="5" onChange={ratingHandler} />
                        <label for="radio1">★</label>
                        <input type="radio" name="stars" id="radio2" value="4" onChange={ratingHandler} />
                        <label for="radio2">★</label>
                        <input type="radio" name="stars" id="radio3" value="3" onChange={ratingHandler} />
                        <label for="radio3">★</label>
                        <input type="radio" name="stars" id="radio4" value="2" onChange={ratingHandler} />
                        <label for="radio4">★</label>
                        <input type="radio" name="stars" id="radio5" value="1" onChange={ratingHandler} />
                        <label for="radio5">★</label>
                    </form>
                </div>

            )}

        </div>
    )
}

export default StarRating