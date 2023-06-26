function formatDistance(kms: number | string) {
  if (typeof kms === 'string') {
    kms = parseFloat(kms)
  }

  if (kms < 1) {
    return `${Math.round(kms * 1000)} m`
  } else if (Math.abs(Math.round(kms) - kms) < 0.01) {
    return `${Math.round(kms)} km`
  } else {
    return `${parseFloat(kms + '')
      .toFixed(1)
      .replace('.', ',')} km`
  }
}

export default formatDistance
