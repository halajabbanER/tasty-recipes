import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";

function LanguageSelector({ variant = "dropdown" }) {
  const { language, setLanguage, languages, t } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangObj = languages.find((l) => l.code === language) || languages[0];

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (variant === "segmented") {
    return (
      <div className="language-segmented" role="radiogroup" aria-label={t.navbar?.selectLanguage || "Select language"}>
        {languages.map((item) => {
          const isActive = item.code === language;
          return (
            <button
              key={item.code}
              type="button"
              role="radio"
              aria-checked={isActive}
              className={`lang-segment-btn ${isActive ? "active" : ""}`}
              onClick={() => setLanguage(item.code)}
            >
              <span className="lang-flag">{item.flag}</span>
              <span className="lang-name">{item.nativeName}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="language-selector-wrapper" ref={dropdownRef}>
      <button
        type="button"
        className={`language-trigger-btn ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t.navbar?.selectLanguage || "Select language"}
      >
        <span className="lang-flag">{currentLangObj.flag}</span>
        <span className="lang-label">{currentLangObj.nativeName}</span>
        <svg
          className={`lang-chevron ${isOpen ? "rotate" : ""}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown-menu" role="listbox" tabIndex={-1}>
          {languages.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`language-option ${isSelected ? "selected" : ""}`}
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
              >
                <span className="lang-flag">{item.flag}</span>
                <span className="lang-native">{item.nativeName}</span>
                <span className="lang-sub">{item.name}</span>
                {isSelected && (
                  <span className="lang-check" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
