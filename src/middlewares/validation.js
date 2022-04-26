const validate = {}

validate.queryFind = (req, res, next) => {
  const {
    query
  } = req
  const validQuery = Object.keys(query).filter((key) => key === "name" || key === "favoriteOrder" || key === "timeOrder" || key === "priceOrder" || key === "category" || key === "sort")

  if (validQuery.length < 1) return res.status(400).send({
    message: "Key yang dibutuhkan harus aktif!",
    error: true
  })
  // console.log(validQuery)
  next()
}

validate.valueType = (req, res, next) => {
  const {
    query
  } = req

  const validType = Object.values(query).find((value) => {
    return value
  })
  console.log(validType)
  if (typeof validType !== 'string') return res.status(400).send({
    message: "Type data value harus string!",
    error: true
  })
  next()
}

module.exports = validate