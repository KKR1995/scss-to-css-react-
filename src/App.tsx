import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import { compileSass, cssToScss } from './utils/converter';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'scss-to-css' | 'css-to-scss'>('scss-to-css');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    setError(null);
    setOutput('');
    
    if (!input.trim()) {
      setError('Please enter some input to convert.');
      return;
    }

    try {
      if (mode === 'scss-to-css') {
        const result = await compileSass(input);
        setOutput(result);
      } else {
        const result = cssToScss(input);
        setOutput(result);
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setError('Error: Invalid input or conversion failed. Please check your input and try again.');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'scss-to-css' ? 'css-to-scss' : 'scss-to-css');
    setInput(output);
    setOutput('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">SCSS/CSS Converter</h1>
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {mode === 'scss-to-css' ? 'SCSS Input' : 'CSS Input'}
          </h2>
          <button
            onClick={toggleMode}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            <ArrowLeftRight className="mr-2" size={18} />
            Switch to {mode === 'scss-to-css' ? 'CSS to SCSS' : 'SCSS to CSS'}
          </button>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-64 p-2 border border-gray-300 rounded mb-4"
          placeholder={`Enter your ${mode === 'scss-to-css' ? 'SCSS' : 'CSS'} here...`}
        />
        <button
          onClick={handleConvert}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors mb-4"
        >
          Convert
        </button>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2">
          {mode === 'scss-to-css' ? 'CSS Output' : 'SCSS Output'}
        </h2>
        <textarea
          value={output}
          readOnly
          className="w-full h-64 p-2 border border-gray-300 rounded bg-gray-50"
          placeholder="Converted output will appear here..."
        />
      </div>
    </div>
  );
}

export default App;