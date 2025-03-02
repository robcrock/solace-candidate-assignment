const getAdvocates = async () => {
  const response = await fetch("/api/advocates")

  if (!response.ok) {
    throw new Error("Failed to fetch advocates")
  }

  const data = await response.json()
  return data.data
}

export { getAdvocates }
