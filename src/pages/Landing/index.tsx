import { NavBar } from "../../components/Navbar"
import CombinatoricsEducationalTool from "./Sections/combinatoria-educativa"
import { SectionAbout } from "./Sections/section-about"
import { SectionContributors } from "./Sections/section-contributors"
import { SectionHome } from "./Sections/section-home"

export const LandingPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <NavBar />
      <SectionHome/>
      <SectionAbout/>
      <CombinatoricsEducationalTool/>
      <SectionContributors/>
    </main >
  )
}

