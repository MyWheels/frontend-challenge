type FormatCurrencyOptions = {
  noSpace?: boolean
  noDecimals?: boolean
  fallback?: string
}

const defaultOptions: FormatCurrencyOptions = {
  noSpace: false,
  noDecimals: false,
  fallback: '',
}

function formatCurrency(
  amount: undefined | string | number,
  options: FormatCurrencyOptions = defaultOptions,
) {
  const parsedAmount =
    typeof amount === 'string'
      ? parseFloat(amount)
      : (amount as number | undefined)

  if (typeof parsedAmount === 'undefined' || isNaN(parsedAmount)) {
    return options.fallback
  }

  const absoluteAmount = Math.abs(parsedAmount)
  // The API has some floating point issues (learned this because you didn't turn off source maps in production 🙃)
  const isNegative = parsedAmount < -0.0001

  const prefix = `${isNegative ? '-' : ''}€${options.noSpace ? '' : ' '}`

  return `${prefix}${
    Math.round(absoluteAmount) === absoluteAmount && options.noDecimals
      ? absoluteAmount.toString()
      : absoluteAmount.toFixed(2).replace('.', ',')
  }`
}

export default formatCurrency
