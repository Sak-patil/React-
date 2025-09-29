import React from 'react';
import '../style/TrustSection.css'; // The styles for this component

// 1. IMPORT THE IMAGES
// IMPORTANT: Update these paths to the correct location of your downloaded PNG files
import nistLogo from '../assets/logos/1.png'; 
import pythonLogo from '../assets/logos/2.png'; 
// import rustLogo from '../assets/logos/3.png';
import linuxLogo from '../assets/logos/4.png';
import jwsLogo from '../assets/logos/5.png'; 
import padesLogo from '../assets/logos/6.png'; 


const TrustSection = () => {
  // 2. UPDATE THE logos ARRAY to include the imported image and alt text
  const logos = [
    { name: 'NIST', image: nistLogo, alt: 'NIST SP 800-88 Standard' },
    { name: 'Python', image: pythonLogo, alt: 'Python Programming Language' },
    // { name: 'Rust', image: rustLogo, alt: 'Rust Programming Language' },
    { name: 'Linux', image: linuxLogo, alt: 'Linux Operating System' },
    { name: 'JWS', image: jwsLogo, alt: 'JWS' },
    { name: 'PAdES', image: padesLogo, alt: 'PDF Advanced Electronic Signatures' },
  ];

  // We duplicate the logos to create the seamless infinite scroll effect
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section id="trust" className="trust-section">
      <div className="container trust-section__container">
        <h2 className="trust-section__title animate-fade-in">
          Built on Trusted Standards & Open Technologies
        </h2>

        <div className="trust-carousel animate-fade-in">
          {/* Decorative Arrow on the left (kept commented out as you intended) */}

          {/* The main scroller element */}
          <div className="trust-scroller">
            <div className="trust-scroller__track">
              {/* 3. RENDER THE IMAGES instead of the text name */}
              {duplicatedLogos.map((logo, index) => (
                <div key={index} className="trust-scroller__logo">
                  <img 
                    src={logo.image} 
                    alt={logo.alt} 
                    className="logo-image"
                  />
                  {/* You can optionally add a <p>{logo.name}</p> below the image if you want the text label too */}
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative Arrow on the right (kept commented out as you intended) */}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
