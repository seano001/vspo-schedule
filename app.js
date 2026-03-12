// 言語切り替え
let currentLang = 'ja';

function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-ja]').forEach(el => {
    el.textContent = lang === 'ja' ? el.dataset.ja : el.dataset.en;
  });
}

// Vspo!メンバーデータ（基本情報）
const members = [
  { name: "花芽すみれ", nameEn: "Kaga Sumire", handle: "@vspo_Sumire", img: "https://pbs.twimg.com/profile_images/1234567890/sumire_400x400.jpg" },
  { name: "花芽なずな", nameEn: "Kaga Nazuna", handle: "@vspo_Nazuna", img: "" },
  // → 後でメンバー情報を追加していきます
];

// メンバーカード表示
function renderMembers() {
  const container = document.getElementById('members-container');
  container.innerHTML = members.map(m => `
    <div class="member-card">
      <img src="${m.img || 'https://placehold.co/80x80/2d2d4e/a78bfa?text=' + encodeURIComponent(m.name)}" alt="${m.name}">
      <div class="name">${currentLang === 'ja' ? m.name : m.nameEn}</div>
      <div class="handle">${m.handle}</div>
    </div>
  `).join('');
}

// スケジュールデータ読み込み（Makeが生成するJSONファイルを読む）
async function loadSchedule() {
  try {
    const res = await fetch('schedule.json');
    const data = await res.json();
    renderSchedule(data);
  } catch {
    document.getElementById('schedule-container').innerHTML =
      '<p class="loading">スケジュールデータがまだありません</p>';
  }
}

function renderSchedule(data) {
  const container = document.getElementById('schedule-container');
  if (!data.length) {
    container.innerHTML = '<p class="loading">現在スケジュールはありません</p>';
    return;
  }
  container.innerHTML = data.map(s => `
    <div class="schedule-card">
      <div class="member-icon">
        <img src="${s.memberImg || ''}" alt="${s.memberName}">
      </div>
      <div class="info">
        <h3>${s.memberName}</h3>
        <p>${s.title}</p>
      </div>
      <div class="time">
        <div>${s.date}</div>
        <div>${s.time}</div>
      </div>
    </div>
  `).join('');
}

// 初期化
renderMembers();
loadSchedule();
