import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0A1B2D] text-white text-center py-10 px-5 font-[PretendardSemiBold]">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <Image
          src="/images/logo.png"
          alt="BuildFolio Logo"
          width={0}
          height={0}
          unoptimized
          className="w-28 sm:w-32 md:w-36 mb-4"
        />
        <p className="text-sm sm:text-base mb-2">
          © 2025 All Rights Reserved.
        </p>
        <p className="text-xs sm:text-sm leading-relaxed text-center">
          52, Hohyeon-ro 489beon-gil, Sosa-gu, Bucheon-si,<br />
          Gyeonggi-do, Republic of Korea
        </p>
      </div>
    </footer>
  );
};

export default Footer;
