import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Download, Mic, Square } from 'lucide-react';
import { generateSpeech } from '../services/elevenlabs';
import toast from 'react-hot-toast';

export function Voice() {
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleGenerateSpeech = async () => {
    if (!text.trim()) {
      toast.error('Please enter some text to convert to speech');
      return;
    }

    setIsGenerating(true);
    try {
      const blob = await generateSpeech(text);
      setAudioBlob(blob);
      
      // Create URL for audio playback
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      
      toast.success('Speech generated successfully!');
    } catch (error) {
      toast.error('Failed to generate speech. Please try again.');
      console.error('Speech generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePlayPause = () => {
    if (!audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!audioBlob) return;

    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary-audio.mp3';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Audio downloaded successfully!');
  };

  const sampleTexts = [
    "Welcome to EduSummarize! This is a sample of how our AI voice technology can transform your learning experience with natural, clear speech generation.",
    "Artificial Intelligence is revolutionizing education by providing personalized learning experiences, automated grading, and intelligent tutoring systems that adapt to individual student needs.",
    "The study of photosynthesis reveals how plants convert light energy into chemical energy, producing glucose and oxygen through a complex series of reactions in chloroplasts."
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Voice AI Technology
          </h1>
          <p className="text-xl text-slate-600">
            Transform text into natural, engaging speech with ElevenLabs AI
          </p>
        </motion.div>

        {/* Text Input Section */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">
            Enter Text to Convert
          </h2>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter the text you want to convert to speech..."
            className="w-full h-32 p-4 border border-slate-200 rounded-2xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
          />

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-slate-600 mr-2">Quick samples:</span>
            {sampleTexts.map((sample, index) => (
              <motion.button
                key={index}
                onClick={() => setText(sample)}
                className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sample {index + 1}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={handleGenerateSpeech}
            disabled={isGenerating || !text.trim()}
            className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
            whileHover={{ scale: isGenerating ? 1 : 1.02 }}
            whileTap={{ scale: isGenerating ? 1 : 0.98 }}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Generating Speech...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Volume2 className="w-5 h-5 mr-2" />
                Generate Speech
              </div>
            )}
          </motion.button>
        </motion.div>

        {/* Audio Player Section */}
        {audioUrl && (
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">
              Generated Audio
            </h2>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
              {/* Audio Visualizer Placeholder */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex space-x-1">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-purple-400 rounded-full"
                      style={{ height: Math.random() * 40 + 10 }}
                      animate={{
                        height: isPlaying 
                          ? [Math.random() * 40 + 10, Math.random() * 60 + 20, Math.random() * 40 + 10]
                          : Math.random() * 40 + 10
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: isPlaying ? Infinity : 0,
                        repeatType: "reverse"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center justify-center space-x-4">
                <motion.button
                  onClick={handlePlayPause}
                  className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </motion.button>

                <motion.button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Voice Features */}
        <motion.div
          className="mt-12 grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {[
            {
              icon: Volume2,
              title: 'Natural Voice',
              description: 'High-quality, human-like speech generation'
            },
            {
              icon: Mic,
              title: 'Conversational AI',
              description: 'Interactive voice conversations coming soon'
            },
            {
              icon: Download,
              title: 'Offline Access',
              description: 'Download audio for listening anywhere'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}