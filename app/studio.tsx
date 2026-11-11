"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowDownUp,
  ArrowRight,
  Check,
  ChevronRight,
  Coins,
  Compass,
  Copy,
  Gamepad2,
  Gift,
  Heart,
  Menu,
  Monitor,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";

export {
  ArrowDownUp,
  ArrowRight,
  Check,
  ChevronRight,
  Coins,
  Compass,
  Copy,
  Gamepad2,
  Gift,
  Heart,
  Menu,
  Monitor,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  X,
  Zap,
};

export const games = [
  {
    id: "stardew",
    name: "Stardew Valley",
    category: "Farm",
    tag: "Um mundo no seu ritmo",
    description:
      "Cultive sua fazenda, conheça novos amigos e encontre um pouquinho de aventura em cada estação.",
    color: "#b8db84",
    developer: "ConcernedApe",
    steam: "413150",
  },
  {
    id: "spire",
    name: "Slay the Spire",
    category: "Deckbuilder",
    tag: "Só mais uma tentativa",
    description:
      "Construa um baralho único, descubra relíquias e encare os desafios de uma torre em constante mudança.",
    color: "#8eb4ee",
    developer: "Mega Crit",
    steam: "646570",
  },
  {
    id: "shapez",
    name: "shapez 2",
    category: "Tycoon",
    tag: "Pense. Construa. Automatize.",
    description:
      "Transforme pequenas ideias em fábricas imensas e descubra a satisfação de uma máquina funcionando perfeitamente.",
    color: "#c5b3ef",
    developer: "tobspr Games",
    steam: "2162800",
  },
  {
    id: "rusty",
    name: "Rusty’s Retirement",
    category: "Idle",
    tag: "Uma pequena pausa verde",
    description:
      "Uma fazendinha automatizada, um robô simpático e a tranquilidade de ver as coisas crescerem.",
    color: "#e8c589",
    developer: "Mister Morris Games",
    steam: "2666510",
  },
  {
    id: "cookie",
    name: "Cookie Clicker",
    category: "Clicker",
    tag: "Pequenos cliques, grandes planos",
    description:
      "Comece com um biscoito e faça sua produção crescer, um clique e uma melhoria de cada vez.",
    color: "#dfac85",
    developer: "Orteil / DashNet",
    steam: "1454400",
  },
  {
    id: "balatro",
    name: "Balatro",
    category: "Deckbuilder",
    tag: "Jogue suas próprias regras",
    description:
      "Combine cartas, descubra curingas e transforme uma boa mão em uma combinação surpreendente.",
    color: "#e88788",
    developer: "LocalThunk",
    steam: "2379780",
  },
  {
    id: "mega-masmorra",
    name: "Color Knight · Mega Masmorra",
    category: "Idle",
    tag: "O próximo andar espera",
    description:
      "Explore a masmorra em combates automáticos, melhore seus atributos e descubra personagens, pets e artefatos para ir cada vez mais longe.",
    color: "#b8c778",
    developer: "Color Knight",
    url: "https://color-knight.gusesba.com",
  },
  {
    id: "umbra",
    name: "UMBRA · Ecos do Abismo",
    category: "RPG",
    tag: "Escolha quem vai descer",
    description:
      "Escolha entre Guardião, Caçadora e Arcanista, explore masmorras e evolua com equipamentos e habilidades em uma expedição pelo abismo.",
    color: "#83b9d4",
    developer: "UMBRA",
    url: "https://umbra.gusesba.com",
  },
];
export type Game = (typeof games)[number];
export const categories = [
  "Todos",
  "Idle",
  "Clicker",
  "Tycoon",
  "Deckbuilder",
  "Farm",
  "RPG",
];
type Profile = {
  coins: number;
  xp: number;
  favorites: string[];
  visited: string[];
  claimed: string[];
  redeemed: string[];
  invited: boolean;
};
type Panel = "passport" | "missions" | "rewards" | "invite" | "about" | null;
const initial: Profile = {
  coins: 1240,
  xp: 720,
  favorites: [],
  visited: ["stardew", "cookie"],
  claimed: [],
  redeemed: [],
  invited: false,
};
type StudioState = {
  profile: Profile;
  ready: boolean;
  brand: string;
  panel: Panel;
  setPanel: (p: Panel) => void;
  selected: Game | null;
  openGame: (g: Game) => void;
  favorite: (id: string) => void;
  toast: (message: string) => void;
  update: (fn: (p: Profile) => Profile) => void;
  level: number;
  progress: number;
};
const Context = createContext<StudioState | null>(null);
export function useStudio() {
  const context = useContext(Context);
  if (!context) throw new Error("StudioProvider ausente");
  return context;
}

