import "./styles/App.css"
import React, { useState } from "react"
import { GiHearts } from "react-icons/gi"

function Post({ photo, idx }) {
  const [isLiked, setIsLiked] = useState(false)

  const formatDate = (date) => {
    const dateObj = new Date(date + "T00:00:00")
    return new Intl.DateTimeFormat("en-US").format(dateObj)
  }

  const handleClick = () => {
    setIsLiked(!isLiked)
    //set up for back end connection here
  }

  return (
    <section key={idx}>
      {<img alt="APOD" src={photo.url} />}
      <article>
        <div id="info">
          <div id="title">
            <h1>{photo.title}</h1>
            <h5>Taken on {formatDate(photo.date)}</h5>
          </div>
          <button id="heart" onClick={handleClick}>
            <GiHearts size={28} color={isLiked ? "red" : "lightgray"} />
          </button>
        </div>
        <p>{photo.explanation}</p>
      </article>
    </section>
  )
}

export default Post
