const helper = {}

helper.onSuccess = (res, status, message, err, data, total) => {
  res.status(status).send({
    message,
    total,
    err,
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