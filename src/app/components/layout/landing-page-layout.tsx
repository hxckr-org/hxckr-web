import Navbar from "@/app/components/primitives/navbar";
import Footer from "@/app/components/sections/footer";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex text-black flex-col items-center justify-between mx-auto font-p22mackinac">
      <div className="w-full">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
}
