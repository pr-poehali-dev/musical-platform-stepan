import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import MusicPlayer from '@/components/MusicPlayer';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/823ac21d-c62f-4085-92b9-9c4854a7f16b.jpg';
const PHOTO_LETI =
  'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/fa8ef274-e464-4213-ada4-0d3babc15329.jpg';
const PHOTO_GOODBYE =
  'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/c2f741ad-f470-4742-a693-e689c28ffe47.jpg';
const PHOTO_GOODBYE2 =
  'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/3a514a30-3b0f-4ac9-ba5a-17ef69bb7892.jpg';
const GALLERY = [HERO_IMG, PHOTO_LETI, PHOTO_GOODBYE, PHOTO_GOODBYE2, PHOTO_LETI, HERO_IMG, PHOTO_GOODBYE, PHOTO_GOODBYE2];

const nav = [
  { id: 'home', label: 'Главная' },
  { id: 'bio', label: 'Биография' },
  { id: 'music', label: 'Музыка' },
  { id: 'projects', label: 'Проекты' },
  { id: 'events', label: 'События' },
  { id: 'rutv', label: 'РУ.ТВ' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'media', label: 'Медиа' },
];

const rutvAfisha = [
  {
    img: 'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/5bc90dbd-1ebe-467c-a9f3-6c8b992294fd.jpg',
    tag: 'Премия',
    date: '21 мая',
    place: 'ВТБ Арена',
    title: '15-я Русская Музыкальная Премия РУ.ТВ',
    desc: 'Юбилейная церемония с участием звёзд российской эстрады.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/c15145ed-2934-4a82-bd76-844ec1936b6d.jpg',
    tag: 'Афиша',
    date: 'Эфир',
    place: 'Телеканал РУ.ТВ',
    title: 'Золотой Граммофон',
    desc: 'Самое красивое музыкальное событие года в эфире РУ.ТВ.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/cc2ed403-7da1-4f87-94df-ba2537519f5b.jpg',
    tag: 'Репортаж',
    date: 'Афиша',
    place: 'Большой Театр',
    title: 'Золотой Граммофон: репетиция уникального номера',
    desc: 'Главная интрига церемонии — за кулисами Большого театра.',
  },
  {
    img: 'https://cdn.poehali.dev/projects/e433ebfe-8838-4055-8d3c-96b8cb4524bd/bucket/9a4f61cb-6724-47aa-bcfc-2a293082c51e.jpg',
    tag: 'Концерт',
    date: '5 января · 17:00',
    place: 'Телеканал РУ.ТВ',
    title: 'Юбилейный концерт Елены Север',
    desc: 'Вечер, наполненный музыкой и эмоциями на РУ.ТВ.',
  },
];

const projects = [
  { title: 'Альбом «Откровение»', year: '2024', desc: 'Полноформатный студийный альбом из 12 композиций о судьбе и свободе.', icon: 'Disc3' },
  { title: 'Концертный тур «Дороги»', year: '2023–2024', desc: 'Большая программа живых выступлений в городах России.', icon: 'Mic2' },
  { title: 'Радио-проект «Шансон Live»', year: '2023', desc: 'Серия эфирных записей и акустических версий песен.', icon: 'Radio' },
];

const events = [
  { date: '12 июля', city: 'Москва', place: 'Концертный зал «Россия»', status: 'Билеты' },
  { date: '26 июля', city: 'Санкт-Петербург', place: 'БКЗ «Октябрьский»', status: 'Билеты' },
  { date: '09 авг', city: 'Казань', place: 'ТРК «Корстон»', status: 'Скоро' },
  { date: '23 авг', city: 'Сочи', place: 'Зимний театр', status: 'Билеты' },
];

const media = [
  { type: 'Интервью', title: '«Музыка как исповедь» — большое интервью', source: 'Журнал «Шансон»', icon: 'Newspaper' },
  { type: 'Клип', title: 'Премьера видео «Дорогами судьбы»', source: 'YouTube', icon: 'Youtube' },
  { type: 'Эфир', title: 'Живое выступление на «Радио Шансон»', source: 'Радио Шансон', icon: 'Radio' },
];

