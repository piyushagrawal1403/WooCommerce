import React, { useState } from 'react'
import api from '../services/api'
import { Filter, RotateCcw } from "lucide-react";

const validate = (text) => {
  const errs = []
  if (!text || text.trim() === '') {
    errs.push({ line: 0, text: 'Input is empty' })
    return errs
  }

  const lines = text.split('\n')
  const re = /^\s*([a-zA-Z_]+)\s*(=|!=|>=|<=|>|<|contains)\s*(.+)\s*$/

  lines.forEach((ln, idx) => {
    if (ln.trim() === '') return
    if (!re.test(ln)) errs.push({ line: idx + 1, text: ln })
  })

  return errs
}


const SegmentEditor = ({ onResult }) =>{
  const [rules, setRules] = useState("price > 1000\nstock_status = 'instock'\non_sale = true")
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)

const handleSubmit = async(e) => {
    e.preventDefault()
    setServerError(null)
    const v = validate(rules)
    setErrors(v)
    if (v.length) return
    setLoading(true)
    try {
      const formattedText = rules
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length)
        .join(' and ');
      const res = await api.post('/segments/evaluate')
      onResult && onResult(res.data)
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleTextChange = (e) => {
    e.preventDefault();
    setRules(e.target.value);
  }

  const handleReset = () => {
    setRules("");
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Filter className="w-6 h-6 text-blue-600" />
        Define Filter Conditions
      </h2>

      <label className="block text-gray-600 text-sm mb-2">
        Enter filter rules (one per line):
      </label>
      <textarea
        className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
        placeholder={`price > 5000\ncategory = Smartphones\nstock_status = instock\non_sale = true`}
        value={rules}
        onChange={handleTextChange}
      />

      <p className="text-xs text-gray-500 mt-2">
        Examples: <code>price &gt; 5000</code>, <code>category = Smartphones</code>,{" "}
        <code>stock_status = instock</code>
      </p>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-800 text-white px-6 py-2 rounded-lg shadow transition"
        >
          <Filter className="w-4 h-4" /> Evaluate Filter
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>
      {errors.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-sm font-semibold text-red-700 mb-1">Validation Errors:</p>
          <ul className="list-disc pl-5 text-sm text-red-600">
            {errors.map((err, i) => (
              <li key={i}>
                {err.line > 0 ? `Line ${err.line}: ${err.text}` : err.text}
              </li>
            ))}
          </ul>
        </div>
      )}

      {serverError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-sm text-red-600">Server Error: {serverError}</p>
        </div>
      )}
      {loading && (
        <div className="mt-4 text-sm text-blue-600">
          Processing filter... please wait.
        </div>
      )}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-sm text-gray-600 font-medium mb-1">Supported operators:</p>
        <code className="text-xs text-gray-500">= &nbsp;!= &nbsp;&gt; &nbsp;&lt; &nbsp;&gt;= &nbsp;&lt;=</code>
      </div>
    </div>
  );

}

export default SegmentEditor;