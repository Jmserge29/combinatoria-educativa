import { useEffect, useMemo, useState } from "react";

interface Contributor {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

const contributors: Contributor[] = [
  {
    name: "José Serge",
    role: "Estudiante de Ingeniería de Sistemas",
    description:
      "Estudiante de último semestre de Ingeniería de Sistemas en la Universidad Libre de Barranquilla, con sólida formación académica en desarrollo de software y más de dos años de experiencia práctica en el sector tecnológico. Especializado en el desarrollo de aplicaciones web y móviles, con dominio de tecnologías modernas y metodologías ágiles de desarrollo. Apasionado por la innovación tecnológica y la creación de soluciones digitales que impacten positivamente.",
    imageUrl:
      "https://cdn-icons-png.freepik.com/512/9230/9230522.png",
  },
  {
    name: "Alejandro Bonilla",
    role: "Estudiante de Ingeniería de Sistemas",
    description:
      "Estudiante de quinto semestre de Ingeniería de Sistemas en la Universidad Libre de Barranquilla.",
    imageUrl:
      "https://lh6.googleusercontent.com/-w9FSxDiBWgE/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJOQZOfJK9Cw0BP3-2zTsE1utfXdQg/photo.jpg",
  },
  {
    name: "Christopher Ramírez Restrepo",
    role: "Estudiante de Ingeniería de Sistemas",
    description:
      "Estudiante de quinto semestre de Ingeniería de Sistemas en la Universidad Libre de Barranquilla.",
    imageUrl:
      "https://cdn-icons-png.freepik.com/512/9133/9133885.png",
  },
];

export const SectionContributors = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Si el array cambia (hot reload / fetch), mantenemos índice válido.
  useEffect(() => {
    if (selectedIndex >= contributors.length) setSelectedIndex(0);
  }, [selectedIndex]);

  const selected = useMemo(() => contributors[selectedIndex], [selectedIndex]);

  const selectByIndex = (idx: number) => setSelectedIndex(idx);

  const next = () =>
    setSelectedIndex((i) => (i + 1) % contributors.length);

  const prev = () =>
    setSelectedIndex((i) => (i - 1 + contributors.length) % contributors.length);

  // ✅ Autoplay opcional (si no lo quieres, borra este useEffect)
  // useEffect(() => {
  //   const t = setInterval(() => next(), 5000);
  //   return () => clearInterval(t);
  // }, []);

  return (
    <section className="m-20 relative" id="contribuidores">
      <h2 className="text-5xl font-semibold flex justify-center w-[100%] mb-10">
        Contribuidores
      </h2>

      <div className="absolute size-70 bg-rose-500 right-[25%] rounded-full z-1 blur-3xl opacity-60"></div>
      <div className="absolute size-70 bg-amber-200 right-[10%] top-[50%] rounded-full z-1 blur-3xl"></div>

      <article className="flex">
        {/* Info */}
        <div className="w-[50%] px-20 flex flex-col items-start justify-center p-10 gap-4 z-10">
          <h3 className="text-4xl font-semibold">{selected.role}</h3>
          <p className="text-justify text-lg">{selected.description}</p>
          <span className="font-bold text-2xl">{selected.name}.</span>

          {/* Controles */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={prev}
              className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
              type="button"
            >
              ← Anterior
            </button>
            <button
              onClick={next}
              className="px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition"
              type="button"
            >
              Siguiente →
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex gap-2 mt-3">
            {contributors.map((_, i) => (
              <button
                key={i}
                onClick={() => selectByIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === selectedIndex ? "bg-white" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Ir al contribuidor ${i + 1}`}
                type="button"
              />
            ))}
          </div>
        </div>

        {/* Avatares */}
        <div className="relative w-[50%] flex items-center justify-center p-10 gap-3 z-10">
          {contributors.map((c, i) => {
            const isSelected = i === selectedIndex;
            return (
              <div
                key={c.name}
                className={`${isSelected ? "size-72" : "size-40"} transition-all duration-700 ease-in-out`}
              >
                <img
                  onClick={() => selectByIndex(i)}
                  className={[
                    "w-full h-full object-cover rounded-full cursor-pointer transition-all duration-700 ease-in-out",
                    isSelected
                      ? "shadow-2xl shadow-white border-8 border-white"
                      : "opacity-80 hover:opacity-100",
                  ].join(" ")}
                  src={c.imageUrl}
                  alt={c.name}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
};