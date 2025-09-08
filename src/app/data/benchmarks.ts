// benchmarksByCountry.ts
export const benchmarksByCountry: Record<string, { facebook: { cpc: number, cpm: number }, tiktok: { cpc: number, cpm: number } }> = {
  global: {
    facebook: { cpc: 0.70, cpm: 12.74 },
    tiktok: { cpc: 0.50, cpm: 6.00 }
  },
  peru: {
    facebook: { cpc: 0.35, cpm: 5.50 },
    tiktok: { cpc: 0.20, cpm: 3.80 }
  },
  mexico: {
    facebook: { cpc: 0.40, cpm: 6.00 },
    tiktok: { cpc: 0.25, cpm: 4.20 }
  },
  espana: {
    facebook: { cpc: 0.65, cpm: 10.00 },
    tiktok: { cpc: 0.40, cpm: 6.50 }
  },
  usa: {
    facebook: { cpc: 1.20, cpm: 18.00 },
    tiktok: { cpc: 0.80, cpm: 12.00 }
  }
};
