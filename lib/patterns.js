module.exports = {
  string: /^"(.*)"$/,
  monolingualText: /\w{2,8}:".*"$/,
  time: /^[+-]\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z\/\d{1,2}$/,
  quantity: /^(-?[\d.]+)(~[\d.]+)?(U\d+)?$/,
}
