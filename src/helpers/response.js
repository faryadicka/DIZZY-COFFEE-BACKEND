const helper = {}

helper.onSuccess = (res, status, message, data, total, meta) => {
  res.status(status).json({
    message,
    total,
    data,
    meta
  })
}

helper.onFailed = (res, status = 500, message, err) => {
  res.status(status).json({
    message,
    err
  })
}

helper.pagination = (res, req, response) => {
  const { query, data, totalData, currentPage, limit, message, status } = response

  const total = Math.ceil(totalData / limit)
  let { page } = req.query
  page = parseInt(page)
  const path = `http://${req.get("host") + req.baseUrl + req.path}?page`
  let queryString = ""

  Object.keys(query).forEach((key) => {
    if (key !== "page") {
      queryString += `&${key}=${query[key]}`
    }
  })
  const prevLink = page !== 1 ? `${path}=${page - 1}${queryString}` : null
  const nextLink = page !== total ? `${path}=${page + 1}${queryString}` : null

  const resultsPrint = {
    message,
    data,
    totalData,
    totalPage: total,
    currentPage,
    prevLink,
    nextLink
  }

  res.status(status).json(resultsPrint)
}

module.exports = helper