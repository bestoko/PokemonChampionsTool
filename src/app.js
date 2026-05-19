const appState = {
  view: "home",
  pokemons: [],
  typeNames: [
    "普通",
    "火",
    "水",
    "草",
    "电",
    "冰",
    "格斗",
    "毒",
    "地面",
    "飞行",
    "超能",
    "虫",
    "岩石",
    "幽灵",
    "龙",
    "恶",
    "钢",
    "妖精",
  ],
  typeIcons: {
    普通: "⚪",
    火: "🔥",
    水: "💧",
    草: "🍃",
    电: "⚡",
    冰: "❄️",
    格斗: "🥊",
    毒: "☠️",
    地面: "🌍",
    飞行: "🕊️",
    超能: "✨",
    虫: "🐛",
    岩石: "🪨",
    幽灵: "👻",
    龙: "🐉",
    恶: "🌑",
    钢: "🔩",
    妖精: "🧚",
  },
  typeEnglish: {
    普通: "Normal",
    火: "Fire",
    水: "Water",
    草: "Grass",
    电: "Electric",
    冰: "Ice",
    格斗: "Fighting",
    毒: "Poison",
    地面: "Ground",
    飞行: "Flying",
    超能: "Psychic",
    虫: "Bug",
    岩石: "Rock",
    幽灵: "Ghost",
    龙: "Dragon",
    恶: "Dark",
    钢: "Steel",
    妖精: "Fairy",
  },
  typeColors: {
    普通: "#A8A878",
    火: "#F08030",
    水: "#6890F0",
    草: "#78C850",
    电: "#F8D030",
    冰: "#98D8D8",
    格斗: "#C03028",
    毒: "#A040A0",
    地面: "#E0C068",
    飞行: "#A890F0",
    超能: "#F85888",
    虫: "#A8B820",
    岩石: "#B8A038",
    幽灵: "#705898",
    龙: "#7038F8",
    恶: "#705848",
    钢: "#B8B8D0",
    妖精: "#EE99AC",
  },
  typeChart: {},
  selectedDefenseTypes: [],
  weatherOptions: ["无", "晴", "雨", "沙暴", "冰雹"],
  fieldOptions: ["无", "电气场地", "草地", "心理场地"],
  damageAttackerStats: { atk: 0, spa: 0, def: 0, spd: 0, spe: 0 },
  damageDefenderStats: { atk: 0, spa: 0, def: 0, spd: 0, spe: 0 },
  isLoading: true,
  loadError: null,
  moves: [],
  items: [],
  statOptions: [
    { label: "物攻+1", key: "atk", value: 0.5 },
    { label: "物攻+2", key: "atk", value: 1 },
    { label: "物攻-1", key: "atk", value: -1 },
    { label: "特攻+1", key: "spa", value: 0.5 },
    { label: "特攻+2", key: "spa", value: 1 },
    { label: "特攻-1", key: "spa", value: -1 },
    { label: "物防+1", key: "def", value: 0.5 },
    { label: "物防+2", key: "def", value: 1 },
    { label: "物防-1", key: "def", value: -1 },
    { label: "特防+1", key: "spd", value: 0.5 },
    { label: "特防+2", key: "spd", value: 1 },
    { label: "特防-1", key: "spd", value: -1 },
    { label: "速度+1", key: "spe", value: 0.5 },
    { label: "速度+2", key: "spe", value: 1 },
    { label: "速度-1", key: "spe", value: -1 },
  ],
};

