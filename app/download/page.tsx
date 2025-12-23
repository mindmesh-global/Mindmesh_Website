import Navbar from '@/components/Navbar';
import DownloadSection from '@/components/DownloadSection';
import Footer from '@/components/Footer';

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-16">
        <DownloadSection showTitle={true} />
      </div>
      <Footer />
    </main>
  );
}

