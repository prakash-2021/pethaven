const Footer = () => {
  return (
    <footer className="bg-[#F16849] py-24">
      <div className="ph-container">
        <div className="flex justify-center items-center flex-col gap-10">
          <img src="/LogoWhite.svg" alt="" />

          <div className="flex items-center gap-2">
            <span className="ph-text-x-large text-[#FFFFFF]">
              Copyright 2025{" "}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF]"></span>
            <span className="ph-text-x-large text-[#FFFFFF]">
              made by prakash
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
