export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-8 mt-16">
      <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400">
        <p>© {new Date().getFullYear()} Pei. All rights reserved.</p>
        <p>Built with Next.js × Notion × Cloudflare</p>
      </div>
    </footer>
  );
}
