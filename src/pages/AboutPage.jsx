import { useContext } from "react";

import { LanguageContext } from "../context/LanguageContext";

function AboutPage() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="about-page">

      <section className="about-hero">

        <div className="about-hero-content">
          <span className="section-small-title">
            🍽️ {t.about.badge}
          </span>

          <h1>
            {t.about.title}
          </h1>

          <p>{t.about.description}</p>
        </div>

      </section>


      <section className="about-grid">

        <div className="about-card">
          <div className="about-icon">
            🧆
          </div>

          <h3>{t.about.syrianTitle}</h3>

          <p>{t.about.syrianDescription}</p>
        </div>


        <div className="about-card">
          <div className="about-icon">
            🍢
          </div>

          <h3>{t.about.turkishTitle}</h3>

          <p>{t.about.turkishDescription}</p>
        </div>


        <div className="about-card">
          <div className="about-icon">
            🍰
          </div>

          <h3>{t.about.dessertsTitle}</h3>

          <p>{t.about.dessertsDescription}</p>
        </div>

      </section>


      <section className="about-story">

        <div>
          <span className="section-small-title">
            {t.about.ideaBadge}
          </span>

          <h2>
            {t.about.ideaTitle}
          </h2>

          <p>{t.about.ideaParagraph1}</p>

          <p>{t.about.ideaParagraph2}</p>

          <p>{t.about.ideaParagraph3}</p>
        </div>

      </section>

    </div>
  );
}

export default AboutPage;
