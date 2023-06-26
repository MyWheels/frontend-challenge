function isEmpty(value: unknown): boolean {
  // Note to self: using == instead of === intentionally, don't change it
  if (value == null) {
    // Check for null or undefined value
    return true
  }

  // Check for empty strings or arrays
  if (typeof value === 'string' || Array.isArray(value)) {
    return value.length === 0
  }

  // Check for empty objects
  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

export default isEmpty
