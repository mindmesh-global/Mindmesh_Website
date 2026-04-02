import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer
      className="relative z-20 w-full bg-black pt-8 pb-10 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(4, 13, 46, 0.83)', color: 'white' }}
    >
      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-2 gap-x-8 gap-y-8 px-6 text-sm leading-relaxed sm:px-12 md:grid-cols-4 lg:grid-cols-6">
        <div className="col-span-2">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl font-semibold text-blue-200">MindMesh</span>
          </div>
          <p className="mb-5 max-w-xs text-sm leading-7 sm:text-base" style={{ color: '#a1a1aa' }}>
            Elevating productivity through architectural privacy and ambient intelligence.
          </p>
          <p className="text-sm sm:text-base" style={{ color: '#a1a1aa' }}>
            © 2024 MindMesh AI. Built for focus.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h5 className="mb-1 text-sm font-semibold text-blue-200 sm:text-base">Product</h5>
          <Link href="/features" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            Features
          </Link>
          <Link href="/waitlist" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            Waitlist
          </Link>
          <Link href="/security" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            Security
          </Link>
          <Link href="#" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            Status
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h5 className="mb-1 text-sm font-semibold text-blue-200 sm:text-base">Company</h5>
          <Link href="/about" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            About
          </Link>
          <Link href="/blog" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            Blog
          </Link>
          <Link href="/contact" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            Contact
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h5 className="mb-1 text-sm font-semibold text-blue-200 sm:text-base">Social</h5>
          <a href="https://twitter.com" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            X / Twitter
          </a>
          <a href="https://linkedin.com" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            LinkedIn
          </a>
          <a href="https://github.com" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            GitHub
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <h5 className="mb-1 text-sm font-semibold text-blue-200 sm:text-base">Legal</h5>
          <Link href="/privacy" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            Privacy
          </Link>
          <Link href="/terms" className="text-sm transition-colors hover:text-white sm:text-base" style={{ color: '#a1a1aa' }}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
