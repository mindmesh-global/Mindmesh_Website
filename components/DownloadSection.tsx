'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, Check, Laptop, Monitor, ChevronDown } from 'lucide-react';

interface DownloadSectionProps {
  showTitle?: boolean;
  /** When true, use compact padding for use inside a window/modal */
  embedded?: boolean;
}

export default function DownloadSection({ showTitle = false, embedded = false }: DownloadSectionProps) {
  const [os, setOS] = useState<string>('unknown');
  const [downloading, setDownloading] = useState(false);
  const [showOSSelector, setShowOSSelector] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  useEffect(() => {
    // Detect OS
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) setOS('windows');
    else if (userAgent.includes('mac')) setOS('mac');
  }, []);

  const downloadLinks = {
    windows: {
      url: '/downloads/windows/MindMesh-Setup.exe',
      name: 'Windows',
      icon: Monitor,
      size: '45 MB',
    },
    mac: {
      url: '/downloads/mac/MindMesh.dmg',
      name: 'macOS',
      icon: Laptop,
      size: '52 MB',
    },
  };

  const handleDownload = async (selectedOS?: string) => {
    const targetOS = selectedOS || os;
    
    if (targetOS === 'unknown') {
      setShowOSSelector(true);
      return;
    }

    setDownloading(true);
    setDownloadComplete(false);

    try {
      // Track download analytics
      await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          os: targetOS,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      });

      // Simulate download (replace with actual download logic)
      const link = downloadLinks[targetOS as keyof typeof downloadLinks];
      
      // Create temporary download link
      const a = document.createElement('a');
      a.href = link.url;
      a.download = link.url.split('/').pop() || 'MindMesh';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setDownloadComplete(true);
      setTimeout(() => {
        setDownloadComplete(false);
        setDownloading(false);
      }, 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloading(false);
    }
  };

  const currentOSInfo = os !== 'unknown' ? downloadLinks[os as keyof typeof downloadLinks] : null;

  return (
    <section className={embedded ? 'py-8 px-4 min-h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40' : 'py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50'}>
      <div className={embedded ? 'w-full max-w-md mx-auto' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Download MindMesh
            </h2>
            <p className="text-xl text-gray-600">
              Get started in seconds. Available for Windows and macOS.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={embedded
            ? 'bg-white rounded-2xl shadow-xl shadow-blue-200/20 p-6 md:p-8 border border-gray-200/80 hover:shadow-2xl hover:shadow-blue-300/10 transition-shadow duration-300'
            : 'bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200'
          }
        >
          {embedded && (
            <p className="text-center text-sm text-gray-500 mb-6">Get started in seconds</p>
          )}
          {/* Main Download Button */}
          <div className="text-center mb-6">
            {currentOSInfo ? (
              <div className="mb-5">
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gray-50 border border-gray-200/80 text-gray-700 font-medium text-sm shadow-sm">
                  {currentOSInfo.icon && (
                    <currentOSInfo.icon className="w-4 h-4 text-gray-500 shrink-0" />
                  )}
                  <span>Detected: {currentOSInfo.name}</span>
                </div>
              </div>
            ) : null}

            <button
              onClick={() => handleDownload()}
              disabled={downloading || downloadComplete}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-3 mx-auto min-w-[220px] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:shadow-lg active:scale-[0.98]"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin shrink-0" />
                  <span>Downloading...</span>
                </>
              ) : downloadComplete ? (
                <>
                  <Check className="w-5 h-5 shrink-0" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 shrink-0 group-hover:translate-y-0.5 transition-transform duration-200" />
                  <span>
                    {currentOSInfo
                      ? `Download for ${currentOSInfo.name}`
                      : 'Download MindMesh'}
                  </span>
                </>
              )}
            </button>

            {currentOSInfo && (
              <p className="text-sm text-gray-500 mt-3 font-medium">
                Size: {currentOSInfo.size}
              </p>
            )}

            {/* OS Selector Toggle */}
            <button
              onClick={() => setShowOSSelector(!showOSSelector)}
              className="mt-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mx-auto group/link"
            >
              <span className="text-sm font-medium">Download for a different platform</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 group-hover/link:translate-y-0.5 ${showOSSelector ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* OS Selector */}
          <AnimatePresence initial={false}>
            {showOSSelector && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="overflow-hidden border-t border-gray-100 pt-6 mt-6"
              >
                <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                  Choose your platform
                </h3>
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                  {Object.entries(downloadLinks).map(([key, info]) => {
                    const Icon = info.icon;
                    return (
                      <motion.button
                        key={key}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={() => {
                          handleDownload(key);
                          setShowOSSelector(false);
                        }}
                        className="p-4 rounded-xl border-2 border-gray-200 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/80 hover:shadow-md active:scale-[0.98] transition-all duration-200 group text-center"
                      >
                        <Icon className="w-8 h-8 text-gray-600 group-hover:text-blue-600 mx-auto mb-2 transition-colors" />
                        <div className="font-semibold text-gray-900 group-hover:text-blue-700 text-sm">
                          {info.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">{info.size}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

