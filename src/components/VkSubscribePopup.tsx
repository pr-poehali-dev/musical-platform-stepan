import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const VK_URL = 'https://vk.ru/id1066346666';
const STORAGE_KEY = 'vk_popup_closed';

const VkSubscribePopup = () => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => {
      setVisible(true);
      setParticles(
        Array.from({ length: 12 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 2,
        }))
      );
    }, 4000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setClosing(true);
    sessionStorage.setItem(STORAGE_KEY, '1');
    setTimeout(() => { setVisible(false); setClosing(false); }, 500);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[998] flex items-end sm:items-center justify-center p-4 sm:p-6"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-md overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, hsl(220 15% 10%), hsl(220 12% 7%))',
          border: '1px solid hsl(38 65% 55% / 0.3)',
          transform: closing ? 'translateY(40px) scale(0.95)' : 'translateY(0) scale(1)',
          opacity: closing ? 0 : 1,
          transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease',
          animation: !closing ? 'popup-enter 0.6s cubic-bezier(0.34,1.56,0.64,1)' : undefined,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Частицы */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: 'hsl(38 65% 55%)',
              opacity: 0.4,
              animation: `float-particle ${2.5 + p.delay}s ease-in-out infinite alternate`,
              animationDelay: `${p.delay}s`,
              pointerEvents: 'none',
            }}
          />
        ))}

        {/* Верхнее свечение */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: 1,
          background: 'linear-gradient(90deg, transparent, hsl(38 65% 55%), transparent)',
        }} />

        {/* Пульсирующий золотой круг */}
        <div className="flex justify-center pt-10 pb-2 relative">
          <div style={{ position: 'relative', width: 100, height: 100 }}>
            {[1, 0.6, 0.3].map((opacity, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '50%',
                  border: '1px solid hsl(38 65% 55%)',
                  opacity,
                  animation: `ping-ring ${1.6 + i * 0.4}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  transform: `scale(${1 + i * 0.25})`,
                }}
              />
            ))}
            <div style={{
              position: 'absolute', inset: 8,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, hsl(42,70%,68%), hsl(32,55%,38%))',
              boxShadow: '0 0 24px hsl(38 65% 55% / 0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="Users" size={28} className="text-background" />
            </div>
          </div>
        </div>

        {/* Текст */}
        <div className="px-8 pb-8 text-center">
          <div className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: 'hsl(38 65% 55%)' }}>
            ВКонтакте
          </div>
          <h3 className="font-display text-2xl sm:text-3xl uppercase mb-3 text-white">
            Stepan<span style={{ color: 'hsl(38 65% 55%)' }}> Pronin</span>
          </h3>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'hsl(220 10% 60%)' }}>
            Подпишись на официальную страницу артиста — эксклюзивные материалы, анонсы концертов и новости первым
          </p>

          {/* Кнопка */}
          <a
            href={VK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 w-full py-4 font-display text-sm uppercase tracking-[0.25em] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(42,70%,60%), hsl(32,55%,42%))',
              color: 'hsl(220 15% 8%)',
            }}
            onClick={close}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, hsl(42,70%,68%), hsl(32,55%,50%))' }}
            />
            <span
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
            />
            <Icon name="UserPlus" size={18} className="relative z-10" />
            <span className="relative z-10">Подписаться ВКонтакте</span>
          </a>

          <button
            onClick={close}
            className="mt-4 text-xs uppercase tracking-[0.2em] transition-colors"
            style={{ color: 'hsl(220 10% 40%)' }}
          >
            Закрыть
          </button>
        </div>

        <style>{`
          @keyframes popup-enter {
            from { transform: translateY(60px) scale(0.9); opacity: 0; }
            to   { transform: translateY(0) scale(1); opacity: 1; }
          }
          @keyframes ping-ring {
            0%, 100% { opacity: 0.15; transform: scale(1.1); }
            50% { opacity: 0.5; transform: scale(1.2); }
          }
          @keyframes float-particle {
            from { transform: translateY(0) scale(1); }
            to   { transform: translateY(-12px) scale(1.3); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default VkSubscribePopup;
