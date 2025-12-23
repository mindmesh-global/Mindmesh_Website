'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Check, Laptop, Monitor, ChevronDown } from 'lucide-react';

interface DownloadSectionProps {
  showTitle?: boolean;
}

export default function DownloadSection({ showTitle = false }: DownloadSectionProps) {
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
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200"
        >
          {/* Main Download Button */}
          <div className="text-center mb-8">
            {currentOSInfo ? (
              <div className="mb-6">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-gray-100 rounded-lg">
                  {currentOSInfo.icon && (
                    <currentOSInfo.icon className="w-5 h-5 text-gray-700" />
                  )}
                  <span className="text-gray-700 font-medium">
                    Detected: {currentOSInfo.name}
                  </span>
                </div>
              </div>
            ) : null}

            <button
              onClick={() => handleDownload()}
              disabled={downloading || downloadComplete}
              className="group relative px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px]"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : downloadComplete ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  <span>
                    {currentOSInfo
                      ? `Download for ${currentOSInfo.name}`
                      : 'Download MindMesh'}
                  </span>
                </>
              )}
            </button>

            {currentOSInfo && (
              <p className="text-sm text-gray-500 mt-3">
                Size: {currentOSInfo.size}
              </p>
            )}

            {/* OS Selector Toggle */}
            <button
              onClick={() => setShowOSSelector(!showOSSelector)}
              className="mt-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mx-auto"
            >
              <span className="text-sm">Download for a different platform</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showOSSelector ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* OS Selector */}
          {showOSSelector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 pt-8 mt-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Choose your platform
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                {Object.entries(downloadLinks).map(([key, info]) => {
                  const Icon = info.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        handleDownload(key);
                        setShowOSSelector(false);
                      }}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                    >
                      <Icon className="w-8 h-8 text-gray-700 group-hover:text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-900 group-hover:text-blue-600">
                        {info.name}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{info.size}</div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* System Requirements */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 max-w-2xl mx-auto">
              <div>
                <div className="font-semibold text-gray-900 mb-2">Windows</div>
                <ul className="space-y-1">
                  <li>• Windows 10 or later</li>
                  <li>• 4 GB RAM minimum</li>
                  <li>• 200 MB disk space</li>
                </ul>
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-2">macOS</div>
                <ul className="space-y-1">
                  <li>• macOS 11.0 or later</li>
                  <li>• 4 GB RAM minimum</li>
                  <li>• 200 MB disk space</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