export function StudioProvider({
  brand,
  children,
}: {
  brand: string;
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<Profile>(initial);
  const [ready, setReady] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);
  const [selected, setSelected] = useState<Game | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`studio-${brand}-v1`);
      if (raw) {
        const p = JSON.parse(raw);
        if (
          typeof p.coins === "number" &&
          typeof p.xp === "number" &&
          ["favorites", "visited", "claimed", "redeemed"].every((k) =>
            Array.isArray(p[k]),
          ) &&
          typeof p.invited === "boolean"
        )
          setProfile(p);
      }
    } catch {
      /* A experiência continua quando o armazenamento está indisponível. */
    }
    setReady(true);
  }, [brand]);
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(`studio-${brand}-v1`, JSON.stringify(profile));
      } catch {
        /* A sessão continua em memória. */
      }
    }
  }, [profile, ready, brand]);
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [message]);
  const value: StudioState = {
    profile,
    ready,
    brand,
    panel,
    setPanel,
    selected,
    openGame: setSelected,
    update: setProfile,
    toast: setMessage,
    level: 7 + Math.floor(profile.xp / 1000),
    progress: profile.xp % 1000,
    favorite: (id) =>
      setProfile((p) => ({
        ...p,
        favorites: p.favorites.includes(id)
          ? p.favorites.filter((f) => f !== id)
          : [...p.favorites, id],
      })),
  };
  return (
    <Context.Provider value={value}>
      <div className={`studio-root theme-${brand}`} data-demo-ready={ready}>
        {children}
        <Dialogs closeGame={() => setSelected(null)} />
        {message && (
          <div className="toast" role="status">
            <Check size={18} />
            {message}
          </div>
        )}
      </div>
    </Context.Provider>
  );
}

