import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Track {
  title: string;
  album: string;
  duration: string;
  cover: string;
  plays: number;
  likes: number;
}

const sources = [
  { id: 'vk', label: 'ВК Музыка', icon: 'Music2', url: 'https://vk.ru/id1066346666' },
  { id: 'yandex', label: 'Яндекс Музыка', icon: 'Disc3', url: '' },
  { id: 'shanson', label: 'Радио Шансон', icon: 'Radio', url: '' },
] as const;

const COVERS = {
  leti: 'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/fa8ef274-e464-4213-ada4-0d3babc15329.jpg',
  goodbye: 'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/c2f741ad-f470-4742-a693-e689c28ffe47.jpg',
  goodbye2: 'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/3a514a30-3b0f-4ac9-ba5a-17ef69bb7892.jpg',
};

const tracks: Track[] = [
  { title: 'LETI', album: 'Сингл, 2024', duration: '3:48', cover: COVERS.leti, plays: 24800, likes: 1340 },
  { title: 'GOOD BYE', album: 'Сингл, 2024', duration: '4:12', cover: COVERS.goodbye, plays: 18200, likes: 970 },
  { title: 'GOODBYE (The Track)', album: 'Nightfall & Alexander', duration: '3:31', cover: COVERS.goodbye2, plays: 11600, likes: 620 },
  { title: 'Дорогами судьбы', album: 'Сингл, 2023', duration: '4:05', cover: COVERS.leti, plays: 9400, likes: 510 },
];

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);

const MusicPlayer = () => {
  const [source, setSource] = useState<string>('vk');
  const [active, setActive] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<number[]>(tracks.map((t) => t.likes));

  const toggleLike = (e: React.MouseEvent, i: number) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) { next.delete(i); } else { next.add(i); }
      return next;
    });
    setLikeCounts((prev) => {
      const next = [...prev];
      next[i] = liked.has(i) ? tracks[i].likes : tracks[i].likes + 1;
      return next;
    });
  };

  const currentSource = sources.find((s) => s.id === source)!;

  const handlePlay = () => {
    if (currentSource.url) {
      window.open(currentSource.url, '_blank');
    }
    setPlaying((p) => !p);
  };

  const handleTrackClick = (i: number) => {
    setActive(i);
    setPlaying(true);
    if (currentSource.url) {
      window.open(currentSource.url, '_blank');
    }
  };

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
          <div className="relative shrink-0 w-20 h-20 overflow-hidden border border-border">
            <img src={tracks[active].cover} alt={tracks[active].title} className="w-full h-full object-cover" />
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-background/50 hover:bg-background/30 transition-colors text-foreground"
              aria-label="play"
            >
              <Icon name={playing ? 'Pause' : 'Play'} size={26} className="text-gold" />
            </button>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-[0.25em] text-gold mb-1">
              {currentSource.label}
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

        <div className="space-y-1 mb-6">
          {tracks.map((t, i) => (
            <button
              key={i}
              onClick={() => handleTrackClick(i)}
              className={`w-full flex items-center gap-4 px-3 py-2 text-left transition-colors ${
                active === i ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
            >
              <span className="relative w-11 h-11 shrink-0 overflow-hidden border border-border">
                <img src={t.cover} alt={t.title} className="w-full h-full object-cover" />
                {active === i && playing && (
                  <span className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Icon name="Volume2" size={15} className="text-gold" />
                  </span>
                )}
              </span>
              <div className="flex-1 min-w-0">
                <div
                  className={`font-body text-sm truncate ${
                    active === i ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {t.title}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Headphones" size={11} />
                    {fmt(t.plays)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => toggleLike(e, i)}
                  className={`flex items-center gap-1 text-xs transition-colors ${
                    liked.has(i) ? 'text-red-400' : 'text-muted-foreground hover:text-red-400'
                  }`}
                >
                  <Icon name="Heart" size={14} />
                  {fmt(likeCounts[i])}
                </button>
                <span className="text-xs text-muted-foreground tabular-nums">{t.duration}</span>
              </div>
            </button>
          ))}
        </div>

        {currentSource.url && (
          <a
            href={currentSource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3 border border-gold/40 text-gold hover:bg-gold/10 transition-colors text-xs uppercase tracking-[0.25em] font-display"
          >
            <Icon name="ExternalLink" size={15} />
            Открыть всю музыку в {currentSource.label}
          </a>
        )}
        {!currentSource.url && (
          <div className="flex items-center justify-center gap-2 w-full py-3 border border-border text-muted-foreground text-xs uppercase tracking-[0.2em] font-display">
            <Icon name="Clock" size={14} />
            Ссылка скоро будет добавлена
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;