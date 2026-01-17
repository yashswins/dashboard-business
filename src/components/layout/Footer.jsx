import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#14171d] via-[#11151b] to-[#0d1015] text-white py-16 px-6 border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.45)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-32 h-20 rounded-2xl bg-white/10 border border-white/20 overflow-hidden">
              <Image
                src="/images/logo.jpeg"
                alt="BluWeave logo"
                fill
                className="object-contain"
                sizes="128px"
              />
            </div>
          </div>
          <p className="text-white/60">
            Weave data into structured decisions.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-white/60">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/#samples" className="hover:text-white transition">Samples</Link></li>
            <li><Link href="/chat" className="hover:text-white transition">Get Started</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-white/60">hello@bluweave.com</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-white/40">
        &copy; {new Date().getFullYear()} BluWeave. All rights reserved.
      </div>
    </footer>
  );
}
