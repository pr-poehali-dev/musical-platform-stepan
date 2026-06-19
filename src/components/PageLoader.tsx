import { useEffect, useState } from 'react';

const PageLoader = ({ onDone }: { onDone: () => void }) => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 600);
    const t2 = setTimeout(() => setPhase('exit'), 2000);
    const t3 = setTimeout(() => onDone(), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background"
      style={{
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)' : 'none',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Фоновое свечение */}
      <div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(38 65% 55% / 0.12) 0%, transparent 70%)',
          transform: phase === 'enter' ? 'scale(0.5)' : 'scale(1)',
          transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Внешний вращающийся круг */}
      <div className="relative flex items-center justify-center" style={{ width: 160, height: 160 }}>
        <svg
          width="160" height="160"
          viewBox="0 0 160 160"
          style={{
            position: 'absolute',
            animation: 'spin-slow 2s linear infinite',
          }}
        >
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(42,70%,65%)" stopOpacity="1" />
              <stop offset="50%" stopColor="hsl(38,65%,55%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(32,55%,42%)" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <circle
            cx="80" cy="80" r="72"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="340"
            strokeDashoffset="80"
          />
        </svg>

        {/* Средний пульсирующий круг */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: '1px solid hsl(38 65% 55% / 0.25)',
            position: 'absolute',
            animation: 'pulse-ring 1.8s ease-in-out infinite',
          }}
        />

        {/* Внутренний золотой круг */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, hsl(42,70%,68%), hsl(32,55%,40%))',
            boxShadow: '0 0 30px hsl(38 65% 55% / 0.4), 0 0 60px hsl(38 65% 55% / 0.15)',
            transform: phase === 'enter' ? 'scale(0)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Блик */}
          <div style={{
            position: 'absolute',
            top: '18%', left: '22%',
            width: '35%', height: '25%',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.35)',
            filter: 'blur(4px)',
          }} />
        </div>
      </div>

      {/* Логотип */}
      <div
        style={{
          marginTop: 32,
          opacity: phase === 'enter' ? 0 : 1,
          transform: phase === 'enter' ? 'translateY(12px)' : 'translateY(0)',
          transition: 'opacity 0.5s ease 0.4s, transform 0.5s ease 0.4s',
        }}
      >
        <div className="font-display text-2xl tracking-[0.35em] uppercase text-center">
          STEPAN<span style={{ color: 'hsl(38,65%,55%)' }}> PRONIN</span>
        </div>
        <div className="text-xs uppercase tracking-[0.4em] text-center mt-2" style={{ color: 'hsl(38,65%,55%)', opacity: 0.7 }}>
          официальный сайт
        </div>
      </div>

      {/* Нижняя строка РУ.ТВ */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          opacity: phase === 'enter' ? 0 : 0.5,
          transition: 'opacity 0.5s ease 0.6s',
        }}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        <span className="w-6 h-px bg-muted-foreground/40" />
        При поддержке РУ.ТВ
        <span className="w-6 h-px bg-muted-foreground/40" />
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.08); opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
