// lib/getTools.ts
export async function getTools() {
  const sheetUrl = "https://docs.google.com/spreadsheets/d/1l7ZKzqsbcttmblfUc-Ss9QOrfpcOGGn4TGongkua3g8/edit?gid=4717092#gid=4717092";
  const res = await fetch(sheetUrl, { next: { revalidate: 60 } });
  const csv = await res.text();

  const lines = csv.split("\n").filter(Boolean);
  const headers = lines[0].split(",");

  const tools = lines.slice(1).map(line => {
    const cols = line.split(",");
    const entry: any = {};
    headers.forEach((header, idx) => {
      const raw = cols[idx] || "";
      // Campos que son arrays (listas simples)
      if (["tags", "pros", "cons", "platforms"].includes(header)) {
        entry[header] = raw.split(";").map(s => s.trim()).filter(Boolean);
      }
      // Campos con JSON
      else if (["pricing", "reviews", "courses", "screenshots", "youtubeChannels", "creators", "tutorials", "deals", "communityLinks", "faq"].includes(header)) {
        try {
          entry[header] = raw ? JSON.parse(raw) : [];
        } catch {
          entry[header] = [];
        }
      } else {
        entry[header] = raw;
      }
    });
    return entry;
  });

  return tools;
}
