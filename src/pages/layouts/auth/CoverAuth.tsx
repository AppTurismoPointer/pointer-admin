import logo from "@/assets/logo-white.svg";
import cover from "@/assets/imgs/cover-auth.png";

const CoverAuth = () => {
  return (
    <div
      className="md:flex hidden relative h-full max-h-full flex-1 rounded-2xl bg-primary flex-col gap-4 items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${cover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img src={logo} alt="Logo" className="h-12" />
      <h1 className="text-white font-medium text-3xl">
        Bússola de Experiências
      </h1>
    </div>
  );
};

export { CoverAuth };