const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-button");
const pokedexList = document.getElementById("pokedex-list");
const pokedexSearch = document.getElementById("pokedex-search");
const pokedexReset = document.getElementById("pokedex-reset");
const typeSelectGrid = document.getElementById("type-select-grid");
const typeClearButton = document.getElementById("type-clear");
const typeSelectedLabel = document.getElementById("type-selected-label");
const typeChartResult = document.getElementById("type-chart-result");
const speedSearch = document.getElementById("speed-search");
const speedClear = document.getElementById("speed-clear");
const speedResultTable = document.getElementById("speed-result-table");
const damageAttacker = document.getElementById("damage-attacker");
const damageDefender = document.getElementById("damage-defender");
const damageMove = document.getElementById("damage-move");
const damageWeather = document.getElementById("damage-weather");
const damageField = document.getElementById("damage-field");
const damageCalcButton = document.getElementById("damage-calc");
const damageResult = document.getElementById("damage-result");
let damageAttackerStatsContainer = null;
let damageDefenderStatsContainer = null;
const itemsList = document.getElementById("items-list");
const itemsSearch = document.getElementById("items-search");
const itemsReset = document.getElementById("items-reset");
let itemsFilterTier = "all";

function setView(viewName) {
  appState.view = viewName;
  views.forEach((view) => {
    view.classList.toggle("hidden", view.id !== `view-${viewName}`);
  });
  navButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
}

function renderPokedexList(pokemons) {
  pokedexList.innerHTML = "";
  if (!pokemons.length) {
    pokedexList.innerHTML = `<p>未找到匹配的宝可梦。</p>`;
    return;
  }

  pokemons.forEach((pokemon) => {
    const card = document.createElement("article");
    card.className = "pokemon-card";
    const displayImage = pokemon.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23f0f0f0' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23999' text-anchor='middle' dominant-baseline='middle'%3E无图片%3C/text%3E%3C/svg%3E";
    
    const formsHtml = pokemon.forms && pokemon.forms.length > 1 ? `
      <div class="pokemon-forms">
        <div class="forms-label">可用形态：</div>
        <div class="forms-tags">
          ${pokemon.forms.map((form, idx) => {
            const typeLabel = form.type ? ` <span class="form-type">${form.type === "mega" ? "Mega" : form.type === "gigantamax" ? "极巨" : ""}</span>` : "";
            return `<span class="form-tag" title="${form.name}">${form.name}${typeLabel}</span>`;
          }).join("")}
        </div>
      </div>
    ` : "";
    
    const statLabels = { hp: "HP", atk: "物攻", def: "物防", spa: "特攻", spd: "特防", spe: "速度" };

    const movesLookup = {};
    appState.moves.forEach((m) => { movesLookup[m.name] = m; });

    const movesByCategory = { "物攻": [], "特攻": [], "变化": [] };
    (pokemon.moves || []).forEach((moveName) => {
      const move = movesLookup[moveName];
      if (move) {
        const cat = move.category;
        const catKey = cat === "物攻" ? "物攻" : cat === "特攻" ? "特攻" : "变化";
        movesByCategory[catKey].push(move);
      }
    });

    const catLabels = { "物攻": "物理攻击", "特攻": "特殊攻击", "变化": "变化招式" };
    const flagLabels = {
      contact: "接触类", cutting: "切割类", punching: "拳击类",
      biting: "咬类", sound: "声音类", bulletproof: "弹类", pulse: "波类", powder: "粉末类"
    };

    let movesHtml = "";
    for (const [cat, moves] of Object.entries(movesByCategory)) {
      if (!moves.length) continue;
      movesHtml += `<div class="pokedex-move-cat"><span class="move-cat-label">${catLabels[cat]}</span>`;
      moves.forEach((move) => {
        const bgColor = appState.typeColors[move.type] || "#999";
        const flagsStr = move.flags && move.flags.length
          ? move.flags.map((f) => flagLabels[f] || f).join("、")
          : "";
        const infoParts = [];
        if (move.power > 0) infoParts.push(`威力:${move.power}`);
        if (move.accuracy < 100) infoParts.push(`命中:${move.accuracy}%`);
        else infoParts.push(`命中:${move.accuracy}`);
        infoParts.push(`PP:${move.pp}`);
        if (flagsStr) infoParts.push(flagsStr);
        const tooltip = `${move.name} · ${move.type} · ${catLabels[cat]}<br>${infoParts.join(" | ")}`;
        movesHtml += `<span class="move-tag" style="background:${bgColor};color:${isTextLight(bgColor) ? '#162b63' : '#fff'}" data-tooltip="${tooltip.replace(/"/g, '&quot;')}">${move.name}</span>`;
      });
      movesHtml += `</div>`;
    }

    card.innerHTML = `
      <div class="pokemon-image-section">
        <img src="${displayImage}" alt="${pokemon.name}" class="pokemon-image" loading="lazy" />
        <div class="pokemon-id">#${String(pokemon.id).padStart(3, "0")}</div>
      </div>
      <div class="pokemon-info-section">
        <h3>${pokemon.name}</h3>
        <div class="pokemon-types">
          ${pokemon.types.map((type) => `<span class="type-badge">${type}</span>`).join("")}
        </div>
        ${formsHtml}
        <div class="stats-list">
          ${Object.entries(pokemon.baseStats)
            .map(
              ([key, value]) =>
                `<div class="stat-item"><strong>${statLabels[key] || key.toUpperCase()}</strong><span>${value}</span></div>`
            )
            .join("")}
        </div>
        <p><strong>特性：</strong>${pokemon.abilities.join(" / ")}</p>
        <div class="pokedex-moves">${movesHtml}</div>
      </div>
    `;
    pokedexList.appendChild(card);
  });
}

