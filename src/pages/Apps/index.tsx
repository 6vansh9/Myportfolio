import Footer from "@/components/Footer";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import AppsRoutes from "./AppsRoutes";
import useSEO from "@/hooks/useSEO";


export default function Apps() {
  useSEO({
    title: "Apps",
    description: "Explore web apps and tools built by Vansh Aggarwal. Interactive projects showcasing Front-End Development and web engineering skills.",
    path: "/apps",
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="w-full flex-1">
        <div className="h-[145px]" />

        <MaxWidthContainer>
          <AppsRoutes />
        </MaxWidthContainer>

        <div className="h-20" />
      </div>

      <Footer />
    </div>
  );
}
