export const COUNTRIES = [
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "BO", name: "Bolivia", dial: "+591" },
  { code: "BR", name: "Brasil", dial: "+55" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "CR", name: "Costa Rica", dial: "+506" },
  { code: "CU", name: "Cuba", dial: "+53" },
  { code: "EC", name: "Ecuador", dial: "+593" },
  { code: "SV", name: "El Salvador", dial: "+503" },
  { code: "ES", name: "España", dial: "+34" },
  { code: "GT", name: "Guatemala", dial: "+502" },
  { code: "HN", name: "Honduras", dial: "+504" },
  { code: "MX", name: "México", dial: "+52" },
  { code: "NI", name: "Nicaragua", dial: "+505" },
  { code: "PA", name: "Panamá", dial: "+507" },
  { code: "PY", name: "Paraguay", dial: "+595" },
  { code: "PE", name: "Perú", dial: "+51" },
  { code: "PR", name: "Puerto Rico", dial: "+1" },
  { code: "DO", name: "República Dominicana", dial: "+1" },
  { code: "UY", name: "Uruguay", dial: "+598" },
  { code: "VE", name: "Venezuela", dial: "+58" },
];

export const REFERRAL_SOURCES = ["YouTube", "TikTok", "Discord", "Recomendación", "Otro"];

export const countryByCode = (code) => COUNTRIES.find((c) => c.code === code);
