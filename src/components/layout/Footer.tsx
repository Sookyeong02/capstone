import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image
  src="/logo.png"
  alt="BuildFolio Logo"
  width={0}
  height={0}
  unoptimized
  style={{
    width: "120px",
    height: "auto",
    marginBottom: "10px"
  }}
/>
          <p style={{ marginTop: "10px" }}>© 2025 All Rights Reserved.</p>
          <p style={{ marginTop: "5px", lineHeight: "1.6", textAlign: "center" }}>
            52, Hohyeon-ro 489beon-gil, Sosa-gu, Bucheon-si,<br />
            Gyeonggi-do, Republic of Korea
          </p>
        </div>
      </div>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  backgroundColor: "#0A1B2D",
  color: "#fff",
  textAlign: "center",
  padding: "40px 20px",
  fontFamily: "PretendardSemiBold", 
};

const containerStyle: React.CSSProperties = {
  maxWidth: "800px",
  margin: "0 auto",
};

export default Footer;
