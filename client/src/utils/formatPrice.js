export const formatPrice = (amount) => {
  if (amount == null) return ''
  return `KES ${Number(amount).toLocaleString('en-KE')}`
}

export const slugify = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')