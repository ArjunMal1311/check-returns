import Footer from "@/components/LandingPage/Footer";
import HomePage from "@/components/LandingPage/HomePage";
import InvestorPage from "@/components/LandingPage/InvestorPage";
import SharePage from "@/components/LandingPage/SharePage";
import StartCalculating from "@/components/LandingPage/StartCalculating";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HomePage />
      <InvestorPage />
      <SharePage />
      <StartCalculating />
      <Footer />
    </main>
  )
}
