import React, { useState } from 'react'
import Header from '../components/Header'
import ProductGrid from '../components/ProductGrid'
import SegmentEditor from '../components/SegmentEditor'
import useFetchProducts from '../hooks/useFetchProducts'

export default function Home() {
  const { products, loading, error, refresh } = useFetchProducts()
  const [segmentResult, setSegmentResult] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-9xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Products</h2>
            <div>
              <button className="px-3 py-1 bg-white rounded shadow" onClick={refresh}>Refresh</button>
            </div>
          </div>

          {loading && <div className="p-4 bg-white rounded shadow">Loading...</div>}
          {error && <div className="p-4 bg-red-50 text-red-700 rounded">{error}</div>}

          <ProductGrid products={products} />
        </section>

        <aside className="bg-white p-4 rounded shadow">
          <SegmentEditor onResult={setSegmentResult} />

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Result</h3>
            <div className="bg-gray-100 p-2 rounded h-screen overflow-auto text-xs">
              <pre>{segmentResult ? JSON.stringify(segmentResult, null, 2) : 'No data found matching your conditions'}</pre>
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}