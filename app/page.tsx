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
  footer: string;
  sending: string;
  sent: string;
  error: string;
}

// ─── Translations ─────────────────────────────────────────────────────────────

const content: Record<Lang, Content> = {
  en: {
    heroSubtitle: "A small digital home for Colotuzzos around the world.",
    welcome:
      "This place was created as a quiet point of connection — for people who carry the surname Colotuzzo, for relatives, and for those who share a bond with its roots. Whether you found this page by chance or by searching, you are welcome here.",
    originsTitle: "Where the name comes from",
    originsBody:
      "The surname Colotuzzo is believed to derive from an earlier form, Collatuzzo — a name whose precise origins remain part of family tradition rather than fully documented history. What we do know points toward northern Italy, to the Veneto region and the province of Treviso, with a particularly strong connection to Pieve di Soligo. There is also a possible, though uncertain, earlier link to the locality of Collalto in the same broader area. These are threads worth following, carefully and with an open mind.",
    geographyTitle: "Rooted in Veneto",
    geographyBody:
      "The Veneto region, in northeastern Italy, is the landscape that appears most clearly when tracing the family's origins. Treviso, Pieve di Soligo, and the surrounding hills and valleys form the geographic heart of this story.",
    purposeTitle: "Why this site exists",
    purposeBody:
      "This website has no commercial purpose and does not pursue any commercial objective of any kind. It exists simply as a personal and family initiative — a place to welcome, connect, and preserve a shared sense of memory, place, and origin. If you are a Colotuzzo, carry a related surname variation, or are researching the family's roots, this is a place for you too.",
    contactTitle: "Get in touch",
    contactHelper:
      "If you are a Colotuzzo, share a related surname variation, or are researching the family's roots, you are welcome to get in touch.",
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
      "Over time, it may become possible to offer personal email addresses under the @colotuzzo.com domain to family members and related branches. If this is of interest to you, feel free to mention it when you write.",
    footer: "Matias Colotuzzo · This site has no commercial purpose.",
    sending: "Sending…",
    sent: "Message sent. Thank you.",
    error: "Something went wrong. Please try again.",
  },
  es: {
    heroSubtitle: "Un pequeño hogar digital para los Colotuzzo del mundo.",
    welcome:
      "Este lugar fue creado como un punto de encuentro tranquilo — para quienes llevan el apellido Colotuzzo, para parientes, y para quienes comparten un vínculo con sus raíces. Seas quien llegó aquí por casualidad o buscando, eres bienvenido.",
    originsTitle: "El origen del apellido",
    originsBody:
      "Se cree que el apellido Colotuzzo deriva de una forma anterior, Collatuzzo — un nombre cuyo origen preciso pertenece más a la tradición familiar que a la historia documentada. Lo que sabemos apunta al norte de Italia, a la región del Véneto y la provincia de Treviso, con una conexión especialmente fuerte con Pieve di Soligo. Existe también un posible vínculo, aún incierto, con la localidad de Collalto en la misma zona. Son hilos que vale la pena seguir, con cuidado y mente abierta.",
    geographyTitle: "Raíces en el Véneto",
    geographyBody:
      "La región del Véneto, en el noreste de Italia, es el paisaje que aparece con más claridad al trazar los orígenes de la familia. Treviso, Pieve di Soligo y las colinas y valles que los rodean forman el corazón geográfico de esta historia.",
    purposeTitle: "Por qué existe este sitio",
    purposeBody:
      "Este sitio web no tiene ningún propósito comercial ni persigue ningún objetivo comercial de ningún tipo. Existe simplemente como una iniciativa personal y familiar — un lugar para dar la bienvenida, conectar y preservar una memoria compartida de lugar y origen. Si eres Colotuzzo, llevas una variación del apellido o investigas las raíces de la familia, este lugar también es tuyo.",
    contactTitle: "Escribinos",
    contactHelper:
      "Si eres Colotuzzo, compartes una variación del apellido o investigas las raíces de la familia, eres bienvenido a escribir.",
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
      "Con el tiempo, podría ser posible ofrecer direcciones de correo personales bajo el dominio @colotuzzo.com para miembros de la familia y ramas relacionadas. Si esto es de tu interés, no dudes en mencionarlo cuando escribas.",
    footer: "Matias Colotuzzo · Este sitio no tiene propósito comercial.",
    sending: "Enviando…",
    sent: "Mensaje enviado. Gracias.",
    error: "Algo salió mal. Por favor, intentá de nuevo.",
  },
  it: {
    heroSubtitle: "Una piccola casa digitale per i Colotuzzo nel mondo.",
    welcome:
      "Questo luogo è stato creato come un punto di connessione tranquillo — per chi porta il cognome Colotuzzo, per i parenti, e per chi condivide un legame con le sue radici. Che tu sia arrivato qui per caso o cercando, sei il benvenuto.",
    originsTitle: "Le origini del cognome",
    originsBody:
      "Si ritiene che il cognome Colotuzzo derivi da una forma più antica, Collatuzzo — un nome le cui origini precise appartengono più alla tradizione familiare che alla storia documentata. Quel che sappiamo indica il nord Italia, la regione del Veneto e la provincia di Treviso, con un legame particolarmente forte con Pieve di Soligo. Esiste anche un possibile collegamento, ancora incerto, con la località di Collalto nella stessa area. Sono fili che vale la pena seguire, con cura e mente aperta.",
    geographyTitle: "Radici nel Veneto",
    geographyBody:
      "La regione del Veneto, nel nord-est dell'Italia, è il paesaggio che emerge con maggiore chiarezza nel tracciare le origini della famiglia. Treviso, Pieve di Soligo e le colline e vallate circostanti formano il cuore geografico di questa storia.",
    purposeTitle: "Perché esiste questo sito",
    purposeBody:
      "Questo sito non ha alcuno scopo commerciale e non persegue alcun obiettivo commerciale di alcun tipo. Esiste semplicemente come un'iniziativa personale e familiare — un luogo per accogliere, connettere e preservare un senso condiviso di memoria, luogo e origine. Se sei un Colotuzzo, porti una variante del cognome o stai ricercando le radici della famiglia, anche questo posto è per te.",
    contactTitle: "Scrivici",
    contactHelper:
      "Se sei un Colotuzzo, condividi una variante del cognome o stai ricercando le radici della famiglia, sei il benvenuto a metterti in contatto.",
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
      "Con il tempo, potrebbe diventare possibile offrire indirizzi email personali sotto il dominio @colotuzzo.com per i membri della famiglia e i rami correlati. Se questo ti interessa, sentiti libero di menzionarlo quando scrivi.",
    footer: "Matias Colotuzzo · Questo sito non ha scopo commerciale.",
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
                borderBottom: lang === l ? "1px solid #2C1810" : "1px solid transparent",
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
        {/* HERO IMAGE: Veneto hills landscape — replace src with your own photo when ready */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=1800&q=80&fit=crop"
          alt="Veneto hills landscape"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.22 }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl mx-auto">
          <div
            style={{
              opacity: 1,
              animation: "fadeInUp 1s ease 0.1s both",
            }}
          >
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
          <div
            style={{
              opacity: 1,
              animation: "fadeInUp 1s ease 0.4s both",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                color: "#8B7355",
                fontWeight: 300,
                letterSpacing: "0.02em",
                maxWidth: "480px",
              }}
            >
              {t.heroSubtitle}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          style={{
            opacity: 1,
            animation: "fadeInUp 1s ease 0.8s both",
          }}
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
      <section
        className="px-6 py-24 md:py-32 max-w-2xl mx-auto text-center"
      >
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
              {/* MAP IMAGE: Replace with your own map of Veneto/Treviso/Pieve di Soligo/Collalto when ready */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop"
                alt="Map of Veneto region"
                className="rounded-sm w-full object-cover"
                style={{ height: "320px" }}
              />

              {/* REGIONAL IMAGE: Replace with your own photo of Veneto hills/countryside when ready */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80&fit=crop"
                alt="Hills and valleys of Veneto"
                className="rounded-sm w-full object-cover"
                style={{ height: "320px" }}
              />
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── Purpose ────────────────────────────────────────────────────────── */}
      <section
        className="px-6 py-24 md:py-32 max-w-2xl mx-auto"
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
            {t.purposeTitle}
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
            {t.purposeBody}
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
                  backgroundColor:
                    status === "sent" ? "#7D9B76" : "#2C1810",
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
      <section
        className="px-6 py-20 md:py-28 max-w-2xl mx-auto text-center"
      >
        <FadeSection>
          <div
            className="inline-block mb-4"
            style={{ width: "32px", height: "1px", backgroundColor: "#8B7355" }}
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
          }}
        >
          {t.footer} · {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
