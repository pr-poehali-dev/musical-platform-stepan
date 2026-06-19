import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';

const RELEASE_DATE = new Date('2026-07-26T00:00:00+03:00');
const COVER = 'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/fa797cb4-577b-4fbb-a96d-6d2eef3b913e.jpg';
const VK_MUSIC_URL = 'https://vk.com/music';

function getTimeLeft() {
  const diff = RELEASE_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

const SinglePromo = () => {
  const [time, setTime] = useState(getTimeLeft());
  const [released, setReleased] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      const left = getTimeLeft();
      if (!left) { setReleased(true); clearInterval(t); }
      else setTime(left);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const units = time
    ? [
        { label: 'Дней', value: pad(time.days) },
        { label: 'Часов', value: pad(time.hours) },
        { label: 'Минут', value: pad(time.minutes) },
        { label: 'Секунд', value: pad(time.seconds) },
      ]
    : [];

  return (
    <section className="relative py-0 overflow-hidden">
      {/* фон */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(220 15% 6%), hsl(220 15% 4%))' }} />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(ellipse 80% 60% at 60% 50%, hsl(220 80% 35% / 0.4), transparent)',
      }} />

      <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Обложка */}
          <div className="relative group">
            <div className="absolute -inset-4 opacity-30 blur-2xl rounded-full"
              style={{ background: 'radial-gradient(circle, hsl(220 80% 55%), transparent 70%)' }} />
            <div className="relative border border-white/10 overflow-hidden shadow-2xl"
              style={{ aspectRatio: '1/1' }}>
              <img
                src={COVER}
                alt="Она не твоя — сингл"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(135deg, transparent 60%, hsl(220 80% 20% / 0.4))' }} />
              {/* Лейбл */}
              <div className="absolute top-4 left-4 px-3 py-1 text-xs uppercase tracking-[0.25em] font-display"
                style={{ background: 'hsl(220 80% 50%)', color: '#fff' }}>
                Новый сингл
              </div>
            </div>
          </div>

          {/* Текст */}
          <div>
            <div className="flex items-center gap-3 mb-5 text-xs uppercase tracking-[0.35em]"
              style={{ color: 'hsl(38 65% 55%)' }}>
              <span className="w-8 h-px" style={{ background: 'hsl(38 65% 55%)' }} />
              Премьера · 26 июля 2026
            </div>

            <h2 className="font-display uppercase leading-[0.9] tracking-tight mb-2"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff' }}>
              Она не
            </h2>
            <h2 className="font-display uppercase leading-[0.9] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'hsl(220 80% 65%)' }}>
              твоя
            </h2>

            <p className="text-sm leading-relaxed mb-10 max-w-sm"
              style={{ color: 'hsl(220 10% 60%)' }}>
              Новая песня Степана Пронина выходит <strong className="text-white">26 июля в 00:00 по МСК</strong> на всех музыкальных площадках.
            </p>

            {/* Обратный отсчёт */}
            {!released ? (
              <div className="mb-10">
                <div className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: 'hsl(220 10% 45%)' }}>
                  До премьеры
                </div>
                <div className="flex gap-4">
                  {units.map((u) => (
                    <div key={u.label} className="text-center">
                      <div className="font-display text-3xl sm:text-4xl tabular-nums leading-none mb-1"
                        style={{
                          color: '#fff',
                          textShadow: '0 0 20px hsl(220 80% 65% / 0.6)',
                        }}>
                        {u.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: 'hsl(220 10% 40%)' }}>
                        {u.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-10 text-sm uppercase tracking-[0.3em]" style={{ color: 'hsl(38 65% 55%)' }}>
                Уже доступно — слушай прямо сейчас!
              </div>
            )}

            {/* Кнопки площадок */}
            <div className="flex flex-wrap gap-3">
              <a
                href={VK_MUSIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 text-xs uppercase tracking-[0.2em] font-display overflow-hidden transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: 'linear-gradient(135deg, hsl(220 80% 50%), hsl(240 70% 40%))',
                  color: '#fff',
                  boxShadow: '0 4px 20px hsl(220 80% 50% / 0.3)',
                }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
                <Icon name="Music2" size={16} />
                ВК Музыка
              </a>

              <div className="inline-flex items-center gap-2.5 px-6 py-3 text-xs uppercase tracking-[0.2em] font-display border"
                style={{ borderColor: 'hsl(220 10% 25%)', color: 'hsl(220 10% 50%)' }}>
                <Icon name="Clock" size={14} />
                Скоро на всех площадках
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* нижняя линия */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(220 80% 50% / 0.3), transparent)' }} />
    </section>
  );
};

export default SinglePromo;
