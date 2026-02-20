/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from 'react';
import { BookOpen, Calculator, Lightbulb, Info } from 'lucide-react';
import { Button } from '../../../components/Buttons';

const CombinatoricsEducationalTool = () => {
  const [selectedTopic, setSelectedTopic] = useState('permutaciones');
  const [n, setN] = useState(5);
  const [r, setR] = useState(3);
  const [showSolution, setShowSolution] = useState(false);

  // Cálculo del factorial
  const factorial = (num: number) => {
    if (num <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) result *= i;
    return result;
  };

  // Función para calcular permutaciones
  const calculatePermutations = (n: number, r: number, withRepetition: boolean, ordered: boolean) => {
    if (withRepetition && ordered) {
      // Variaciones con repetición: n^r
      return Math.pow(n, r);
    } else if (!withRepetition && ordered) {
      // Permutaciones sin repetición: n!/(n-r)!
      return factorial(n) / factorial(n - r);
    } else if (!withRepetition && !ordered) {
      // Combinaciones sin repetición: n!/(r!(n-r)!)
      return factorial(n) / (factorial(r) * factorial(n - r));
    } else {
      // Combinaciones con repetición: (n+r-1)!/(r!(n-1)!)
      return factorial(n + r - 1) / (factorial(r) * factorial(n - 1));
    }
  };

  // Obtener información del tema seleccionado
  const getTopicInfo = () => {
    const topics = {
      'permutaciones': {
        title: 'Permutaciones sin Repetición (P)',
        formula: 'P(n,r) = n! / (n-r)!',
        description: 'Ordenaciones de r elementos tomados de un conjunto de n elementos, donde el orden SÍ importa y NO se pueden repetir elementos.',
        example: 'Ejemplo: ¿De cuántas formas se pueden ordenar 3 libros diferentes de una estantería con 5 libros?',
        importaOrden: true,
        hayRepeticion: false,
        steps: (n: number, r: number) => {
          const result = calculatePermutations(n, r, false, true);
          return {
            paso1: `Identificar valores: n = ${n} (total de elementos), r = ${r} (elementos a seleccionar)`,
            paso2: `Aplicar fórmula: P(${n},${r}) = ${n}! / (${n}-${r})!`,
            paso3: `Calcular factoriales: ${n}! = ${factorial(n)}, (${n}-${r})! = ${factorial(n - r)}`,
            paso4: `Dividir: ${factorial(n)} / ${factorial(n - r)} = ${result}`,
            resultado: result,
            interpretacion: `Hay ${result} formas diferentes de ordenar ${r} elementos de un total de ${n} elementos.`
          };
        }
      },
      'permutaciones-rep': {
        title: 'Permutaciones con Repetición (PR)',
        formula: 'PR(n,r) = nʳ',
        description: 'Ordenaciones donde el orden SÍ importa y los elementos SÍ se pueden repetir.',
        example: 'Ejemplo: ¿Cuántas contraseñas de 3 dígitos se pueden formar con los dígitos del 0 al 9?',
        importaOrden: true,
        hayRepeticion: true,
        steps: (n: number, r: number) => {
          const result = calculatePermutations(n, r, true, true);
          return {
            paso1: `Identificar valores: n = ${n} (opciones disponibles), r = ${r} (posiciones a llenar)`,
            paso2: `Aplicar fórmula: PR(${n},${r}) = ${n}^${r}`,
            paso3: `Calcular potencia: ${n} × ${n} × ... (${r} veces)`,
            paso4: `Resultado: ${n}^${r} = ${result}`,
            resultado: result,
            interpretacion: `Hay ${result} formas diferentes cuando cada posición puede tener cualquiera de los ${n} elementos.`
          };
        }
      },
      'combinaciones': {
        title: 'Combinaciones sin Repetición (C)',
        formula: 'C(n,r) = n! / (r!(n-r)!)',
        description: 'Selecciones de r elementos de n elementos donde el orden NO importa y NO se pueden repetir.',
        example: 'Ejemplo: ¿De cuántas formas se puede formar un comité de 3 personas de un grupo de 5?',
        importaOrden: false,
        hayRepeticion: false,
        steps: (n: number, r: number) => {
          const result = calculatePermutations(n, r, false, false);
          return {
            paso1: `Identificar valores: n = ${n} (total de elementos), r = ${r} (elementos a seleccionar)`,
            paso2: `Aplicar fórmula: C(${n},${r}) = ${n}! / (${r}! × (${n}-${r})!)`,
            paso3: `Calcular factoriales: ${n}! = ${factorial(n)}, ${r}! = ${factorial(r)}, (${n}-${r})! = ${factorial(n - r)}`,
            paso4: `Dividir: ${factorial(n)} / (${factorial(r)} × ${factorial(n - r)}) = ${result}`,
            resultado: result,
            interpretacion: `Hay ${result} formas diferentes de seleccionar ${r} elementos de ${n} cuando el orden no importa.`
          };
        }
      },
      'combinaciones-rep': {
        title: 'Combinaciones con Repetición (CR)',
        formula: 'CR(n,r) = (n+r-1)! / (r!(n-1)!)',
        description: 'Selecciones donde el orden NO importa y los elementos SÍ se pueden repetir.',
        example: 'Ejemplo: ¿De cuántas formas se pueden comprar 3 helados si hay 5 sabores disponibles?',
        importaOrden: false,
        hayRepeticion: true,
        steps: (n: number, r: number) => {
          const result = calculatePermutations(n, r, true, false);
          return {
            paso1: `Identificar valores: n = ${n} (tipos de elementos), r = ${r} (cantidad a seleccionar)`,
            paso2: `Aplicar fórmula: CR(${n},${r}) = (${n}+${r}-1)! / (${r}! × (${n}-1)!)`,
            paso3: `Simplificar: (${n + r - 1})! / (${r}! × ${n - 1}!)`,
            paso4: `Calcular: ${factorial(n + r - 1)} / (${factorial(r)} × ${factorial(n - 1)}) = ${result}`,
            resultado: result,
            interpretacion: `Hay ${result} formas de seleccionar ${r} elementos de ${n} tipos permitiendo repeticiones.`
          };
        }
      },
      'permutacion-circular': {
        title: 'Permutaciones Circulares (Pc)',
        formula: 'Pc(n) = (n-1)!',
        description: 'Ordenaciones en círculo donde las rotaciones se consideran iguales.',
        example: 'Ejemplo: ¿De cuántas formas se pueden sentar 5 personas en una mesa circular?',
        importaOrden: true,
        hayRepeticion: false,
        steps: (n: number) => {
          const result = factorial(n - 1);
          return {
            paso1: `Identificar: n = ${n} (elementos a ordenar en círculo)`,
            paso2: `En una permutación circular, fijamos un elemento para evitar contar rotaciones`,
            paso3: `Aplicar fórmula: Pc(${n}) = (${n}-1)!`,
            paso4: `Calcular: (${n}-1)! = ${n - 1}! = ${result}`,
            resultado: result,
            interpretacion: `Hay ${result} formas diferentes de ordenar ${n} elementos en círculo.`
          };
        }
      },
      'permutacion-objetos-identicos': {
        title: 'Permutaciones con Objetos Idénticos',
        formula: 'P = n! / (n₁! × n₂! × ... × nₖ!)',
        description: 'Permutaciones donde hay grupos de elementos idénticos.',
        example: 'Ejemplo: ¿Cuántas palabras diferentes se pueden formar con las letras de "MISSISSIPPI"?',
        importaOrden: true,
        hayRepeticion: false,
        customInput: true
      }
    };
    // @ts-expect-error
    return topics[selectedTopic];
  };

  const topicInfo = getTopicInfo();
  const solution = selectedTopic === 'permutacion-circular' 
    ? topicInfo.steps(n) 
    : topicInfo.customInput 
      ? null 
      : topicInfo.steps(n, r);

  return (
    <div className="" id="combinatoria-educativa">
      {/* Header con diseño educativo */}
      <div className="bg-gradient-to-r from-rose-500 to-black text-white shadow-2xl rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
              <Calculator className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                Combinatoria Educativa
              </h1>
              <p className="text-orange-100 mt-1 text-lg">
                Matemáticas Discretas - Aprende paso a paso
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selector de temas */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-800">Temas</h2>
              </div>
              
              <div className="space-y-3">
                {[
                  { id: 'permutaciones', label: 'Permutaciones (sin rep.)', icon: '🔢' },
                  { id: 'permutaciones-rep', label: 'Permutaciones (con rep.)', icon: '🔁' },
                  { id: 'combinaciones', label: 'Combinaciones (sin rep.)', icon: '🎲' },
                  { id: 'combinaciones-rep', label: 'Combinaciones (con rep.)', icon: '♾️' },
                  { id: 'permutacion-circular', label: 'Permutaciones Circulares', icon: '⭕' },
                  { id: 'permutacion-objetos-identicos', label: 'Objetos Idénticos', icon: '👥' }
                ].map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopic(topic.id);
                      setShowSolution(false);
                    }}
                    className={`w-full text-left px-5 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      selectedTopic === topic.id
                        ? 'bg-gradient-to-r from-rose-500 to-black text-white shadow-lg'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{topic.icon}</span>
                      <span className="font-semibold text-sm">{topic.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Guía rápida */}
              <div className="mt-8 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                <h3 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Guía Rápida
                </h3>
                <div className="text-sm text-orange-700 space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="font-bold">✓</span>
                    <span><strong>Orden importa:</strong> Permutaciones</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">✗</span>
                    <span><strong>Orden no importa:</strong> Combinaciones</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">🔁</span>
                    <span><strong>Con repetición:</strong> Elementos pueden repetirse</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold">!</span>
                    <span><strong>Sin repetición:</strong> Cada elemento una vez</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del tema */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-gradient-to-br from-orange-400 to-rose-400 p-4 rounded-2xl">
                  <Info className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{topicInfo.title}</h2>
                  <div className="inline-block bg-orange-100 px-4 py-2 rounded-lg">
                    <code className="text-orange-800 font-mono text-lg font-bold">{topicInfo.formula}</code>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-xl">
                  <p className="text-gray-700 leading-relaxed"><strong>Definición:</strong> {topicInfo.description}</p>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
                  <p className="text-gray-700 leading-relaxed"><strong>Ejemplo práctico:</strong> {topicInfo.example}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className={`p-4 rounded-xl border-2 ${topicInfo.importaOrden ? 'bg-purple-50 border-purple-300' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="text-center">
                      <div className="text-2xl mb-2">{topicInfo.importaOrden ? '✓' : '✗'}</div>
                      <div className="font-bold text-gray-700">El orden importa</div>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl border-2 ${topicInfo.hayRepeticion ? 'bg-indigo-50 border-indigo-300' : 'bg-gray-50 border-gray-300'}`}>
                    <div className="text-center">
                      <div className="text-2xl mb-2">{topicInfo.hayRepeticion ? '🔁' : '!'}</div>
                      <div className="font-bold text-gray-700">Hay repetición</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculadora */}
            {!topicInfo.customInput && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Calculator className="w-7 h-7 text-orange-600" />
                  Calculadora
                </h3>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Valor de n {selectedTopic === 'permutacion-circular' ? '(elementos en total)' : '(total de elementos)'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={n}
                      onChange={(e) => {
                        setN(parseInt(e.target.value) || 1);
                        setShowSolution(false);
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-semibold"
                    />
                  </div>

                  {selectedTopic !== 'permutacion-circular' && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Valor de r (elementos a seleccionar)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={n}
                        value={r}
                        onChange={(e) => {
                          setR(parseInt(e.target.value) || 1);
                          setShowSolution(false);
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none text-lg font-semibold"
                      />
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => setShowSolution(true)}
                  className="w-full text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
                >
                  {showSolution ? 'Recalcular Solución' : 'Calcular y Ver Solución Paso a Paso'}
                </Button>
              </div>
            )}

            {/* Solución paso a paso */}
            {showSolution && solution && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-3">
                  <Lightbulb className="w-7 h-7" />
                  Solución Paso a Paso
                </h3>

                <div className="space-y-4">
                  {Object.entries(solution).map(([key, value]) => {
                    if (key === 'resultado') return null;
                    
                    const stepNumber = key.match(/\d+/)?.[0];
                    const isInterpretation = key === 'interpretacion';
                    
                    return (
                      <div
                        key={key}
                        className={`p-5 rounded-xl ${
                          isInterpretation 
                            ? 'bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300' 
                            : 'bg-white border-2 border-green-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                            isInterpretation 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-green-500 text-white'
                          }`}>
                            {isInterpretation ? '💡' : stepNumber}
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-800 leading-relaxed font-medium">{value as number}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Resultado final destacado */}
                  <div className="mt-6 p-8 bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl shadow-2xl">
                    <div className="text-center">
                      <p className="text-white text-lg font-semibold mb-2">RESULTADO FINAL</p>
                      <p className="text-white text-6xl font-bold">{solution.resultado}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Caso especial para objetos idénticos */}
            {topicInfo.customInput && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                  <h3 className="font-bold text-yellow-800 mb-3 text-xl">📚 Información Especial</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Este caso requiere información adicional sobre cuántos elementos idénticos hay de cada tipo.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Fórmula:</strong> Si tienes n elementos en total, con n₁ idénticos del tipo 1, n₂ del tipo 2, etc., entonces:
                  </p>
                  <div className="bg-white p-4 rounded-lg mt-3">
                    <code className="text-yellow-800 font-mono text-lg">P = n! / (n₁! × n₂! × ... × nₖ!)</code>
                  </div>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    <strong>Ejemplo:</strong> La palabra "MISSISSIPPI" tiene 11 letras: M(1), I(4), S(4), P(2).<br/>
                    Resultado: 11! / (1! × 4! × 4! × 2!) = 34,650 palabras diferentes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer educativo */}
        <div className="mt-12 bg-gradient-to-r from-white to-gray-900/10 rounded-3xl shadow-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">💡 Consejos para el Estudio</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
                <div className="text-3xl mb-2">🤔</div>
                <h4 className="font-bold mb-2">1. Identifica el problema</h4>
                <p className="text-sm text-gray-800">¿Importa el orden? ¿Hay repetición?</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
                <div className="text-3xl mb-2">📝</div>
                <h4 className="font-bold mb-2">2. Selecciona la fórmula</h4>
                <p className="text-sm text-gray-800">Usa la tabla de decisión para elegir correctamente</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl">
                <div className="text-3xl mb-2">✅</div>
                <h4 className="font-bold mb-2">3. Verifica tu resultado</h4>
                <p className="text-sm text-gray-800">¿Tiene sentido en el contexto del problema?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .space-y-4 > * {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .space-y-4 > *:nth-child(1) { animation-delay: 0.1s; }
        .space-y-4 > *:nth-child(2) { animation-delay: 0.2s; }
        .space-y-4 > *:nth-child(3) { animation-delay: 0.3s; }
        .space-y-4 > *:nth-child(4) { animation-delay: 0.4s; }
        .space-y-4 > *:nth-child(5) { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};

export default CombinatoricsEducationalTool;