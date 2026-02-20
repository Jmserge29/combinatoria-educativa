import { Button } from "../../../components/Buttons"
import phone from '../../../assets/images/phone.png'

export const SectionHome = () => {
  return (
    <section className="flex relative m-20" id="inicio">
        <div className="absolute size-44 bg-rose-500 rounded-full blur-2xl z-1 left-[30%]"></div>
        <div className="absolute size-44 bg-amber-100 rounded-full blur-2xl z-1 right-[30%]"></div>
        <div className="absolute size-60 bg-rose-200 rounded-full blur-2xl z-1 top-[63%] right-[10%]"></div>
        <div className="absolute bg-amber-500 left-[37%] top-[15%] size-60 rounded-full opacity-30 blur-2xl z-1"></div>
        
        <div className="w-[50%] flex flex-col items-start justify-center px-24 gap-6 z-10">
            <h1 className="text-7xl font-bold ">Toma tu mejor decisión. <br /> Aprende hoy</h1>
            <p className="">Combinatoria Educativa es un proyecto educativo desarrollado con el propósito de modernizar la enseñanza de las matemáticas discretas en el contexto universitario. Aplicación web.</p>
            <div className="flex gap-6">
                <Button variant="primary" onClick={() => window.location.href = "#combinatoria-educativa"}>
                    Comenzar ahora
                </Button>
                <Button variant="outline">
                    Proyecto de prueba
                </Button>
            </div>
        </div>
        <div className="w-[50%] flex flex-col items-start justify-center">
            <img src={phone} alt="" className="z-10" />
        </div>
    </section>
  )
}
