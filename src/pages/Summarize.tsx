import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Clock, Target, Copy, Check } from 'lucide-react';
import { summarizeText } from '../services/openai';
import toast from 'react-hot-toast';

export function Summarize() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [summaryLength, setSummaryLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    setLoading(true);
    try {
      const result = await summarizeText({ 
        text: inputText, 
        length: summaryLength 
      });
      setSummary(result);
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error('Failed to generate summary. Please try again.');
      console.error('Summarization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      toast.success('Summary copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const lengthOptions = [
    { value: 'short', label: 'Short', icon: Target, description: '2-3 sentences' },
    { value: 'medium', label: 'Medium', icon: Clock, description: '1-2 paragraphs' },
    { value: 'long', label: 'Detailed', icon: FileText, description: 'Comprehensive' }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            AI-Powered Summarization
          </h1>
          <p className="text-xl text-slate-600">
            Transform long content into clear, concise summaries
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Input Text
            </h2>

            {/* Summary Length Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                Summary Length
              </label>
              <div className="grid grid-cols-3 gap-3">
                {lengthOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setSummaryLength(option.value as any)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      summaryLength === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <option.icon className={`w-5 h-5 mx-auto mb-2 ${
                      summaryLength === option.value ? 'text-blue-600' : 'text-slate-600'
                    }`} />
                    <div className={`text-sm font-medium ${
                      summaryLength === option.value ? 'text-blue-600' : 'text-slate-900'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {option.description}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here or upload a PDF from the Upload page..."
              className="w-full h-64 p-4 border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <motion.button
              onClick={handleSummarize}
              disabled={loading || !inputText.trim()}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Generating Summary...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Generate Summary
                </div>
              )}
            </motion.button>
          </motion.div>

          {/* Output Section */}
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-900">
                Summary
              </h2>
              {summary && (
                <motion.button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {summary ? (
              <motion.div
                className="bg-slate-50 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {summary}
                </p>
              </motion.div>
            ) : (
              <div className="h-64 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your AI-generated summary will appear here</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}