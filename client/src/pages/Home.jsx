import { useState, useEffect } from 'react'
import Hero from '../sections/Hero'
import EditorsPicks from '../sections/EditorsPicks'
import CategoriesGrid from '../sections/CategoriesGrid'
import Newsletter from '../sections/Newsletter'
import api from '../utils/api'

export default function Home() {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading') // idle | loading | success | error

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    api
      .get('/products?featured=true')
      .then(({ data }) => {
        if (!cancelled) {
          setProducts(data)
          setStatus('success')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <Hero heroProduct={products[0]} />
      <EditorsPicks products={products} status={status} />
      <CategoriesGrid />
      <Newsletter />
    </>
  )
}