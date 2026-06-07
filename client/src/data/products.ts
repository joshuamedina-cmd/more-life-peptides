export type Product = {
  slug: string;
  name: string;
  dose: string;
  price: number;
  inStock: boolean;
  category: string;
  highlights: string[];
  description: string;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
};

export const PRODUCTS: Product[] = [
  // Best sellers
  { slug: "glp-3-rt-30mg", name: "GLP-3 (RT)", dose: "30MG", price: 200, inStock: true, category: "GLP", bestseller: true,
    highlights: ["Advanced triple-receptor research compound", "Targets metabolic & weight-management pathways", "99%+ analytical purity, COA verified"],
    description: "GLP-3 (RT) 30MG is a next-generation triple-agonist research peptide used to study glucose metabolism, appetite signalling, and lipid regulation. Each vial is lyophilized in a controlled domestic facility and verified by an independent third-party laboratory for purity and content." },
  { slug: "glow-70mg", name: "GLOW", dose: "70MG", price: 145, inStock: true, category: "Blends", bestseller: true,
    highlights: ["GHK-Cu, BPC-157 & TB-500 blended formulation", "Studied for tissue regeneration & skin research", "Lyophilized for stability and reconstitution"],
    description: "GLOW 70MG is a research blend combining GHK-Cu, BPC-157, and TB-500 to support investigations into tissue repair, dermal renewal, and recovery. Produced in U.S.-based laboratories and supplied with batch-specific certificates of analysis." },
  { slug: "wolverine-20mg", name: "WOLVERINE", dose: "20MG", price: 130, inStock: true, category: "Blends", bestseller: true,
    highlights: ["BPC-157 + TB-500 dual blend", "Designed for recovery-focused research", "Lyophilized, sterile-filled vials"],
    description: "WOLVERINE 20MG combines BPC-157 and TB-500 in a single research vial. Commonly used in studies of soft-tissue repair, connective-tissue modeling, and recovery pathways." },
  { slug: "tesamorelin-10mg", name: "TESAMORELIN", dose: "10MG", price: 95, inStock: true, category: "Growth", bestseller: true,
    highlights: ["GHRH analog used in metabolic research", "Studied for visceral adipose modulation", "Third-party verified for purity"],
    description: "TESAMORELIN 10MG is a synthetic GHRH analog used in research focused on growth-hormone axis regulation and lipid metabolism." },
  { slug: "ghk-cu-100mg", name: "GHK-Cu", dose: "100MG", price: 90, inStock: true, category: "Cosmetic", bestseller: true,
    highlights: ["Copper peptide complex", "Used in skin and tissue research", "High-concentration 100MG vial"],
    description: "GHK-Cu 100MG is a copper-binding tripeptide widely used in dermal and tissue-research applications." },
  { slug: "mots-c-10mg", name: "MOTS-C", dose: "10MG", price: 70, inStock: true, category: "Metabolic", bestseller: true,
    highlights: ["Mitochondrial-derived research peptide", "Studied for metabolic homeostasis", "Sterile lyophilized powder"],
    description: "MOTS-C 10MG is a mitochondrial-derived peptide used in studies of cellular energy regulation and metabolic function." },
  // New arrivals
  { slug: "cagrilintide-10mg", name: "CAGRILINTIDE", dose: "10MG", price: 150, inStock: true, category: "GLP", newArrival: true,
    highlights: ["Long-acting amylin analog", "Studied alongside GLP-class compounds", "Lyophilized research vial"],
    description: "CAGRILINTIDE 10MG is a long-acting amylin analog used in research focused on appetite and satiety pathways." },
  { slug: "thymosin-alpha-1-10mg", name: "THYMOSIN ALPHA-1", dose: "10MG", price: 120, inStock: true, category: "Immune", newArrival: true,
    highlights: ["28-amino-acid immunomodulatory peptide", "Used in immune-research applications", "High-purity lyophilized vial"],
    description: "THYMOSIN ALPHA-1 10MG is a 28-amino-acid peptide used in immune-system research studies." },
  { slug: "hexarelin-10mg", name: "HEXARELIN", dose: "10MG", price: 95, inStock: true, category: "Growth", newArrival: true,
    highlights: ["Potent GH secretagogue", "Used in growth-axis studies", "Third-party purity tested"],
    description: "HEXARELIN 10MG is a potent growth-hormone-releasing peptide used in research on the somatotropic axis." },
  { slug: "igf-1-lr3-1mg", name: "IGF-1 LR3", dose: "1MG", price: 80, inStock: true, category: "Growth", newArrival: true,
    highlights: ["Long-R3 insulin-like growth factor analog", "Studied for anabolic signaling research", "Lyophilized for stability"],
    description: "IGF-1 LR3 1MG is an extended-half-life analog of IGF-1 used in research applications studying anabolic signaling." },
  { slug: "aod-9604-5mg", name: "AOD-9604", dose: "5MG", price: 75, inStock: true, category: "Metabolic", newArrival: true,
    highlights: ["Modified GH fragment (176-191)", "Studied for lipolytic research", "Sterile-filled vial"],
    description: "AOD-9604 5MG is a modified fragment of human growth hormone (176-191) used in research on fat metabolism." },
  { slug: "oxytocin-5mg", name: "OXYTOCIN", dose: "5MG", price: 65, inStock: true, category: "Neuro", newArrival: true,
    highlights: ["Nonapeptide used in social-behavior research", "Studied in attachment & bonding pathways", "Lyophilized form"],
    description: "OXYTOCIN 5MG is a nonapeptide used in research focused on neuroendocrine and social-behavior pathways." },
  // Remainder of catalog
  { slug: "5-amino-1mq-50mg", name: "5-AMINO-1MQ", dose: "50MG", price: 145, inStock: false, category: "Metabolic", highlights: ["NNMT inhibitor research compound","Studied for metabolic & adipose research","Currently out of stock"], description: "5-AMINO-1MQ 50MG is an NNMT inhibitor used in metabolic research." },
  { slug: "bac-water-30ml", name: "BAC WATER", dose: "30ML", price: 25, inStock: true, category: "Supplies", highlights: ["Bacteriostatic water for reconstitution","0.9% benzyl alcohol","30ML multi-dose vial"], description: "Bacteriostatic water for reconstitution of lyophilized research peptides." },
  { slug: "bpc-157-10mg", name: "BPC-157", dose: "10MG", price: 75, inStock: true, category: "Recovery", highlights: ["15-amino-acid pentadecapeptide","Used in tissue-recovery research","Third-party purity tested"], description: "BPC-157 10MG is a pentadecapeptide used in research on tissue repair." },
  { slug: "bpc-157-5mg", name: "BPC-157", dose: "5MG", price: 60, inStock: true, category: "Recovery", highlights: ["15-amino-acid pentadecapeptide","Used in tissue-recovery research","5MG research vial"], description: "BPC-157 5MG is a pentadecapeptide used in research on tissue repair." },
  { slug: "cjc-ipa-10mg", name: "CJC / IPA", dose: "10MG", price: 90, inStock: true, category: "Growth", highlights: ["CJC-1295 + Ipamorelin blend","Used in GH-axis research","Lyophilized research vial"], description: "CJC-1295 and Ipamorelin combined blend for growth-hormone axis research." },
  { slug: "dsip-10mg", name: "DSIP", dose: "10MG", price: 90, inStock: true, category: "Neuro", highlights: ["Delta sleep-inducing peptide","Studied in sleep & stress research","High-purity lyophilized form"], description: "DSIP 10MG is a delta sleep-inducing peptide used in neuroscience research." },
  { slug: "epithalon-50mg", name: "EPITHALON", dose: "50MG", price: 135, inStock: true, category: "Longevity", highlights: ["Tetrapeptide used in longevity research","Studied for telomerase activity","50MG vial"], description: "EPITHALON 50MG is a tetrapeptide used in longevity-research applications." },
  { slug: "ghrp-6-10mg", name: "GHRP-6", dose: "10MG", price: 60, inStock: true, category: "Growth", highlights: ["Hexapeptide GH secretagogue","Used in growth-axis research","Lyophilized vial"], description: "GHRP-6 10MG is a hexapeptide growth-hormone-releasing peptide." },
  { slug: "glp-1-sm-10mg", name: "GLP-1 (SM)", dose: "10MG", price: 100, inStock: true, category: "GLP", highlights: ["GLP-1 receptor agonist research peptide","Used in metabolic research","Sterile lyophilized vial"], description: "GLP-1 (SM) 10MG is a GLP-1 receptor agonist for metabolic research." },
  { slug: "glp-1-sm-20mg", name: "GLP-1 (SM)", dose: "20MG", price: 155, inStock: true, category: "GLP", highlights: ["GLP-1 receptor agonist research peptide","20MG concentrated vial","Third-party purity tested"], description: "GLP-1 (SM) 20MG is a higher-concentration GLP-1 receptor agonist." },
  { slug: "glp-2-tz-20mg", name: "GLP-2 (TZ)", dose: "20MG", price: 165, inStock: true, category: "GLP", highlights: ["GLP-2 analog research peptide","Studied for intestinal-research applications","Lyophilized form"], description: "GLP-2 (TZ) 20MG is a GLP-2 analog used in research." },
  { slug: "glp-2-tz-30mg", name: "GLP-2 (TZ)", dose: "30MG", price: 185, inStock: true, category: "GLP", highlights: ["GLP-2 analog research peptide","Higher-concentration 30MG vial","Third-party purity verified"], description: "GLP-2 (TZ) 30MG is a higher-concentration GLP-2 analog for research." },
  { slug: "glp-3-rt-15mg", name: "GLP-3 (RT)", dose: "15MG", price: 155, inStock: true, category: "GLP", highlights: ["Triple-receptor research compound","15MG vial","COA verified"], description: "GLP-3 (RT) 15MG is a triple-receptor research compound." },
  { slug: "glutathione-1500mg", name: "GLUTATHIONE", dose: "1500MG", price: 110, inStock: true, category: "Antioxidant", highlights: ["High-dose antioxidant research compound","1500MG bulk vial","Lyophilized form"], description: "Glutathione 1500MG is a high-concentration antioxidant for research applications." },
  { slug: "ipamorelin-10mg", name: "IPAMORELIN", dose: "10MG", price: 100, inStock: true, category: "Growth", highlights: ["Selective GH secretagogue","Used in growth-axis research","Lyophilized research vial"], description: "IPAMORELIN 10MG is a selective GH secretagogue for research." },
  { slug: "klow-80mg", name: "KLOW", dose: "80MG", price: 175, inStock: true, category: "Blends", highlights: ["GHK-Cu, KPV, BPC-157 & TB-500 blend","Comprehensive research formulation","Lyophilized vial"], description: "KLOW 80MG is a comprehensive research blend." },
  { slug: "melanotan-2-10mg", name: "MELANOTAN-2", dose: "10MG", price: 70, inStock: true, category: "Cosmetic", highlights: ["Synthetic melanocortin analog","Used in pigmentation research","Lyophilized form"], description: "Melanotan-2 10MG is a melanocortin analog for research." },
  { slug: "nad-1000mg", name: "NAD+", dose: "1000MG", price: 105, inStock: true, category: "Longevity", highlights: ["High-dose NAD+ research compound","1000MG bulk vial","Lyophilized form"], description: "NAD+ 1000MG is a high-dose research compound used in cellular-energy research." },
  { slug: "pt-141-10mg", name: "PT-141", dose: "10MG", price: 80, inStock: true, category: "Neuro", highlights: ["Melanocortin receptor agonist","Used in neuroendocrine research","Lyophilized vial"], description: "PT-141 10MG is a melanocortin receptor agonist research peptide." },
  { slug: "selank-10mg", name: "SELANK", dose: "10MG", price: 90, inStock: true, category: "Neuro", highlights: ["Synthetic heptapeptide","Used in anxiolytic research","Lyophilized form"], description: "Selank 10MG is a heptapeptide for neuroscience research." },
  { slug: "semax-10mg", name: "SEMAX", dose: "10MG", price: 90, inStock: true, category: "Neuro", highlights: ["Synthetic heptapeptide","Used in nootropic research","Lyophilized vial"], description: "Semax 10MG is a heptapeptide for nootropic research." },
  { slug: "sermorelin-10mg", name: "SERMORELIN", dose: "10MG", price: 125, inStock: true, category: "Growth", highlights: ["GHRH analog research peptide","Studied in growth-axis research","Third-party verified"], description: "Sermorelin 10MG is a GHRH analog for research." },
  { slug: "sermorelin-5mg", name: "SERMORELIN", dose: "5MG", price: 90, inStock: true, category: "Growth", highlights: ["GHRH analog research peptide","5MG research vial","Lyophilized form"], description: "Sermorelin 5MG is a GHRH analog for research." },
  { slug: "ss-31-10mg", name: "SS-31", dose: "10MG", price: 60, inStock: true, category: "Longevity", highlights: ["Mitochondria-targeted research peptide","Studied in cellular-energy research","Lyophilized vial"], description: "SS-31 10MG is a mitochondria-targeted research peptide." },
  { slug: "tb-500-10mg", name: "TB-500", dose: "10MG", price: 75, inStock: true, category: "Recovery", highlights: ["Synthetic thymosin beta-4 fragment","Used in tissue-recovery research","Lyophilized form"], description: "TB-500 10MG is a synthetic thymosin beta-4 fragment for research." },
  { slug: "wolverine-10mg", name: "WOLVERINE", dose: "10MG", price: 95, inStock: true, category: "Blends", highlights: ["BPC-157 + TB-500 blend","10MG research vial","Lyophilized form"], description: "WOLVERINE 10MG is a BPC-157 and TB-500 research blend." },
];

export const BESTSELLERS = PRODUCTS.filter(p => p.bestseller);
export const NEW_ARRIVALS = PRODUCTS.filter(p => p.newArrival);
