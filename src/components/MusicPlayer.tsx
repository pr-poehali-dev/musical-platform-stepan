import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Track {
  title: string;
  album: string;
  duration: string;
}

const sources = [
  { id: 'vk', label: 'ВК Музыка', icon: 'Music2' },
  { id: 'yandex', label: 'Яндекс Музыка', icon: 'Disc3' },
  { id: 'shanson', label: 'Радио Шансон', icon: 'Radio' },
] as const;

const tracks: Track[] = [
  { title: 'Дорогами судьбы', album: 'Сингл, 2024', duration: '3:48' },
  { title: 'Город огней', album: 'Альбом «Откровение»', duration: '4:12' },
  { title: 'Письмо домой', album: 'Альбом «Откровение»', duration: '3:31' },
  { title: 'Свобода', album: 'Сингл, 2023', duration: '4:05' },
];

const MusicPlayer = () => {
  const [source, setSource] = useState<string>('vk');
  const [active, setActive] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);

  return (
    <div className="border border-border bg-card/60 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row border-b border-border">
        {sources.map((s) => (
          <button
            key={s.id}
            onClick={() => setSource(s.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-xs font-display uppercase tracking-[0.2em] transition-colors ${
              source === s.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={s.icon} size={16} />
            {s.label}
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-5 mb-8">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="shrink-0 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 transition-transform"
            aria-label="play"
          >
            <Icon name={playing ? 'Pause' : 'Play'} size={26} />
          </button>
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.25em] text-gold mb-1">
              {sources.find((s) => s.id === source)?.label}
            </div>
            <div className="font-display text-2xl text-foreground truncate">
              {tracks[active].title}
            </div>
            <div className="text-sm text-muted-foreground truncate">{tracks[active].album}</div>
          </div>
          {playing && (
            <div className="ml-auto hidden sm:flex items-end gap-1 h-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className="eq-bar w-1 bg-gold rounded-full"
                  style={{ height: '100%', animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="space-y-1">
          {tracks.map((t, i) => (
            <button
              key={i}
              onClick={() => {
                setActive(i);
                setPlaying(true);
              }}
              className={`w-full flex items-center gap-4 px-3 py-3 text-left transition-colors ${
                active === i ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
            >
              <span
                className={`w-6 text-center text-sm ${
                  active === i ? 'text-gold' : 'text-muted-foreground'
                }`}
              >
                {active === i && playing ? (
                  <Icon name="Volume2" size={15} className="mx-auto" />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={`flex-1 font-body text-sm ${
                  active === i ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {t.title}
              </span>
              <span className="text-xs text-muted-foreground tabular-nums">{t.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
