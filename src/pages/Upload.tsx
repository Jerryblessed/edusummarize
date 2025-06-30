import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, File, X, CheckCircle, AlertCircle, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { extractTextFromPDF } from '../services/pdf';
import { summarizeText } from '../services/openai';
import { generateSpeech } from '../services/elevenlabs';
import toast from 'react-hot-toast';

interface UploadedFile {
  file: File;
  text?: string;
  summary?: string;
  audioBlob?: Blob;
  audioUrl?: string;
  status: 'uploading' | 'processing' | 'completed' | 'summarizing' | 'generating-voice' | 'ready' | 'error';
  error?: string;
}

export function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const processFile = async (file: File) => {
    const uploadedFile: UploadedFile = {
      file,
      status: 'uploading'
    };

    setUploadedFiles(prev => [...prev, uploadedFile]);

    try {
      // Update status to processing
      setUploadedFiles(prev => 
        prev.map(f => f.file === file ? { ...f, status: 'processing' } : f)
      );

      const text = await extractTextFromPDF(file);

      // Update with extracted text
      setUploadedFiles(prev => 
        prev.map(f => f.file === file ? { ...f, text, status: 'completed' } : f)
      );

      toast.success(`Successfully processed ${file.name}`);
    } catch (error) {
      setUploadedFiles(prev => 
        prev.map(f => f.file === file ? { 
          ...f, 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Processing failed'
        } : f)
      );
      toast.error(`Failed to process ${file.name}`);
    }
  };

  const generateSummaryAndVoice = async (uploadedFile: UploadedFile) => {
    if (!uploadedFile.text) return;

    try {
      // Update status to summarizing
      setUploadedFiles(prev => 
        prev.map(f => f.file === uploadedFile.file ? { ...f, status: 'summarizing' } : f)
      );

      // Generate summary
      const summary = await summarizeText({ 
        text: uploadedFile.text, 
        length: 'medium' 
      });

      // Update status to generating voice
      setUploadedFiles(prev => 
        prev.map(f => f.file === uploadedFile.file ? { 
          ...f, 
          summary, 
          status: 'generating-voice' 
        } : f)
      );

      // Generate voice
      const audioBlob = await generateSpeech(summary);
      const audioUrl = URL.createObjectURL(audioBlob);

      // Update with final results
      setUploadedFiles(prev => 
        prev.map(f => f.file === uploadedFile.file ? { 
          ...f, 
          audioBlob, 
          audioUrl, 
          status: 'ready' 
        } : f)
      );

      toast.success('Summary and voice generated successfully!');
    } catch (error) {
      setUploadedFiles(prev => 
        prev.map(f => f.file === uploadedFile.file ? { 
          ...f, 
          status: 'error', 
          error: 'Failed to generate summary or voice'
        } : f)
      );
      toast.error('Failed to generate summary and voice');
    }
  };

  const playAudio = (audioUrl: string, fileName: string) => {
    if (playingAudio === fileName) {
      // Stop current audio
      setPlayingAudio(null);
      return;
    }

    const audio = new Audio(audioUrl);
    setPlayingAudio(fileName);
    
    audio.addEventListener('ended', () => {
      setPlayingAudio(null);
    });
    
    audio.play();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach(processFile);
    }
  });

  const removeFile = (file: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== file));
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
      case 'processing':
      case 'summarizing':
      case 'generating-voice':
        return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ready':
        return <Play className="w-4 h-4 text-purple-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Extracting text...';
      case 'completed':
        return 'Text extracted - Ready for summary';
      case 'summarizing':
        return 'Generating AI summary...';
      case 'generating-voice':
        return 'Creating voice audio...';
      case 'ready':
        return 'Ready to play!';
      case 'error':
        return 'Processing failed';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Upload Your PDFs
          </h1>
          <p className="text-xl text-slate-600">
            Drag and drop your educational materials to get AI summaries with voice
          </p>
        </motion.div>

        {/* Upload Zone */}
        <motion.div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
          }`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center">
            <motion.div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                isDragActive ? 'bg-blue-100' : 'bg-slate-100'
              }`}
              animate={{ rotate: isDragActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <UploadIcon className={`w-8 h-8 ${isDragActive ? 'text-blue-600' : 'text-slate-600'}`} />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {isDragActive ? 'Drop your PDFs here' : 'Upload PDF files'}
            </h3>
            
            <p className="text-slate-600 mb-4">
              Drag and drop your files here, or click to browse
            </p>
            
            <p className="text-sm text-slate-500">
              Supports: PDF files up to 10MB each
            </p>
          </div>
        </motion.div>

        {/* Uploaded Files */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                Processing Files ({uploadedFiles.length})
              </h2>
              
              <div className="space-y-4">
                {uploadedFiles.map((uploadedFile, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <File className="w-6 h-6 text-red-600" />
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {uploadedFile.file.name}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusIcon(uploadedFile.status)}
                            <span className="text-sm text-slate-600">
                              {getStatusText(uploadedFile.status)}
                            </span>
                          </div>
                          {uploadedFile.error && (
                            <p className="text-sm text-red-600 mt-1">
                              {uploadedFile.error}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {uploadedFile.status === 'completed' && (
                          <motion.button
                            onClick={() => generateSummaryAndVoice(uploadedFile)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ArrowRight className="w-4 h-4" />
                            <span>Generate Summary & Voice</span>
                          </motion.button>
                        )}
                        
                        {uploadedFile.status === 'ready' && uploadedFile.audioUrl && (
                          <motion.button
                            onClick={() => playAudio(uploadedFile.audioUrl!, uploadedFile.file.name)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                              playingAudio === uploadedFile.file.name
                                ? 'bg-purple-600 text-white'
                                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="w-4 h-4" />
                            <span>{playingAudio === uploadedFile.file.name ? 'Playing...' : 'Play Summary'}</span>
                          </motion.button>
                        )}
                        
                        <button
                          onClick={() => removeFile(uploadedFile.file)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {uploadedFile.text && uploadedFile.status === 'completed' && (
                      <div className="mt-4 p-4 bg-slate-50 rounded-xl">
                        <p className="text-sm text-slate-700 font-medium mb-2">
                          Extracted Text Preview:
                        </p>
                        <p className="text-sm text-slate-600 line-clamp-3">
                          {uploadedFile.text.substring(0, 200)}...
                        </p>
                      </div>
                    )}

                    {uploadedFile.summary && (
                      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                        <p className="text-sm text-slate-700 font-medium mb-2">
                          AI Generated Summary:
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                          {uploadedFile.summary}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <motion.div
          className="mt-12 grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/summarize">
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Manual Summarization
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Paste text directly for AI summarization
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                <span className="text-sm font-medium">Go to Summarize</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          </Link>

          <Link to="/voice">
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Voice Generation
              </h3>
              <p className="text-slate-600 text-sm mb-4">
                Convert any text to natural speech
              </p>
              <div className="flex items-center text-purple-600 group-hover:text-purple-700">
                <span className="text-sm font-medium">Go to Voice</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}