const validate = {}

validate.queryFindPrice = (req, res, next) => {
  const {
    query
  } = req
  const validQuery = Object.keys(query).map((keys) => keys === "order")

  if (validQuery.length < 1) return res.status(400).send({
    message: "Key order harus aktif!",
    error: true
  })
  next()
}

validate.queryFindName = (req, res, next) => {
  const {
    query
  } = req
  const validQuery = Object.keys(query).map((keys) => keys === "name")

  if (validQuery.length < 1) return res.status(400).send({
    message: "Key name harus aktif!",
    error: true
  })
  next()
}

validate.queryFindTime = (req, res, next) => {
  const {
    query
  } = req
  const validQuery = Object.keys(query).map((keys) => keys === "order" || keys === "from" || keys === "to")

  if (validQuery.length < 3) return res.status(400).send({
    message: "Key order, from dan to harus aktif!",
    error: true
  })
  next()
}

validate.queryFindTransaction = (req, res, next) => {
  const {
    query
  } = req
  const validQuery = Object.keys(query).map((keys) => keys === "order")

  if (validQuery.length < 1) return res.status(400).send({
    message: "Key order harus aktif!",
    error: true
  })
  next()
}

module.exports = validate