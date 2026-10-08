// MoreLife single-vial retail catalog — single source of truth for cart, checkout, and invoice.
// 1 unit = 1 vial (no box minimum). Edit prices and availability here only.
// The website shows full compound names. The Square invoice shows only the MoreLife invoice number.

export type CatalogItem = {
  id: string;              // SKU
  name: string;            // Full compound name (website only)
  dose: string;            // Amount per vial
  priceCents: number;      // Retail price per vial, in cents
  inStock: boolean;
};

export const CATALOG: CatalogItem[] = [
  { id: "RT-20",   name: "Retatrutide",     dose: "20 mg", priceCents:  4000, inStock: true  },
  { id: "TIRZ-30", name: "Tirzepatide",     dose: "30 mg", priceCents:  4600, inStock: true  },
  { id: "TIRZ-20", name: "Tirzepatide",     dose: "20 mg", priceCents:  3200, inStock: true  },
  { id: "TESA-10", name: "Tesamorelin",     dose: "10 mg", priceCents:  4800, inStock: true  },
  { id: "WOLV-20", name: "Wolverine Blend", dose: "20 mg", priceCents:  5400, inStock: true  },
  { id: "SS31-10", name: "SS-31",           dose: "10 mg", priceCents:  3200, inStock: true  },
  { id: "KPV-10",  name: "KPV",             dose: "10 mg", priceCents:  3000, inStock: true  },
  { id: "MOTS-10", name: "MOTS-c",          dose: "10 mg", priceCents:  2800, inStock: true  },
  { id: "GHK-50",  name: "GHK-Cu",          dose: "50 mg", priceCents:  2200, inStock: true  },
  { id: "KLOW-80", name: "KLOW",            dose: "80 mg", priceCents: 10200, inStock: true  },
  { id: "RT-60",   name: "Retatrutide",     dose: "60 mg", priceCents: 12000, inStock: false },
  { id: "RT-30",   name: "Retatrutide",     dose: "30 mg", priceCents:  6000, inStock: false },
  { id: "RT-10",   name: "Retatrutide",     dose: "10 mg", priceCents:  2000, inStock: false },
  { id: "TIRZ-60", name: "Tirzepatide",     dose: "60 mg", priceCents:  8800, inStock: false },
  { id: "TIRZ-15", name: "Tirzepatide",     dose: "15 mg", priceCents:  2500, inStock: false },
  { id: "TIRZ-10", name: "Tirzepatide",     dose: "10 mg", priceCents:  1800, inStock: false },
];

// Flat-rate shipping in cents, charged once per invoice.
export const SHIPPING_FLAT_CENTS = 1000; // $10.00
export const MAX_QTY_PER_LINE = 100;

export const RUO_NOTICE = "For research use only. Not for human or veterinary use.";

export function findById(id: string): CatalogItem | undefined {
  return CATALOG.find((c) => c.id === id);
}

export function formatUsd(cents: number): string {
  return (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
}