function filterPokemon(query) {
  const lowerQuery = query.trim().toLowerCase();
  if (!lowerQuery) {
    return appState.pokemons;
  }
  return appState.pokemons.filter((pokemon) => {
    const matchesName = pokemon.name.toLowerCase().includes(lowerQuery);
    const matchesType = pokemon.types.some((type) => type.toLowerCase().includes(lowerQuery));
    return matchesName || matchesType;
  });
}

function getTypeLabel(type) {
  const icon = appState.typeIcons[type] || "🔷";
  return `${icon} ${type}`;
}

function isTextLight(hex) {
  if (!hex) return false;
  const c = hex.substring(1);
  const rgb = parseInt(c, 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = rgb & 0xff;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 180;
}

function renderTypeSelection() {
  const selected = appState.selectedDefenseTypes;
  const html = appState.typeNames
    .map((type) => {
      const isSelected = selected.includes(type);
      const disabled = !isSelected && selected.length >= 2;
      const bgColor = appState.typeColors[type] || "#eef7ff";
      const textColor = isTextLight(bgColor) ? "#162b63" : "#ffffff";
      return `
        <button
          class="type-pill ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}"
          data-type="${type}"
          ${disabled ? "disabled" : ""}
          style="background: ${bgColor}; color: ${textColor};"
        >
          <span>${appState.typeIcons[type]} ${type}</span>
          <span class="type-english">${appState.typeEnglish[type] || ""}</span>
        </button>
      `;
    })
    .join("");
  typeSelectGrid.innerHTML = html;
  typeSelectGrid.querySelectorAll(".type-pill").forEach((button) => {
    button.addEventListener("click", () => {
      const type = button.dataset.type;
      if (appState.selectedDefenseTypes.includes(type)) {
        appState.selectedDefenseTypes = appState.selectedDefenseTypes.filter((item) => item !== type);
      } else if (appState.selectedDefenseTypes.length < 2) {
        appState.selectedDefenseTypes.push(type);
      }
      updateTypeSelection();
    });
  });
}

function updateTypeSelection() {
  const selected = appState.selectedDefenseTypes;
  typeSelectedLabel.textContent = selected.length ? `已选择：${selected.join(" / ")}` : "已选择：无";
  renderTypeSelection();
  renderTypeChartResult();
}

function calculateTypeMultiplier(attackType, defenseTypes) {
  let multiplier = 1;
  defenseTypes.forEach((defType) => {
    if (!defType) return;
    const attackMap = appState.typeChart[attackType] || {};
    multiplier *= attackMap[defType] != null ? attackMap[defType] : 1;
  });
  return multiplier;
}

function createTypeBadge(type, multiplier) {
  return `<span class="type-pill">${getTypeLabel(type)} <strong>${multiplier}x</strong></span>`;
}

function renderTypeChartResult() {
  const defenseTypes = appState.selectedDefenseTypes;
  if (!defenseTypes.length) {
    typeChartResult.innerHTML = `<p>请点击选择 1-2 个防守属性。</p>`;
    return;
  }

  const rows = appState.typeNames
    .map((attackType) => ({
      attackType,
      multiplier: calculateTypeMultiplier(attackType, defenseTypes),
    }))
    .sort((a, b) => b.multiplier - a.multiplier || a.attackType.localeCompare(b.attackType));

  const categories = {
    weak: rows.filter((item) => item.multiplier > 1),
    resist: rows.filter((item) => item.multiplier > 0 && item.multiplier < 1),
    immune: rows.filter((item) => item.multiplier === 0),
    neutral: rows.filter((item) => item.multiplier === 1),
  };

  typeChartResult.innerHTML = `
    <div class="type-category-grid">
      <div class="type-category-card">
        <h4>弱点</h4>
        ${categories.weak.length
          ? categories.weak.map((item) => createTypeBadge(item.attackType, item.multiplier)).join("")
          : `<p>无</p>`}
      </div>
      <div class="type-category-card">
        <h4>抵抗</h4>
        ${categories.resist.length
          ? categories.resist.map((item) => createTypeBadge(item.attackType, item.multiplier)).join("")
          : `<p>无</p>`}
      </div>
      <div class="type-category-card">
        <h4>免疫</h4>
        ${categories.immune.length
          ? categories.immune.map((item) => createTypeBadge(item.attackType, item.multiplier)).join("")
          : `<p>无</p>`}
      </div>
      <div class="type-category-card">
        <h4>普通伤害</h4>
        ${categories.neutral.length
          ? categories.neutral.map((item) => createTypeBadge(item.attackType, item.multiplier)).join("")
          : `<p>无</p>`}
      </div>
    </div>
  `;
}

function calculateSpeed(base, iv = 31, ev = 0, nature = 1) {
  const level = 50;
  const raw = Math.floor((2 * base + iv + Math.floor(ev / 4)) * level / 100) + 5;
  return Math.floor(raw * nature);
}

function formatSpeedStats(pokemon) {
  const base = pokemon.baseStats.spe;
  const noEffort = calculateSpeed(base, 31, 0, 1);
  const fullSpeed = calculateSpeed(base, 31, 252, 1);
  const extremeSpeed = calculateSpeed(base, 31, 252, 1.1);
  return {
    base,
    noEffort,
    fullSpeed,
    extremeSpeed,
    fullSpeed2: fullSpeed * 2,
    extremeSpeed2: extremeSpeed * 2,
  };
}

function renderSpeedResult() {
  const searchText = speedSearch.value.trim().toLowerCase();
  const filtered = appState.pokemons.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(searchText);
    const typeMatch = pokemon.types.some((type) => type.toLowerCase().includes(searchText));
    return nameMatch || typeMatch;
  });

  if (!filtered.length) {
    speedResultTable.innerHTML = `<p>未找到匹配的宝可梦。</p>`;
    return;
  }

  const sorted = filtered.slice().sort((a, b) => b.baseStats.spe - a.baseStats.spe);
  speedResultTable.innerHTML = `
    <table class="speed-table">
      <thead>
        <tr>
          <th>排名</th>
          <th>宝可梦</th>
          <th>种族速度</th>
          <th>无努力速度</th>
          <th>满速</th>
          <th>极速</th>
          <th>满速×2</th>
          <th>极速×2</th>
        </tr>
      </thead>
      <tbody>
        ${sorted
          .map((pokemon, index) => {
            const stats = formatSpeedStats(pokemon);
            return `
              <tr>
                <td>${index + 1}</td>
                <td>${pokemon.name}</td>
                <td>${stats.base}</td>
                <td>${stats.noEffort}</td>
                <td>${stats.fullSpeed}</td>
                <td>${stats.extremeSpeed}</td>
                <td>${stats.fullSpeed2}</td>
                <td>${stats.extremeSpeed2}</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function getWeatherMultiplier(moveType, weather) {
  if (weather === "晴") {
    if (moveType === "火") return 1.5;
    if (moveType === "水") return 0.5;
  }
  if (weather === "雨") {
    if (moveType === "水") return 1.5;
    if (moveType === "火") return 0.5;
  }
  if (weather === "沙暴") {
    if (["岩石", "地面", "钢"].includes(moveType)) return 1.3;
  }
  return 1;
}

