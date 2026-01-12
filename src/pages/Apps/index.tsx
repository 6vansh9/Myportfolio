import Footer from "@/components/Footer";
import MaxWidthContainer from "@/components/MaxWidthContainer";
import AppsRoutes from "./AppsRoutes";


export default function Apps() {

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
