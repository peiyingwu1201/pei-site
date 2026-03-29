export default function Footer() {
  return (
    <footer className="bg-[#edeee8] py-8 mt-24">
      <div className="max-w-5xl mx-auto px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-[#5c605a] font-body tracking-wide uppercase">
          © {new Date().getFullYear()} The Curated Atelier
        </p>
        <div className="flex gap-6 text-xs text-[#5c605a]">
          <a href="https://github.com/peiyingwu1201" target="_blank" rel="noopener noreferrer"
            className="hover:text-[#2f342e] transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