function getFieldMultiplier(moveType, field) {
  if (field === "电气场地") {
    if (moveType === "电") return 1.3;
  }
  if (field === "草地") {
    if (moveType === "草") return 1.3;
  }
  if (field === "心理场地") {
    if (moveType === "超能") return 1.3;
  }
  return 1;
}

function getStatMultiplier(stage) {
  const stages = {
    0: 1,
    0.5: 1.5,
    1: 2,
    "-1": 0.67,
    "-2": 0.5,
  };
  return stages[stage] || 1;
}

function calculateDamage(attacker, defender, move, weather, field = "无") {
  if (!move || move.power <= 0) return 0;
  const level = 50;
  
  let attackValue = move.category === "物攻" ? attacker.baseStats.atk : attacker.baseStats.spa;
  let defenseValue = move.category === "物攻" ? defender.baseStats.def : defender.baseStats.spd;
  
  // Apply attacker stat boost/debuff
  const atkKey = move.category === "物攻" ? "atk" : "spa";
  attackValue = Math.floor(attackValue * getStatMultiplier(appState.damageAttackerStats[atkKey]));
  
  // Apply defender stat boost/debuff
  const defKey = move.category === "物攻" ? "def" : "spd";
  defenseValue = Math.floor(defenseValue * getStatMultiplier(appState.damageDefenderStats[defKey]));
  
  const baseDamage = Math.floor(Math.floor(((2 * level) / 5 + 2) * move.power * (attackValue / defenseValue)) / 50) + 2;
  const stab = attacker.types.includes(move.type) ? 1.5 : 1;
  const typeEffect = calculateTypeMultiplier(move.type, defender.types);
  const weatherFactor = getWeatherMultiplier(move.type, weather);
  const fieldFactor = getFieldMultiplier(move.type, field);
  return Math.max(1, Math.floor(baseDamage * stab * typeEffect * weatherFactor * fieldFactor));
}