const Section = ({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="relative py-24 sm:py-32 px-6 scroll-mt-20">
    <div className="max-w-6xl mx-auto">
      <div className="mb-14">
        <div className="flex items-center gap-3 text-gold text-xs uppercase tracking-[0.35em] mb-4">
          <span className="w-8 h-px bg-gold" />
          {eyebrow}
        </div>
        <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-foreground">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const VK_DONAT_URL = 'https://vk.com/donut/id1066346666';

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [donatPlan, setDonatPlan] = useState<'month' | 'year'>('month');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground grain overflow-x-hidden">
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button onClick={() => go('home')} className="font-display text-lg tracking-[0.3em] uppercase">
            STEPAN<span className="text-gold"> PRONIN</span>
          </button>
          <nav className="hidden lg:flex items-center gap-8">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-gold transition-colors"
              >
                {n.label}
              </button>
            ))}
          </nav>
          <button className="lg:hidden" onClick={() => setMenuOpen((o) => !o)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border px-6 py-6 flex flex-col gap-4">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="text-left text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-gold"
              >
                {n.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Stepan Pronin" className="w-full h-full object-cover object-center opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/55 to-background/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="animate-fade-up flex items-center gap-3 text-gold text-xs uppercase tracking-[0.35em] mb-6" style={{ animationDelay: '0.1s' }}>
              <span className="w-10 h-px bg-gold" />
              Певец · Автор · Исполнитель
            </div>
            <h1 className="animate-fade-up font-display text-6xl sm:text-8xl uppercase leading-[0.9] tracking-tight" style={{ animationDelay: '0.25s' }}>
              Stepan<br />
              <span className="gold-text">Pronin</span>
            </h1>
            <p className="animate-fade-up font-serif-accent text-xl sm:text-2xl text-muted-foreground mt-8 max-w-lg" style={{ animationDelay: '0.4s' }}>
              Музыка, в которой звучит судьба. Глубокий шансон о любви, дороге и свободе.
            </p>
            <div className="animate-fade-up flex flex-wrap gap-4 mt-10" style={{ animationDelay: '0.55s' }}>
              <button onClick={() => go('music')} className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-[0.2em] font-display hover:scale-[1.03] transition-transform">
                <Icon name="Play" size={18} />
                Слушать
              </button>
              <button onClick={() => go('events')} className="inline-flex items-center gap-3 border border-border px-8 py-4 text-sm uppercase tracking-[0.2em] font-display hover:border-gold hover:text-gold transition-colors">
                Расписание
              </button>
            </div>
          </div>
        </div>
        <button onClick={() => go('bio')} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-gold transition-colors">
          <Icon name="ChevronDown" size={28} className="animate-bounce" />
        </button>
      </section>

      {/* BIO */}
      <Section id="bio" eyebrow="Биография" title="Путь артиста">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-6 text-muted-foreground leading-relaxed text-lg">
            <p>
              <span className="text-gold font-display text-2xl">STEPAN PRONIN</span> — российский певец и автор песен,
              чьё творчество объединяет лучшие традиции жанра шансон с современным звучанием.
            </p>
            <p>
              За годы на сцене артист записал десятки композиций, выпустил студийные альбомы и
              провёл сотни живых выступлений. Его песни — это искренние истории о судьбе, верности и дороге.
            </p>
            <p>
              Голос артиста звучит на ведущих площадках страны и в эфирах радиостанций. Каждый концерт —
              это честный разговор со зрителем без масок и компромиссов.
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-px bg-border border border-border">
            {[
              { n: '15+', l: 'лет на сцене' },
              { n: '120', l: 'композиций' },
              { n: '300+', l: 'концертов' },
              { n: '4', l: 'альбома' },
            ].map((s) => (
              <div key={s.l} className="bg-card p-8 text-center">
                <div className="font-display text-4xl gold-text">{s.n}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* MUSIC + PLAYER */}
      <div className="bg-card/30 border-y border-border">
        <Section id="music" eyebrow="Слушать онлайн" title="Музыка">
          <p className="text-muted-foreground -mt-8 mb-10 max-w-xl">
            Выбирайте любимую площадку — ВК Музыка, Яндекс Музыка или Радио Шансон — и слушайте прямо на сайте.
          </p>
          <MusicPlayer />
        </Section>
      </div>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Творчество" title="Проекты">
        <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
          {projects.map((p) => (
            <div key={p.title} className="group bg-card p-8 hover:bg-secondary transition-colors">
              <Icon name={p.icon} size={32} className="text-gold mb-6" />
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{p.year}</div>
              <h3 className="font-display text-2xl uppercase mb-4">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* EVENTS */}
      <div className="bg-card/30 border-y border-border">
        <Section id="events" eyebrow="Афиша" title="События">
          <div className="border border-border divide-y divide-border">
            {events.map((e) => (
              <div key={e.date + e.city} className="grid grid-cols-12 items-center gap-4 px-6 py-6 hover:bg-secondary/50 transition-colors">
                <div className="col-span-3 sm:col-span-2 font-display text-xl text-gold uppercase">{e.date}</div>
                <div className="col-span-9 sm:col-span-3 font-display text-lg uppercase">{e.city}</div>
                <div className="hidden sm:block col-span-4 text-muted-foreground text-sm">{e.place}</div>
                <div className="col-span-12 sm:col-span-3 sm:text-right mt-2 sm:mt-0">
                  <button className={`inline-flex items-center gap-2 px-5 py-2 text-xs uppercase tracking-[0.2em] font-display transition-colors ${
                    e.status === 'Билеты' ? 'bg-primary text-primary-foreground hover:opacity-90' : 'border border-border text-muted-foreground'
                  }`}>
                    {e.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* RUTV */}
      <Section id="rutv" eyebrow="Телеканал РУ.ТВ" title="Афиша РУ.ТВ">
        <div className="grid md:grid-cols-2 gap-6">
          {rutvAfisha.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden border border-border bg-card cursor-pointer"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="relative overflow-hidden aspect-[16/9]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-primary text-primary-foreground text-xs font-display uppercase tracking-[0.2em] px-3 py-1">
                    {item.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <Icon name="ArrowUpRight" size={18} className="text-gold" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-gold text-xs uppercase tracking-[0.25em] font-display">{item.date}</span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-muted-foreground text-xs uppercase tracking-[0.2em]">{item.place}</span>
                </div>
                <h3 className="font-display text-xl uppercase leading-snug mb-2 group-hover:text-gold transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" eyebrow="Кадры" title="Галерея">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY.map((img, i) => (
            <div key={i} className={`relative overflow-hidden group border border-border ${i % 5 === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <img
                src={img}
                alt={`Кадр ${i + 1}`}
                className="w-full h-full object-cover aspect-square grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>
      </Section>

      {/* MEDIA */}
      <div className="bg-card/30 border-t border-border">
        <Section id="media" eyebrow="Пресса и видео" title="Медиа">
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {media.map((m) => (
              <a key={m.title} href="#media" className="group bg-card p-8 hover:bg-secondary transition-colors block">
                <div className="flex items-center justify-between mb-6">
                  <Icon name={m.icon} size={28} className="text-gold" />
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{m.type}</span>
                </div>
                <h3 className="font-display text-xl uppercase mb-3 leading-snug">{m.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {m.source}
                  <Icon name="ArrowUpRight" size={16} className="text-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </Section>
      </div>

      {/* DONAT */}
      <div className="border-t border-border bg-card/20">
        <Section id="support" eyebrow="Поддержка" title="Поддержать артиста">
          <div className="max-w-lg mx-auto">
            <div className="border border-border bg-card overflow-hidden">
              <div className="relative aspect-[16/7] overflow-hidden">
                <img
                  src={PHOTO_LETI}
                  alt="Степан Пронин"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>
              <div className="p-8">
                <h3 className="font-display text-2xl uppercase mb-2">Сообщество</h3>
                <p className="text-muted-foreground text-sm mb-8">Поддержи артиста и получи доступ к эксклюзивным материалам</p>

                {/* Тарифы */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {(['month', 'year'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setDonatPlan(p)}
                      className={`p-4 border text-left transition-all duration-200 ${
                        donatPlan === p
                          ? 'border-gold bg-gold/10'
                          : 'border-border bg-background hover:border-gold/50'
                      }`}
                    >
                      <div className={`text-xs uppercase tracking-[0.2em] mb-1 ${donatPlan === p ? 'text-gold' : 'text-muted-foreground'}`}>
                        {p === 'month' ? 'Месяц' : 'Год'}
                      </div>
                      <div className={`font-display text-2xl ${donatPlan === p ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {p === 'month' ? '150' : '1800'}
                        <span className="text-base ml-1">₽</span>
                      </div>
                      {p === 'year' && (
                        <div className="text-xs text-gold mt-1">−2 месяца в подарок</div>
                      )}
                    </button>
                  ))}
                </div>

                <a
                  href={VK_DONAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gold text-background font-display text-sm uppercase tracking-[0.25em] hover:opacity-90 active:scale-[0.98] transition-all duration-150"
                >
                  <Icon name="Heart" size={16} />
                  Поддержать — {donatPlan === 'month' ? '150 ₽/мес' : '1800 ₽/год'}
                </a>

                <p className="text-xs text-muted-foreground mt-5 leading-relaxed text-center">
                  Деньги списываются раз в 30 или 360 дней. Отменить поддержку можно в любое время.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-border py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="font-display text-2xl tracking-[0.3em] uppercase">
            STEPAN<span className="text-gold"> PRONIN</span>
          </div>
          <div className="flex items-center gap-6">
            {[
              { icon: 'Music2', l: 'ВК' },
              { icon: 'Disc3', l: 'Яндекс' },
              { icon: 'Radio', l: 'Шансон' },
              { icon: 'Youtube', l: 'YouTube' },
              { icon: 'Send', l: 'Telegram' },
            ].map((s) => (
              <button key={s.l} aria-label={s.l} className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold hover:text-gold transition-colors">
                <Icon name={s.icon} size={18} />
              </button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground uppercase tracking-[0.2em]">© 2026 Все права защищены</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;