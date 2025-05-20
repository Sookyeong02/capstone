import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0A1B2D] px-5 py-10 text-center font-[PretendardSemiBold] text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <Image
          src="/images/logo.png"
          alt="BuildFolio Logo"
          width={0}
          height={0}
          unoptimized
          className="mb-4 w-28 sm:w-32 md:w-36"
        />
        <p className="mb-2 text-sm sm:text-base">© 2025 All Rights Reserved.</p>
        <p className="text-center text-xs leading-relaxed sm:text-sm">
          52, Hohyeon-ro 489beon-gil, Sosa-gu, Bucheon-si,
          <br />
          Gyeonggi-do, Republic of Korea
        </p>
      </div>
    </footer>
  );
};

export default Footer;