function renderDamageResult() {
  const attacker = appState.pokemons.find((pokemon) => pokemon.id === Number(damageAttacker.value));
  const defender = appState.pokemons.find((pokemon) => pokemon.id === Number(damageDefender.value));
  const move = appState.moves.find((item) => item.id === Number(damageMove.value));
  const weather = damageWeather.value;
  const field = damageField.value;
  if (!attacker || !defender || !move) {
    damageResult.innerHTML = `<p>请选择攻击者、目标和招式以查看伤害结果。</p>`;
    return;
  }
  const maxDamage = calculateDamage(attacker, defender, move, weather, field);
  const minDamage = Math.max(1, Math.floor(maxDamage * 0.85));
  const typeEffect = calculateTypeMultiplier(move.type, defender.types);
  const stab = attacker.types.includes(move.type) ? 1.5 : 1;
  const weatherFactor = getWeatherMultiplier(move.type, weather);
  const fieldFactor = getFieldMultiplier(move.type, field);
  const hpPercent = Math.round((maxDamage / defender.baseStats.hp) * 100);
  
  // Get stat multipliers
  const atkKey = move.category === "物攻" ? "atk" : "spa";
  const defKey = move.category === "物攻" ? "def" : "spd";
  const attackerStatMult = getStatMultiplier(appState.damageAttackerStats[atkKey]);
  const defenderStatMult = getStatMultiplier(appState.damageDefenderStats[defKey]);
  
  const getStatLabel = (key, value) => {
    if (value === 1) return "中性 (1x)";
    if (value === 1.5) return "强化 (1.5x)";
    if (value === 2) return "强化 (2x)";
    if (value === 0.67) return "弱化 (0.67x)";
    if (value === 0.5) return "弱化 (0.5x)";
    return "";
  };
  
  damageResult.innerHTML = `
    <h3>伤害计算结果</h3>
    <div class="damage-stats">
      <div class="damage-stat-card"><strong>攻击者</strong><span>${attacker.name}</span></div>
      <div class="damage-stat-card"><strong>目标</strong><span>${defender.name}</span></div>
      <div class="damage-stat-card"><strong>招式</strong><span>${move.name}</span></div>
      <div class="damage-stat-card"><strong>类型/分类</strong><span>${move.type}/${move.category}</span></div>
      <div class="damage-stat-card"><strong>攻击者${move.category === "物攻" ? "攻" : "特攻"}修正</strong><span>${getStatLabel(atkKey, attackerStatMult)}</span></div>
      <div class="damage-stat-card"><strong>防守者${move.category === "物攻" ? "防" : "特防"}修正</strong><span>${getStatLabel(defKey, defenderStatMult)}</span></div>
      <div class="damage-stat-card"><strong>天气</strong><span>${weather} ${weatherFactor !== 1 ? `(${weatherFactor}x)` : ""}</span></div>
      <div class="damage-stat-card"><strong>场地</strong><span>${field} ${fieldFactor !== 1 ? `(${fieldFactor}x)` : ""}</span></div>
      <div class="damage-stat-card"><strong>类型相性</strong><span>${typeEffect === 0 ? "免疫" : typeEffect}${typeEffect !== 1 ? "x" : ""}</span></div>
      <div class="damage-stat-card"><strong>STAB</strong><span>${stab}x</span></div>
      <div class="damage-stat-card"><strong>伤害区间</strong><span>${minDamage}~${maxDamage}</span></div>
      <div class="damage-stat-card"><strong>伤害占比</strong><span>${Math.round((minDamage / defender.baseStats.hp) * 100)}%~${hpPercent}%</span></div>
    </div>
  `;
}

