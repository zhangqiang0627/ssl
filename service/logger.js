exports.error = function (err) {
  if (err !== null) {
    console.log(`system error: ${err.message}`);
  }
}