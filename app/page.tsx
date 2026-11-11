"use client";
import {
  ArrowRight,
  Brand,
  Catalog,
  Coins,
  Compass,
  DemoLabel,
  Footer,
  Gamepad2,
  Gift,
  InviteBanner,
  MissionCard,
  MobileNav,
  Passport,
  PlayButton,
  PlayerChip,
  Sparkles,
  StudioProvider,
  Target,
  Trophy,
  Users,
  games,
  useStudio,
} from "./studio";

function Nexo() {
  const { setPanel, profile, level, progress, openGame } = useStudio();
  return (
    <div className="nexo" id="inicio">
      <header className="nexo-header">
        <Brand mark="link" />
        <nav className="desktop-only" aria-label="Navegação principal">
          <a href="#catalogo" className="active">
            Playground
          </a>
          <button onClick={() => setPanel("missions")}>Missões</button>
          <button onClick={() => setPanel("rewards")}>Recompensas</button>
          <button onClick={() => setPanel("about")}>O clube</button>
        </nav>
        <div className="nexo-header-right">
          <DemoLabel />
          <PlayerChip />
          <MobileNav />
        </div>
      </header>
      <div className="nexo-layout">
        <main>
          <section className="nexo-greeting">
            <div>
              <span className="eyebrow">BEM-VINDO AO SEU PLAYGROUND</span>
              <h1>
                O próximo jogo é só
                <br />o começo<span>↗</span>
              </h1>
              <p>
                Encontre algo que você ama. Descubra algo que ainda não conhece.
              </p>
            </div>
            <div className="nexo-greeting-art">
              <div />
              <Sparkles />
              <span>
                PLAY.
                <br />
                CONNECT.
                <br />
                REPEAT.
              </span>
            </div>
          </section>
          <section className="nexo-feature">
            <img
              src="/images/mpsfighter.png"
              alt="Altair e Estevam em uma arena de MeMePS Fighter, escolha da semana"
            />
            <div className="nexo-feature-copy nexo-feature-copy-art">
              <h2 className="sr-only">MeMePS Fighter</h2>
              <PlayButton game={games[3]}>Entrar na arena</PlayButton>
            </div>
            <div className="nexo-feature-number">
              01<span>COLEÇÃO NEXO</span>
            </div>
          </section>
          <div className="nexo-quick">
            <span>
              <Gamepad2 size={18} />
              <b>Seu último checkpoint</b>
            </span>
            {games.slice(0, 2).map((g) => (
              <button key={g.id} onClick={() => openGame(g)}>
                <img src={`/images/${g.id}.jpg`} alt="" />
                <span>
                  {g.name}
                  <small>Continuar explorando</small>
                </span>
                <ArrowRight size={15} />
              </button>
            ))}
          </div>
          <Catalog heading="Descubra seu próximo jogo" />
          <div className="nexo-mobile-passport">
            <Passport />
          </div>
          <InviteBanner />
          <Footer />
        </main>
        <aside className="nexo-hub">
          <div className="nexo-profile">
            <div className="nexo-profile-top">
              <span className="eyebrow">SEU ESPAÇO</span>
              <button
                onClick={() => setPanel("passport")}
                aria-label="Abrir passaporte"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="nexo-profile-avatar">
              J
              <span>
                <Sparkles size={12} />
              </span>
            </div>
            <h3>
              Olá, Jogador<span>✦</span>
            </h3>
            <p>Explorador de mundos</p>
            <div className="nexo-level">
              <span>Nível {level}</span>
              <b>{progress} / 1.000 XP</b>
            </div>
            <div className="progress-track">
              <span style={{ width: `${progress / 10}%` }} />
            </div>
            <div className="nexo-profile-stats">
              <button onClick={() => setPanel("passport")}>
                <b>{profile.visited.length}</b>
                <span>Mundos</span>
              </button>
              <button onClick={() => setPanel("rewards")}>
                <b>{profile.redeemed.length}</b>
                <span>Recompensas</span>
              </button>
              <button onClick={() => setPanel("passport")}>
                <b>{profile.favorites.length}</b>
                <span>Favoritos</span>
              </button>
            </div>
            <button className="nexo-wallet" onClick={() => setPanel("rewards")}>
              <span>
                <Coins size={20} />
                <span>
                  SEU SALDO<b>{profile.coins.toLocaleString("pt-BR")}</b>
                </span>
              </span>
              <ArrowRight size={17} />
            </button>
          </div>
          <MissionCard />
          <div className="nexo-invite">
            <div className="nexo-invite-avatars">
              <span>J</span>
              <span>+</span>
              <span>?</span>
            </div>
            <h3>Seu duo está por aí.</h3>
            <p>Uma aventura fica ainda melhor com companhia.</p>
            <button className="text-link" onClick={() => setPanel("invite")}>
              Convide e ganhe 250
              <Coins size={13} />
              <ArrowRight size={14} />
            </button>
          </div>
          <div className="nexo-hub-footer">
            <Sparkles size={15} />
            <p>
              Um perfil. Todos os jogos.
              <br />
              Suas conquistas sempre com você.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <StudioProvider brand="nexo">
      <Nexo />
    </StudioProvider>
  );
}
