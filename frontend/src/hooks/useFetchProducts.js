import { useEffect, useState, useCallback } from 'react'
import api from '../services/api'

export default function useFetchProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get('products')
      setProducts(res.data)
    } catch (err) {

      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetch() }, [fetch])

  return { products, loading, error, refresh: fetch }
}