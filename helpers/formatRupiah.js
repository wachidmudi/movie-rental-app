function formatRupiah(number) {
  return `Rp. ${number.toLocaleString().replace(/,/g, '.')}`
}

module.exports = formatRupiah
