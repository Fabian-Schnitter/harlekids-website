// Utility-Funktionen zum Laden von CMS-Content

// Lade alle Event-Dateien
export const loadEvents = async () => {
  try {
    const eventFiles = import.meta.glob('/src/content/termine/*.md', { 
      eager: true, 
      as: 'raw' 
    });
    
    const events = [];

    for (const path in eventFiles) {
      const content = eventFiles[path];
      const parsed = parseFrontmatter(content);
      
      // Nur veröffentlichte Events
      if (parsed.published !== false && parsed.published !== 'false') {
        events.push({
          ...parsed,
          slug: path.split('/').pop().replace('.md', '')
        });
      }
    }

    // Nach Datum sortieren (neueste zuerst)
    return events.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.warn('Keine Events gefunden:', error);
    return [];
  }
};

// Lade alle Blog-Posts
export const loadBlogPosts = async () => {
  try {
    const blogFiles = import.meta.glob('/src/content/blog/*.md', { 
      eager: true, 
      as: 'raw' 
    });
    
    const posts = [];

    for (const path in blogFiles) {
      const content = blogFiles[path];
      const parsed = parseFrontmatter(content);
      
      // Nur veröffentlichte Posts
      if (parsed.published !== false && parsed.published !== 'false') {
        posts.push({
          ...parsed,
          slug: path.split('/').pop().replace('.md', '')
        });
      }
    }

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.warn('Keine Blog-Posts gefunden:', error);
    return [];
  }
};

// Lade Ferienprogramme
export const loadFerienprogramme = async () => {
  try {
    const ferienFiles = import.meta.glob('/src/content/ferienprogramme/*.md', { 
      eager: true, 
      as: 'raw' 
    });
    
    const programme = [];

    for (const path in ferienFiles) {
      const content = ferienFiles[path];
      const parsed = parseFrontmatter(content);
      
      if (parsed.published !== false && parsed.published !== 'false') {
        programme.push({
          ...parsed,
          slug: path.split('/').pop().replace('.md', '')
        });
      }
    }

    return programme.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  } catch (error) {
    console.warn('Keine Ferienprogramme gefunden:', error);
    return [];
  }
};

// Lade Kontakt-Einstellungen
export const loadContactSettings = async () => {
  try {
    const settings = await import('/src/content/settings/contact.json');
    return settings.default || settings;
  } catch (error) {
    console.warn('Kontakt-Einstellungen konnten nicht geladen werden:', error);
    return {
      phone: '+49 123 456789',
      email: 'info@harlekids.de',
      address: 'Musterstraße 123\n12345 Musterstadt'
    };
  }
};

// Einfacher Frontmatter Parser für Markdown-Dateien
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  
  if (!match) {
    return { body: content };
  }
  
  const frontmatterText = match[1];
  const body = match[2];
  
  const frontmatter = {};
  const lines = frontmatterText.split('\n');
  
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    
    // Entferne Anführungszeichen
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    
    // Parse boolean
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    
    // Parse number
    if (!isNaN(value) && value !== '') {
      const num = Number(value);
      if (Number.isFinite(num)) value = num;
    }
    
    frontmatter[key] = value;
  }
  
  frontmatter.body = body.trim();
  return frontmatter;
}

// Konvertiere Markdown zu HTML (einfache Version)
export const markdownToHtml = (markdown) => {
  if (!markdown) return '';
  
  let html = markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-circus-blue hover:underline">$1</a>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br />');
  
  return `<p class="mb-4">${html}</p>`;
};