export function Brand({
  mark = "orbit",
}: {
  mark?: "orbit" | "leaf" | "ticket" | "spark" | "link";
}) {
  const { brand } = useStudio();
  return (
    <a
      className={`brand brand-${mark}`}
      href="#inicio"
      aria-label={`${brand}, início`}
    >
      <span className="brand-mark">
        {mark === "leaf" ? (
          <span>✳</span>
        ) : mark === "ticket" ? (
          <span>f.</span>
        ) : mark === "spark" ? (
          <Sparkles />
        ) : mark === "link" ? (
          <span>n</span>
        ) : (
          <span>ø</span>
        )}
      </span>
      <span>
        {brand}
        <small>PLAY TOGETHER</small>
      </span>
    </a>
  );
}
export function PlayerChip() {
  const { profile, level, setPanel } = useStudio();
  return (
    <div className="player-chip">
      <button
        className="coin-button"
        onClick={() => setPanel("rewards")}
        aria-label={`${profile.coins} moedas, ver recompensas`}
      >
        <Coins size={17} />
        <b>{profile.coins.toLocaleString("pt-BR")}</b>
      </button>
      <button
        className="avatar"
        onClick={() => setPanel("passport")}
        aria-label={`Seu passaporte, nível ${level}`}
      >
        J<span>{level}</span>
      </button>
    </div>
  );
}
export function DemoLabel() {
  return (
    <span className="demo-label">
      <span /> Prévia interativa
    </span>
  );
}
export function Favorite({ game }: { game: Game }) {
  const { profile, favorite } = useStudio();
  const active = profile.favorites.includes(game.id);
  return (
    <button
      className={`favorite ${active ? "is-favorite" : ""}`}
      aria-label={`${active ? "Remover" : "Adicionar"} ${game.name} ${active ? "dos" : "aos"} favoritos`}
      aria-pressed={active}
      onClick={() => favorite(game.id)}
    >
      <Heart size={17} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
export function PlayButton({
  game = games[0],
  children = "Explorar jogo",
  className = "",
}: {
  game?: Game;
  children?: React.ReactNode;
  className?: string;
}) {
  const { openGame } = useStudio();
  return (
    <button
      className={`btn btn-primary ${className}`}
      onClick={() => openGame(game)}
    >
      <Play size={16} fill="currentColor" />
      {children}
      <ArrowRight size={17} />
    </button>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  action = "Ver todos os jogos",
  onAction,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {onAction ? (
        <button className="text-link" onClick={onAction}>
          {action}
          <ArrowRight size={17} />
        </button>
      ) : (
        <a className="text-link" href="#catalogo">
          {action}
          <ArrowRight size={17} />
        </a>
      )}
    </div>
  );
}
export function GameCard({
  game,
  index,
  compact = false,
}: {
  game: Game;
  index?: number;
  compact?: boolean;
}) {
  const { openGame, profile } = useStudio();
  return (
    <article className={`game-card ${compact ? "compact" : ""}`}>
      <div className="game-image">
        <button
          className="image-action"
          onClick={() => openGame(game)}
          aria-label={`Conhecer ${game.name}`}
        >
          <img
            src={`/images/${game.id}.jpg`}
            alt={`Arte de ${game.name}`}
            loading="lazy"
          />
          <span className="image-play">
            <Play size={22} fill="currentColor" />
          </span>
        </button>
        <Favorite game={game} />
        {index !== undefined && (
          <span className="card-index">0{index + 1}</span>
        )}
      </div>
      <div className="game-copy">
        <div className="game-meta">
          <span>{game.category}</span>
          <span>
            <Monitor size={12} /> {game.url ? "Jogo no navegador" : "Referência"}
          </span>
        </div>
        <button className="game-title" onClick={() => openGame(game)}>
          {game.name}
          <ArrowRight size={17} />
        </button>
        <p>{game.tag}</p>
        {profile.visited.includes(game.id) && (
          <span className="played-indicator">
            <Check size={12} /> No seu passaporte
          </span>
        )}
      </div>
    </article>
  );
}

export function Catalog({
  heading = "Encontre seu próximo favorito",
  style = "",
  numbered = false,
}: {
  heading?: string;
  style?: string;
  numbered?: boolean;
}) {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(false);
  const [sort, setSort] = useState("featured");
  const { profile } = useStudio();
  const filtered = games
    .filter(
      (g) =>
        (category === "Todos" || g.category === category) &&
        (!favorites || profile.favorites.includes(g.id)) &&
        g.name
          .toLocaleLowerCase("pt-BR")
          .includes(search.toLocaleLowerCase("pt-BR")),
    )
    .sort((a, b) => (sort === "az" ? a.name.localeCompare(b.name) : 0));
  return (
    <section id="catalogo" className={`catalog-section ${style}`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">PEQUENOS MUNDOS. GRANDES DESCOBERTAS.</p>
          <h2>
            {heading}
            <span className="count">{String(games.length).padStart(2, "0")}</span>
          </h2>
        </div>
        <label className="search-box">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar um jogo..."
            aria-label="Buscar um jogo"
          />
        </label>
      </div>
      <div className="catalog-controls">
        <div className="filters" aria-label="Filtrar por gênero">
          {categories.map((c) => (
            <button
              key={c}
              className={category === c && !favorites ? "active" : ""}
              onClick={() => {
                setCategory(c);
                setFavorites(false);
              }}
              aria-pressed={category === c && !favorites}
            >
              {c}
            </button>
          ))}
          <button
            className={favorites ? "active" : ""}
            onClick={() => setFavorites(!favorites)}
            aria-pressed={favorites}
          >
            <Heart size={14} /> Favoritos
          </button>
        </div>
        <label className="sort-control">
          <ArrowDownUp size={14} />
          <select
            aria-label="Ordenar jogos"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Em destaque</option>
            <option value="az">Nome: A–Z</option>
          </select>
        </label>
      </div>
      <div className="games-grid grid grid-cols-2 min-[761px]:grid-cols-3">
        {filtered.map((g, i) => (
          <GameCard key={g.id} game={g} index={numbered ? i : undefined} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={28} />
          <h3>Nenhum jogo por aqui ainda.</h3>
          <p>Tente outro nome ou descubra os outros gêneros.</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearch("");
              setCategory("Todos");
              setFavorites(false);
            }}
          >
            Mostrar todos os jogos
          </button>
        </div>
      )}
      <p className="catalog-note">
        {filtered.length} de {games.length} jogos no catálogo · Artes
        ilustrativas para esta proposta
      </p>
    </section>
  );
}

export function Passport({ variant = "" }: { variant?: string }) {
  const { profile, level, progress, setPanel } = useStudio();
  return (
    <section className={`passport-card ${variant}`}>
      <div className="passport-top">
        <span className="eyebrow">
          <Sparkles size={14} /> SEU UNIVERSO, CONECTADO
        </span>
        <span className="mini-label">PASSE GLOBAL</span>
      </div>
      <div className="passport-body">
        <div className="level-emblem">
          <span>NÍVEL</span>
          <strong>{level}</strong>
          <Star size={15} />
        </div>
        <div className="passport-info">
          <h3>Um jogador. Muitos mundos.</h3>
          <p>Cada descoberta faz parte da sua jornada.</p>
          <div className="xp-meta">
            <span>Explorador de mundos</span>
            <b>{progress} / 1.000 XP</b>
          </div>
          <div className="progress-track">
            <span style={{ width: `${progress / 10}%` }} />
          </div>
        </div>
        <button
          className="btn btn-secondary"
          onClick={() => setPanel("passport")}
        >
          Meu passaporte
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="passport-stats">
        <button onClick={() => setPanel("rewards")}>
          <Coins size={17} />
          <b>{profile.coins.toLocaleString("pt-BR")}</b>
          <span>moedas globais</span>
        </button>
        <button onClick={() => setPanel("passport")}>
          <Trophy size={17} />
          <b>{profile.visited.length}</b>
          <span>mundos descobertos</span>
        </button>
        <button onClick={() => setPanel("invite")}>
          <Users size={17} />
          <span>Convide um amigo</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
export function MissionCard() {
  const { profile, setPanel } = useStudio();
  return (
    <div className="mission-card">
      <div className="mission-icon">
        <Compass size={23} />
      </div>
      <span className="eyebrow">MISSÃO DA SEMANA</span>
      <h3>Saia da sua órbita.</h3>
      <p>Experimente 3 jogos diferentes e descubra seu próximo favorito.</p>
      <div className="mission-progress">
        <div className="progress-track">
          <span
            style={{
              width: `${Math.min(100, (profile.visited.length / 3) * 100)}%`,
            }}
          />
        </div>
        <b>{Math.min(3, profile.visited.length)}/3</b>
      </div>
      <button className="text-link" onClick={() => setPanel("missions")}>
        <Coins size={15} /> +200 moedas <ArrowRight size={16} />
      </button>
    </div>
  );
}
export function InviteBanner() {
  const { setPanel } = useStudio();
  return (
    <section className="invite-banner">
      <div className="invite-art">
        <Users size={34} />
        <span>+250</span>
      </div>
      <div>
        <p className="eyebrow">BOM MESMO É JOGAR JUNTO</p>
        <h3>Seu próximo parceiro de aventura vale ouro.</h3>
        <p>
          Convide um amigo. Quando ele começar, vocês dois ganham 250 moedas.
        </p>
      </div>
      <button className="btn btn-secondary" onClick={() => setPanel("invite")}>
        Convidar amigos
        <ArrowRight size={16} />
      </button>
    </section>
  );
}
export function Footer() {
  const { brand, setPanel } = useStudio();
  return (
    <footer>
      <div>
        <b>
          {brand}
          <span>®</span>
        </b>
        <p>Pequenos jogos. Possibilidades infinitas.</p>
      </div>
      <nav aria-label="Rodapé">
        <a href="#catalogo">Jogos</a>
        <button onClick={() => setPanel("about")}>O estúdio</button>
        <button onClick={() => setPanel("passport")}>Seu passaporte</button>
        <button onClick={() => setPanel("about")}>Créditos das imagens</button>
      </nav>
      <small>
        Proposta de interface · Jogos e artes de terceiros usados como
        referência visual.
      </small>
    </footer>
  );
}
export function MobileNav() {
  const { setPanel } = useStudio();
  const [open, setOpen] = useState(false);
  return (
    <div className="mobile-menu">
      <button
        className="icon-button"
        aria-label="Abrir menu"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav data-open={open} aria-hidden={!open} inert={!open}>
        <a href="#catalogo" onClick={() => setOpen(false)}>
          Explorar jogos
        </a>
        {(["passport", "missions", "rewards", "invite"] as const).map(
          (p, i) => (
            <button
              key={p}
              onClick={() => {
                setPanel(p);
                setOpen(false);
              }}
            >
              {
                ["Meu passaporte", "Missões", "Recompensas", "Convidar amigos"][
                  i
                ]
              }
            </button>
          ),
        )}
      </nav>
    </div>
  );
}

function Dialogs({ closeGame }: { closeGame: () => void }) {
  const {
    panel,
    selected,
    setPanel,
    brand,
    profile,
    update,
    toast,
    level,
    progress,
  } = useStudio();
  const dialog = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const [copied, setCopied] = useState(false);
  const [inviteUrl, setInviteUrl] = useState("");
  const open = Boolean(panel || selected);
  useEffect(() => {
    if (open) {
      if (!dialog.current?.open) dialog.current?.showModal();
    } else dialog.current?.close();
  }, [open]);
  useEffect(() => {
    if (open) {
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    }
  }, [open]);
  useEffect(() => {
    setInviteUrl(`${window.location.origin}/?convite=jogador07`);
  }, []);
  const close = () => {
    const element = dialog.current;
    if (!element?.open || closing.current) return;
    closing.current = true;
    element.setAttribute("data-closing", "");
    Promise.allSettled(element.getAnimations().map((animation) => animation.finished))
      .then(() => {
        element.close();
        element.removeAttribute("data-closing");
        closing.current = false;
        closeGame();
        setPanel(null);
        setCopied(false);
      });
  };
  const claim = (id: string, coins: number, xp: number) => {
    update((p) =>
      p.claimed.includes(id)
        ? p
        : {
            ...p,
            coins: p.coins + coins,
            xp: p.xp + xp,
            claimed: [...p.claimed, id],
          },
    );
    toast(`Recompensa resgatada: +${coins} moedas`);
  };
  const titles = {
    passport: "Seu passaporte de mundos",
    missions: "Toda descoberta conta.",
    rewards: "Pequenas vitórias, boas recompensas.",
    invite: "A próxima aventura é em dupla.",
    about: `Prazer, ${brand}.`,
  };
  const rewards = [
    {
      id: "badge",
      name: "Insígnia Explorador",
      detail: "Um novo detalhe para o seu passaporte.",
      cost: 300,
      icon: <Compass />,
    },
    {
      id: "avatar",
      name: "Avatar Estelar",
      detail: "Um visual cósmico para o seu perfil.",
      cost: 500,
      icon: <Star />,
    },
    {
      id: "frame",
      name: "Moldura Lendária",
      detail: "Uma moldura especial para sua coleção.",
      cost: 900,
      icon: <ShieldCheck />,
    },
  ];
  return (
    <dialog
      aria-label={selected ? selected.name : panel ? titles[panel] : "Detalhes"}
      className="studio-dialog"
      ref={dialog}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) close();
      }}
    >
      <button
        className="dialog-close icon-button"
        onClick={close}
        aria-label="Fechar janela"
      >
        <X />
      </button>
      {selected ? (
        <div className="game-detail">
          <img
            className="detail-art"
            src={`/images/${selected.id}-hero.jpg`}
            alt={`Arte de ${selected.name}`}
          />
          <div className="dialog-content">
            <p className="eyebrow">
              {selected.category} · {selected.url ? "JOGO NO NAVEGADOR" : "JOGO DE REFERÊNCIA"}
            </p>
            <h2>{selected.name}</h2>
            <p>{selected.description}</p>
            <div className="detail-credit">
              {selected.url
                ? "Imagem capturada diretamente no site do jogo."
                : `Criado por ${selected.developer}. Arte utilizada como placeholder.`}
            </div>
            <div className="demo-explainer">
              <Sparkles size={19} />
              <p>
                Esta é uma demonstração do catálogo. Simule uma primeira partida
                para descobrir como o jogo contribui para seu passaporte global.
              </p>
            </div>
            <div className="detail-actions">
              <button
                className="btn btn-primary"
                disabled={profile.visited.includes(selected.id)}
                onClick={() => {
                  update((p) =>
                    p.visited.includes(selected.id)
                      ? p
                      : {
                          ...p,
                          xp: p.xp + 80,
                          visited: [...p.visited, selected.id],
                        },
                  );
                  toast("Novo mundo descoberto! +80 XP no passaporte.");
                }}
              >
                {profile.visited.includes(selected.id) ? (
                  <>
                    <Check size={17} /> Já descoberto
                  </>
                ) : (
                  <>
                    <Play size={17} /> Simular primeira partida · +80 XP
                  </>
                )}
              </button>
              <a
                className="text-link"
                href={selected.url || `https://store.steampowered.com/app/${selected.steam}/`}
                target="_blank"
                rel="noreferrer"
              >
                {selected.url ? "Jogar agora" : "Conhecer o jogo real"}
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      ) : (
        panel && (
          <div className="dialog-content">
            <p className="eyebrow">{brand} · UM UNIVERSO COMPARTILHADO</p>
            <h2>{titles[panel]}</h2>
            {panel === "passport" && (
              <>
                <div className="profile-summary">
                  <div className="level-emblem">
                    <span>NÍVEL</span>
                    <strong>{level}</strong>
                    <Star size={15} />
                  </div>
                  <div>
                    <h3>Olá, Jogador.</h3>
                    <p>
                      {profile.visited.length} mundos descobertos ·{" "}
                      {profile.coins.toLocaleString("pt-BR")} moedas
                    </p>
                    <div className="progress-track">
                      <span style={{ width: `${progress / 10}%` }} />
                    </div>
                    <small>
                      {progress} / 1.000 XP para o nível {level + 1}
                    </small>
                  </div>
                </div>
                <h3 className="dialog-subtitle">Suas conquistas</h3>
                <div className="achievement-grid">
                  <div className="achievement earned">
                    <Gamepad2 />
                    <b>Primeiro mundo</b>
                    <span>Comece sua jornada</span>
                    <Check size={14} />
                  </div>
                  <div
                    className={`achievement ${profile.visited.length >= 3 ? "earned" : ""}`}
                  >
                    <Compass />
                    <b>Além do horizonte</b>
                    <span>
                      Descubra 3 jogos · {Math.min(3, profile.visited.length)}/3
                    </span>
                  </div>
                  <div
                    className={`achievement ${profile.favorites.length >= 2 ? "earned" : ""}`}
                  >
                    <Heart />
                    <b>Boas escolhas</b>
                    <span>
                      Favorite 2 jogos · {Math.min(2, profile.favorites.length)}
                      /2
                    </span>
                  </div>
                </div>
                {profile.redeemed.length > 0 && (
                  <>
                    <h3 className="dialog-subtitle">Sua coleção</h3>
                    <div className="collection">
                      {rewards
                        .filter((r) => profile.redeemed.includes(r.id))
                        .map((r) => (
                          <span key={r.id}>
                            {r.icon}
                            {r.name}
                          </span>
                        ))}
                    </div>
                  </>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => setPanel("missions")}
                >
                  Explorar missões
                  <ArrowRight size={16} />
                </button>
              </>
            )}
            {panel === "missions" && (
              <>
                <p>
                  Explore novos gêneros e leve suas conquistas de um jogo para o
                  outro.
                </p>
                {[
                  {
                    id: "explore",
                    title: "Além do seu mundo",
                    text: "Descubra 3 jogos diferentes.",
                    current: profile.visited.length,
                    total: 3,
                    coins: 200,
                    xp: 100,
                  },
                  {
                    id: "favorite",
                    title: "Uma coleção com a sua cara",
                    text: "Adicione 2 jogos aos favoritos.",
                    current: profile.favorites.length,
                    total: 2,
                    coins: 100,
                    xp: 50,
                  },
                  {
                    id: "daily",
                    title: "Que bom te ver por aqui",
                    text: "Resgate o bônus de boas-vindas desta demonstração.",
                    current: 1,
                    total: 1,
                    coins: 50,
                    xp: 30,
                  },
                ].map((m) => (
                  <div className="mission-row" key={m.id}>
                    <div>
                      <h3>{m.title}</h3>
                      <p>{m.text}</p>
                      <small>
                        {Math.min(m.current, m.total)}/{m.total} · +{m.coins}{" "}
                        moedas · +{m.xp} XP
                      </small>
                    </div>
                    <button
                      className="btn btn-secondary"
                      disabled={
                        m.current < m.total || profile.claimed.includes(m.id)
                      }
                      onClick={() => claim(m.id, m.coins, m.xp)}
                    >
                      {profile.claimed.includes(m.id)
                        ? "Resgatado ✓"
                        : m.current < m.total
                          ? "Em progresso"
                          : "Resgatar"}
                    </button>
                  </div>
                ))}
              </>
            )}
            {panel === "rewards" && (
              <>
                <p>
                  Uma moeda para todo o seu universo. Personalize seu perfil com
                  o que você conquista jogando.
                </p>
                <div className="wallet">
                  <Coins />
                  <span>SEU SALDO</span>
                  <strong>{profile.coins.toLocaleString("pt-BR")}</strong>
                  <small>moedas globais</small>
                </div>
                {rewards.map((r) => (
                  <div className="reward-row" key={r.id}>
                    <div className="reward-icon">{r.icon}</div>
                    <div>
                      <h3>{r.name}</h3>
                      <p>{r.detail}</p>
                    </div>
                    <button
                      className="btn btn-secondary"
                      disabled={
                        profile.redeemed.includes(r.id) ||
                        profile.coins < r.cost
                      }
                      onClick={() => {
                        update((p) =>
                          p.redeemed.includes(r.id) || p.coins < r.cost
                            ? p
                            : {
                                ...p,
                                coins: p.coins - r.cost,
                                redeemed: [...p.redeemed, r.id],
                              },
                        );
                        toast(`${r.name} adicionada à sua coleção!`);
                      }}
                    >
                      {profile.redeemed.includes(r.id) ? (
                        <>
                          <Check size={15} /> Na coleção
                        </>
                      ) : (
                        <>
                          <Coins size={15} />
                          {r.cost}
                        </>
                      )}
                    </button>
                  </div>
                ))}
                <p className="fine-print">
                  Recompensas visuais demonstrativas, sem valor monetário.
                </p>
              </>
            )}
            {panel === "invite" && (
              <>
                <div className="invite-dialog-art">
                  <Users size={45} />
                  <span>+250 para cada um</span>
                </div>
                <p>
                  Compartilhe seu convite. Quando um amigo entrar e descobrir
                  seu primeiro jogo, vocês dois recebem 250 moedas globais.
                </p>
                <div className="copy-link">
                  <input
                    aria-label="Seu link de convite demonstrativo"
                    readOnly
                    value={inviteUrl}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(inviteUrl);
                        setCopied(true);
                        toast("Link demonstrativo copiado!");
                      } catch {
                        toast("Selecione e copie o link no campo acima.");
                      }
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
                    {copied ? "Copiado" : "Copiar"}
                  </button>
                </div>
                <div className="demo-explainer">
                  <Sparkles size={20} />
                  <p>
                    Convite demonstrativo. Use o botão abaixo para simular a
                    entrada de um amigo e testar a recompensa.
                  </p>
                </div>
                <button
                  className="btn btn-secondary"
                  disabled={profile.invited}
                  onClick={() => {
                    update((p) =>
                      p.invited
                        ? p
                        : { ...p, coins: p.coins + 250, invited: true },
                    );
                    toast("Convite simulado com sucesso! +250 moedas.");
                  }}
                >
                  {profile.invited ? (
                    <>
                      <Check size={16} /> Amigo convidado · bônus recebido
                    </>
                  ) : (
                    "Simular amigo aceitando o convite"
                  )}
                </button>
              </>
            )}
            {panel === "about" && (
              <>
                <p>
                  Um estúdio independente entre amigos, criando pequenos mundos
                  para grandes momentos de diversão.
                </p>
                <p>
                  Esta proposta explora um catálogo conectado: um perfil, um
                  nível e recompensas que acompanham o jogador entre diferentes
                  jogos.
                </p>
                <div className="demo-explainer">
                  <Sparkles size={20} />
                  <p>
                    Protótipo de UI/UX. O progresso é salvo apenas neste
                    navegador. Catálogo, moedas, partidas e convites são
                    demonstrativos; não há integração com os jogos de
                    referência.
                  </p>
                </div>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    update(() => ({
                      ...initial,
                      favorites: [],
                      visited: [...initial.visited],
                      claimed: [],
                      redeemed: [],
                    }));
                    toast("Demonstração reiniciada.");
                  }}
                >
                  Reiniciar demonstração
                </button>
                <h3 className="dialog-subtitle">
                  Créditos das referências visuais
                </h3>
                <ul className="credits">
                  {games.map((g) => (
                    <li key={g.id}>
                      <a
                        href={g.url || `https://store.steampowered.com/app/${g.steam}/`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {g.name}
                        <ArrowRight size={13} />
                      </a>
                      <span>{g.developer}</span>
                    </li>
                  ))}
                </ul>
                <p className="fine-print">
                  Imagens da loja Steam e capturas do site do jogo. Os direitos pertencem aos respectivos
                  criadores. Nenhum desses jogos pertence ao estúdio proposto.
                </p>
              </>
            )}
          </div>
        )
      )}
    </dialog>
  );
}
