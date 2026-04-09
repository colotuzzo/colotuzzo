"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang = "en" | "es" | "it";

interface Content {
  heroSubtitle: string;
  welcome: string;
  originsTitle: string;
  originsBody: string;
  geographyTitle: string;
  geographyBody: string;
  purposeTitle: string;
  purposeBody: string;
  variationsTitle: string;
  variationsBody: string;
  contactTitle: string;
  contactHelper: string;
  contactFields: {
    name: string;
    country: string;
    city: string;
    email: string;
    surname: string;
    message: string;
    submit: string;
  };
  emailNoteTitle: string;
  emailNoteBody: string;
  personalNoteTitle: string;
  personalNoteBody: string;
  footerTagline: string;
  sending: string;
  sent: string;
  error: string;
}

// ─── Translations ─────────────────────────────────────────────────────────────

const content: Record<Lang, Content> = {
  en: {
    heroSubtitle:
      "A small digital home for Colotuzzos, Collatuzzos, and related family branches around the world.",
    welcome:
      "This place was created as a quiet point of connection — for people who carry the surname Colotuzzo, for relatives, and for those who share a bond with its roots. If you carry the name, share a related variation, or simply feel drawn to this corner of family history, you are welcome here.",
    originsTitle: "Where the name comes from",
    originsBody:
      "The surname Colotuzzo is believed to derive from an earlier form, Collatuzzo — a name whose precise origins remain part of family tradition rather than fully documented history. What we know with some confidence points toward northern Italy: the Veneto region, the province of Treviso, and in particular the town of Pieve di Soligo. There is also a possible, though uncertain, earlier geographic link to the locality of Collalto, in the same broader area — a thread worth holding gently, and following with care.",
    geographyTitle: "A small corner of northern Italy",
    geographyBody:
      "The story of the Colotuzzo surname seems to live within a small and beautiful part of northeastern Italy — the hills and valleys of the Veneto, between Treviso and the Dolomites. Pieve di Soligo sits at the heart of this landscape. Collalto rises nearby. It is a quiet, historically layered part of Italy, and it appears to be where the name first took root.",
    purposeTitle: "Why this site exists",
    purposeBody:
      "This site was created for a simple reason: to offer a small point of connection for Colotuzzos, Collatuzzos, and related family branches wherever they may be. To preserve a sense of shared memory and place. To make it possible for people who carry this name — or a variation of it — to find each other, or at least to know that this corner exists.\n\nThis website has no commercial purpose and does not pursue any commercial objective of any kind. It is a personal and family initiative, nothing more.",
    variationsTitle: "Surname variations and related branches",
    variationsBody:
      "Surnames change across generations, borders, and documents. A name recorded one way in one village might appear differently a generation later or in another country. This site also welcomes people who carry surname variations or related branches connected to the earlier form Collatuzzo — whether through spelling shifts, regional differences, or the natural drift of family names across time and place.",
    contactTitle:
      "Are you a Colotuzzo, a Collatuzzo, or part of a related branch?",
    contactHelper:
      "If you carry the surname, share a related variation, know something about the family's roots, or would simply like to connect, you are warmly welcome to write.",
    contactFields: {
      name: "Name",
      country: "Country",
      city: "City",
      email: "Email address",
      surname: "Surname or variation",
      message: "Your message",
      submit: "Send message",
    },
    emailNoteTitle: "A family email",
    emailNoteBody:
      "Over time, it may become possible to offer personal email addresses under the @colotuzzo.com domain — for family members, related branches, or people with a meaningful connection to the name. If this is something you would be interested in, feel free to mention it when you write.",
    personalNoteTitle: "A note from Uruguay",
    personalNoteBody:
      "I am writing from Uruguay, where I was born and where I live. As far as I know, we may be only around 20 to 30 Colotuzzos in total — scattered across a few countries, connected by a name whose origins we are still piecing together. That smallness is also part of why this page exists.",
    footerTagline: "Created as a personal family initiative",
    sending: "Sending…",
    sent: "Message sent. Thank you.",
    error: "Something went wrong. Please try again.",
  },
  es: {
    heroSubtitle:
      "Un pequeño hogar digital para los Colotuzzo, Collatuzzo y ramas familiares relacionadas en todo el mundo.",
    welcome:
      "Este lugar fue creado como un punto de encuentro tranquilo — para quienes llevan el apellido Colotuzzo, para parientes, y para quienes comparten un vínculo con sus raíces. Si llevas el apellido, compartes una variación relacionada, o simplemente te sentís atraído por este rincón de historia familiar, sos bienvenido.",
    originsTitle: "El origen del apellido",
    originsBody:
      "Se cree que el apellido Colotuzzo deriva de una forma anterior, Collatuzzo — un nombre cuyo origen preciso pertenece más a la tradición familiar que a la historia documentada. Lo que sabemos con cierta certeza apunta al norte de Italia: la región del Véneto, la provincia de Treviso, y en particular la localidad de Pieve di Soligo. Existe también un posible vínculo geográfico anterior con Collalto, en la misma zona más amplia — un hilo que vale la pena seguir con cuidado y mente abierta.",
    geographyTitle: "Un pequeño rincón del norte de Italia",
    geographyBody:
      "La historia del apellido Colotuzzo parece vivir en una pequeña y hermosa parte del noreste de Italia — las colinas y valles del Véneto, entre Treviso y los Dolomitas. Pieve di Soligo está en el corazón de ese paisaje. Collalto se eleva cerca. Es una parte tranquila e históricamente rica de Italia, y parece ser donde el apellido echó raíces por primera vez.",
    purposeTitle: "Por qué existe este sitio",
    purposeBody:
      "Este sitio fue creado por una razón sencilla: ofrecer un pequeño punto de conexión para los Colotuzzo, Collatuzzo y ramas familiares relacionadas donde sea que estén. Para preservar un sentido de memoria y lugar compartidos. Para hacer posible que quienes llevan este apellido — o una variación — puedan encontrarse, o al menos saber que este rincón existe.\n\nEste sitio web no tiene ningún propósito comercial ni persigue ningún objetivo comercial de ningún tipo. Es una iniciativa personal y familiar, nada más.",
    variationsTitle: "Variaciones del apellido y ramas relacionadas",
    variationsBody:
      "Los apellidos cambian a través de generaciones, fronteras y documentos. Un nombre registrado de una manera en un pueblo puede aparecer de forma diferente una generación después o en otro país. Este sitio también da la bienvenida a quienes llevan variaciones del apellido o ramas relacionadas vinculadas a la forma anterior Collatuzzo — ya sea por cambios ortográficos, diferencias regionales, o la deriva natural de los apellidos a través del tiempo y el espacio.",
    contactTitle:
      "¿Sos Colotuzzo, Collatuzzo, o parte de una rama relacionada?",
    contactHelper:
      "Si llevas el apellido, compartís una variación relacionada, sabés algo sobre las raíces de la familia, o simplemente querés conectarte, sos bienvenido a escribir.",
    contactFields: {
      name: "Nombre",
      country: "País",
      city: "Ciudad",
      email: "Correo electrónico",
      surname: "Apellido o variación",
      message: "Tu mensaje",
      submit: "Enviar mensaje",
    },
    emailNoteTitle: "Un email familiar",
    emailNoteBody:
      "Con el tiempo, podría ser posible ofrecer direcciones de correo personales bajo el dominio @colotuzzo.com — para miembros de la familia, ramas relacionadas, o personas con un vínculo significativo con el apellido. Si esto te interesa, no dudes en mencionarlo cuando escribas.",
    personalNoteTitle: "Una nota desde Uruguay",
    personalNoteBody:
      "Escribo desde Uruguay, donde nací y donde vivo. Hasta donde sé, quizás seamos alrededor de 20 o 30 Colotuzzo en total — dispersos por algunos países, conectados por un apellido cuyo origen todavía estamos tratando de entender. Esa pequeñez también es parte de por qué existe esta página.",
    footerTagline: "Creado como una iniciativa personal y familiar",
    sending: "Enviando…",
    sent: "Mensaje enviado. Gracias.",
    error: "Algo salió mal. Por favor, intentá de nuevo.",
  },
  it: {
    heroSubtitle:
      "Una piccola casa digitale per i Colotuzzo, i Collatuzzo e i rami familiari correlati nel mondo.",
    welcome:
      "Questo luogo è stato creato come un punto di connessione tranquillo — per chi porta il cognome Colotuzzo, per i parenti, e per chi condivide un legame con le sue radici. Se porti il cognome, condividi una variante correlata, o ti senti semplicemente attratto da questo angolo di storia familiare, sei il benvenuto.",
    originsTitle: "Le origini del cognome",
    originsBody:
      "Si ritiene che il cognome Colotuzzo derivi da una forma più antica, Collatuzzo — un nome le cui origini precise appartengono più alla tradizione familiare che alla storia documentata. Quel che sappiamo con una certa certezza indica il nord Italia: la regione del Veneto, la provincia di Treviso, e in particolare la località di Pieve di Soligo. Esiste anche un possibile collegamento geografico precedente con Collalto, nella stessa area più ampia — un filo che vale la pena seguire con cura e mente aperta.",
    geographyTitle: "Un piccolo angolo del nord Italia",
    geographyBody:
      "La storia del cognome Colotuzzo sembra vivere in una piccola e bella parte del nord-est italiano — le colline e le vallate del Veneto, tra Treviso e le Dolomiti. Pieve di Soligo si trova al cuore di questo paesaggio. Collalto si eleva nelle vicinanze. È una parte tranquilla e storicamente ricca dell'Italia, e sembra essere il luogo in cui il nome ha messo radici per la prima volta.",
    purposeTitle: "Perché esiste questo sito",
    purposeBody:
      "Questo sito è stato creato per una ragione semplice: offrire un piccolo punto di connessione per i Colotuzzo, i Collatuzzo e i rami familiari correlati ovunque si trovino. Per preservare un senso di memoria e luogo condivisi. Per rendere possibile che le persone che portano questo cognome — o una sua variante — possano incontrarsi, o almeno sapere che questo angolo esiste.\n\nQuesto sito non ha alcuno scopo commerciale e non persegue alcun obiettivo commerciale di alcun tipo. È un'iniziativa personale e familiare, niente di più.",
    variationsTitle: "Varianti del cognome e rami correlati",
    variationsBody:
      "I cognomi cambiano attraverso generazioni, confini e documenti. Un nome registrato in un modo in un paese potrebbe apparire diversamente una generazione dopo o in un altro paese. Questo sito accoglie anche persone che portano varianti del cognome o rami correlati legati alla forma più antica Collatuzzo — che si tratti di cambiamenti ortografici, differenze regionali, o la naturale deriva dei cognomi attraverso il tempo e lo spazio.",
    contactTitle:
      "Sei un Colotuzzo, un Collatuzzo, o parte di un ramo correlato?",
    contactHelper:
      "Se porti il cognome, condividi una variante correlata, sai qualcosa sulle radici della famiglia, o vorresti semplicemente connetterti, sei caldamente benvenuto a scrivere.",
    contactFields: {
      name: "Nome",
      country: "Paese",
      city: "Città",
      email: "Indirizzo email",
      surname: "Cognome o variante",
      message: "Il tuo messaggio",
      submit: "Invia messaggio",
    },
    emailNoteTitle: "Una email di famiglia",
    emailNoteBody:
      "Con il tempo, potrebbe diventare possibile offrire indirizzi email personali sotto il dominio @colotuzzo.com — per i membri della famiglia, i rami correlati, o le persone con un legame significativo con il cognome. Se questo è qualcosa che ti interesserebbe, sentiti libero di menzionarlo quando scrivi.",
    personalNoteTitle: "Una nota dall'Uruguay",
    personalNoteBody:
      "Scrivo dall'Uruguay, dove sono nato e dove vivo. Per quanto ne so, potremmo essere solo una ventina o trentina di Colotuzzo in tutto — sparsi in alcuni paesi, uniti da un cognome le cui origini stiamo ancora cercando di ricostruire. Questa piccolezza è anche parte del motivo per cui esiste questa pagina.",
    footerTagline: "Creato come un'iniziativa personale e familiare",
    sending: "Invio in corso…",
    sent: "Messaggio inviato. Grazie.",
    error: "Qualcosa è andato storto. Riprova.",
  },
};