function getAttackerMoves(attackerId) {
  const attacker = appState.pokemons.find((p) => p.id === Number(attackerId));
  if (!attacker || !attacker.moves) return appState.moves.filter((m) => m.power > 0);
  const moveNames = new Set(attacker.moves);
  return appState.moves.filter((m) => m.power > 0 && moveNames.has(m.name));
}

function updateDamageMoves() {
  const attackerMoves = getAttackerMoves(damageAttacker.value);
  damageMove.innerHTML = attackerMoves
    .map((move) => `<option value="${move.id}">${move.name} (${move.type}/${move.category})</option>`)
    .join("");
  if (attackerMoves.length > 0) {
    damageMove.value = attackerMoves[0].id;
  }
}

function renderDamageOptions() {
  damageAttacker.innerHTML = appState.pokemons
    .map((pokemon) => `<option value="${pokemon.id}">${pokemon.name}</option>`)
    .join("");
  damageDefender.innerHTML = damageAttacker.innerHTML;
  damageWeather.innerHTML = appState.weatherOptions
    .map((weather) => `<option value="${weather}">${weather}</option>`)
    .join("");
  damageField.innerHTML = appState.fieldOptions
    .map((field) => `<option value="${field}">${field}</option>`)
    .join("");

  if (appState.pokemons.length > 0) {
    damageAttacker.value = appState.pokemons[0].id;
    damageDefender.value = appState.pokemons[1]?.id || appState.pokemons[0].id;
  }
  updateDamageMoves();
  damageWeather.value = "无";
  damageField.value = "无";

  renderDamageStatSelectors();
}

