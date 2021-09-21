import "./styles/App.css"
import React, { useState, useEffect } from "react"
import { BsHeart } from "react-icons/bs"
import { IconContext } from "react-icons"

const API_KEY = process.env.REACT_APP_NASA_API_KEY
const API_ENDPOINT = process.env.REACT_APP_NASA_ENDPOINT

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch(`${API_ENDPOINT}planetary/apod?api_key=${API_KEY}&count=10`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setPhotos(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  function formatDate(date) {
    const dateObj = new Date(date + "T00:00:00")
    return new Intl.DateTimeFormat("en-US").format(dateObj)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    console.log(photos)
    return (
      <main>
        <header>
          <h1>Spacestagram</h1>
        </header>
        <body>
          {photos.map((photo, idx) => (
            <section key={idx}>
              {<img alt="APOD" src={photo.url} />}
              <div id="info">
                <h1>{photo.title}</h1>
                <h5>Taken on: {formatDate(photo.date)}</h5>
                <p>{photo.explanation}</p>
                <IconContext.Provider
                  value={{ color: "red", className: "global-class-name" }}
                >
                  <BsHeart size={28} />
                </IconContext.Provider>
              </div>
            </section>
          ))}
        </body>
      </main>
    )
  }
}

export default App
