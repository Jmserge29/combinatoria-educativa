import { useState, useEffect } from 'react';
import { SectionContributors } from '../Landing/Sections/section-contributors';

const ScheduleCombinationsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    subjectName: '',
    section: '',
    startTime: '08:00',
    endTime: '10:00',
    selectedDays: []
  });
  const [validCombinations, setValidCombinations] = useState([]);
  const [currentCombinationIndex, setCurrentCombinationIndex] = useState(0);

  const days = ['L', 'M', 'W', 'J', 'V', 'S'];

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const timeToMinutes = (time ) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const hasConflict = (sec1, sec2) => {
    const sharedDays = sec1.days.filter(d => sec2.days.includes(d));
    if (sharedDays.length === 0) return false;

    const start1 = timeToMinutes(sec1.startTime);
    const end1 = timeToMinutes(sec1.endTime);
    const start2 = timeToMinutes(sec2.startTime);
    const end2 = timeToMinutes(sec2.endTime);

    return (start1 < end2 && end1 > start2);
  };

  const generateCombinations = (arrays) => {
    if (arrays.length === 0) return [[]];
    const [first, ...rest] = arrays;
    const combinationsOfRest = generateCombinations(rest);
    const result = [];
    for (const item of first) {
      for (const combination of combinationsOfRest) {
        result.push([item, ...combination]);
      }
    }
    return result;
  };

  const isValidCombination = (combination) => {
    for (let i = 0; i < combination.length; i++) {
      for (let j = i + 1; j < combination.length; j++) {
        if (hasConflict(combination[i], combination[j])) {
          return false;
        }
      }
    }
    return true;
  };

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const toggleDay = (day) => {
    setFormData(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day]
    }));
  };

  const addSection = () => {
    const { subjectName, section, startTime, endTime, selectedDays } = formData;

    if (!subjectName || !section || selectedDays.length === 0) {
      alert('Por favor completa todos los campos');
      return;
    }

    const sectionData = {
      section,
      days: [...selectedDays],
      startTime,
      endTime
    };

    const existingSubject = subjects.find(s => s.name === subjectName);
    if (existingSubject) {
      setSubjects(subjects.map(s => 
        s.name === subjectName 
          ? { ...s, sections: [...s.sections, sectionData] }
          : s
      ));
    } else {
      setSubjects([...subjects, {
        id: Date.now(),
        name: subjectName,
        sections: [sectionData]
      }]);
    }

    // Reset form
    setFormData({
      subjectName: formData.subjectName,
      section: '',
      startTime: '08:00',
      endTime: '10:00',
      selectedDays: []
    });
  };

  const removeSubject = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const removeSection = (subjectId, sectionIndex) => {
    setSubjects(subjects.map(s => {
      if (s.id === subjectId) {
        const updatedSections = s.sections.filter((_, idx) => idx !== sectionIndex);
        return { ...s, sections: updatedSections };
      }
      return s;
    }).filter(s => s.sections.length > 0));
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    if (subjects.length > 0) {
      const sectionsBySubject = subjects.map(s => s.sections);
      const allCombinations = generateCombinations(sectionsBySubject);
      const valid = allCombinations.filter(isValidCombination);
      setValidCombinations(valid);
      setCurrentCombinationIndex(0);
    } else {
      setValidCombinations([]);
    }
  }, [subjects]);

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const totalCombinations = subjects.length > 0
    ? subjects.reduce((acc, s) => acc * s.sections.length, 1)
    : 0;
  const validCount = validCombinations.length;
  const conflictCount = totalCombinations - validCount;

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="min-h-screen" style={{ fontFamily: '"IBM Plex Mono", monospace' }}>
      
      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-100">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-black opacity-20 rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-rose-400 opacity-10 -rotate-12"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-1 bg-black opacity-10 rotate-45"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Title */}
            <div className="text-center animate-fade-in-up">
              <h1 className="text-8xl md:text-9xl text-black leading-none mb-6 tracking-tighter" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>
                COMBINADOR<br/>DE HORARIOS
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Calcula todas las combinaciones posibles de horarios académicos usando el  
                <span className="bg-rose-400 px-2 py-1 font-bold"> Principio de Multiplicación</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Calculator Section */}
      <section id="calculadora" className="py-6">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="border-4 border-black shadow-[8px_8px_0_#0A0A0A] bg-black text-rose-400 px-6 py-3 inline-block mb-6">
                <span className="font-bold text-sm">HERRAMIENTA</span>
              </div>
              <h2 className="text-7xl text-black mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>CALCULADORA</h2>
              <p className="text-xl text-gray-700">Crea y visualiza tus combinaciones de horarios</p>
            </div>

            {/* Input Section */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {/* Add Subject Form */}
              <div className="lg:col-span-1">
                <div className="border-4 border-black shadow-[8px_8px_0_#0A0A0A] bg-white p-6 mb-6">
                  <h3 className="text-3xl text-black mb-6" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>AGREGAR MATERIA</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="font-bold text-xs text-gray-700 mb-2 block">NOMBRE DE LA MATERIA</label>
                      <input 
                        type="text" 
                        value={formData.subjectName}
                        onChange={(e) => setFormData({...formData, subjectName: e.target.value})}
                        placeholder="Ej: Matemáticas" 
                        className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:border-rose-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-xs text-gray-700 mb-2 block">SECCIÓN</label>
                      <input 
                        type="text"
                        value={formData.section}
                        onChange={(e) => setFormData({...formData, section: e.target.value})}
                        placeholder="Ej: A, B, C" 
                        className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:border-rose-400 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-xs text-gray-700 mb-2 block">HORA INICIO</label>
                        <input 
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:border-rose-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-xs text-gray-700 mb-2 block">HORA FIN</label>
                        <input 
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                          className="w-full border-4 border-black px-4 py-3 font-bold focus:outline-none focus:border-rose-400 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-bold text-xs text-gray-700 mb-2 block">DÍAS</label>
                      <div className="grid grid-cols-3 gap-2">
                        {days.map(day => (
                          <button
                            key={day}
                            onClick={() => toggleDay(day)}
                            className={`border-4 border-black px-3 py-2 font-bold transition-colors ${
                              formData.selectedDays.includes(day) ? 'bg-rose-400' : 'bg-white hover:bg-gray-100'
                            }`}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={addSection}
                      className="w-full border-4 border-black shadow-[8px_8px_0_#0A0A0A] bg-black text-rose-400 px-6 py-4 text-2xl transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#0A0A0A]"
                      style={{ fontFamily: '"Bebas Neue", sans-serif' }}
                    >
                      + AGREGAR
                    </button>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="border-4 border-rose-400  bg-rose-400 p-6">
                  <h3 className="text-3xl text-black mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>ESTADÍSTICAS</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">MATERIAS:</span>
                      <span className="text-2xl font-bold">{subjects.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">COMBINACIONES:</span>
                      <span className="text-2xl font-bold">{totalCombinations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">VÁLIDAS:</span>
                      <span className="text-2xl font-bold text-green-700">{validCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">CONFLICTOS:</span>
                      <span className="text-2xl font-bold text-red-700">{conflictCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Display Area */}
              <div className="lg:col-span-2">
                {/* Subjects List */}
                <div className="border-4 border-black shadow-[8px_8px_0_#0A0A0A] bg-white p-6 mb-6">
                  <h3 className="text-3xl text-black mb-6" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>MATERIAS AGREGADAS</h3>
                  <div className="space-y-4 min-h-[200px]">
                    {subjects.length === 0 ? (
                      <div className="text-center py-12 text-gray-600">
                        No hay materias agregadas. ¡Comienza agregando una!
                      </div>
                    ) : (
                      subjects.map(subject => (
                        <div key={subject.id} className="border-4 border-black p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-2xl text-black" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>{subject.name}</h4>
                            <button 
                              onClick={() => removeSubject(subject.id)}
                              className="bg-red-600 text-white px-3 py-1 font-bold hover:bg-red-700"
                            >
                              ELIMINAR
                            </button>
                          </div>
                          <div className="space-y-2">
                            {subject.sections.map((sec, idx) => (
                              <div key={idx} className="bg-gray-100 p-3 flex justify-between items-center">
                                <div className="text-sm">
                                  <span className="bg-rose-400 px-2 py-1 font-bold">SEC {sec.section}</span>
                                  <span className="ml-3">{sec.days.join(', ')}</span>
                                  <span className="ml-3">{sec.startTime} - {sec.endTime}</span>
                                </div>
                                <button 
                                  onClick={() => removeSection(subject.id, idx)}
                                  className="text-red-600 font-bold hover:text-red-800"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Calculation Explanation */}
                {subjects.length > 0 && (
                  <div className="border-4 border-black shadow-[8px_8px_0_#0A0A0A] bg-black text-white p-6 mb-6">
                    <h3 className="text-3xl text-rose-400 mb-4" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>CÁLCULO</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-rose-400 font-bold">PASO 1:</span>
                        <span className="ml-2">Multiplicar número de secciones de cada materia</span>
                      </div>
                      <div className="bg-gray-800 p-4 text-2xl text-center text-rose-400 font-bold">
                        {subjects.map(s => s.sections.length).join(' × ')} = {totalCombinations}
                      </div>
                      <div>
                        <span className="text-rose-400 font-bold">PASO 2:</span>
                        <span className="ml-2">Filtrar combinaciones con conflictos de horario</span>
                      </div>
                      <div className="bg-rose-400 text-black p-4 text-xl text-center font-bold">
                        {validCount} combinaciones válidas de {totalCombinations} posibles
                      </div>
                    </div>
                  </div>
                )}

                {/* Combinations Display */}
                {validCombinations.length > 0 && (
                  <div className="border-4 border-black shadow-[8px_8px_0_#0A0A0A] bg-white p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-3xl text-black" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>COMBINACIONES VÁLIDAS</h3>
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setCurrentCombinationIndex(Math.max(0, currentCombinationIndex - 1))}
                          disabled={currentCombinationIndex === 0}
                          className="border-4 border-black shadow-[8px_8px_0_#0A0A0A] bg-black text-rose-400 px-6 py-2 font-bold disabled:opacity-50 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#0A0A0A]"
                        >
                          ←
                        </button>
                        <span className="font-bold">{currentCombinationIndex + 1} / {validCombinations.length}</span>
                        <button 
                          onClick={() => setCurrentCombinationIndex(Math.min(validCombinations.length - 1, currentCombinationIndex + 1))}
                          disabled={currentCombinationIndex === validCombinations.length - 1}
                          className="border-4 border-black shadow-[8px_8px_0_#0A0A0A] bg-black text-rose-400 px-6 py-2 font-bold disabled:opacity-50 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#0A0A0A]"
                        >
                          →
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-4 border-black">
                        <thead>
                          <tr className="bg-black text-rose-400">
                            <th className="border-4 border-black p-3 font-bold text-left">MATERIA</th>
                            <th className="border-4 border-black p-3 font-bold text-left">SECCIÓN</th>
                            <th className="border-4 border-black p-3 font-bold text-left">DÍAS</th>
                            <th className="border-4 border-black p-3 font-bold text-left">HORARIO</th>
                          </tr>
                        </thead>
                        <tbody>
                          {validCombinations[currentCombinationIndex]?.map((section, idx) => (
                            <tr key={idx} className="transition-all hover:bg-rose-400">
                              <td className="border-4 border-black p-3 font-bold">{subjects[idx].name}</td>
                              <td className="border-4 border-black p-3">{section.section}</td>
                              <td className="border-4 border-black p-3">{section.days.join(', ')}</td>
                              <td className="border-4 border-black p-3">{section.startTime} - {section.endTime}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {validCombinations.length === 0 && subjects.length > 0 && (
                  <div className="border-4 border-red-500 shadow-[8px_8px_0_#EF4444] bg-red-50 p-8 text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-2xl font-bold text-red-800 mb-2">
                      No hay combinaciones válidas
                    </h3>
                    <p className="text-red-700">
                      Todas las combinaciones posibles tienen conflictos de horario.
                      Intenta agregar más secciones con horarios diferentes.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SectionContributors/>

      {/* Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600;700&display=swap');

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

      `}</style>
    </div>
  );
};

export default ScheduleCombinationsPage;