function renderDamageStatSelectors() {
  // Create stat selector containers if they don't exist
  if (!damageAttackerStatsContainer) {
    damageAttackerStatsContainer = document.createElement("div");
    damageAttackerStatsContainer.className = "damage-stat-selector";
    damageAttackerStatsContainer.id = "damage-attacker-stats";
    damageResult.parentNode.insertBefore(damageAttackerStatsContainer, damageResult);
  }
  if (!damageDefenderStatsContainer) {
    damageDefenderStatsContainer = document.createElement("div");
    damageDefenderStatsContainer.className = "damage-stat-selector";
    damageDefenderStatsContainer.id = "damage-defender-stats";
    damageResult.parentNode.insertBefore(damageDefenderStatsContainer, damageResult);
  }
  
  // Render attacker stats
  damageAttackerStatsContainer.innerHTML = `
    <div class="damage-stat-section">
      <div class="damage-stat-label">攻击者状态：</div>
      <div class="damage-stat-tags">
        ${appState.statOptions.map((stat) => `
          <button class="stat-tag ${isStatActive("attacker", stat) ? "active" : ""}" data-type="attacker" data-key="${stat.key}" data-value="${stat.value}">
            ${stat.label}
          </button>
        `).join("")}
      </div>
    </div>
  `;
  
  // Render defender stats
  damageDefenderStatsContainer.innerHTML = `
    <div class="damage-stat-section">
      <div class="damage-stat-label">防守者状态：</div>
      <div class="damage-stat-tags">
        ${appState.statOptions.map((stat) => `
          <button class="stat-tag ${isStatActive("defender", stat) ? "active" : ""}" data-type="defender" data-key="${stat.key}" data-value="${stat.value}">
            ${stat.label}
          </button>
        `).join("")}
      </div>
    </div>
  `;
  
  // Attach event listeners
  document.querySelectorAll(".stat-tag").forEach((tag) => {
    tag.addEventListener("click", (e) => {
      e.preventDefault();
      const type = tag.dataset.type;
      const key = tag.dataset.key;
      const value = tag.dataset.value;
      
      if (type === "attacker") {
        appState.damageAttackerStats[key] = isStatActive("attacker", { key, value }) ? 0 : parseFloat(value);
      } else {
        appState.damageDefenderStats[key] = isStatActive("defender", { key, value }) ? 0 : parseFloat(value);
      }
      renderDamageStatSelectors();
      renderDamageResult();
    });
  });
}

function isStatActive(type, stat) {
  const stats = type === "attacker" ? appState.damageAttackerStats : appState.damageDefenderStats;
  return stats[stat.key] === parseFloat(stat.value);
}

function setupNavigationEvents() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => setView(button.dataset.view));
  });
}

function setupDataEvents() {
  pokedexSearch.addEventListener("input", () => {
    renderPokedexList(filterPokemon(pokedexSearch.value));
  });

  pokedexReset.addEventListener("click", () => {
    pokedexSearch.value = "";
    renderPokedexList(appState.pokemons);
  });

  typeClearButton.addEventListener("click", () => {
    appState.selectedDefenseTypes = [];
    updateTypeSelection();
  });

  speedSearch.addEventListener("input", () => renderSpeedResult());
  speedClear.addEventListener("click", () => {
    speedSearch.value = "";
    renderSpeedResult();
  });

  damageAttacker.addEventListener("change", () => {
    updateDamageMoves();
    renderDamageResult();
  });

  damageDefender.addEventListener("change", () => {
    renderDamageResult();
  });

  damageMove.addEventListener("change", () => {
    renderDamageResult();
  });

  damageWeather.addEventListener("change", () => {
    renderDamageResult();
  });

  damageField.addEventListener("change", () => {
    renderDamageResult();
  });

  damageCalcButton.addEventListener("click", () => renderDamageResult());

  itemsSearch.addEventListener("input", () => renderItemsList());
  itemsReset.addEventListener("click", () => {
    itemsSearch.value = "";
    itemsFilterTier = "all";
    document.querySelectorAll(".filter-tag").forEach((tag) => {
      tag.classList.toggle("active", tag.dataset.tier === "all");
    });
    renderItemsList();
  });
  document.querySelectorAll(".filter-tag").forEach((tag) => {
    tag.addEventListener("click", () => {
      itemsFilterTier = tag.dataset.tier;
      document.querySelectorAll(".filter-tag").forEach((t) => {
        t.classList.toggle("active", t.dataset.tier === itemsFilterTier);
      });
      renderItemsList();
    });
  });
}

