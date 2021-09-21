import "./styles/App.css"
import React, { useState, useEffect, Suspense } from "react"
const Post = React.lazy(() => import("./Post"))

const API_KEY = process.env.REACT_APP_NASA_API_KEY
const API_ENDPOINT = process.env.REACT_APP_NASA_ENDPOINT

function App() {
  const [photos, setPhotos] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchData()
    window.addEventListener("scroll", handleScroll)
  }, [])

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return
    setIsFetching(true)
    console.log(isFetching)
  }

  const fetchData = async () => {
    setTimeout(async () => {
      const result = await fetch(
        `${API_ENDPOINT}planetary/apod?api_key=${API_KEY}&count=4`
      )
      const data = await result.json()
      setPage(page + 1)
      setPhotos(() => {
        return [...photos, ...data]
      })
    }, 1000)
  }

  useEffect(() => {
    if (!isFetching) return
    fetchMoreListItems()
  }, [isFetching])

  const fetchMoreListItems = () => {
    fetchData()
    setIsFetching(false)
  }

  return (
    <main>
      <header>
        <h1>Spacestagram</h1>
      </header>
      <body>
        {photos.map((photo, idx) => (
          <Suspense fallback={<div>Loading...</div>}>
            <Post photo={photo} idx={idx} />
          </Suspense>
        ))}
      </body>
      <footer>{isFetching && <h1>Loading more space goodies...</h1>}</footer>
    </main>
  )
  // }
}

export default App
