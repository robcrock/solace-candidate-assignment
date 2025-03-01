import { useState, useEffect } from "react"

const useAdvocates = () => {
  const [advocates, setAdvocates] = useState([])

  useEffect(() => {
    console.log("fetching advocates...")
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data)
      })
    })
  }, [])

  return advocates
}

export { useAdvocates }