async function loadData() {
  const loadingOverlay = document.getElementById("loading-overlay");
  const errorBanner = document.getElementById("error-banner");
  const errorMessage = document.getElementById("error-message");

  try {
    const [pokemonRes, movesRes, typeChartRes, itemsRes] = await Promise.all([
      fetch("data/pokemon.json"),
      fetch("data/moves.json"),
      fetch("data/type-chart.json"),
      fetch("data/items.json"),
    ]);

    if (!pokemonRes.ok) throw new Error(`宝可梦数据加载失败 (${pokemonRes.status})`);
    if (!movesRes.ok) throw new Error(`招式数据加载失败 (${movesRes.status})`);
    if (!typeChartRes.ok) throw new Error(`属性克制数据加载失败 (${typeChartRes.status})`);
    if (!itemsRes.ok) throw new Error(`道具数据加载失败 (${itemsRes.status})`);

    const [pokemonData, movesData, typeChartData, itemsData] = await Promise.all([
      pokemonRes.json(),
      movesRes.json(),
      typeChartRes.json(),
      itemsRes.json(),
    ]);

    appState.pokemons = pokemonData;
    appState.moves = movesData;
    appState.typeChart = typeChartData;
    appState.items = itemsData;
    appState.isLoading = false;
    loadingOverlay.classList.add("hidden");
    return true;
  } catch (error) {
    appState.isLoading = false;
    appState.loadError = error.message;
    loadingOverlay.classList.add("hidden");
    errorBanner.classList.remove("hidden");
    errorMessage.textContent = `数据加载失败：${error.message}`;
    return false;
  }
}

function renderItemsList() {
  const searchText = itemsSearch.value.trim().toLowerCase();
  let filtered = appState.items;

  if (itemsFilterTier !== "all") {
    filtered = filtered.filter((item) => item.tier === itemsFilterTier);
  }
  if (searchText) {
    filtered = filtered.filter((item) =>
      item.name.includes(searchText) ||
      item.effect.includes(searchText) ||
      item.category.includes(searchText)
    );
  }

  if (!filtered.length) {
    itemsList.innerHTML = '<p class="items-empty">未找到匹配的道具。</p>';
    return;
  }

  const tierLabels = { S: "S 级", A: "A 级", B: "B 级", C: "C 级", Mega: "Mega 石" };
  const tierColors = { S: "#e74c3c", A: "#f39c12", B: "#2ecc71", C: "#3498db", Mega: "#9b59b6" };

  const grouped = {};
  filtered.forEach((item) => {
    const cat = item.tier === "Mega" ? "Mega 石" : `${tierLabels[item.tier]} · ${item.category}`;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  let html = "";
  for (const [category, items] of Object.entries(grouped)) {
    html += `<div class="items-category"><h3>${category}</h3><div class="items-grid">`;
    items.forEach((item) => {
      const color = tierColors[item.tier] || "#666";
      html += `
        <div class="item-card">
          <div class="item-tier-badge" style="background:${color}">${item.tier}</div>
          <h4>${item.name}</h4>
          <p class="item-effect">${item.effect}</p>
          <p class="item-desc">${item.description}</p>
        </div>
      `;
    });
    html += "</div></div>";
  }
  itemsList.innerHTML = html;
}

function finishInit() {
  setupDataEvents();
  setView("home");
  renderPokedexList(appState.pokemons);
  renderTypeSelection();
  renderTypeChartResult();
  renderSpeedResult();
  renderDamageOptions();
  renderDamageResult();
  renderItemsList();
}

async function init() {
  setupNavigationEvents();

  const errorRetry = document.getElementById("error-retry");
  const loadingOverlay = document.getElementById("loading-overlay");
  const errorBanner = document.getElementById("error-banner");
  if (errorRetry) {
    errorRetry.addEventListener("click", async () => {
      errorBanner.classList.add("hidden");
      loadingOverlay.classList.remove("hidden");
      appState.loadError = null;
      const success = await loadData();
      if (success) {
        finishInit();
      }
    });
  }

  const success = await loadData();
  if (success) {
    finishInit();
  }
}

init();