// ─── Fade-in hook ─────────────────────────────────────────────────────────────

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── FadeSection component ────────────────────────────────────────────────────

function FadeSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = content[lang];

  const [form, setForm] = useState({
    name: "",
    country: "",
    city: "",
    email: "",
    surname: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({
          name: "",
          country: "",
          city: "",
          email: "",
          surname: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main
      style={{ backgroundColor: "#FAF9F6", color: "#2C1810" }}
      className="min-h-screen"
    >
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 md:px-12"
        style={{
          backgroundColor: "rgba(250, 249, 246, 0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #E8E0D4",
        }}
      >
        <span
          className="text-xl tracking-wide"
          style={{
            fontFamily: "var(--font-playfair)",
            color: "#2C1810",
            letterSpacing: "0.05em",
          }}
        >
          Colotuzzo
        </span>
        <div className="flex gap-1">
          {(["en", "es", "it"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="px-3 py-1 text-sm uppercase tracking-widest transition-all duration-200"
              style={{
                fontFamily: "var(--font-inter)",
                color: lang === l ? "#2C1810" : "#8B7355",
                borderBottom:
                  lang === l ? "1px solid #2C1810" : "1px solid transparent",
                background: "none",
                cursor: "pointer",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
              }}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center"
        style={{ backgroundColor: "#FAF9F6" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=1800&q=80&fit=crop"
          alt="Veneto hills landscape"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <div style={{ opacity: 1, animation: "fadeInUp 1s ease 0.1s both" }}>
            <h1
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                fontWeight: 400,
                color: "#2C1810",
                letterSpacing: "-0.01em",
                lineHeight: 1.05,
              }}
            >
              Colotuzzo
            </h1>
          </div>
          <div style={{ opacity: 1, animation: "fadeInUp 1s ease 0.4s both" }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                color: "#8B7355",
                fontWeight: 300,
                letterSpacing: "0.02em",
                maxWidth: "520px",
              }}
            >
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{ opacity: 1, animation: "fadeInUp 1s ease 0.8s both" }}
          aria-hidden="true"
        >
          <div
            style={{
              width: "1px",
              height: "48px",
              backgroundColor: "#8B7355",
              margin: "0 auto",
              opacity: 0.5,
            }}
          />
        </div>
      </section>

      {/* ── Welcome ────────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32 max-w-2xl mx-auto text-center">
        <FadeSection>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              lineHeight: 1.85,
              color: "#4A3728",
              fontWeight: 300,
            }}
          >
            {t.welcome}
          </p>
        </FadeSection>
      </section>

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div
        className="max-w-xs mx-auto"
        style={{ height: "1px", backgroundColor: "#E0D5C5" }}
        aria-hidden="true"
      />

      {/* ── Origins ────────────────────────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:py-32 max-w-2xl mx-auto"
        style={{ backgroundColor: "#FAF9F6" }}
      >
        <FadeSection>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 400,
              color: "#2C1810",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            {t.originsTitle}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              lineHeight: 1.9,
              color: "#4A3728",
              fontWeight: 300,
            }}
          >
            {t.originsBody}
          </p>
        </FadeSection>
      </section>

      {/* ── Geography ──────────────────────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: "#F5F0E8" }}
      >
        <div className="max-w-4xl mx-auto">
          <FadeSection>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 400,
                color: "#2C1810",
                marginBottom: "1.5rem",
                letterSpacing: "-0.01em",
              }}
            >
              {t.geographyTitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                lineHeight: 1.9,
                color: "#4A3728",
                fontWeight: 300,
                maxWidth: "560px",
                marginBottom: "2.5rem",
              }}
            >
              {t.geographyBody}
            </p>
          </FadeSection>

          <FadeSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Map: Veneto / Pieve di Soligo */}
              <div>
                <div
                  style={{
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: "1px solid #D4C4A8",
                  }}
                >
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=11.5,45.6,12.8,46.4&layer=mapnik&marker=46.0167,12.1833"
                    style={{
                      border: 0,
                      width: "100%",
                      height: "320px",
                      borderRadius: "2px",
                      display: "block",
                    }}
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                    title="Map of Veneto — Pieve di Soligo and Collalto"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    color: "#8B7355",
                    marginTop: "0.6rem",
                    letterSpacing: "0.04em",
                    textAlign: "center",
                  }}
                >
                  Veneto · Treviso · Pieve di Soligo · Collalto
                </p>
              </div>

              {/* Map: Uruguay */}
              <div>
                <div
                  style={{
                    borderRadius: "2px",
                    overflow: "hidden",
                    border: "1px solid #D4C4A8",
                  }}
                >
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-58.5,-34.9,-53.0,-30.0&layer=mapnik&marker=-32.5228,-55.7658"
                    style={{
                      border: 0,
                      width: "100%",
                      height: "320px",
                      borderRadius: "2px",
                      display: "block",
                    }}
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                    title="Map of Uruguay — where this page is written from"
                  />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.75rem",
                    color: "#8B7355",
                    marginTop: "0.6rem",
                    letterSpacing: "0.04em",
                    textAlign: "center",
                  }}
                >
                  Uruguay — where this page is written from
                </p>
              </div>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Purpose ────────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32 max-w-2xl mx-auto">
        <FadeSection>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 400,
              color: "#2C1810",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            {t.purposeTitle}
          </h2>
          {t.purposeBody.split("\n\n").map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "1rem",
                lineHeight: 1.9,
                color: "#4A3728",
                fontWeight: 300,
                marginBottom: i < t.purposeBody.split("\n\n").length - 1 ? "1.4rem" : 0,
              }}
            >
              {para}
            </p>
          ))}
        </FadeSection>
      </section>

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div
        className="max-w-xs mx-auto"
        style={{ height: "1px", backgroundColor: "#E0D5C5" }}
        aria-hidden="true"
      />

      {/* ── Surname Variations ─────────────────────────────────────────────── */}
      <section className="px-6 py-24 md:py-32 max-w-2xl mx-auto">
        <FadeSection>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 400,
              color: "#2C1810",
              marginBottom: "1.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            {t.variationsTitle}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "1rem",
              lineHeight: 1.9,
              color: "#4A3728",
              fontWeight: 300,
            }}
          >
            {t.variationsBody}
          </p>
        </FadeSection>
      </section>

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div
        className="max-w-xs mx-auto"
        style={{ height: "1px", backgroundColor: "#E0D5C5" }}
        aria-hidden="true"
      />

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:py-32"
        style={{ backgroundColor: "#F5F0E8" }}
        id="contact"
      >
        <div className="max-w-xl mx-auto">
          <FadeSection>
            <h2
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 400,
                color: "#2C1810",
                marginBottom: "1rem",
                letterSpacing: "-0.01em",
              }}
            >
              {t.contactTitle}
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "#6B5B45",
                fontWeight: 300,
                marginBottom: "2.5rem",
              }}
            >
              {t.contactHelper}
            </p>
          </FadeSection>

          <FadeSection delay={150}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { field: "name", key: "name" as const },
                  { field: "country", key: "country" as const },
                  { field: "city", key: "city" as const },
                  { field: "email", key: "email" as const },
                  { field: "surname", key: "surname" as const },
                ].map(({ field, key }) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={t.contactFields[key]}
                    value={form[field as keyof typeof form]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [field]: e.target.value }))
                    }
                    className="w-full px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      fontFamily: "var(--font-inter)",
                      backgroundColor: "#FAF9F6",
                      border: "1px solid #D4C4A8",
                      color: "#2C1810",
                      borderRadius: "2px",
                    }}
                    required={["name", "email", "message"].includes(field)}
                  />
                ))}
              </div>
              <textarea
                placeholder={t.contactFields.message}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                rows={5}
                className="w-full px-4 py-3 text-sm outline-none transition-all resize-none"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: "#FAF9F6",
                  border: "1px solid #D4C4A8",
                  color: "#2C1810",
                  borderRadius: "2px",
                }}
                required
              />
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="mt-2 px-8 py-3 text-sm uppercase tracking-widest transition-all duration-200 self-start"
                style={{
                  fontFamily: "var(--font-inter)",
                  backgroundColor: status === "sent" ? "#7D9B76" : "#2C1810",
                  color: "#FAF9F6",
                  border: "none",
                  borderRadius: "2px",
                  cursor:
                    status === "sending" || status === "sent"
                      ? "default"
                      : "pointer",
                  letterSpacing: "0.1em",
                  fontSize: "0.72rem",
                  opacity: status === "sending" ? 0.7 : 1,
                }}
              >
                {status === "sending"
                  ? t.sending
                  : status === "sent"
                  ? t.sent
                  : t.contactFields.submit}
              </button>
              {status === "error" && (
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    color: "#8B4040",
                    fontSize: "0.85rem",
                  }}
                >
                  {t.error}
                </p>
              )}
            </form>
          </FadeSection>
        </div>
      </section>

      {/* ── Family Email ───────────────────────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 max-w-2xl mx-auto text-center">
        <FadeSection>
          <div
            className="inline-block mb-4"
            style={{
              width: "32px",
              height: "1px",
              backgroundColor: "#8B7355",
            }}
            aria-hidden="true"
          />
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
              fontWeight: 400,
              color: "#2C1810",
              marginBottom: "1.2rem",
              letterSpacing: "-0.01em",
            }}
          >
            {t.emailNoteTitle}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "0.95rem",
              lineHeight: 1.9,
              color: "#6B5B45",
              fontWeight: 300,
            }}
          >
            {t.emailNoteBody}
          </p>
        </FadeSection>
      </section>

      {/* ── Personal Note ──────────────────────────────────────────────────── */}
      <section className="px-6 pb-20 md:pb-28 max-w-2xl mx-auto">
        <FadeSection>
          {/* Decorative divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
            }}
            aria-hidden="true"
          >
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#E0D5C5" }}
            />
            <span
              style={{
                color: "#C4B49A",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                fontFamily: "var(--font-inter)",
              }}
            >
              ✦
            </span>
            <div
              style={{ flex: 1, height: "1px", backgroundColor: "#E0D5C5" }}
            />
          </div>

          {/* Personal note block */}
          <div
            style={{
              borderLeft: "2px solid #D4C4A8",
              paddingLeft: "1.4rem",
              marginLeft: "0.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                fontWeight: 400,
                color: "#6B5B45",
                marginBottom: "0.8rem",
                fontStyle: "italic",
                letterSpacing: "-0.01em",
              }}
            >
              {t.personalNoteTitle}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.9rem",
                lineHeight: 1.9,
                color: "#6B5B45",
                fontWeight: 300,
                fontStyle: "italic",
              }}
            >
              {t.personalNoteBody}
            </p>
          </div>
        </FadeSection>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        className="px-6 py-10 text-center"
        style={{
          borderTop: "1px solid #E0D5C5",
          backgroundColor: "#F5F0E8",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.78rem",
            color: "#8B7355",
            letterSpacing: "0.06em",
            marginBottom: "0.4rem",
          }}
        >
          {t.footerTagline}
        </p>
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "1rem",
            color: "#4A3728",
            fontWeight: 500,
            letterSpacing: "0.02em",
            marginBottom: "0.4rem",
          }}
        >
          Matias Colotuzzo
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.72rem",
            color: "#A89880",
            letterSpacing: "0.05em",
          }}
        >
          {lang === "es"
            ? "Este sitio no tiene propósito comercial."
            : lang === "it"
            ? "Questo sito non ha scopo commerciale."
            : "This site has no commercial purpose."}{" "}
          · 2026
        </p>
      </footer>
    </main>
  );
}
