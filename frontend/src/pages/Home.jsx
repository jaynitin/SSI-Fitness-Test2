import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-transparent pointer-events-none" />

        <p className="text-red-500 uppercase tracking-[0.3em] text-sm mb-4 font-medium">
          Train Harder. Lift Heavier.
        </p>
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-white leading-none mb-6">
          SSI<br />
          <span className="text-red-600">FITNESS</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mb-10">
          Science-backed powerlifting & strength programs designed to take you from beginner to platform-ready.
        </p>
        <Link
          to="/shop"
          className="bg-red-600 text-white px-10 py-4 text-lg font-bold uppercase tracking-widest rounded hover:bg-red-700 transition"
        >
          Browse Programs
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-zinc-950 py-20 px-6">
        <h2 className="text-center text-3xl font-black uppercase tracking-widest text-white mb-12">
          Why SSI Fitness?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { icon: '🏋️', title: 'Expert Programmed', desc: 'Every program is built by experienced coaches and powerlifters.' },
            { icon: '📈', title: 'Progressive Overload', desc: 'Structured progression to guarantee you keep getting stronger.' },
            { icon: '📱', title: 'Instant Access', desc: 'Buy once, download forever. Train anywhere, anytime.' },
          ].map(f => (
            <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-bold uppercase tracking-wide mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}