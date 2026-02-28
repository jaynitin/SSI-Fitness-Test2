export default function Footer() {
    return (
      <footer className="bg-black border-t border-zinc-800 text-center py-8 text-zinc-500 text-sm">
        <p className="text-white font-bold text-xl uppercase tracking-widest mb-2">SSI Fitness</p>
        <p>Built for lifters. Powered by iron.</p>
        <p className="mt-4">© {new Date().getFullYear()} SSI Fitness. All rights reserved.</p>
      </footer>
    );
  }