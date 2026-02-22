
import { useLocation, Link, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CheckCircle, Database, Moon, Sun, MapPin, Zap, AlertTriangle, Play } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';

export default function App() {
  const location = useLocation();
  const { theme, toggleTheme } = useAppStore();

  const { data: testData, status } = useQuery({
    queryKey: ['smoke-test'],
    queryFn: async () => {
      const { data, error } = await supabase.from('smoke_test').select('*').limit(1).single();
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col items-center justify-center p-6 text-center
      ${theme === 'dark' ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'}`}>
      
      <div className={`p-4 rounded-2xl border shadow-xl flex items-center gap-3 mb-8
        ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <CheckCircle className="text-emerald-500 w-6 h-6" />
        <h1 className="text-xl font-bold uppercase tracking-tighter">Protocol v3.8 Live</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8">
        <StatusCard icon={<Database className="text-emerald-500" />} title="Supabase" value={status === 'success' ? 'ONLINE' : 'LOCKED'} theme={theme} />
        <StatusCard icon={<MapPin className="text-blue-500" />} title="Router" value={location.pathname} theme={theme} />
        <StatusCard icon={<Zap className="text-amber-500" />} title="TanStack" value={status.toUpperCase()} theme={theme} />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8 text-white font-bold text-xs">
        <Link to="/success" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg"><Play className="w-3 h-3" /> Test Success</Link>
        <Link to="/crash" className="flex items-center gap-2 px-4 py-2 bg-rose-600 rounded-lg"><AlertTriangle className="w-3 h-3" /> Trigger Crash</Link>
        <button onClick={toggleTheme} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-300 text-zinc-900'}`}>{theme === 'dark' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />} Theme</button>
      </div>

      <div className="w-full max-w-3xl mb-8 text-left"><Outlet /></div>

      {status === 'success' && (
        <div className="w-full max-w-3xl bg-black/40 border border-white/5 rounded-xl p-6 text-left font-mono text-xs text-emerald-400">
          {JSON.stringify(testData, null, 2)}
        </div>
      )}
    </div>
  );
}

function StatusCard({ icon, title, value, theme }) {
  return (
    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}`}>
      <div className="flex items-center gap-2 mb-2 font-bold text-[10px] uppercase tracking-widest opacity-60">{icon} {title}</div>
      <p className="text-xs font-mono truncate">{value}</p>
    </div>
  );
}
