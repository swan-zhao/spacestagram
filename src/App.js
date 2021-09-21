import "./styles/App.css"
import React, { useState, useEffect } from "react"
import Post from "./Post"
import InfiniteScroll from "react-infinite-scroller"

const API_KEY = process.env.REACT_APP_NASA_API_KEY
const API_ENDPOINT = process.env.REACT_APP_NASA_ENDPOINT

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    fetchMoreData()
  }, [])

  const fetchMoreData = async () => {
    setTimeout(async () => {
      const result = await fetch(
        `${API_ENDPOINT}planetary/apod?api_key=${API_KEY}&count=4`
      )
      const data = await result.json()
      setPhotos(() => {
        return [...photos, ...data]
      })
    }, 1000)
  }

  return (
    <main>
      <header>
        <h1>Spacestagram</h1>
        <small>An infinite feed of NASA's APOD photos for your enjoyment</small>
        <div id="playlist">
          <iframe
            title="space playlist"
            src="https://open.spotify.com/embed/playlist/37i9dQZF1DX1n9whBbBKoL?theme=0"
            width="100%"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
      </header>
      <body>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchMoreData}
          hasMore={true || false}
          loader={
            <footer className="loader" key={0}>
              <h3>Loading more space goodies...</h3>
            </footer>
          }
        >
          {photos.map((photo, idx) => (
            <Post photo={photo} idx={idx} />
          ))}
        </InfiniteScroll>
      </body>
    </main>
  )
}

export default App
