const helper = {}

helper.onSuccess = (res, status, message, data, total) => {
  res.status(status).send({
    message,
    total,
    data
  })
}

helper.onFailed = (res, status, message, err) => {
  res.status(status).send({
    message,
    err
  })
}

module.exports = helper