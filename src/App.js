import "./styles/App.css"
import React, { useState, useEffect } from "react"
import Post from "./Post"

const API_KEY = process.env.REACT_APP_NASA_API_KEY
const API_ENDPOINT = process.env.REACT_APP_NASA_ENDPOINT

function App() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetch(`${API_ENDPOINT}planetary/apod?api_key=${API_KEY}&count=50`)
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

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <main>
        <header>
          <h1>Spacestagram</h1>
        </header>
        <body>
          {photos.map((photo, idx) => (
            <Post photo={photo} idx={idx} />
          ))}
        </body>
      </main>
    )
  }
}

export default App
