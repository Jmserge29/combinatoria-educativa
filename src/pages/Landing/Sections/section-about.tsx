import desktop from '../../../assets/images/desktop.png'

export const SectionAbout = () => {
  return (
    <section className="flex relative m-20" id="descripcion">
        <div className="w-[50%] flex flex-col items-start justify-center p-10 gap-4 z-10">
            <img src={desktop} alt="" className="z-10 " />
        </div>
        <div className="w-[50%] flex flex-col items-start justify-center p-10 gap-4">
            <h2 className="text-5xl font-semibold ">Descripción</h2>
            <p className="text-justify w-[80%] text-lg"><span className=" text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">Combinatoria Educativa</span> es un proyecto académico orientado a fortalecer el aprendizaje de la combinatoria dentro del área de matemáticas discretas en el contexto universitario. La aplicación web ofrece un entorno interactivo que permite analizar, identificar y resolver problemas de conteo, tales como permutaciones, variaciones y combinaciones, con y sin repetición. <br /><br />
            Mediante un enfoque pedagógico basado en la explicación guiada, el sistema no solo calcula el resultado, sino que determina el modelo matemático adecuado y presenta la solución paso a paso, incluyendo la justificación, la fórmula utilizada y el procedimiento de cálculo. De esta manera, la herramienta facilita la comprensión del razonamiento combinatorio, promueve el aprendizaje autónomo y permite al estudiante experimentar con diferentes casos y escenarios para reforzar la toma de decisiones matemáticas.</p>
            
        </div>
    </section>
  )
}
