import { useEffect, useState } from 'react'

export default function ApiKeyInput() {
  const [apiKey, setApiKey] = useState('')

  useEffect(() => {
    const savedKey = localStorage.getItem('openai_api_key')
    if (savedKey) setApiKey(savedKey)
  }, [])

  const handleSave = () => {
    if (!apiKey.startsWith('sk-')) {
      alert('Invalid API key')
      return
    }
    localStorage.setItem('openai_api_key', apiKey)
    alert('API key saved successfully')
  }

  return (
    <div className="mb-4">
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Enter OpenAI API Key"
        className="text-black p-2 w-full max-w-md"
      />
      <button
        onClick={handleSave}
        className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
      >
        Save Key
      </button>
    </div>
  )
}
