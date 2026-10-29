// Main JavaScript for Scriptural Kingdom of God Web Platform

let allVerses = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('../js/verses_data.json').catch(() => fetch('js/verses_data.json'));
    if (res.ok) {
      allVerses = await res.json();
    }
  } catch (e) {
    console.warn('Verses data loaded dynamically or embedded.');
  }

  // Setup search input filter on tables
  const searchInput = document.getElementById('tableSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      filterTableRows(q);
    });
  }
});

function filterTableRows(query) {
  const table = document.querySelector('table.canonical-table');
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  
  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (!query || text.includes(query)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function filterTestament(testament) {
  const table = document.querySelector('table.canonical-table');
  if (!table) return;
  const rows = table.querySelectorAll('tbody tr');
  
  // update buttons
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  rows.forEach(row => {
    const rowTestament = row.getAttribute('data-testament');
    if (testament === 'ALL' || rowTestament === testament) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Modal Quick Preview
function openModal(slug) {
  const v = allVerses.find(item => item.slug === slug);
  if (!v) {
    // If json not yet fetched, fallback to direct page navigation
    window.location.href = `../texts/${slug}.html`;
    return;
  }

  const overlay = document.getElementById('modalOverlay');
  const content = document.getElementById('modalContent');
  if (!overlay || !content) return;

  content.innerHTML = `
    <div style="margin-bottom:1.5rem; border-bottom:2px solid #e2e8f0; padding-bottom:1rem;">
      <span class="badge ${v.badge_class}">${v.category}</span>
      <h2 style="font-family:'Merriweather',serif; color:#152238; margin-top:0.5rem;">${v.citation}</h2>
      <p style="font-size:0.88rem; color:#64748b; font-family:'Merriweather',serif;">${v.locus}</p>
    </div>

    <div style="background:#f8fafc; padding:1rem; border-radius:6px; margin-bottom:1.5rem; border:1px solid #e2e8f0;">
      <h4 style="font-size:0.75rem; text-transform:uppercase; color:#64748b; margin-bottom:0.25rem;">Scripture Text</h4>
      <p style="margin-bottom:0.5rem; font-size:0.92rem;"><strong>Douay-Rheims:</strong> ${v.dr_terms}</p>
      <p style="font-family:'Merriweather',serif; font-style:italic; font-size:0.9rem; color:#1e293b;"><strong>Vulgate:</strong> ${v.vulgate_text}</p>
    </div>

    <h3 style="font-family:'Merriweather',serif; color:#152238; margin-bottom:0.75rem; font-size:1.15rem;">Parallel Thomistic Exegesis</h3>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
      <div style="background:#fdfcfb; border:1px solid #e2e8f0; border-radius:6px; padding:1rem;">
        <h4 style="color:#7c2d12; font-family:'Merriweather',serif; font-size:0.85rem; text-transform:uppercase; margin-bottom:0.5rem;">Literal: Textus Latinus</h4>
        <p style="font-family:'Merriweather',serif; font-style:italic; font-size:0.92rem; color:#1e293b;">${v.lit_lat}</p>
      </div>
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:1rem;">
        <h4 style="color:#152238; font-size:0.85rem; text-transform:uppercase; margin-bottom:0.5rem;">Literal: English Exegesis</h4>
        <p style="font-size:0.92rem; color:#27272a;">${v.lit_eng}</p>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
      <div style="background:#fdfcfb; border:1px solid #e2e8f0; border-radius:6px; padding:1rem;">
        <h4 style="color:#7c2d12; font-family:'Merriweather',serif; font-size:0.85rem; text-transform:uppercase; margin-bottom:0.5rem;">Spiritual: Textus Latinus</h4>
        <p style="font-family:'Merriweather',serif; font-style:italic; font-size:0.92rem; color:#1e293b;">${v.spi_lat}</p>
      </div>
      <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:6px; padding:1rem;">
        <h4 style="color:#152238; font-size:0.85rem; text-transform:uppercase; margin-bottom:0.5rem;">Spiritual: English Exegesis</h4>
        <p style="font-size:0.92rem; color:#27272a;">${v.spi_eng}</p>
      </div>
    </div>

    <div style="text-align:center; margin-top:1.5rem; padding-top:1rem; border-top:1px solid #e2e8f0;">
      <a href="../texts/${v.slug}.html" class="subpage-link-btn" style="padding:0.6rem 1.25rem; font-size:0.9rem;">
        Open Full Dedicated Subpage ↗
      </a>
    </div>
  `;

  overlay.style.display = 'block';
}

function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.style.display = 'none';
}
