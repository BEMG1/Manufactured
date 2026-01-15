import { Product, Category } from "./types";

export const categories: Category[] = [
  {
    id: "jabones",
    name: "Jabones",
    description: "Jabones industriales y de uso general",
    icon: "🧼",
  },
  {
    id: "desengrasantes",
    name: "Desengrasantes",
    description: "Desengrasantes potentes para industria y hogar",
    icon: "💧",
  },
  {
    id: "desinfectantes",
    name: "Desinfectantes",
    description: "Desinfectantes de amplio espectro",
    icon: "🦠",
  },
  {
    id: "limpiadores",
    name: "Limpiadores",
    description: "Limpiadores multiusos y especializados",
    icon: "✨",
  },
];

export const products: Product[] = [
  // Jabones
  {
    id: "jab-001",
    name: "Jabón Industrial Ultra",
    description:
      "Jabón de alta potencia para limpieza industrial. Ideal para talleres, fábricas y áreas de alto tráfico.",
    category: "jabones",
    price: 45000,
    presentation: "Galón (3.8L)",
    features: [
      "Alta concentración",
      "Biodegradable",
      "pH neutro",
      "Rendimiento superior",
    ],
    usage:
      "Diluir 1:10 en agua. Aplicar con mopa o paño. Enjuagar si es necesario.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?w=400",
  },
  {
    id: "jab-002",
    name: "Jabón Antibacterial Premium",
    description:
      "Jabón líquido antibacterial con agentes desinfectantes. Elimina 99.9% de bacterias.",
    category: "jabones",
    price: 32000,
    presentation: "Botella 1L",
    features: [
      "Elimina 99.9% bacterias",
      "Suave con la piel",
      "Aroma fresco",
      "Dermatológicamente probado",
    ],
    usage:
      "Aplicar directamente en manos húmedas. Frotar por 20 segundos. Enjuagar.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?w=400",
  },
  {
    id: "jab-003",
    name: "Jabón Líquido Multiusos",
    description:
      "Jabón versátil para múltiples superficies. Económico y eficiente.",
    category: "jabones",
    price: 28000,
    presentation: "Galón (3.8L)",
    features: ["Multiusos", "Económico", "Bajo residuo", "Fácil enjuague"],
    usage: "Diluir según necesidad. Aplicar, frotar y enjuagar.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1563865436874-9aef32095fad?w=400",
  },

  // Desengrasantes
  {
    id: "des-001",
    name: "Desengrasante Heavy Duty",
    description:
      "Desengrasante de máxima potencia para grasa industrial pesada. Acción rápida y profunda.",
    category: "desengrasantes",
    price: 52000,
    presentation: "Galón (3.8L)",
    features: [
      "Máxima potencia",
      "Acción rápida",
      "Uso industrial",
      "Concentrado",
    ],
    usage:
      "Diluir 1:5 para grasa pesada. Aplicar, dejar actuar 5 min, enjuagar.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400",
  },
  {
    id: "des-002",
    name: "Desengrasante Cocina Pro",
    description:
      "Desengrasante especializado para cocinas comerciales. Seguro para contacto con alimentos.",
    category: "desengrasantes",
    price: 38000,
    presentation: "Botella 1L con spray",
    features: [
      "Grado alimenticio",
      "Sin residuos tóxicos",
      "Aroma cítrico",
      "Fácil aplicación",
    ],
    usage: "Rociar sobre superficie. Dejar actuar 2-3 min. Limpiar con paño.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400",
  },
  {
    id: "des-003",
    name: "Desengrasante Cítrico Natural",
    description:
      "Desengrasante a base de cítricos naturales. Ecológico y efectivo.",
    category: "desengrasantes",
    price: 42000,
    presentation: "Galón (3.8L)",
    features: ["Base natural", "Biodegradable", "Aroma agradable", "Ecológico"],
    usage: "Diluir 1:8 en agua. Aplicar y frotar. Enjuagar con agua.",
    inStock: false,
    imageUrl:
      "https://images.unsplash.com/photo-1590502593747-42a996133562?w=400",
  },

  // Desinfectantes
  {
    id: "dis-001",
    name: "Desinfectante Multisuperficie",
    description:
      "Desinfectante de amplio espectro para todo tipo de superficies. Elimina virus, bacterias y hongos.",
    category: "desinfectantes",
    price: 48000,
    presentation: "Galón (3.8L)",
    features: [
      "Amplio espectro",
      "Elimina virus y bacterias",
      "Acción prolongada",
      "Aroma fresco",
    ],
    usage: "Diluir 1:20 para desinfección general. Aplicar y dejar secar.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400",
  },
  {
    id: "dis-002",
    name: "Desinfectante de Pisos Hospital",
    description:
      "Desinfectante de grado hospitalario para pisos. Máxima protección antimicrobiana.",
    category: "desinfectantes",
    price: 55000,
    presentation: "Galón (3.8L)",
    features: [
      "Grado hospitalario",
      "Certificado sanitario",
      "Larga duración",
      "No corrosivo",
    ],
    usage: "Diluir 1:15 en agua. Trapear y dejar secar. No enjuagar.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=400",
  },

  // Limpiadores
  {
    id: "lim-001",
    name: "Limpiador de Vidrios Crystal",
    description:
      "Limpiador de vidrios profesional. Sin rayas, brillo perfecto.",
    category: "limpiadores",
    price: 25000,
    presentation: "Botella 750ml con spray",
    features: ["Sin rayas", "Secado rápido", "Brillo perfecto", "Aroma fresco"],
    usage: "Rociar sobre vidrio. Limpiar con paño microfibra.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400",
  },
  {
    id: "lim-002",
    name: "Limpiador Multiusos Total",
    description:
      "Limpiador todo en uno para cualquier superficie. Versátil y eficiente.",
    category: "limpiadores",
    price: 35000,
    presentation: "Galón (3.8L)",
    features: [
      "Todo en uno",
      "Múltiples superficies",
      "Económico",
      "Fácil de usar",
    ],
    usage: "Diluir 1:10. Aplicar con paño o spray. Limpiar y secar.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=400",
  },
  {
    id: "lim-003",
    name: "Limpiador de Baños Intense",
    description:
      "Limpiador especializado para baños. Elimina sarro, moho y manchas difíciles.",
    category: "limpiadores",
    price: 32000,
    presentation: "Botella 1L",
    features: ["Elimina sarro", "Anti-moho", "Desodoriza", "Acción profunda"],
    usage: "Aplicar directamente. Dejar actuar 5 min. Frotar y enjuagar.",
    inStock: true,
    imageUrl:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
  },
];
