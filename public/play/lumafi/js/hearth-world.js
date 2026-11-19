window.HearthWorld = (() => {
  "use strict";

  const STORAGE_KEY = "hearth-world-selection-v1";
  const WORLD = Object.freeze({
    width: 36.5,
    depth: 33.5,
    cornerRadius: 5.75,
    surfaceY: 1.15,
    roadWidth: 2.35,
    sidewalkWidth: .55,
    renderWidth: 68,
    renderDepth: 76,
    cameraAngle: .28,
    cameraDistance: 25.5,
    cameraHeight: 15.8,
    cameraLookAhead: 2.8,
    cameraFollowDamping: 7.4,
    cameraPositionDamping: 6.2,
    cameraTurnDamping: 5.1,
    cameraTurnInfluence: .11,
    cameraEntranceDistance: 21.4,
    cameraEntranceHeight: 13.4,
    cameraOpeningDistance: 18.2,
    cameraOpeningHeight: 11.6,
    bendStrength: .05,
    bendSafeDepth: 7.2,
    bendSafeWidth: 13,
    bendMaxDrop: 8.4,
    destinationZoom: 1.15,
    initialZoom: 1.08,
    minZoom: .86,
    maxZoom: 1.28
  });
  const PLACE_WORLDS = {
    citypark: {
      theme: "forest",
      name: "City Park",
      emoji: "🌳",
      description: "A green civic park with flower beds, clipped hedges, and a welcoming town square.",
      ground: 0x74a86f,
      placeId: "citypark"
    },
    suburbs: {
      theme: "forest",
      name: "Suburbs",
      emoji: "🏡",
      description: "A friendly residential neighborhood with hedges, mailboxes, pocket parks, and tidy garden edges.",
      ground: 0x78aa70,
      path: 0xd8c79f,
      placeId: "suburbs"
    },
    downtown: {
      theme: "forest",
      name: "Downtown",
      emoji: "🏙️",
      description: "A compact urban district with a paved civic core, active streets, planted squares, transit, and a layered skyline.",
      ground: 0xa5ada8,
      edge: 0x65746f,
      path: 0xc7c4b9,
      road: 0x3f4c53,
      sidewalk: 0xd8d5ca,
      trim: 0x426978,
      tree: 0x4f805f,
      placeId: "downtown"
    },
    forest: {
      theme: "forest",
      name: "Forest",
      emoji: "🌲",
      description: "A sheltered woodland neighborhood surrounded by clustered pines, logs, and fern clearings.",
      placeId: "forest"
    },
    mountains: {
      theme: "forest",
      name: "Mountains",
      emoji: "🏔️",
      description: "A highland neighborhood framed by varied peaks, foothills, stone cairns, and overlook paths.",
      ground: 0x68986a,
      rock: 0x69736f,
      placeId: "mountains"
    },
    lakeside: {
      theme: "beach",
      name: "Lakeside",
      emoji: "🌊",
      description: "A cool lakeside village with a sheltered inlet, reeds, stepping stones, and a timber dock.",
      ground: 0x77a878,
      edge: 0x78916e,
      path: 0xd7c69f,
      sidewalk: 0xd5c9ab,
      trim: 0x4b8792,
      placeId: "lakeside"
    },
    beach: {
      theme: "beach",
      name: "Beach",
      emoji: "🏖️",
      description: "A bright coastal neighborhood with sand, palms, a curved shore, and a small boardwalk.",
      placeId: "beach"
    },
    japanesegarden: {
      theme: "forest",
      name: "Japanese Garden",
      emoji: "🌸",
      description: "A connected garden neighborhood with a torii entrance, pale stone paths, clustered blossoms, koi pond, bridge, and zen court.",
      ground: 0x82a977,
      edge: 0x7f9270,
      path: 0xe0d2ad,
      road: 0xc5b991,
      sidewalk: 0xe7ddc4,
      trim: 0x8d4f45,
      tree: 0xd987a2,
      placeId: "japanesegarden"
    },
    snowy: {
      theme: "snow",
      name: "Snow Village",
      emoji: "❄️",
      description: "A quiet winter neighborhood with snowbanks, warm lanterns, an icy pond, and evergreen clusters.",
      placeId: "snowy"
    },
    desertsunset: {
      theme: "desert",
      name: "Desert Sunset",
      emoji: "🏜️",
      description: "A warm sandstone neighborhood with sculpted mesas, cactus gardens, dry creek stones, and an oasis.",
      placeId: "desertsunset"
    }
  };
  const TEMPORARY_EXPLORER = {
    id: "hearth-world-explorer",
    name: "Explorer",
    age: 30,
    skin: "tone2",
    hair: "brown",
    hairStyle: "short",
    shirt: "green",
    accessory: "none",
    pose: "front",
    mood: "auto"
  };
  const VILLAGES = {
    beach: {
      id: "beach",
      name: "Beach Village",
      emoji: "🏖️",
      description: "A bright coastal village with palms, docks, and clear water.",
      sky: 0x9edff0,
      nightSky: 0x10243a,
      ground: 0xe9c983,
      edge: 0xd3ad70,
      path: 0xf4dfb2,
      rock: 0x9a7654,
      tree: 0x3aa76d,
      trunk: 0x9b6a42,
      water: 0x4fbfd1,
      roof: 0x28a6a1,
      road: 0x53616a,
      sidewalk: 0xf1ddb2,
      trim: 0x2c91a0
    },
    forest: {
      id: "forest",
      name: "Forest and Mountain Village",
      emoji: "🌲",
      description: "A peaceful mountain settlement surrounded by pines and stone.",
      sky: 0xa9d9e8,
      nightSky: 0x101d2b,
      ground: 0x5f9d62,
      edge: 0x7f9468,
      path: 0xd6b783,
      rock: 0x66706b,
      tree: 0x267451,
      trunk: 0x76513a,
      water: 0x4d93a7,
      roof: 0x55705b,
      road: 0x4e5856,
      sidewalk: 0xc8b58e,
      trim: 0x477f68
    },
    snow: {
      id: "snow",
      name: "Snow Village",
      emoji: "❄️",
      description: "A quiet winter village with snowy pines and warm glowing paths.",
      sky: 0xb9d8e8,
      nightSky: 0x111a35,
      ground: 0xe9f3f6,
      edge: 0xc7d7dc,
      path: 0xc2d0d5,
      rock: 0x71808b,
      tree: 0x315e50,
      trunk: 0x6d5141,
      water: 0x9bd0dc,
      roof: 0x647a98,
      road: 0x667481,
      sidewalk: 0xdce8eb,
      trim: 0x718aa7
    },
    desert: {
      id: "desert",
      name: "Desert Village",
      emoji: "🏜️",
      description: "A warm sandstone village built around a small desert oasis.",
      sky: 0xf2c690,
      nightSky: 0x24182b,
      ground: 0xd9ad68,
      edge: 0xb8844e,
      path: 0xf0d19a,
      rock: 0x9e6544,
      tree: 0x4f9664,
      trunk: 0x8b5b3e,
      water: 0x4ab6b0,
      roof: 0xb66d49,
      road: 0x66564f,
      sidewalk: 0xe9c78e,
      trim: 0xb66d49
    }
  };

  const BUILDINGS = [
    { id: "planning", kind: "bank", name: "LumaFi Bank", label: "PLANNING", placeLabel: "BANK", emoji: "🏦", detail: "Plan accounts, budgets, goals, cards, and bills", view: "planning", tab: "accounts", color: 0x477f68, x: -9.85, z: -8.65, rotation: 0, scale: 1.58, elevation: .72, interactionRadius: 5.8 },
    { id: "dashboard", kind: "townhall", name: "LumaFi Town Hall", label: "DASHBOARD", placeLabel: "TOWN HALL", emoji: "🏛️", detail: "Open your monthly financial dashboard", view: "dashboard", tab: "", color: 0x4472a7, x: 9.85, z: -8.65, rotation: 0, scale: 1.56, elevation: .72, interactionRadius: 5.8 },
    { id: "transactions", kind: "atm", name: "LumaFi ATM", label: "TRANSACTIONS", placeLabel: "ATM", emoji: "🏧", detail: "Enter expenses, income, transfers, and goal contributions", view: "transactions", tab: "expense", color: 0x2f76b7, x: -9.85, z: 7.65, rotation: 0, scale: 1.45, elevation: .28, interactionRadius: 5.15 },
    { id: "lists", kind: "school", name: "LumaFi School", label: "MANAGE LISTS", placeLabel: "SCHOOL", emoji: "🏫", detail: "Manage the lists that power your financial home", view: "lists", tab: "people", color: 0xb25b49, x: 9.85, z: 7.65, rotation: 0, scale: 1.52, elevation: .28, interactionRadius: 5.8 },
    { id: "future-value", kind: "observatory", name: "Future Value Observatory", label: "FUTURE VALUE", placeLabel: "OBSERVATORY", emoji: "🔭", detail: "See what an impulse purchase could become if invested", view: "future-value", tab: "", color: 0x7462a8, x: 0, z: -12.1, rotation: 0, scale: 1.32, elevation: .42, interactionRadius: 5.35 }
  ];

  let household = null;
  let selection = null;
  let runtime = null;
  let launcherNotice = "";
  let portalState = null;
  let dom = {};

  function escapeHtml(value) {
    return window.PFOS?.escapeHtml ? PFOS.escapeHtml(value) : String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  }

  function loadPreference() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || {}; }
    catch (error) { return {}; }
  }

  function savePreference(value) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)); }
    catch (error) {}
  }

  function villageIdFor(place) {
    const id = String(place || "citypark").toLowerCase().replace(/[^a-z]/g, "");
    const normalized = window.HouseholdNeighborhoods?.normalize?.(id) || id;
    return PLACE_WORLDS[normalized] ? normalized : PLACE_WORLDS[id] ? id : "forest";
  }

  function currentVillage() {
    const place = household?.neighborhood || household?.background || "forest";
    const world = PLACE_WORLDS[villageIdFor(place)] || PLACE_WORLDS.forest;
    return { ...VILLAGES[world.theme], ...world, id: world.theme };
  }

  function scoreMood() {
    const score = Number(document.getElementById("sidebarHealthScore")?.textContent || 0);
    return window.HouseholdEngine?.moodFromScore?.(score)?.id || "stable";
  }

  function personMarkup(person) {
    const safePerson = person || TEMPORARY_EXPLORER;
    return window.HouseholdEngine?.character?.(safePerson, scoreMood()) || `<div class="world-generic-person">🙂</div>`;
  }

  function petMarkup(pet) {
    return window.HouseholdEngine?.pet?.(pet, scoreMood()) || `<div class="world-generic-pet">🐾</div>`;
  }

  function injectUI() {
    if (document.getElementById("hearthWorldDialog")) return;
    document.body.insertAdjacentHTML("beforeend", `
      <dialog class="world-launch-dialog" id="worldLaunchDialog" aria-labelledby="worldLaunchTitle">
        <form class="world-launch-card" id="worldLaunchForm" novalidate>
          <div class="world-launch-head">
            <div><div class="eyebrow">LumaFi World</div><h2 id="worldLaunchTitle">Choose your explorer</h2><p>Your selected household place determines which village opens.</p></div>
            <button class="ghost-icon-btn" id="closeWorldLaunchBtn" type="button" aria-label="Close character selection">×</button>
          </div>
          <div id="worldLaunchContent"></div>
          <div class="world-launch-actions"><span class="world-launch-status" id="worldLaunchStatus" role="status" aria-live="polite"></span><button class="btn" id="cancelWorldLaunchBtn" type="button">Cancel</button><button class="btn primary" id="enterWorldBtn" type="submit">Enter LumaFi World</button></div>
        </form>
      </dialog>

      <dialog class="hearth-world-dialog" id="hearthWorldDialog" aria-labelledby="hearthWorldTitle">
        <div class="hearth-world-shell" id="hearthWorldShell" tabindex="-1">
          <div class="world-render-host" id="worldRenderHost"></div>
          <div class="world-avatar-layer" id="worldAvatarLayer" aria-hidden="true"></div>
          <div class="world-hud">
            <div class="world-location-pill"><span id="worldVillageEmoji">🌲</span><strong id="hearthWorldTitle">LumaFi World</strong><small id="worldMonthLabel"></small></div>
            <button class="world-hud-btn" id="closeWorldBtn" type="button" aria-label="Exit LumaFi World">×</button>
          </div>
          <div class="world-side-controls" aria-label="World view controls">
            <button class="world-light-toggle" type="button" role="switch" aria-checked="false" data-world-action="night" aria-label="Switch to night mode">
              <span class="world-light-label" aria-hidden="true">Day</span>
              <span class="world-light-track" aria-hidden="true"><span class="world-light-thumb">☀️</span></span>
            </button>
            <button type="button" data-world-action="zoom-in" aria-label="Zoom in">＋</button>
            <button type="button" data-world-action="zoom-out" aria-label="Zoom out">−</button>
            <button type="button" data-world-action="recenter" aria-label="Recenter neighborhood">⌾</button>
          </div>
          <nav class="world-destination-nav" aria-label="LumaFi World destinations">
            ${BUILDINGS.map(building => `<button type="button" data-world-focus="${building.id}" aria-label="Walk to ${escapeHtml(building.label)}"><span aria-hidden="true">${building.emoji}</span><small>${escapeHtml(building.label)}</small></button>`).join("")}
          </nav>
          <button class="world-building-prompt" id="worldBuildingPrompt" type="button" hidden></button>
          <div class="world-status" id="worldStatus" role="status" aria-live="polite"></div>

          <div class="world-overlay" id="worldTransitionOverlay" hidden><div class="world-enter-card"><span id="worldTransitionEmoji">🏠</span><strong id="worldTransitionTitle">Entering</strong><small>Opening your LumaFi workspace</small></div></div>
          <section class="world-workspace-overlay" id="worldWorkspaceOverlay" role="dialog" aria-modal="true" aria-labelledby="worldWorkspaceTitle" hidden>
            <div class="world-workspace-panel">
              <header class="world-workspace-head"><div><span id="worldWorkspaceEmoji">🏠</span><div><small>LumaFi World workspace</small><h2 id="worldWorkspaceTitle">Dashboard</h2></div></div><button class="world-workspace-close" id="closeWorldWorkspaceBtn" type="button" aria-label="Close workspace and return to the world">×</button></header>
              <div class="world-workspace-content" id="worldWorkspaceContent"></div>
              <footer><span>Fictional household data · Portfolio sample</span><button class="btn primary" id="doneWorldWorkspaceBtn" type="button">Return to World</button></footer>
            </div>
          </section>
          <div class="world-overlay world-fallback" id="worldFallback" hidden>
            <div class="world-story-card"><div class="eyebrow">Accessible world map</div><h2>Explore City Park</h2><p>Choose any building to open a sample financial workspace.</p><img class="sample-world-map-image" src="../../images/lumafi/city-park.webp" width="1110" height="700" alt="City Park scene with paths linking the central plaza to five financial destinations." loading="lazy"><div class="world-fallback-grid" id="worldFallbackGrid"></div><button class="btn" id="closeWorldFallbackBtn" type="button">Return to LumaFi</button></div>
          </div>

          <div class="world-touch-controls" aria-label="Character movement controls">
            <button type="button" data-world-move="forward" aria-label="Move forward">▲</button>
            <button type="button" data-world-move="left" aria-label="Move left">◀</button>
            <button type="button" data-world-move="back" aria-label="Move backward">▼</button>
            <button type="button" data-world-move="right" aria-label="Move right">▶</button>
          </div>
        </div>
      </dialog>`);

    dom = {
      launch: document.getElementById("worldLaunchDialog"),
      launchForm: document.getElementById("worldLaunchForm"),
      launchContent: document.getElementById("worldLaunchContent"),
      world: document.getElementById("hearthWorldDialog"),
      shell: document.getElementById("hearthWorldShell"),
      host: document.getElementById("worldRenderHost"),
      avatars: document.getElementById("worldAvatarLayer"),
      transition: document.getElementById("worldTransitionOverlay"),
      fallback: document.getElementById("worldFallback"),
      workspace: document.getElementById("worldWorkspaceOverlay"),
      workspaceContent: document.getElementById("worldWorkspaceContent"),
      prompt: document.getElementById("worldBuildingPrompt"),
      destinationNav: document.querySelector(".world-destination-nav"),
      entryHint: null,
      status: document.getElementById("worldStatus")
    };
  }

  function resolveWorldHousehold() {
    const selectedMonth = PFOS.householdFor();
    launcherNotice = "";
    if ((selectedMonth.people || []).length) return selectedMonth;

    const defaults = typeof PFOS.householdDefault === "function" ? PFOS.householdDefault() : null;
    if ((defaults?.people || []).length) {
      launcherNotice = "This month has no active household members, so LumaFi is using your default household avatars for the world.";
      return {
        ...selectedMonth,
        people: defaults.people,
        pets: (selectedMonth.pets || []).length ? selectedMonth.pets : (defaults.pets || [])
      };
    }

    launcherNotice = "No household avatar is set up yet, so you can enter with a temporary Explorer. Add household members in Manage Lists to personalize the world.";
    return { ...selectedMonth, people: [{ ...TEMPORARY_EXPLORER }], pets: selectedMonth.pets || [] };
  }

  function renderLauncher() {
    household = resolveWorldHousehold();
    const people = household.people || [];
    const pets = household.pets || [];
    const preference = loadPreference();
    const playerId = people.some(person => person.id === preference.playerId) ? preference.playerId : people[0]?.id;
    const companionIds = new Set(Array.isArray(preference.companionIds) ? preference.companionIds : people.filter(person => person.id !== playerId).map(person => person.id));
    const petIds = new Set(Array.isArray(preference.petIds) ? preference.petIds : pets.map(pet => pet.id));
    const village = currentVillage();
    const neighborhood = window.HouseholdNeighborhoods?.get?.(household.neighborhood || household.background);

    dom.launchContent.innerHTML = `
      ${launcherNotice ? `<div class="world-launch-notice" role="note"><span aria-hidden="true">ℹ️</span><p>${escapeHtml(launcherNotice)}</p></div>` : ""}
      <section class="world-launch-section">
        <div class="world-launch-section-head"><div><span>1</span><strong>Who are you playing as?</strong></div><small>Choose one household member.</small></div>
        <div class="world-character-grid" role="radiogroup" aria-label="Choose your explorer">${people.map(person => `
          <input class="world-player-input" type="radio" name="worldPlayer" value="${escapeHtml(person.id)}" ${person.id === playerId ? "checked" : ""} hidden>
          <button class="world-character-choice ${person.id === playerId ? "is-selected" : ""}" type="button" role="radio" aria-checked="${person.id === playerId ? "true" : "false"}" data-world-player-id="${escapeHtml(person.id)}">
            <span class="world-character-portrait">${personMarkup(person)}</span>
            <strong>${escapeHtml(person.name || "Household member")}</strong>
            <small>Explorer</small>
          </button>`).join("")}</div>
      </section>
      <section class="world-launch-section">
        <div class="world-launch-section-head"><div><span>2</span><strong>Who should join you?</strong></div><small>Companions appear as background characters.</small></div>
        <div class="world-companion-grid">${people.map(person => `
          <label><input type="checkbox" name="worldCompanion" value="${escapeHtml(person.id)}" ${companionIds.has(person.id) ? "checked" : ""}><span>${personMarkup(person)}</span><strong>${escapeHtml(person.name || "Person")}</strong></label>`).join("")}${pets.map(pet => `
          <label><input type="checkbox" name="worldPet" value="${escapeHtml(pet.id)}" ${petIds.has(pet.id) ? "checked" : ""}><span>${petMarkup(pet)}</span><strong>${escapeHtml(pet.name || pet.type || "Pet")}</strong></label>`).join("") || `<small class="world-no-pets">Pets added in Household Studio can join the world.</small>`}</div>
      </section>
      <section class="world-village-selection village-${village.id}">
        <div class="world-village-icon" aria-hidden="true">${village.emoji}</div>
        <div><div class="eyebrow">Your selected place</div><h3>${escapeHtml(village.name)}</h3><p>${escapeHtml(village.description)}</p><small>Based on ${escapeHtml(neighborhood?.label || "this month’s household place")}</small></div>
      </section>`;

    const submitButton = document.getElementById("enterWorldBtn");
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-disabled");
    const status = document.getElementById("worldLaunchStatus");
    if (status) status.textContent = "";
    updateCompanionAvailability();
  }

  function updateCompanionAvailability() {
    const selected = dom.launchForm.querySelector('input[name="worldPlayer"]:checked')?.value;
    dom.launchForm.querySelectorAll("[data-world-player-id]").forEach(button => {
      const active = button.dataset.worldPlayerId === selected;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-checked", active ? "true" : "false");
      button.tabIndex = active ? 0 : -1;
    });
    dom.launchForm.querySelectorAll('input[name="worldCompanion"]').forEach(input => {
      const isPlayer = input.value === selected;
      input.disabled = isPlayer;
      if (isPlayer) input.checked = false;
      input.closest("label")?.classList.toggle("is-player", isPlayer);
    });
  }

  function openLauncher() {
    injectUI();
    renderLauncher();
    if (!dom.launch.open) dom.launch.showModal?.();
  }

  async function openWorldDirect() {
    injectUI();
    renderLauncher();
    await enterWorld();
  }

  function readSelection() {
    const form = new FormData(dom.launchForm);
    return {
      playerId: String(form.get("worldPlayer") || ""),
      companionIds: form.getAll("worldCompanion").map(String),
      petIds: form.getAll("worldPet").map(String),
      villageId: currentVillage().id
    };
  }

  function canUseWebGL() {
    try {
      const canvas = document.createElement("canvas");
      return Boolean(window.WebGL2RenderingContext && canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: false })) || Boolean(canvas.getContext("webgl"));
    } catch (error) { return false; }
  }

  async function enterWorld() {
    selection = readSelection();
    const player = (household?.people || []).find(person => person.id === selection.playerId);
    if (!player) {
      const status = document.getElementById("worldLaunchStatus");
      if (status) status.textContent = "Choose an explorer before entering.";
      dom.launchForm.querySelector('input[name="worldPlayer"]')?.focus();
      return;
    }
    savePreference(selection);
    dom.launch.close?.();
    document.body.classList.add("hearth-world-open");
    if (!dom.world.open) dom.world.showModal?.();
    prepareWorldUI();
    focusWorldSurface();
    if (!canUseWebGL()) {
      showFallback();
      return;
    }
    try {
      const THREE = await import("../vendor/three.module.min.js");
      buildWorld(THREE);
      focusWorldSurface();
    } catch (error) {
      console.error("LumaFi World could not start.", error);
      showFallback();
    }
  }

  function prepareWorldUI() {
    const village = currentVillage();
    document.getElementById("worldVillageEmoji").textContent = village.emoji;
    document.getElementById("hearthWorldTitle").textContent = village.name;
    document.getElementById("worldMonthLabel").textContent = `${PFOS.months[PFOS.state.currentMonth]} ${PFOS.state.currentYear}`;
    dom.transition.hidden = true;
    dom.fallback.hidden = true;
    dom.prompt.hidden = true;
    if (dom.entryHint) dom.entryHint.hidden = true;
    dom.status.textContent = `Loading ${village.name} neighborhood.`;
  }

  function focusWorldSurface() {
    window.requestAnimationFrame(() => {
      try { dom.shell?.focus?.({ preventScroll: true }); }
      catch (error) { dom.shell?.focus?.(); }
    });
  }

  function showEntryGuidance() {
    if (!runtime || !dom.entryHint) return;
    window.clearTimeout(runtime.guidanceTimer);
    dom.entryHint.hidden = false;
    runtime.guidanceTimer = window.setTimeout(() => dismissEntryGuidance(), 4800);
  }

  function dismissEntryGuidance() {
    if (!dom.entryHint || dom.entryHint.hidden) return;
    if (dom.entryHint) dom.entryHint.hidden = true;
    if (runtime?.guidanceTimer) window.clearTimeout(runtime.guidanceTimer);
    if (runtime) runtime.guidanceTimer = 0;
  }

  function showFallback() {
    cleanupRuntime();
    if (dom.entryHint) dom.entryHint.hidden = true;
    dom.fallback.hidden = false;
    document.getElementById("worldFallbackGrid").innerHTML = BUILDINGS.map(building => `<button class="btn" type="button" data-world-destination="${building.id}">${building.emoji} ${escapeHtml(building.name)}</button>`).join("");
    dom.status.textContent = "The 3D renderer is unavailable. The accessible destination map is ready.";
  }

  function enableRollingWorldMaterial(material) {
    if (!material || !runtime?.bendUniforms) return material;
    const uniforms = runtime.bendUniforms;
    material.onBeforeCompile = shader => {
      shader.uniforms.uWorldBendCenter = uniforms.center;
      shader.uniforms.uWorldBendStrength = uniforms.strength;
      shader.uniforms.uWorldBendSafeDepth = uniforms.safeDepth;
      shader.uniforms.uWorldBendSafeWidth = uniforms.safeWidth;
      shader.uniforms.uWorldBendMaxDrop = uniforms.maxDrop;
      shader.vertexShader = `
        uniform vec2 uWorldBendCenter;
        uniform float uWorldBendStrength;
        uniform float uWorldBendSafeDepth;
        uniform float uWorldBendSafeWidth;
        uniform float uWorldBendMaxDrop;
      ` + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace("#include <project_vertex>", `
        vec4 mvPosition = vec4( transformed, 1.0 );
        #ifdef USE_BATCHING
          mvPosition = batchingMatrix * mvPosition;
        #endif
        #ifdef USE_INSTANCING
          mvPosition = instanceMatrix * mvPosition;
        #endif
        vec4 lumafiWorldPosition = modelMatrix * mvPosition;
        float lumafiDepth = max(0.0, abs(lumafiWorldPosition.z - uWorldBendCenter.y) - uWorldBendSafeDepth);
        float lumafiLateral = max(0.0, abs(lumafiWorldPosition.x - uWorldBendCenter.x) - uWorldBendSafeWidth);
        float lumafiDrop = min(uWorldBendMaxDrop,
          lumafiDepth * lumafiDepth * uWorldBendStrength +
          lumafiLateral * lumafiLateral * uWorldBendStrength * 0.14
        );
        mvPosition = modelViewMatrix * mvPosition;
        mvPosition.y -= lumafiDrop;
        gl_Position = projectionMatrix * mvPosition;
      `);
    };
    material.customProgramCacheKey = () => "lumafi-smart-world-interactions-v21-1";
    material.userData.worldBend = true;
    return material;
  }

  function material(THREE, color, options = {}) {
    return enableRollingWorldMaterial(new THREE.MeshStandardMaterial({ color, roughness: options.roughness ?? .82, metalness: options.metalness ?? 0, flatShading: options.flatShading !== false, transparent: Boolean(options.transparent), opacity: options.opacity ?? 1, emissive: options.emissive || 0x000000, emissiveIntensity: options.emissiveIntensity || 0 }));
  }

  function worldQualityProfile() {
    const compact = Math.min(window.innerWidth || 1280, window.innerHeight || 800) < 720;
    const coarse = Boolean(window.matchMedia?.("(pointer: coarse)")?.matches);
    const constrained = Number(navigator.deviceMemory || 8) <= 4;
    const mobile = compact || coarse || constrained;
    return {
      id: mobile ? "mobile" : "desktop",
      pixelRatio: mobile ? 1.25 : 1.75,
      shadows: !mobile,
      shadowSize: mobile ? 512 : 1536,
      detail: mobile ? .64 : 1
    };
  }

  function rollingWorldSurfaceYAt() {
    return WORLD.surfaceY;
  }

  function dioramaSurfaceYAt() {
    return rollingWorldSurfaceYAt();
  }

  // Compatibility aliases preserve integrations from the globe and diorama
  // releases. v21 bends the rendered horizon while gameplay stays level.
  function planetSurfaceYAt() {
    return rollingWorldSurfaceYAt();
  }

  function createSurfacePatch(THREE, options) {
    const centerX = Number(options.centerX || 0);
    const centerZ = Number(options.centerZ || 0);
    const radiusX = Math.max(.1, Number(options.radiusX || options.radius || 1));
    const radiusZ = Math.max(.1, Number(options.radiusZ || options.radius || 1));
    const rings = Math.max(3, Number(options.rings || 12));
    const slices = Math.max(12, Number(options.slices || 48));
    const elevation = Number(options.elevation || .02);
    const vertices = [];
    const indices = [];

    vertices.push(centerX, WORLD.surfaceY + elevation, centerZ);
    for (let ring = 1; ring <= rings; ring += 1) {
      const ringProgress = ring / rings;
      for (let slice = 0; slice < slices; slice += 1) {
        const angle = (slice / slices) * Math.PI * 2;
        let x = centerX + Math.cos(angle) * radiusX * ringProgress;
        let z = centerZ + Math.sin(angle) * radiusZ * ringProgress;
        vertices.push(x, WORLD.surfaceY + elevation, z);
      }
    }
    for (let slice = 0; slice < slices; slice += 1) {
      indices.push(0, 1 + slice, 1 + ((slice + 1) % slices));
    }
    for (let ring = 1; ring < rings; ring += 1) {
      const innerStart = 1 + (ring - 1) * slices;
      const outerStart = 1 + ring * slices;
      for (let slice = 0; slice < slices; slice += 1) {
        const next = (slice + 1) % slices;
        indices.push(innerStart + slice, outerStart + slice, outerStart + next);
        indices.push(innerStart + slice, outerStart + next, innerStart + next);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    const patch = new THREE.Mesh(geometry, material(THREE, options.color, {
      transparent: Boolean(options.transparent),
      opacity: options.opacity ?? 1,
      roughness: options.roughness ?? .82,
      flatShading: false
    }));
    patch.userData.dioramaFixed = true;
    patch.userData.surfacePatch = options.id || true;
    patch.castShadow = false;
    patch.receiveShadow = Boolean(runtime?.quality?.shadows);
    runtime.worldGroup.add(patch);
    if (options.transparent && runtime?.animatedSurfaces) {
      runtime.animatedSurfaces.push({
        object: patch,
        material: patch.material,
        baseOpacity: options.opacity ?? 1,
        baseY: patch.position.y,
        phase: runtime.animatedSurfaces.length * .8
      });
    }
    return patch;
  }

  function orientSurfaceAnchor(anchor, heading = 0) {
    if (!anchor) return;
    anchor.rotation.set(0, heading, 0);
  }

  function mesh(THREE, geometry, mat, x, y, z, parent) {
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(x, y, z);
    object.castShadow = runtime?.quality?.shadows ?? true;
    object.receiveShadow = runtime?.quality?.shadows ?? true;
    (parent || runtime.scene).add(object);
    return object;
  }

  function box(THREE, size, color, position, parent, options = {}) {
    const item = mesh(THREE, new THREE.BoxGeometry(size[0], size[1], size[2]), material(THREE, color, options), position[0], position[1], position[2], parent);
    if (options.rotation) item.rotation.set(...options.rotation);
    return item;
  }

  function cylinder(THREE, radiusTop, radiusBottom, height, segments, color, position, parent, options = {}) {
    return mesh(THREE, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), material(THREE, color, options), position[0], position[1], position[2], parent);
  }

  function sphere(THREE, radius, color, position, parent, options = {}) {
    const item = mesh(THREE, new THREE.SphereGeometry(radius, options.segments || 8, options.rings || 6), material(THREE, color, options), position[0], position[1], position[2], parent);
    if (options.scale) item.scale.set(...options.scale);
    return item;
  }

  function dampAlpha(rate, delta) {
    return 1 - Math.exp(-Math.max(0, Number(rate || 0)) * Math.max(0, Number(delta || 0)));
  }

  function dampNumber(current, target, rate, delta) {
    return current + (target - current) * dampAlpha(rate, delta);
  }

  function lerpAngle(start, end, amount) {
    const difference = Math.atan2(Math.sin(end - start), Math.cos(end - start));
    return start + difference * amount;
  }

  function registerWindObject(group, strength = 1) {
    if (!runtime || !group) return;
    const phase = runtime.ambientSway.length * .47;
    group.userData.swayPhase = phase;
    runtime.ambientSway.push({
      object: group,
      phase,
      strength,
      baseX: group.rotation.x,
      baseZ: group.rotation.z
    });
    group.children.forEach((child, index) => {
      if (!child.isMesh || child.position.y < .85) return;
      runtime.foliageLayers.push({
        object: child,
        phase: phase + index * .63,
        strength: strength * (.7 + (index % 3) * .12),
        baseX: child.rotation.x,
        baseZ: child.rotation.z
      });
    });
  }

  function addTree(THREE, x, z, theme, scale = 1) {
    if ((theme.placeId || theme.id) === "japanesegarden") {
      addSakuraTree(THREE, x, z, theme, scale);
      return;
    }
    const group = new THREE.Group();
    group.position.set(x, WORLD.surfaceY, z);
    runtime.worldGroup.add(group);
    if (theme.id === "beach") {
      cylinder(THREE, .12 * scale, .18 * scale, 1.7 * scale, 7, theme.trunk, [0, .85 * scale, 0], group);
      for (let i = 0; i < 5; i += 1) {
        const leaf = box(THREE, [1.1 * scale, .12 * scale, .28 * scale], theme.tree, [0, 1.73 * scale, 0], group);
        leaf.rotation.y = (Math.PI * 2 * i) / 5;
        leaf.rotation.z = -.18;
      }
    } else if (theme.id === "desert") {
      cylinder(THREE, .17 * scale, .2 * scale, 1.35 * scale, 8, theme.tree, [0, .68 * scale, 0], group);
      box(THREE, [.5 * scale, .17 * scale, .17 * scale], theme.tree, [.25 * scale, .9 * scale, 0], group);
      box(THREE, [.17 * scale, .55 * scale, .17 * scale], theme.tree, [.48 * scale, 1.05 * scale, 0], group);
    } else {
      cylinder(THREE, .12 * scale, .17 * scale, 1.1 * scale, 7, theme.trunk, [0, .55 * scale, 0], group);
      cylinder(THREE, 0, .72 * scale, 1.25 * scale, 7, theme.tree, [0, 1.45 * scale, 0], group);
      if (theme.id === "snow") cylinder(THREE, 0, .57 * scale, .3 * scale, 7, 0xf4fbff, [0, 1.75 * scale, 0], group);
    }
    registerWindObject(group, theme.id === "desert" ? .42 : 1);
  }

  function addSakuraTree(THREE, x, z, theme, scale = 1) {
    const group = new THREE.Group();
    group.position.set(x, WORLD.surfaceY, z);
    runtime.worldGroup.add(group);

    // A branching broadleaf silhouette distinguishes the garden's sakura
    // from the conical pine used by Forest and Mountain places.
    cylinder(THREE, .14 * scale, .22 * scale, 1.45 * scale, 8, 0x79513f, [0, .72 * scale, 0], group);
    [
      [-.28, 1.18, 0, .72, .48],
      [.3, 1.24, .04, .76, -.46],
      [-.08, 1.42, -.18, .62, .08]
    ].forEach(([bx, by, bz, length, tilt]) => {
      const branch = cylinder(THREE, .055 * scale, .09 * scale, length * scale, 7, 0x79513f, [bx * scale, by * scale, bz * scale], group);
      branch.rotation.z = tilt;
    });

    const blossomColors = [0xf3a7bd, 0xf8c4d3, 0xffdce6, 0xe88eac];
    [
      [-.58,1.75,.02,.62],[-.12,1.94,.08,.72],[.46,1.78,.04,.66],
      [-.36,2.18,-.12,.58],[.27,2.18,-.08,.6],[.02,2.43,-.16,.52],
      [-.76,2.02,-.15,.45],[.7,2.02,-.12,.48]
    ].forEach(([cx, cy, cz, radius], index) => {
      sphere(THREE, radius * scale, blossomColors[index % blossomColors.length], [cx * scale, cy * scale, cz * scale], group, {
        scale: [1.18, .7, 1],
        segments: 9,
        rings: 6,
        roughness: .9
      });
    });
    registerWindObject(group, 1.12);
  }

  function addShrub(THREE, x, z, theme, scale = 1, color = theme.tree) {
    sphere(THREE, .42 * scale, color, [x, WORLD.surfaceY + .3 * scale, z], runtime.worldGroup, {
      scale: [1.45, .68, 1],
      segments: 8,
      rings: 5
    });
  }

  function addStreetTree(THREE, x, z, theme, scale = 1) {
    box(THREE, [1.18 * scale, .34, 1.18 * scale], 0x765f4d, [x, WORLD.surfaceY + .17, z], runtime.worldGroup);
    box(THREE, [.86 * scale, .08, .86 * scale], 0x453f39, [x, WORLD.surfaceY + .37, z], runtime.worldGroup);
    cylinder(THREE, .1 * scale, .14 * scale, 1.18 * scale, 8, theme.trunk, [x, WORLD.surfaceY + .94 * scale, z], runtime.worldGroup);
    sphere(THREE, .66 * scale, theme.tree, [x, WORLD.surfaceY + 1.72 * scale, z], runtime.worldGroup, {
      scale: [1, .82, 1],
      segments: 9,
      rings: 6
    });
  }

  function addBambooScreen(THREE, x, z, rotation = 0, scale = 1) {
    const bamboo = new THREE.Group();
    bamboo.position.set(x, WORLD.surfaceY, z);
    bamboo.rotation.y = rotation;
    runtime.worldGroup.add(bamboo);
    [-.65,-.33,0,.33,.65].forEach((offset, index) => {
      cylinder(THREE, .045 * scale, .055 * scale, (1.45 + (index % 2) * .22) * scale, 7, 0x568052, [offset * scale, .75 * scale, 0], bamboo);
    });
    [0.48,1.02].forEach(y => box(THREE,[1.65 * scale,.055 * scale,.07 * scale],0x7b6142,[0,y * scale,0],bamboo));
  }

  function labelTexture(THREE, primary, secondary, color, options = {}) {
    const canvas = document.createElement("canvas");
    canvas.width = options.width || 512;
    canvas.height = options.height || 168;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.fillStyle = "rgba(255,251,242,.97)";
    context.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
    context.strokeStyle = color;
    context.lineWidth = 10;
    context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    context.fillStyle = color;
    context.font = `900 ${options.primarySize || 55}px system-ui, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(primary, canvas.width / 2, secondary ? canvas.height * .42 : canvas.height / 2);
    if (secondary) {
      context.font = `800 ${options.secondarySize || 28}px system-ui, sans-serif`;
      context.fillText(secondary, canvas.width / 2, canvas.height * .72);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, runtime?.renderer?.capabilities?.getMaxAnisotropy?.() || 1);
    return texture;
  }

  function registerCollider(config) {
    if (!runtime?.colliders) return;
    runtime.colliders.push({
      x: Number(config.x || 0),
      z: Number(config.z || 0),
      radiusX: Math.max(.1, Number(config.radiusX || config.radius || .5)),
      radiusZ: Math.max(.1, Number(config.radiusZ || config.radius || .5)),
      type: config.type || "scenery",
      id: config.id || ""
    });
  }

  function addGroundLabel(THREE, config) {
    const colors = { atm: "#1e5e91", bank: "#24513f", school: "#7b3429", townhall: "#244e7b", observatory: "#4f3e84" };
    const texture = labelTexture(THREE, config.label, config.placeLabel, colors[config.kind], {
      primarySize: config.label.length > 10 ? 48 : 55,
      secondarySize: 25
    });
    if (!texture) return;
    const placements = {
      planning: { x: -14.15, z: -5.0, width: 3.85 },
      dashboard: { x: 14.15, z: -5.0, width: 3.85 },
      transactions: { x: -13.45, z: 10.0, width: 4.05 },
      lists: { x: 13.45, z: 10.0, width: 4.05 },
      "future-value": { x: -4.15, z: -9.75, width: 3.55 }
    };
    const placement = placements[config.id];
    const plaqueWidth = placement?.width || 3.7;
    const groundY = WORLD.surfaceY + Number(config.elevation || 0) + .34 + Number(placement?.yOffset || 0);
    const sign = new THREE.Group();
    sign.position.set(placement?.x ?? config.x, groundY, placement?.z ?? config.z);
    runtime.worldGroup.add(sign);

    // Raise destination names to eye level and place them beside each approach.
    // Camera-facing plaques stay readable from the close follow view, while the
    // offsets keep all five doors and front facades unobstructed.
    const postColor = themeColor(config.kind, 0x6f624f);
    const postX = plaqueWidth * .37;
    [-postX, postX].forEach(x => box(THREE, [.1, .82, .1], postColor, [x, .41, -.055], sign, { roughness: .9 }));
    box(THREE, [plaqueWidth + .19, 1.2, .12], postColor, [0, 1.17, -.065], sign, { roughness: .9 });
    const plaqueMaterial = enableRollingWorldMaterial(new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide }));
    const plaque = mesh(THREE, new THREE.PlaneGeometry(plaqueWidth, 1.05), plaqueMaterial, 0, 1.17, .005, sign);
    plaque.castShadow = false;
    plaque.receiveShadow = false;
    plaque.renderOrder = 4;
    plaque.userData.cameraResponsiveLabel = true;
    runtime.labelPlaques.push(plaque);
    registerCollider({ x: sign.position.x, z: sign.position.z, radiusX: plaqueWidth * .48, radiusZ: .38, type: "sign", id: config.id });
  }

  function themeColor(kind, fallback) {
    return {
      atm: 0x315f78,
      bank: 0x3f614f,
      school: 0x70483d,
      townhall: 0x3b5873,
      observatory: 0x564b75
    }[kind] || fallback;
  }

  function entranceSpecFor(config) {
    return {
      atm: { width: .88, height: .88, y: .54, z: 1.105, color: 0x304a5d, approach: .78, promptY: 1.72 },
      bank: { width: .62, height: 1.02, y: .51, z: 1.305, color: 0x5b3a2e, approach: .74, promptY: 1.64 },
      school: { width: .7, height: 1.1, y: .55, z: 1.225, color: 0x5b3a2e, approach: .78, promptY: 1.75 },
      observatory: { width: .72, height: 1.02, y: .52, z: 1.785, color: 0x514237, approach: .72, promptY: 1.66 },
      townhall: { width: .72, height: 1.14, y: .58, z: 1.355, color: 0x5b3a2e, approach: .72, promptY: 1.8 }
    }[config.kind];
  }

  function addBuilding(THREE, config, theme) {
    const group = new THREE.Group();
    group.position.set(config.x, WORLD.surfaceY + Number(config.elevation || 0) + .32, config.z);
    // Every front facade faces the neighborhood approach. The follow camera
    // stays on this side of town so doors remain visible while moving.
    group.rotation.y = 0;
    group.scale.setScalar(config.scale || 1);
    group.userData.building = config;
    runtime.worldGroup.add(group);
    const bodyColor = theme.id === "desert" ? 0xd9a86e : theme.id === "snow" ? 0xe7e1d3 : theme.id === "beach" ? 0xf0c982 : 0xc8a978;
    const foundationSize = config.kind === "atm" ? [2.85, .18, 2.45] : config.kind === "school" ? [4.8, .2, 2.8] : config.kind === "observatory" ? [4.15, .2, 3.15] : [4.6, .2, 3.05];
    box(THREE, foundationSize, theme.rock, [0, -.08, .08], group, { roughness: .94 });
    let signY = 1.65;
    if (config.kind === "atm") {
      const kioskWall = theme.id === "snow" ? 0xe8edf0 : theme.id === "desert" ? 0xd8ad72 : 0xd8cfbb;
      box(THREE, [2.45, 2.25, 1.75], kioskWall, [0, 1.12, 0], group);
      box(THREE, [1.72, 1.62, .16], 0x33475b, [0, 1.04, .95], group);
      box(THREE, [1.18, .68, .08], config.color, [0, 1.46, 1.01], group);
      box(THREE, [.88, .43, .06], 0x9ed8df, [0, 1.45, 1.07], group, { roughness: .2, emissive: 0x4aa6c8, emissiveIntensity: .1 });
      box(THREE, [.72, .09, .06], 0x101821, [0, .92, 1.07], group);
      box(THREE, [1.0, .24, .1], 0xe7edf1, [0, .5, 1.02], group);
      box(THREE, [3.05, .18, 2.25], config.color, [0, 2.31, 0], group);
      box(THREE, [.18, 2.15, .18], config.color, [-1.34, 1.08, .9], group);
      box(THREE, [.18, 2.15, .18], config.color, [1.34, 1.08, .9], group);
      box(THREE, [3.15, .12, 2.5], theme.sidewalk, [0, .06, .34], group);
      box(THREE, [.48, .62, .12], 0xd8a94c, [1.05, .52, 1.02], group, { emissive: 0x8d5e18, emissiveIntensity: .05 });
      signY = 2.13;
    } else if (config.kind === "bank") {
      const stone = theme.id === "desert" ? 0xd7b17a : theme.id === "snow" ? 0xe8edf0 : 0xd8d0ba;
      box(THREE, [3.35, 1.75, 2.35], stone, [0, .88, 0], group);
      box(THREE, [3.75, .18, 2.7], config.color, [0, 1.83, 0], group);
      const pediment = mesh(THREE, new THREE.ConeGeometry(2.12, .92, 3), material(THREE, theme.id === "snow" ? 0xf8fbff : config.color), 0, 2.25, .18, group);
      pediment.rotation.y = Math.PI / 2;
      [-1.2, -.4, .4, 1.2].forEach(x => cylinder(THREE, .11, .14, 1.55, 8, 0xf0eadc, [x, .85, 1.28], group));
      box(THREE, [.62, 1.02, .1], 0x5b3a2e, [0, .51, 1.24], group);
      box(THREE,[3.05,.12,.72],0xbab19c,[0,.08,1.48],group);
      box(THREE,[2.65,.12,.55],0xc8bfaa,[0,.2,1.35],group);
      [-1.45,1.45].forEach(x => box(THREE,[.5,.56,.08],0x9ec9d2,[x,1.0,1.23],group,{roughness:.24}));
      cylinder(THREE,.22,.22,.1,18,0xc99756,[0,2.2,1.12],group,{metalness:.18});
      signY = 2.16;
    } else if (config.kind === "school") {
      const brick = theme.id === "snow" ? 0xb87869 : 0xb45f4d;
      box(THREE, [4.25, 1.8, 2.25], brick, [0, .9, 0], group);
      const roof = mesh(THREE, new THREE.ConeGeometry(2.65, 1.2, 4), material(THREE, theme.id === "snow" ? 0xf8fbff : config.color), 0, 2.38, 0, group);
      roof.rotation.y = Math.PI / 4;
      box(THREE, [.95, 1.25, .95], brick, [0, 2.08, 0], group);
      const towerRoof = mesh(THREE, new THREE.ConeGeometry(.75, .75, 4), material(THREE, config.color), 0, 3.05, 0, group);
      towerRoof.rotation.y = Math.PI / 4;
      cylinder(THREE, .16, .16, .16, 10, 0xf4e1a1, [0, 2.23, .51], group, { metalness: .12 });
      box(THREE,[.018,.13,.02],0x3d4751,[0,2.25,.603],group,{rotation:[0,0,-.55]});
      box(THREE,[.018,.09,.02],0x3d4751,[.03,2.2,.604],group,{rotation:[0,0,.45]});
      box(THREE, [.7, 1.1, .1], 0x5b3a2e, [0, .55, 1.16], group);
      [-1.25, -.7, .7, 1.25].forEach(x => box(THREE, [.42, .48, .09], 0x9ed8df, [x, 1.05, 1.17], group, { roughness: .25 }));
      cylinder(THREE,.035,.045,1.15,6,0x5b5b5b,[1.7,2.82,.1],group);
      box(THREE,[.55,.3,.04],0xf2c84b,[1.95,3.18,.1],group,{rotation:[0,0,-.08]});
      box(THREE,[1.2,.12,.16],0xf0d18a,[0,1.72,1.2],group);
      signY = 2.45;
    } else if (config.kind === "observatory") {
      const observatoryStone = theme.id === "desert" ? 0xd8b27d : theme.id === "snow" ? 0xe7edf1 : theme.id === "beach" ? 0xe5cb9c : 0xc9c3b5;
      cylinder(THREE, 1.7, 1.82, 1.5, 14, observatoryStone, [0, .76, 0], group);
      cylinder(THREE, 1.83, 1.83, .18, 18, config.color, [0, 1.48, 0], group);
      sphere(THREE, 1.66, config.color, [0, 1.62, 0], group, { scale: [1, .5, 1], segments: 16, rings: 8, roughness: .65 });
      const domeBand = mesh(THREE, new THREE.TorusGeometry(1.62, .07, 7, 24), material(THREE, 0xd8c58a, { metalness: .3 }), 0, 1.58, 0, group);
      domeBand.rotation.x = Math.PI / 2;
      box(THREE, [.72, 1.02, .12], 0x514237, [0, .52, 1.72], group);
      [-.88, .88].forEach(x => box(THREE, [.46, .52, .1], 0x9ed8df, [x, .88, 1.52], group, { roughness: .22, emissive: 0x3f6b8d, emissiveIntensity: .08 }));
      const telescope = cylinder(THREE, .16, .23, 2.15, 10, 0xd9dce2, [.15, 2.35, .05], group, { metalness: .3, roughness: .38 });
      telescope.rotation.z = -.72;
      telescope.rotation.x = .12;
      cylinder(THREE, .29, .29, .16, 12, 0x49435f, [.85, 2.98, .05], group, { metalness: .18 });
      cylinder(THREE, .07, .1, 1.1, 8, 0x6b6578, [-.15, 1.86, .05], group);
      box(THREE, [3.25, .12, .72], theme.sidewalk, [0, .08, 1.72], group);
      const glow = sphere(THREE, .13, 0xffd57b, [0, 2.43, 1.55], group, { emissive: 0xffa83d, emissiveIntensity: .28 });
      runtime.nightMaterials.push(glow.material);
      signY = 1.38;
    } else if (config.kind === "townhall") {
      const civicStone = theme.id === "desert" ? 0xd8ae75 : theme.id === "snow" ? 0xe7edf0 : theme.id === "beach" ? 0xe7cc9c : 0xc9bea5;
      box(THREE, [4.05, 1.85, 2.5], civicStone, [0, .93, 0], group);
      box(THREE, [4.45, .18, 2.85], config.color, [0, 1.92, 0], group);
      const pediment = mesh(THREE, new THREE.ConeGeometry(2.38, 1.0, 3), material(THREE, config.color), 0, 2.36, .18, group);
      pediment.rotation.y = Math.PI / 2;
      [-1.3, -.65, .65, 1.3].forEach(x => cylinder(THREE, .11, .14, 1.42, 8, 0xf0eadc, [x, .78, 1.36], group));
      box(THREE, [.72, 1.14, .12], 0x5b3a2e, [0, .58, 1.29], group);
      box(THREE, [1.15, 1.3, 1.05], civicStone, [0, 2.45, -.15], group);
      const towerRoof = mesh(THREE, new THREE.ConeGeometry(.78, .72, 4), material(THREE, theme.roof), 0, 3.46, -.15, group);
      towerRoof.rotation.y = Math.PI / 4;
      cylinder(THREE, .18, .18, .09, 16, 0xf4e1a1, [0, 2.62, .4], group, { emissive: 0xd5a946, emissiveIntensity: .08 });
      [-.055,.055].forEach(x => box(THREE, [.018,.16,.025],0x3d4751,[x,2.62,.452],group,{rotation:[0,0,x < 0 ? -.7 : .35]}));
      box(THREE, [3.2, .12, .72], theme.sidewalk, [0, .09, 1.62], group);
      [-1.45,1.45].forEach(x => box(THREE,[.5,.58,.08],0x9ec9d2,[x,1.02,1.31],group,{roughness:.24}));
      box(THREE,[1.6,.13,.22],0xc99756,[0,1.73,1.32],group,{metalness:.1});
      signY = 2.3;
    }

    // A dedicated hinged leaf sits just in front of the modeled facade. The
    // original facade remains its frame while this layer supplies a readable,
    // animated entrance without changing any of the destination artwork.
    const entranceSpec = entranceSpecFor(config);
    const doorPivot = new THREE.Group();
    doorPivot.position.set(-entranceSpec.width / 2, entranceSpec.y, entranceSpec.z);
    group.add(doorPivot);
    const doorPanel = new THREE.Group();
    doorPivot.add(doorPanel);
    const doorLeaf = box(
      THREE,
      [entranceSpec.width, entranceSpec.height, .075],
      entranceSpec.color,
      [entranceSpec.width / 2, 0, 0],
      doorPanel,
      { roughness: .72 }
    );
    const doorKnob = sphere(
      THREE,
      .045,
      0xf2c86b,
      [entranceSpec.width - .1, 0, .07],
      doorPanel,
      { emissive: 0x9d671a, emissiveIntensity: .18, segments: 8, rings: 5 }
    );
    const entranceLight = box(
      THREE,
      [entranceSpec.width + .32, .095, .12],
      config.color,
      [0, entranceSpec.promptY - .18, entranceSpec.z + .08],
      group,
      { emissive: config.color, emissiveIntensity: .28, roughness: .42 }
    );
    const threshold = box(
      THREE,
      [entranceSpec.width + .46, .06, .42],
      theme.sidewalk,
      [0, .03, entranceSpec.z + .22],
      group,
      { roughness: .88 }
    );
    threshold.castShadow = false;
    const promptAnchor = new THREE.Object3D();
    promptAnchor.position.set(0, entranceSpec.promptY + .38, entranceSpec.z + .26);
    group.add(promptAnchor);
    runtime.nightMaterials.push(entranceLight.material, doorKnob.material);

    const entranceScale = Number(config.scale || 1);
    const approachZ = config.z + (entranceSpec.z + entranceSpec.approach) * entranceScale;
    group.userData.entrance = {
      config,
      doorPivot,
      doorLeaf,
      doorPanel,
      entranceLight,
      promptAnchor,
      approachPosition: new THREE.Vector3(config.x, terrainYAt(config.x, approachZ), approachZ),
      doorWorldPosition: new THREE.Vector3(
        config.x,
        WORLD.surfaceY + Number(config.elevation || 0) + .32 + entranceSpec.y * entranceScale,
        config.z + entranceSpec.z * entranceScale
      ),
      openAmount: 0,
      state: "idle"
    };

    const placeId = theme.placeId || theme.id;
    if (placeId === "japanesegarden") {
      // Keep the garden buildings clean and architectural. Earlier horizontal
      // beams projected past the roofs and read as loose logs from this camera.
      const lanternY = config.kind === "atm" ? 1.7 : 1.28;
      const lanternX = config.kind === "atm" ? 1.05 : config.kind === "observatory" ? 1.28 : 1.45;
      [-lanternX, lanternX].forEach(x => {
        const lantern = box(THREE, [.16, .28, .13], 0xf0c982, [x, lanternY, 1.42], group, { emissive: 0xd59645, emissiveIntensity: .08 });
        runtime.nightMaterials.push(lantern.material);
      });
    } else if (placeId === "downtown") {
      const canopyWidth = config.kind === "atm" ? 2.15 : 2.65;
      const canopyY = config.kind === "atm" ? 1.92 : 1.68;
      box(THREE, [canopyWidth, .12, .62], theme.trim, [0, canopyY, 1.48], group, { metalness: .16 });
      [-canopyWidth * .38, canopyWidth * .38].forEach(x => cylinder(THREE, .035, .045, .72, 7, 0x39474e, [x, canopyY - .4, 1.68], group));
    }

    addGroundLabel(THREE, config);

    const sign = cylinder(THREE, .24, .24, .12, 16, config.color, [0, signY, 1.36], group, { emissive: config.color, emissiveIntensity: 0 });
    sign.rotation.x = Math.PI / 2;
    runtime.nightMaterials.push(sign.material);

    const hitSize = config.kind === "atm" ? [3.4, 3.5, 3.4] : config.kind === "school" ? [5.5, 4.6, 4.1] : config.kind === "observatory" ? [4.8, 4.5, 4.3] : [5.2, 4.5, 4.2];
    const hitbox = box(THREE, hitSize, 0xffffff, [0, hitSize[1] / 2, 0], group, { transparent: true, opacity: 0 });
    hitbox.material.depthWrite = false;
    hitbox.material.colorWrite = false;
    hitbox.castShadow = false;
    hitbox.receiveShadow = false;
    hitbox.userData.interactionBuilding = config;
    runtime.buildingHitboxes.push(hitbox);
    const arrivalGlow = mesh(
      THREE,
      new THREE.TorusGeometry(.68, .06, 8, 30),
      material(THREE, config.color, { transparent: true, opacity: .2, emissive: config.color, emissiveIntensity: .55, roughness: .4 }),
      0,
      .07,
      config.kind === "atm" ? 1.42 : 1.75,
      group
    );
    arrivalGlow.rotation.x = Math.PI / 2;
    arrivalGlow.material.depthWrite = false;
    arrivalGlow.userData.baseScale = 1;
    runtime.destinationGlows.push({ object: arrivalGlow, material: arrivalGlow.material, config });
    registerCollider({
      x: config.x,
      z: config.z,
      radiusX: hitSize[0] * Number(config.scale || 1) * .43,
      radiusZ: hitSize[2] * Number(config.scale || 1) * .43,
      type: "building",
      id: config.id
    });
    return group;
  }

  function addBench(THREE, x, z, rotation = 0, elevation = 0) {
    const bench = new THREE.Group();
    bench.position.set(x, WORLD.surfaceY + elevation, z);
    bench.rotation.y = rotation;
    runtime.worldGroup.add(bench);
    box(THREE, [1.05,.12,.34], 0x95643f, [0,.34,0], bench);
    box(THREE, [1.05,.48,.09], 0x95643f, [0,.6,-.15], bench);
    [-.38,.38].forEach(xPos => box(THREE,[.09,.34,.09],0x5c4637,[xPos,.15,0],bench));
  }

  function addLamp(THREE, x, z, theme, elevation = 0) {
    cylinder(THREE, .045, .065, 1.35, 7, 0x4e5358, [x, WORLD.surfaceY + elevation + .68, z], runtime.worldGroup);
    const lamp = cylinder(THREE, .13, .13, .2, 10, 0xffd57b, [x, WORLD.surfaceY + elevation + 1.42, z], runtime.worldGroup, { emissive: 0xffa83d, emissiveIntensity: .25 });
    runtime.nightMaterials.push(lamp.material);
  }

  function addRoadSegment(THREE, from, to, width, color, y, thickness = .09) {
    const dx = to[0] - from[0];
    const dz = to[1] - from[1];
    const length = Math.hypot(dx, dz);
    const heading = Math.atan2(dx, dz);
    const segment = box(THREE, [width, thickness, length + .08], color, [(from[0] + to[0]) / 2, y, (from[1] + to[1]) / 2], runtime.worldGroup);
    segment.rotation.y = heading;
    segment.userData.dioramaRoad = true;
    return segment;
  }

  function roundedRectShape(THREE, width, depth, radius) {
    const halfWidth = width / 2;
    const halfDepth = depth / 2;
    const shape = new THREE.Shape();
    shape.moveTo(-halfWidth + radius, -halfDepth);
    shape.lineTo(halfWidth - radius, -halfDepth);
    shape.quadraticCurveTo(halfWidth, -halfDepth, halfWidth, -halfDepth + radius);
    shape.lineTo(halfWidth, halfDepth - radius);
    shape.quadraticCurveTo(halfWidth, halfDepth, halfWidth - radius, halfDepth);
    shape.lineTo(-halfWidth + radius, halfDepth);
    shape.quadraticCurveTo(-halfWidth, halfDepth, -halfWidth, halfDepth - radius);
    shape.lineTo(-halfWidth, -halfDepth + radius);
    shape.quadraticCurveTo(-halfWidth, -halfDepth, -halfWidth + radius, -halfDepth);
    return shape;
  }

  function addDioramaLayer(THREE, width, depth, radius, height, color, topY, bevelSize) {
    const geometry = new THREE.ExtrudeGeometry(roundedRectShape(THREE, width, depth, radius), {
      depth: height,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize,
      bevelThickness: Math.min(height * .28, .22),
      curveSegments: 7
    });
    geometry.rotateX(Math.PI / 2);
    const layer = mesh(THREE, geometry, material(THREE, color, { roughness: .94, flatShading: false }), 0, topY, 0, runtime.worldGroup);
    layer.castShadow = true;
    layer.receiveShadow = true;
    layer.userData.dioramaLayer = true;
    return layer;
  }

  function addDioramaBase(THREE, theme) {
    // A broad subdivided field replaces the visible architectural board. The
    // shared vertex bend rolls distant terrain below a close horizon, creating
    // a cozy life-sim world without tilting buildings or gameplay coordinates.
    const underlay = mesh(
      THREE,
      new THREE.PlaneGeometry(WORLD.renderWidth + 8, WORLD.renderDepth + 8, 28, 32),
      material(THREE, theme.edge, { roughness: .98, flatShading: false }),
      0,
      WORLD.surfaceY - .38,
      0,
      runtime.worldGroup
    );
    underlay.rotation.x = -Math.PI / 2;
    underlay.castShadow = false;
    underlay.receiveShadow = false;
    underlay.userData.rollingWorldUnderlay = true;

    const terrain = mesh(
      THREE,
      new THREE.PlaneGeometry(WORLD.renderWidth, WORLD.renderDepth, 32, 36),
      material(THREE, theme.ground, { roughness: .94, flatShading: false }),
      0,
      WORLD.surfaceY,
      0,
      runtime.worldGroup
    );
    terrain.rotation.x = -Math.PI / 2;
    terrain.castShadow = false;
    terrain.receiveShadow = Boolean(runtime.quality.shadows);
    terrain.userData.rollingWorldTerrain = theme.placeId || theme.id;
    runtime.dioramaBase = terrain;

    const walkSurface = mesh(
      THREE,
      new THREE.PlaneGeometry(WORLD.width - .4, WORLD.depth - .4),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }),
      0,
      WORLD.surfaceY + .03,
      0,
      runtime.worldGroup
    );
    walkSurface.rotation.x = -Math.PI / 2;
    walkSurface.castShadow = false;
    walkSurface.receiveShadow = false;
    walkSurface.userData.walkSurface = true;
    runtime.walkSurface = walkSurface;
  }

  function addDistrictPlatform(THREE, building, theme) {
    const elevation = Number(building.elevation || 0);
    const radius = building.kind === "atm" ? 3.95 : building.kind === "school" ? 4.7 : building.kind === "observatory" ? 4.2 : 4.55;
    const retainingHeight = elevation + .22;
    const base = cylinder(THREE, radius, radius + .12, retainingHeight, 36, theme.rock, [building.x, WORLD.surfaceY + retainingHeight / 2, building.z], runtime.worldGroup);
    base.receiveShadow = true;
    const retainingBand = cylinder(THREE, radius - .07, radius - .07, .18, 36, theme.trim, [building.x, WORLD.surfaceY + elevation + .18, building.z], runtime.worldGroup);
    retainingBand.receiveShadow = true;
    const top = cylinder(THREE, radius - .2, radius - .2, .12, 36, theme.sidewalk, [building.x, WORLD.surfaceY + elevation + .25, building.z], runtime.worldGroup);
    top.receiveShadow = true;
    cylinder(THREE, radius * .72, radius * .74, .035, 32, 0x26312f, [building.x, WORLD.surfaceY + elevation + .325, building.z], runtime.worldGroup, { transparent: true, opacity: .12, roughness: 1 });
    // Compact solid risers keep the entrances readable without letting thin
    // stair slabs float below the terrace or consume the destination frontage.
    const frontZ = building.z + radius - .38;
    const stepCount = elevation > .5 ? 3 : 2;
    Array.from({ length: stepCount }, (_, step) => step).forEach(step => {
      const progress = (step + 1) / stepCount;
      const topY = WORLD.surfaceY + elevation + .28 - progress * elevation;
      const blockHeight = Math.max(.13, topY - WORLD.surfaceY);
      const width = 2.5 + step * .13;
      box(THREE, [width, blockHeight, .4], theme.path, [building.x, WORLD.surfaceY + blockHeight / 2, frontZ + step * .3], runtime.worldGroup);
    });
    box(THREE, [2.86, .1, .54], theme.sidewalk, [building.x, WORLD.surfaceY + .05, frontZ + stepCount * .3 + .08], runtime.worldGroup);
  }

  function addRoadsAndSidewalks(THREE, theme) {
    // v21 keeps the logical neighborhood on one readable plane while its
    // rendered field rolls into a close, soft horizon around the explorer.
    addDioramaBase(THREE, theme);

    const roadEdge = theme.id === "snow" ? 0x4f5d68 : 0x39454b;
    const roadPairs = [
      [[-1.35,-1.15],[-8.15,-6.45]],
      [[1.35,-1.15],[8.15,-6.45]],
      [[-1.45,1.15],[-8.25,7.9]],
      [[1.45,1.15],[8.25,7.9]],
      [[0,-1.45],[0,-10.65]]
    ];
    roadPairs.forEach(([from,to]) => {
      addRoadSegment(THREE, from, to, WORLD.roadWidth + .5, roadEdge, WORLD.surfaceY + .05, .14);
      addRoadSegment(THREE, from, to, WORLD.roadWidth, theme.road, WORLD.surfaceY + .045, .1);
      const dx = to[0] - from[0];
      const dz = to[1] - from[1];
      const length = Math.hypot(dx, dz);
      const px = -dz / length;
      const pz = dx / length;
      const offset = WORLD.roadWidth / 2 + WORLD.sidewalkWidth / 2 + .23;
      [-1,1].forEach(side => {
        const shiftedFrom = [from[0] + px * offset * side, from[1] + pz * offset * side];
        const shiftedTo = [to[0] + px * offset * side, to[1] + pz * offset * side];
        addRoadSegment(THREE, shiftedFrom, shiftedTo, WORLD.sidewalkWidth, theme.sidewalk, WORLD.surfaceY + .12, .12);
      });
    });

    // The center is a civic roundabout rather than a rigid road intersection.
    cylinder(THREE, 3.35, 3.42, .18, 40, theme.trim, [0, WORLD.surfaceY + .09, 0], runtime.worldGroup);
    cylinder(THREE, 3.02, 3.02, .13, 40, theme.sidewalk, [0, WORLD.surfaceY + .19, 0], runtime.worldGroup);
    cylinder(THREE, 1.55, 1.62, .16, 36, theme.path, [0, WORLD.surfaceY + .27, 0], runtime.worldGroup);
    const centerRing = mesh(THREE, new THREE.TorusGeometry(2.25, .07, 8, 36), material(THREE, theme.trim), 0, WORLD.surfaceY + .29, 0, runtime.worldGroup);
    centerRing.rotation.x = Math.PI / 2;
    const copper = 0xb97742;
    cylinder(THREE, .42, .44, .035, 24, copper, [0, WORLD.surfaceY + .37, 0], runtime.worldGroup, { metalness: .22, roughness: .55 });
    [[0,1.02,0,.14],[0,-1.02,0,.14],[1.02,0,Math.PI/2,.14],[-1.02,0,Math.PI/2,.14]].forEach(([x,z,rotation,width]) => {
      box(THREE,[width,.028,1.18],copper,[x,WORLD.surfaceY + .365,z],runtime.worldGroup,{rotation:[0,rotation,0],metalness:.18,roughness:.58});
    });

    BUILDINGS.forEach(building => addDistrictPlatform(THREE, building, theme));
  }

  function addQuadrantDetails(THREE, theme) {
    const placeId = theme.placeId || theme.id;
    const landscapeGreen = placeId === "japanesegarden" ? 0x5f8a58 : theme.tree;
    const planningY = WORLD.surfaceY + BUILDINGS[0].elevation + .31;
    const dashboardY = WORLD.surfaceY + BUILDINGS[1].elevation + .31;
    const transactionsY = WORLD.surfaceY + BUILDINGS[2].elevation + .31;
    const listsY = WORLD.surfaceY + BUILDINGS[3].elevation + .31;
    // Planning: fountain and formal clipped courtyard on the raised terrace.
    cylinder(THREE, .7,.82,.22,20, theme.trim, [-11.65,planningY + .11,-6.0], runtime.worldGroup);
    cylinder(THREE, .4,.45,.12,20, theme.water, [-11.65,planningY + .25,-6.0], runtime.worldGroup, { roughness: .2 });
    cylinder(THREE, .055,.075,.62,8, theme.trim, [-11.65,planningY + .55,-6.0], runtime.worldGroup);
    [[-12.15,-7.65],[-5.55,-7.55]].forEach(([x,z]) => sphere(THREE,.36,landscapeGreen,[x,planningY + .36,z],runtime.worldGroup,{scale:[1.4,.68,.86],segments:8,rings:5}));
    addBench(THREE,-11.4,-8.65,Math.PI/2,planningY - WORLD.surfaceY);

    // Dashboard: small civic monument and bulletin board.
    box(THREE,[.72,.32,.72],theme.trim,[5.25,dashboardY + .16,-6.15],runtime.worldGroup);
    cylinder(THREE,.11,.18,.78,8,0xc99756,[5.25,dashboardY + .61,-6.15],runtime.worldGroup);
    sphere(THREE,.17,0xc99756,[5.25,dashboardY + 1.07,-6.15],runtime.worldGroup,{segments:8,rings:5});
    box(THREE,[1.05,.68,.1],0x7c573c,[11.7,dashboardY + .54,-6.6],runtime.worldGroup);
    [-.4,.4].forEach(x => box(THREE,[.07,.78,.07],0x5c4637,[11.7+x,dashboardY + .39,-6.6],runtime.worldGroup));
    addBench(THREE,11.2,-8.9,-Math.PI/2,dashboardY - WORLD.surfaceY);

    // Transactions: a compact pull-in bay and neighborhood mailbox.
    box(THREE,[3.75,.07,1.75],theme.road,[-11.3,transactionsY + .04,6.05],runtime.worldGroup);
    [-12.15,-11.15,-10.15].forEach(x => box(THREE,[.045,.025,1.2],0xf3f0e8,[x,transactionsY + .085,6.0],runtime.worldGroup));
    box(THREE,[.45,.56,.38],0x376b9d,[-5.1,transactionsY + .28,6.05],runtime.worldGroup);
    cylinder(THREE,.05,.065,.48,7,0x4e5358,[-5.1,transactionsY + .24,6.05],runtime.worldGroup);
    addLamp(THREE,-11.9,8.25,theme,transactionsY - WORLD.surfaceY);

    // Manage Lists: an organized schoolyard, hoop, bike rack, and bench.
    box(THREE,[3.5,.06,2.45],theme.path,[11.3,listsY + .035,6.1],runtime.worldGroup);
    box(THREE,[.04,.025,1.85],configColor(theme),[11.35,listsY + .08,6.0],runtime.worldGroup);
    cylinder(THREE,.04,.055,1.08,7,0x535b62,[12.5,listsY + .54,6.0],runtime.worldGroup);
    box(THREE,[.62,.42,.05],0xe6e3dc,[12.5,listsY + 1.08,6.0],runtime.worldGroup);
    cylinder(THREE,.2,.2,.03,16,0xd56e3d,[12.44,listsY + .935,6.0],runtime.worldGroup);
    addBench(THREE,11.3,8.05,0,listsY - WORLD.surfaceY);
    [-.25,.25].forEach(offset => {
      const rack = mesh(THREE,new THREE.TorusGeometry(.28,.035,6,10,Math.PI),material(THREE,0x65727a),10.2+offset,listsY + .13,8.0,runtime.worldGroup);
      rack.rotation.x = Math.PI / 2;
    });
  }

  function configColor(theme) {
    return theme.id === "snow" ? 0x687988 : 0xffffff;
  }

  function addRockCluster(THREE, x, z, theme, scale = 1) {
    [[0,0,.48],[-.52,.12,.34],[.5,.18,.29]].forEach(([dx,dz,size], index) => {
      sphere(THREE, size * scale, index === 1 ? theme.edge : theme.rock, [x + dx * scale, WORLD.surfaceY + size * .35 * scale, z + dz * scale], runtime.worldGroup, {
        scale: [1.25,.72,.92],
        segments: 7,
        rings: 5
      });
    });
  }

  function addJapaneseGarden(THREE, theme) {
    // The garden is composed as one continuous route instead of distributing
    // unrelated Japanese props around the diorama edge.
    const pond = cylinder(THREE, 3.05, 3.18, .09, 38, theme.water, [-13.15,WORLD.surfaceY + .04,.55], runtime.worldGroup, { roughness: .16 });
    pond.scale.z = .58;
    cylinder(THREE, 3.35, 3.4, .045, 38, 0x71836a, [-13.15,WORLD.surfaceY + .018,.55], runtime.worldGroup);
    registerCollider({ x: -13.15, z: .55, radiusX: 3.05, radiusZ: 1.78, type: "pond", id: "koi-pond" });

    // A wider arched bridge makes the pond the primary landmark.
    [-1.45,-.96,-.48,0,.48,.96,1.45].forEach((offset, index) => {
      const rise = Math.sin((index / 6) * Math.PI) * .52;
      box(THREE,[.42,.13,1.75],0x9c5548,[-13.15 + offset,WORLD.surfaceY + .24 + rise,.55],runtime.worldGroup,{rotation:[0,0,index < 3 ? -.1 : index > 3 ? .1 : 0]});
    });
    [-13.15 - 1.62,-13.15 + 1.62].forEach(x => {
      cylinder(THREE,.045,.055,.72,7,0x6f4038,[x,WORLD.surfaceY + .62,.0],runtime.worldGroup);
      cylinder(THREE,.045,.055,.72,7,0x6f4038,[x,WORLD.surfaceY + .62,1.1],runtime.worldGroup);
    });

    // The torii now marks the front entrance, where visitors naturally enter.
    [-.92,.92].forEach(x => cylinder(THREE,.1,.14,2.18,8,0x9b493d,[x,WORLD.surfaceY + 1.08,14.7],runtime.worldGroup));
    box(THREE,[2.55,.2,.22],0x9b493d,[0,WORLD.surfaceY + 2.04,14.7],runtime.worldGroup);
    box(THREE,[3.0,.16,.3],0x7f382f,[0,WORLD.surfaceY + 2.34,14.7],runtime.worldGroup);

    // Stepping stones connect the entrance, center, pond, and lantern route.
    [[0,13.25],[.25,11.8],[-.2,10.35],[.2,8.95],[-.35,7.55],[-.7,6.15],[-1.5,4.9],[-2.8,3.9],[-4.2,3.0],[-5.7,2.35],[-7.2,1.9],[-8.75,1.45],[-10.2,1.08]].forEach(([x,z],index) => {
      const stone = cylinder(THREE,.28 + (index%3)*.035,.32 + (index%3)*.035,.055,14,index%2?0xb9b5a7:0xcfcbba,[x,WORLD.surfaceY + .055,z],runtime.worldGroup);
      stone.scale.z = .72 + (index%2)*.12;
    });

    // Lanterns follow the route rather than standing alone in the grass.
    [[-10.45,-1.45],[-14.9,-1.15],[-5.25,3.8],[2.15,9.15]].forEach(([x,z]) => {
      cylinder(THREE,.075,.1,.92,8,0x77736c,[x,WORLD.surfaceY + .46,z],runtime.worldGroup);
      box(THREE,[.62,.11,.44],0x77736c,[x,WORLD.surfaceY + .96,z],runtime.worldGroup);
      const lantern = box(THREE,[.36,.26,.3],0xd9c99f,[x,WORLD.surfaceY + .78,z],runtime.worldGroup,{emissive:0xd9a74f,emissiveIntensity:.08});
      runtime.nightMaterials.push(lantern.material);
    });

    // Two asymmetrical blossom groves replace the evenly spaced perimeter ring.
    [[-15.25,-4.9,.98],[-14.15,-5.9,.78],[-12.7,-5.45,.88],[10.9,-12.7,1.0],[12.45,-11.7,.82],[14.0,-10.1,.94],[14.8,-7.7,.72]].forEach(([x,z,scale]) => addTree(THREE,x,z,theme,scale));
    [[-15.0,-3.7,.78],[-12.4,-4.25,.66],[10.6,-11.0,.72],[13.5,-8.5,.76]].forEach(([x,z,scale]) => addShrub(THREE,x,z,theme,scale,0x5f8a58));

    // A raked zen court and bamboo screens occupy the right garden.
    const zen = cylinder(THREE,2.5,2.58,.055,34,0xddd0ad,[13.25,WORLD.surfaceY + .035,1.25],runtime.worldGroup);
    zen.scale.z = .62;
    [1.05,1.55,2.05].forEach(radius => {
      const rakeLine = mesh(THREE,new THREE.TorusGeometry(radius,.025,5,34),material(THREE,0xb8a982),13.25,WORLD.surfaceY + .085,1.25,runtime.worldGroup);
      rakeLine.rotation.x = Math.PI / 2;
      rakeLine.scale.z = .62;
    });
    addRockCluster(THREE,13.25,1.25,theme,.64);
    addBambooScreen(THREE,15.55,2.0,Math.PI/2,.9);
    addBambooScreen(THREE,12.8,4.0,0,.85);

    // A small five-tier garden pagoda balances the pond without competing with it.
    [0,.46,.86,1.22,1.54].forEach((height,index) => {
      const width = 1.55 - index * .22;
      box(THREE,[width,.12,width],index % 2 ? 0x5a473f : 0x8f4a42,[14.05,WORLD.surfaceY + .14 + height,-4.25],runtime.worldGroup);
    });
    cylinder(THREE,.12,.16,1.45,8,0x6c5043,[14.05,WORLD.surfaceY + .78,-4.25],runtime.worldGroup);
  }

  function addDowntown(THREE, theme) {
    // The paved civic core is a purpose-built surface patch. It stays flush
    // with the shared diorama plane and cannot slice through the terrain edge.
    createSurfacePatch(THREE, {
      id: "downtown-pavement",
      centerX: 0,
      centerZ: 0,
      radiusX: 15.15,
      radiusZ: 15.15,
      rings: 18,
      slices: 72,
      elevation: .018,
      color: 0xb5b8b2,
      roughness: .94
    });
    [[-11.8,-1.0,3.1,1.55],[11.9,-.7,3.0,1.5],[-5.4,12.5,2.4,1.2],[5.6,12.45,2.4,1.2]].forEach(([x,z,rx,rz]) => {
      const plaza = cylinder(THREE,rx,rx,.055,30,0x8e9b91,[x,WORLD.surfaceY + .06,z],runtime.worldGroup);
      plaza.scale.z = rz / rx;
    });

    // The skyline is deliberately pushed behind the civic destinations and
    // staggered so it reads as depth rather than a flat wall.
    const skyline = [
      [-14.2,-8.6,2.4,4.1,0x536c79],[-9.3,-14.0,2.6,5.7,0x405e6d],[-3.4,-15.25,2.2,3.8,0x6c7f86],
      [3.4,-15.25,2.3,4.4,0x536d79],[9.3,-14.0,2.65,6.0,0x3f5969],[14.2,-8.6,2.55,4.0,0x60767f]
    ];
    skyline.forEach(([x,z,width,height,color],index) => {
      box(THREE,[width,height,2.0],color,[x,WORLD.surfaceY + height / 2,z],runtime.worldGroup);
      const columnCount = Math.max(2,Math.floor(width / .8));
      const rowCount = Math.max(2,Math.floor(height / 1.05));
      for (let column = 0; column < columnCount; column += 1) {
        for (let row = 0; row < rowCount; row += 1) {
          if ((column + row + index) % 3 === 0 || (runtime.quality.detail < 1 && (column + row) % 2 === 0)) continue;
          const windowMaterial = material(THREE,0xe8d08d,{emissive:0xd99c39,emissiveIntensity:.06});
          const wx = x - width * .36 + column * (width * .72 / Math.max(1,columnCount - 1));
          const wy = WORLD.surfaceY + .8 + row * .88;
          const window = mesh(THREE,new THREE.BoxGeometry(.24,.2,.05),windowMaterial,wx,wy,z + 1.03,runtime.worldGroup);
          runtime.nightMaterials.push(window.material);
        }
      }
      if (index % 2 === 0) {
        box(THREE,[width + .25,.16,2.2],theme.trim,[x,WORLD.surfaceY + height + .08,z],runtime.worldGroup);
        box(THREE,[.8,.42,.62],0x38474f,[x + width * .2,WORLD.surfaceY + height + .29,z],runtime.worldGroup);
      } else {
        cylinder(THREE,.08,.1,.72,8,0x37464d,[x,WORLD.surfaceY + height + .36,z],runtime.worldGroup);
      }
    });

    // Street trees are contained in planters and composed in two small rows.
    [[-14.1,-1.5],[-14.1,3.4],[14.1,-1.5],[14.1,3.4],[-5.0,13.3],[5.0,13.3]].forEach(([x,z],index) => addStreetTree(THREE,x,z,theme,.78 + (index%2)*.06));

    // Transit shelter, route sign, bicycle rack, and zebra crossing create an
    // active ground-level streetscape.
    box(THREE,[2.5,.12,.85],0x667782,[-13.6,WORLD.surfaceY + .08,9.2],runtime.worldGroup);
    box(THREE,[2.35,.09,.08],0x36444d,[-13.6,WORLD.surfaceY + 1.7,8.82],runtime.worldGroup);
    [-14.65,-12.55].forEach(x => cylinder(THREE,.045,.06,1.65,7,0x36444d,[x,WORLD.surfaceY + .84,8.82],runtime.worldGroup));
    const route = box(THREE,[.46,.58,.06],0x4f82b1,[-12.9,WORLD.surfaceY + 1.38,8.86],runtime.worldGroup,{emissive:0x2f5e8e,emissiveIntensity:.08});
    runtime.nightMaterials.push(route.material);
    [-1.15,-.69,-.23,.23,.69,1.15].forEach(offset => box(THREE,[.27,.025,1.55],0xe6e2d5,[offset,WORLD.surfaceY + .15,13.75],runtime.worldGroup));
    [-.42,0,.42].forEach(offset => {
      const rack = mesh(THREE,new THREE.TorusGeometry(.3,.035,6,10,Math.PI),material(THREE,0x52616a),12.3+offset,WORLD.surfaceY + .12,10.0,runtime.worldGroup);
      rack.rotation.x = Math.PI / 2;
    });

    // A steel civic sculpture gives the central urban square a clear landmark.
    const sculpture = mesh(THREE,new THREE.TorusGeometry(.72,.13,8,18,Math.PI * 1.55),material(THREE,0x3f7180,{metalness:.38,roughness:.42}),0,WORLD.surfaceY + 1.15,-14.65,runtime.worldGroup);
    sculpture.rotation.y = Math.PI / 2;
    sculpture.rotation.z = -.35;
    cylinder(THREE,.72,.78,.2,18,0x6d7778,[0,WORLD.surfaceY + .1,-14.65],runtime.worldGroup);
  }

  function addSuburbs(THREE, theme) {
    const fenceColor = 0xe2ded0;
    [[-14.2,-9.2,0],[14.2,-9.2,0],[-14.8,6.2,Math.PI/2],[14.8,6.2,Math.PI/2]].forEach(([x,z,rotation]) => {
      [-1.05,0,1.05].forEach(offset => box(THREE,[.1,1.0,.1],fenceColor,[x + (rotation ? 0 : offset),WORLD.surfaceY + .5,z + (rotation ? offset : 0)],runtime.worldGroup));
      box(THREE,rotation ? [.1,.12,2.45] : [2.45,.12,.1],fenceColor,[x,WORLD.surfaceY + .67,z],runtime.worldGroup);
      box(THREE,rotation ? [.1,.12,2.45] : [2.45,.12,.1],fenceColor,[x,WORLD.surfaceY + .34,z],runtime.worldGroup);
    });
    [[-13.2,11.8],[13.1,11.7]].forEach(([x,z],index) => {
      cylinder(THREE,.055,.07,.78,7,0x5f5650,[x,WORLD.surfaceY + .39,z],runtime.worldGroup);
      box(THREE,[.58,.42,.36],index ? 0x5276a0 : 0xa75849,[x,WORLD.surfaceY + .88,z],runtime.worldGroup);
      box(THREE,[.08,.22,.06],0xe7cf67,[x + .22,WORLD.surfaceY + 1.02,z],runtime.worldGroup);
    });
    [[-12.4,-12.2],[12.4,-12.1],[-15.0,1.3],[15.0,1.3]].forEach(([x,z]) => {
      const hedge = box(THREE,[2.2,.75,.7],0x4f845a,[x,WORLD.surfaceY + .38,z],runtime.worldGroup);
      hedge.receiveShadow = true;
    });
    // A pocket playground and curved cul-de-sac make this more than a fence palette.
    const culdesac = mesh(THREE,new THREE.TorusGeometry(2.05,.34,8,32,Math.PI * 1.45),material(THREE,theme.road),0,WORLD.surfaceY + .08,14.35,runtime.worldGroup);
    culdesac.rotation.x = Math.PI / 2;
    culdesac.rotation.z = -.7;
    box(THREE,[1.7,.13,.42],0xd5a052,[0,WORLD.surfaceY + 1.48,14.15],runtime.worldGroup);
    [-.7,.7].forEach(x => cylinder(THREE,.055,.07,1.45,7,0x6b5848,[x,WORLD.surfaceY + .73,14.15],runtime.worldGroup));
    const slide = box(THREE,[.52,.1,1.35],0x568ab8,[1.25,WORLD.surfaceY + .72,14.35],runtime.worldGroup,{rotation:[0,0,-.55]});
    slide.rotation.x = -.15;
  }

  function addForestPlace(THREE, theme) {
    [[-13.7,-11.2],[-11.9,-12.6],[-9.8,-13.6],[9.9,-13.6],[12.0,-12.4],[13.8,-10.9]].forEach(([x,z],index) => addTree(THREE,x,z,theme,.92 + (index % 3) * .14));
    [[-14.2,3.2],[13.9,3.7],[-8.0,14.0]].forEach(([x,z],index) => {
      cylinder(THREE,.38,.45,.42,10,theme.trunk,[x,WORLD.surfaceY + .21,z],runtime.worldGroup);
      if (index < 2) addRockCluster(THREE,x + 1.0,z + .35,theme,.48);
    });
    // A creek crossing and small fire ring create a woodland gathering place.
    const creek = box(THREE,[4.6,.035,1.15],theme.water,[0,WORLD.surfaceY + .035,-14.4],runtime.worldGroup,{transparent:true,opacity:.8,roughness:.18});
    creek.rotation.y = -.18;
    [-1.4,-.7,0,.7,1.4].forEach(x => box(THREE,[.42,.12,1.5],0x8b6846,[x,WORLD.surfaceY + .18,-14.4],runtime.worldGroup));
    cylinder(THREE,.62,.7,.12,12,theme.rock,[0,WORLD.surfaceY + .08,14.0],runtime.worldGroup);
    const fire = mesh(THREE,new THREE.ConeGeometry(.3,.72,7),material(THREE,0xf09a43,{emissive:0xdc6f28,emissiveIntensity:.18}),0,WORLD.surfaceY + .46,14.0,runtime.worldGroup);
    runtime.nightMaterials.push(fire.material);
  }

  function addMountainPlace(THREE, theme) {
    [[-13.4,-11.5,4.8,2.0],[-8.0,-14.0,7.2,2.55],[-1.2,-14.7,3.1,1.35],[5.2,-14.4,4.1,1.7],[11.8,-12.2,6.1,2.25],[14.6,-8.6,3.6,1.5]].forEach(([x,z,height,radius],index) => {
      const peak = mesh(THREE,new THREE.ConeGeometry(radius,height,6),material(THREE,index%2?0x5b6864:theme.rock),x,WORLD.surfaceY-.04+height/2,z,runtime.worldGroup);
      peak.rotation.y=(index%3)*.24;
      if (height > 5.8) {
        const cap = mesh(THREE,new THREE.ConeGeometry(radius * .42,height * .22,6),material(THREE,0xdde5e3),x,WORLD.surfaceY + height * .84,z,runtime.worldGroup);
        cap.rotation.y=peak.rotation.y;
      }
    });
    [[-12.7,10.8],[13.1,10.6]].forEach(([x,z]) => addRockCluster(THREE,x,z,theme,.82));
    // A timber overlook with a telescope reinforces the highland setting.
    box(THREE,[3.6,.18,2.15],0x8c6848,[0,WORLD.surfaceY + .12,14.15],runtime.worldGroup);
    [-1.55,1.55].forEach(x => box(THREE,[.12,.72,.12],0x654b37,[x,WORLD.surfaceY + .42,13.25],runtime.worldGroup));
    box(THREE,[3.2,.12,.12],0x654b37,[0,WORLD.surfaceY + .76,13.25],runtime.worldGroup);
    cylinder(THREE,.08,.11,.95,8,0x505b62,[.65,WORLD.surfaceY + .57,14.1],runtime.worldGroup);
    const telescope = cylinder(THREE,.14,.19,.82,10,0x435765,[.65,WORLD.surfaceY + 1.02,14.1],runtime.worldGroup);
    telescope.rotation.x = Math.PI / 2.8;
  }

  function addWaterPlace(THREE, theme, coastal = false) {
    if (coastal) {
      createSurfacePatch(THREE, {
        id: "beach-shoreline",
        centerX: 0,
        centerZ: 12.2,
        radiusX: 15.7,
      radiusZ: 3.65,
        rings: 12,
        slices: 64,
        elevation: .035,
        color: theme.water,
        transparent: true,
        opacity: .84,
        roughness: .2
      });
      box(THREE,[4.8,.15,.78],0xa7794b,[-12.2,WORLD.surfaceY + .08,-8.0],runtime.worldGroup);
      [[-15.0,-4.0],[14.9,3.5],[-12.8,12.2]].forEach(([x,z],index) => addTree(THREE,x,z,{...theme,id:"beach"},.72 + index * .07));
      cylinder(THREE,1.25,1.32,.06,26,0xf1d996,[13.6,WORLD.surfaceY + .03,-9.8],runtime.worldGroup);
      // Lighthouse, striped surfboards, and a beach umbrella form the coastal landmark.
      cylinder(THREE,.34,.58,3.2,12,0xf2ead9,[0,WORLD.surfaceY + 1.6,-14.7],runtime.worldGroup);
      cylinder(THREE,.42,.42,.36,12,0x3c7398,[0,WORLD.surfaceY + 3.2,-14.7],runtime.worldGroup,{emissive:0x7db6d5,emissiveIntensity:.08});
      const beacon = sphere(THREE,.18,0xffe5a2,[0,WORLD.surfaceY + 3.55,-14.7],runtime.worldGroup,{emissive:0xffc45d,emissiveIntensity:.2,segments:8,rings:5});
      runtime.nightMaterials.push(beacon.material);
      [-.42,.42].forEach((x,index) => box(THREE,[.28,1.35,.08],index ? 0xe8775a : 0x4a9bc0,[13.25+x,WORLD.surfaceY + .7,11.9],runtime.worldGroup,{rotation:[0,0,index ? .12 : -.12]}));
      cylinder(THREE,1.05,1.05,.07,16,0xf08a72,[-13.8,WORLD.surfaceY + 1.7,9.6],runtime.worldGroup);
      cylinder(THREE,.055,.07,1.65,7,0x8b6a49,[-13.8,WORLD.surfaceY + .84,9.6],runtime.worldGroup);
    } else {
      createSurfacePatch(THREE, {
        id: "lakeside-inlet",
        centerX: 13.3,
        centerZ: -.5,
        radiusX: 2.45,
        radiusZ: 1.42,
        rings: 8,
        slices: 40,
        elevation: .035,
        color: theme.water,
        transparent: true,
        opacity: .78,
        roughness: .18
      });
      registerCollider({ x: 13.3, z: -.5, radiusX: 2.4, radiusZ: 1.4, type: "water", id: "lakeside-inlet" });
      box(THREE,[3.8,.15,.72],0x9b744b,[12.7,WORLD.surfaceY + .1,1.2],runtime.worldGroup);
      [[11.2,-1.1],[12.0,-1.35],[14.4,-1.2],[15.0,-.8]].forEach(([x,z]) => cylinder(THREE,.02,.035,.72,5,0x53794f,[x,WORLD.surfaceY + .36,z],runtime.worldGroup));
      [[-14.2,11.6],[-12.8,12.7],[13.8,10.7]].forEach(([x,z]) => addRockCluster(THREE,x,z,theme,.5));
      // A moored rowboat and lakeside fishing platform distinguish the calm inlet.
      const boat = mesh(THREE,new THREE.ConeGeometry(.62,2.2,4),material(THREE,0x8a583b),13.2,WORLD.surfaceY + .18,-.55,runtime.worldGroup);
      boat.rotation.x = Math.PI / 2;
      boat.rotation.z = Math.PI / 4;
      box(THREE,[2.6,.14,1.45],0x8f6b49,[-13.8,WORLD.surfaceY + .12,9.8],runtime.worldGroup);
      [-14.9,-12.7].forEach(x => cylinder(THREE,.08,.1,.72,7,0x6d523b,[x,WORLD.surfaceY - .12,9.8],runtime.worldGroup));
    }
  }

  function addSnowPlace(THREE, theme) {
    [[-13.8,-11.3,2.0,.72],[-8.5,-14.0,2.8,.9],[10.7,-13.0,2.35,.8],[14.2,-8.5,1.8,.68]].forEach(([x,z,height,radius],index) => {
      const hill = mesh(THREE,new THREE.ConeGeometry(radius,height,7),material(THREE,index%2?0xdce8eb:0xcbdbe0),x,WORLD.surfaceY+height/2-.05,z,runtime.worldGroup);
      hill.rotation.y=index*.2;
    });
    const ice = cylinder(THREE,1.85,1.95,.06,30,0xaed9e3,[-13.4,WORLD.surfaceY + .03,1.2],runtime.worldGroup,{transparent:true,opacity:.86,roughness:.16});
    ice.scale.z=.62;
    registerCollider({ x: -13.4, z: 1.2, radiusX: 1.85, radiusZ: 1.15, type: "ice", id: "snow-pond" });
    [[13.8,10.8],[14.6,11.45]].forEach(([x,z],index) => sphere(THREE,.52-index*.12,0xf7fbfc,[x,WORLD.surfaceY + .5 + index*.62,z],runtime.worldGroup,{segments:10,rings:7}));
    sphere(THREE,.52,0xf7fbfc,[13.6,WORLD.surfaceY + .48,11.1],runtime.worldGroup,{segments:10,rings:7});
    sphere(THREE,.36,0xf7fbfc,[13.6,WORLD.surfaceY + 1.17,11.1],runtime.worldGroup,{segments:10,rings:7});
    sphere(THREE,.24,0xf7fbfc,[13.6,WORLD.surfaceY + 1.68,11.1],runtime.worldGroup,{segments:10,rings:7});
    sphere(THREE,.055,0xe6783e,[13.6,WORLD.surfaceY + 1.68,11.34],runtime.worldGroup,{segments:7,rings:5});
    box(THREE,[1.45,.18,.58],0xb85c49,[-12.0,WORLD.surfaceY + .22,10.8],runtime.worldGroup);
    [-12.55,-11.45].forEach(x => cylinder(THREE,.06,.06,.72,8,0x7b583d,[x,WORLD.surfaceY + .26,10.8],runtime.worldGroup));
  }

  function addDesertPlace(THREE, theme) {
    [[-13.8,-11.5,2.3,1.4],[-9.2,-14.0,1.6,1.05],[10.0,-13.7,2.0,1.3],[14.0,-9.5,2.8,1.55]].forEach(([x,z,height,radius],index) => {
      cylinder(THREE,radius*.68,radius,height,8,index%2?0xaa704a:0x9e6544,[x,WORLD.surfaceY+height/2-.04,z],runtime.worldGroup);
      cylinder(THREE,radius*.82,radius*.82,.25,8,0xc28654,[x,WORLD.surfaceY+height-.02,z],runtime.worldGroup);
    });
    const oasis = cylinder(THREE,1.25,1.35,.07,28,theme.water,[12.8,WORLD.surfaceY + .035,1.1],runtime.worldGroup,{roughness:.18});
    oasis.scale.z=.68;
    registerCollider({ x: 12.8, z: 1.1, radiusX: 1.25, radiusZ: .85, type: "water", id: "desert-oasis" });
    addTree(THREE,14.1,.2,{...theme,id:"beach"},.63);
    [[-14.3,3.4],[-12.8,4.2],[13.7,11.2]].forEach(([x,z]) => addRockCluster(THREE,x,z,theme,.58));
    // A sandstone arch and dry creek bed create a memorable desert landmark.
    [-1.15,1.15].forEach(x => cylinder(THREE,.42,.58,2.55,8,0xa86845,[x,WORLD.surfaceY + 1.25,-14.1],runtime.worldGroup));
    const arch = mesh(THREE,new THREE.TorusGeometry(1.15,.42,8,18,Math.PI),material(THREE,0xa86845),0,WORLD.surfaceY + 2.42,-14.1,runtime.worldGroup);
    arch.rotation.z = Math.PI;
    [[-3.0,13.7],[-1.5,14.2],[0,14.4],[1.5,14.2],[3.0,13.7]].forEach(([x,z],index) => sphere(THREE,.3 + index%2*.08,0xc28a5e,[x,WORLD.surfaceY + .13,z],runtime.worldGroup,{scale:[1.5,.35,.8],segments:7,rings:5}));
  }

  function addThemePerimeter(THREE, theme) {
    const placeId = theme.placeId || theme.id;
    if (placeId === "japanesegarden") addJapaneseGarden(THREE,theme);
    else if (placeId === "downtown") addDowntown(THREE,theme);
    else if (placeId === "suburbs") addSuburbs(THREE,theme);
    else if (placeId === "mountains") addMountainPlace(THREE,theme);
    else if (placeId === "lakeside") addWaterPlace(THREE,theme,false);
    else if (placeId === "beach") addWaterPlace(THREE,theme,true);
    else if (placeId === "snowy") addSnowPlace(THREE,theme);
    else if (placeId === "desertsunset") addDesertPlace(THREE,theme);
    else if (placeId === "citypark") {
      [[-13.8,-11.7],[-9.4,-14.0],[9.3,-14.0],[13.8,-11.7]].forEach(([x,z],index) => addTree(THREE,x,z,theme,.88 + index%2*.12));
      [[-14.0,2.0],[14.0,2.0],[-8.0,13.8],[8.0,13.8]].forEach(([x,z],index) => {
        const bed = cylinder(THREE,1.25,1.3,.08,22,index%2?0xd79aa7:0xe4c268,[x,WORLD.surfaceY+.04,z],runtime.worldGroup);
        bed.scale.z=.52;
      });
      // An open gazebo and flower clock give City Park its own civic landmark.
      cylinder(THREE,1.7,1.85,.18,12,theme.path,[0,WORLD.surfaceY + .09,-14.2],runtime.worldGroup);
      [-1.2,-.4,.4,1.2].forEach(x => cylinder(THREE,.07,.09,1.72,8,0xf0eadc,[x,WORLD.surfaceY + .92,-14.2],runtime.worldGroup));
      const gazeboRoof = mesh(THREE,new THREE.ConeGeometry(2.0,.72,8),material(THREE,theme.roof),0,WORLD.surfaceY + 2.02,-14.2,runtime.worldGroup);
      gazeboRoof.rotation.y = Math.PI / 8;
      cylinder(THREE,1.35,1.4,.06,28,0xe9d9a5,[0,WORLD.surfaceY + .04,14.1],runtime.worldGroup);
      [0,.65,1.3,1.95,2.6,3.25,3.9,4.55,5.2,5.85].forEach((angle,index) => {
        sphere(THREE,.16,index%2?0xe28fa2:0xf0ca61,[Math.cos(angle)*.9,WORLD.surfaceY + .16,14.1 + Math.sin(angle)*.9],runtime.worldGroup,{segments:7,rings:5});
      });
    } else addForestPlace(THREE,theme);
  }

  function addVillageDetails(THREE, theme) {
    const placeId = theme.placeId || theme.id;
    // Place-specific perimeter plant sets keep landscaping intentional and
    // reserve clear frontage around destination labels, stairs, and entrances.
    const treeSets = {
      downtown: [],
      japanesegarden: [],
      suburbs: [[-15.2,-6.7],[-15.5,7.7],[-12.8,11.5],[-8.4,14.1],[8.4,14.1],[12.8,11.5],[15.5,7.7],[15.2,-6.7]],
      forest: [[-15.2,-5.8],[-14.7,8.7],[-10.5,13.3],[10.6,13.2],[14.8,8.5],[15.2,-5.9]],
      mountains: [[-15.1,-5.5],[-14.7,8.7],[-9.6,13.7],[9.6,13.7],[14.7,8.5],[15.1,-5.5]],
      lakeside: [[-15.2,-5.8],[-14.8,7.3],[-8.6,14.1],[8.8,14.0],[15.0,6.7]],
      beach: [],
      snowy: [[-15.2,-5.8],[-14.8,7.3],[-9.3,13.8],[9.3,13.8],[14.8,7.2],[15.2,-5.7]],
      desertsunset: [[-15.2,-4.8],[-14.3,8.1],[-8.3,14.1],[8.4,14.0],[14.4,8.0],[15.2,-4.6]],
      citypark: [[-15.1,-5.7],[-14.5,8.4],[-8.8,14.1],[8.8,14.1],[14.5,8.4],[15.1,-5.7]]
    };
    const treeSpots = treeSets[placeId] || [[-15.2,-6.7],[-15.7,-5.1],[-15.5,.1],[-14.6,9.9],[-12.9,11.1],[-10.8,13.2],[-4.9,15.4],[-3.3,15.7],[5.0,15.3],[10.9,13.0],[12.5,11.6],[14.5,9.7],[15.7,-.4],[15.1,-6.8]];
    treeSpots.forEach((spot,index) => addTree(THREE,spot[0],spot[1],theme,.62+((index*5)%4)*.1));
    const lampSets = {
      downtown: [[-3.4,-2.9],[3.4,-2.9],[-3.4,3.0],[3.4,3.0],[-6.3,-5.0],[6.3,-5.0],[-6.4,7.2],[6.4,7.2],[-13.4,5.8],[13.4,5.8]],
      japanesegarden: [[-3.4,-2.9],[3.4,-2.9],[-3.4,3.0],[3.4,3.0]]
    };
    const lamps = lampSets[placeId] || [[-3.4,-2.9],[3.4,-2.9],[-3.4,3.0],[3.4,3.0],[-6.3,-5.0],[6.3,-5.0],[-6.4,7.2],[6.4,7.2]];
    lamps.forEach(([x,z]) => addLamp(THREE,x,z,theme));
    addBench(THREE,-2.55,-.1,Math.PI/2,.35);
    addBench(THREE,2.55,.1,-Math.PI/2,.35);
    if (!["downtown","japanesegarden"].includes(placeId)) {
      [[-12.7,1.4,2.2,1.1],[-4.6,11.9,1.8,.85],[4.4,12.8,2.1,.95],[12.9,1.7,1.7,.8]].forEach(([x,z,rx,rz],index) => {
        const patch = cylinder(THREE,rx,rx,.018,28,index%2?theme.path:theme.trim,[x,WORLD.surfaceY+.012,z],runtime.worldGroup,{transparent:true,opacity:.12,roughness:1});
        patch.scale.z = rz / rx;
      });
    }
    addQuadrantDetails(THREE,theme);
    addThemePerimeter(THREE,theme);
  }

  function addClouds(THREE) {
    runtime.clouds = [];
    const spots = [[-13,10.5,-11.5,.58],[13.5,11.3,8.5,.52]];
    spots.slice(0, runtime.quality.detail < 1 ? 1 : spots.length).forEach(([x,y,z,scale], index) => {
      const cloud = new THREE.Group();
      cloud.position.set(x,y,z);
      [[0,0,0,1.15],[-.8,-.12,.05,.78],[.82,-.08,.02,.9],[-.15,.36,0,.72]].forEach(([cx,cy,cz,size]) => sphere(THREE, size * scale, 0xffffff, [cx,cy,cz], cloud, { transparent: true, opacity: .82, segments: 8, rings: 5 }));
      cloud.userData.speed = .08 + index * .018;
      cloud.userData.baseY = y;
      cloud.userData.phase = index * 1.7;
      runtime.scene.add(cloud);
      runtime.clouds.push(cloud);
    });
  }

  function addSakuraBlossoms(THREE, theme) {
    runtime.sakuraBlossoms = [];
    if ((theme.placeId || theme.id) !== "japanesegarden") return;
    [
      { count: 68, color: 0xffc3d4, size: 3.6, speed: .68, drift: .34 },
      { count: 46, color: 0xffe1e8, size: 2.7, speed: .48, drift: .23 }
    ].forEach((layer, layerIndex) => {
      const count = Math.max(18, Math.round(layer.count * runtime.quality.detail));
      const positions = new Float32Array(count * 3);
      const phases = new Float32Array(count);
      const falls = new Float32Array(count);
      for (let index = 0; index < count; index += 1) {
        const angle = (index * 2.3999632297 + layerIndex) % (Math.PI * 2);
        const radius = 2.2 + ((index * 47 + layerIndex * 19) % 138) / 10;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        positions[index * 3] = x;
        positions[index * 3 + 1] = WORLD.surfaceY + .45 + ((index * 31 + layerIndex * 11) % 76) / 10;
        positions[index * 3 + 2] = z;
        phases[index] = (index * .83 + layerIndex * 1.7) % (Math.PI * 2);
        falls[index] = layer.speed * (.72 + ((index * 13) % 29) / 50);
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const petalMaterial = new THREE.PointsMaterial({
        color: layer.color,
        size: layer.size,
        sizeAttenuation: false,
        transparent: true,
        opacity: .9,
        depthWrite: false,
        fog: true
      });
      const petals = new THREE.Points(geometry, petalMaterial);
      petals.renderOrder = 3;
      runtime.worldGroup.add(petals);
      runtime.sakuraBlossoms.push({ object: petals, positions, phases, falls, drift: layer.drift });
    });
  }

  function addStars(THREE) {
    runtime.starLayers = [];
    const createLayer = (positions, color, size, baseOpacity, speed, phase, parent = runtime.scene) => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
      const starMaterial = new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: true,
        fog: false
      });
      const stars = new THREE.Points(geometry,starMaterial);
      stars.visible = false;
      stars.renderOrder = -1;
      parent.add(stars);
      runtime.starLayers.push({ object: stars, material: starMaterial, baseOpacity, baseSize: size, speed, phase });
      return stars;
    };

    // Three staggered background layers cover the complete close-horizon frame.
    [
      [78,0xfff7d6,1.55,.94,.86,.2],
      [92,0xddeeff,1.05,.76,1.18,2.1],
      [68,0xffdfad,.78,.62,1.55,4.0]
    ].forEach(([baseCount,color,size,opacity,speed,phase],layerIndex) => {
      const count = Math.max(36, Math.round(baseCount * runtime.quality.detail));
      const positions = [];
      for (let index = 0; index < count; index += 1) {
        const x = -39 + ((index * (43 + layerIndex * 8)) % 780) / 10;
        const y = -15 + ((index * (71 + layerIndex * 12)) % 455) / 10;
        const z = -34 - layerIndex * 2.8 - ((index * 23) % 45) / 10;
        positions.push(x,y,z);
      }
      createLayer(positions,color,size,opacity,speed,phase);
    });

    // A sparse outer field surrounds the rolling horizon without turning the
    // neighborhood into a literal globe.
    const edgePositions = [];
    for (let index = 0; index < 120; index += 1) {
      const angle = (index * 2.3999632297) % (Math.PI * 2);
      const radiusX = 23 + ((index * 37) % 120) / 10;
      const radiusY = 15 + ((index * 29) % 80) / 10;
      edgePositions.push(Math.cos(angle) * radiusX, 7 + Math.sin(angle) * radiusY, -28 - ((index * 17) % 35) / 10);
    }
    createLayer(edgePositions,0xeaf5ff,.92,.68,1.34,1.1,runtime.scene);
    runtime.starField = runtime.starLayers[0]?.object || null;
  }

  function avatarColor(value, palette, fallback) {
    return palette[String(value || "").toLowerCase()] || fallback;
  }

  function createLowPolyPerson(THREE, person, role) {
    const group = new THREE.Group();
    const childScale = Number(person.age || 0) > 0 && Number(person.age) < 13 ? .78 : 1;
    const skin = avatarColor(person.skin, { tone1: 0xf5d2b8, tone2: 0xd8a47f, tone3: 0xa96f4f, tone4: 0x70452f, light: 0xf5d2b8, medium: 0xd19a74, dark: 0x70452f }, 0xd8a47f);
    const hair = avatarColor(person.hair, { black: 0x191919, brown: 0x5a3827, blonde: 0xd6ad55, blond: 0xd6ad55, red: 0x9b472d, gray: 0x9a9a9a, white: 0xe8e5dc }, 0x3b2a22);
    const shirt = avatarColor(person.shirt, { green: 0x3f8b67, blue: 0x447bb2, red: 0xb6574d, orange: 0xd38345, purple: 0x745c9f, yellow: 0xd7ad48, pink: 0xc8758d, black: 0x30343a, white: 0xe8e8e5 }, role === "player" ? 0x447bb2 : 0x3f8b67);
    group.scale.setScalar(childScale);
    group.userData.baseY = 0;

    const leftLeg = box(THREE, [.18,.52,.2], 0x35445b, [-.14,.28,0], group);
    const rightLeg = box(THREE, [.18,.52,.2], 0x35445b, [.14,.28,0], group);
    box(THREE, [.24,.12,.36], 0x2c3138, [-.14,.07,.08], group);
    box(THREE, [.24,.12,.36], 0x2c3138, [.14,.07,.08], group);
    const torso = cylinder(THREE, .34, .4, .72, 7, shirt, [0,.88,0], group);
    const leftArm = cylinder(THREE, .1, .11, .62, 7, shirt, [-.42,.88,0], group);
    const rightArm = cylinder(THREE, .1, .11, .62, 7, shirt, [.42,.88,0], group);
    leftArm.rotation.z = -.12; rightArm.rotation.z = .12;
    sphere(THREE, .31, skin, [0,1.48,0], group, { segments: 9, rings: 6 });
    sphere(THREE, .035, 0x20242a, [-.105,1.52,.292], group, { segments: 7, rings: 5 });
    sphere(THREE, .035, 0x20242a, [.105,1.52,.292], group, { segments: 7, rings: 5 });
    box(THREE, [.12,.025,.025], 0x8b4f45, [0,1.38,.302], group);
    const hairCap = sphere(THREE, .325, hair, [0,1.7,-.035], group, { segments: 9, rings: 5, scale: [1,.42,1] });
    hairCap.rotation.x = -.12;
    const style = String(person.hairStyle || "short").toLowerCase();
    if (style.includes("long")) box(THREE, [.55,.58,.18], hair, [0,1.35,-.22], group);
    if (style.includes("bun")) sphere(THREE, .16, hair, [0,1.89,-.08], group, { segments: 7, rings: 5 });
    if (style.includes("curly")) [-.22,0,.22].forEach(x => sphere(THREE,.13,hair,[x,1.7,-.03],group,{segments:7,rings:5}));
    const accessory = String(person.accessory || "none").toLowerCase();
    if (["glasses","sunglasses"].includes(accessory)) {
      const lensColor = accessory === "sunglasses" ? 0x101820 : 0x111111;
      [-.115,.115].forEach(x => {
        const lens = box(THREE,[.17,.12,.035],lensColor,[x,1.52,.315],group,{transparent:true,opacity:accessory === "sunglasses" ? .9 : .46});
        lens.material.metalness = .08;
      });
      box(THREE,[.07,.025,.035],0x24282d,[0,1.52,.322],group);
      if (accessory === "sunglasses") {
        [-.115,.115].forEach(x => box(THREE,[.07,.018,.006],0x6fb6ff,[x - .025,1.565,.337],group));
      }
    }
    if (accessory === "baseball-cap") {
      sphere(THREE,.34,0xdf3344,[0,1.72,-.015],group,{scale:[1,.48,1],segments:9,rings:5});
      box(THREE,[.38,.055,.28],0xb91f30,[0,1.7,.26],group,{rotation:[-.08,0,0]});
    }
    if (accessory === "beanie") sphere(THREE,.35,0x2f4858,[0,1.75,-.01],group,{scale:[1,.62,1],segments:9,rings:5});
    if (accessory === "straw-hat") {
      cylinder(THREE,.52,.52,.07,16,0xead18a,[0,1.75,0],group);
      cylinder(THREE,.27,.3,.18,12,0xc99a3a,[0,1.84,0],group);
    }
    if (accessory === "santa-hat") {
      const hat = mesh(THREE,new THREE.ConeGeometry(.31,.64,10),material(THREE,0xd9203c),0,1.98,-.03,group);
      hat.rotation.z = -.15;
      sphere(THREE,.09,0xfff4e3,[.1,2.27,-.03],group,{segments:7,rings:5});
      cylinder(THREE,.32,.32,.09,12,0xfff4e3,[0,1.72,0],group);
    }
    if (accessory === "bow") {
      sphere(THREE,.13,0xd64545,[-.1,1.78,.02],group,{scale:[1.3,.75,.55],segments:7,rings:5});
      sphere(THREE,.13,0xd64545,[.1,1.78,.02],group,{scale:[1.3,.75,.55],segments:7,rings:5});
    }
    if (accessory === "headband") box(THREE,[.68,.07,.08],0xd64545,[0,1.7,.03],group,{rotation:[0,0,0]});
    if (accessory === "backpack") {
      box(THREE,[.58,.68,.24],0x8b5a2b,[0,.93,-.34],group);
      box(THREE,[.09,.55,.1],0x8b5a2b,[-.3,.95,-.2],group);
      box(THREE,[.09,.55,.1],0x8b5a2b,[.3,.95,-.2],group);
    }
    if (role === "player") {
      const halo = cylinder(THREE, .39, .39, .045, 20, 0xf5c84b, [0,.015,0], group, { emissive: 0xf5c84b, emissiveIntensity: .2, transparent: true, opacity: .88 });
      halo.rotation.x = 0;
    }
    group.userData.limbs = { leftLeg, rightLeg, leftArm, rightArm };
    return group;
  }

  function createLowPolyPet(THREE, pet) {
    const group = new THREE.Group();
    const color = avatarColor(pet.color, { orange: 0xc8793c, brown: 0x79503a, black: 0x25272b, white: 0xe7e4dc, gray: 0x888b90, cream: 0xdac7a1, golden: 0xc99b4b }, 0xc8793c);
    const type = String(pet.type || "dog").toLowerCase();
    group.scale.setScalar(type.includes("cat") ? .78 : type.includes("rabbit") ? .7 : .94);
    group.userData.baseY = 0;
    box(THREE,[.62,.42,.9],color,[0,.38,-.08],group);
    sphere(THREE,.32,color,[0,.68,.48],group,{segments:8,rings:6});
    [-.22,.22].forEach(x => {
      box(THREE,[.13,.38,.14],color,[x,.16,-.24],group);
      box(THREE,[.13,.38,.14],color,[x,.16,.26],group);
    });
    if (type.includes("cat")) {
      [-.17,.17].forEach(x => {
        const ear = mesh(THREE,new THREE.ConeGeometry(.12,.28,3),material(THREE,color),x,.86,.46,group);
        ear.rotation.y = Math.PI;
      });
      const tail = cylinder(THREE,.055,.07,.72,7,color,[.34,.52,-.42],group); tail.rotation.x = -.72;
    } else if (type.includes("rabbit")) {
      [-.12,.12].forEach(x => sphere(THREE,.1,color,[x,1.02,.44],group,{scale:[.65,2.4,.55],segments:7,rings:5}));
    } else {
      [-.2,.2].forEach(x => {
        const ear = box(THREE,[.17,.34,.12],color,[x,.88,.43],group,{rotation:[.18,0,x < 0 ? -.2 : .2]});
        ear.rotation.z = x < 0 ? -.18 : .18;
      });
      sphere(THREE,.21,0xd9ad78,[0,.62,.75],group,{scale:[1,.7,1.25],segments:8,rings:5});
      sphere(THREE,.065,0x25272b,[0,.66,.94],group,{segments:7,rings:5});
      sphere(THREE,.035,0x20242a,[-.12,.76,.75],group,{segments:7,rings:5});
      sphere(THREE,.035,0x20242a,[.12,.76,.75],group,{segments:7,rings:5});
      const tailBase = new THREE.Group();
      tailBase.position.set(.23,.58,-.52); tailBase.rotation.x = -.75; tailBase.rotation.z = -.35; group.add(tailBase);
      cylinder(THREE,.055,.085,.68,7,color,[0,.3,0],tailBase);
      box(THREE,[.34,.24,.24],0xe8d7bd,[0,.55,-.28],group);
    }
    return group;
  }

  function createWorldAvatar(THREE, item, anchor, role, isPet = false) {
    const model = isPet ? createLowPolyPet(THREE, item) : createLowPolyPerson(THREE, item, role);
    model.userData.baseScale = model.scale.clone();
    anchor.add(model);
    anchor.userData.model = model;
    anchor.userData.role = role;
    anchor.userData.item = item;
    runtime.avatarAnchors.push(anchor);
    const marker = cylinder(THREE, isPet ? .24 : .32, isPet ? .3 : .4, .07, 18, role === "player" ? 0xf5c84b : 0xffffff, [anchor.position.x, anchor.position.y - .02, anchor.position.z], runtime.worldGroup, { transparent: true, opacity: role === "player" ? .82 : .28 });
    marker.userData.followAnchor = anchor;
    orientSurfaceAnchor(marker, 0);
    runtime.markers.push(marker);
  }

  function setupAvatars(THREE) {
    dom.avatars.innerHTML = "";
    const people = household.people || [];
    const pets = household.pets || [];
    const player = people.find(person => person.id === selection.playerId) || people[0];
    runtime.player = new THREE.Object3D();
    runtime.player.position.set(0, terrainYAt(0, .55), .55);
    runtime.player.userData.heading = 0;
    runtime.scene.add(runtime.player);
    createWorldAvatar(THREE, player, runtime.player, "player");
    orientSurfaceAnchor(runtime.player, 0);

    selection.companionIds.map(id => people.find(person => person.id === id)).filter(Boolean).forEach((person, index) => {
      const anchor = new THREE.Object3D();
      anchor.position.set(-1.35 + index * 1.05, terrainYAt(-1.35 + index * 1.05, 1.5 + (index % 2) * .72), 1.5 + (index % 2) * .72);
      anchor.userData.offset = new THREE.Vector3(-1.6 + index * 1.1, 0, 1.4 + (index % 2) * .8);
      anchor.userData.heading = 0;
      runtime.scene.add(anchor);
      runtime.companions.push(anchor);
      createWorldAvatar(THREE, person, anchor, "companion");
    });

    selection.petIds.map(id => pets.find(pet => pet.id === id)).filter(Boolean).forEach((pet, index) => {
      const anchor = new THREE.Object3D();
      anchor.position.set(1.05 + index * .75, terrainYAt(1.05 + index * .75, 1.45), 1.45);
      anchor.userData.offset = new THREE.Vector3(1.2 + index * .75, 0, 1.2 + (index % 2) * .7);
      anchor.userData.heading = 0;
      runtime.scene.add(anchor);
      runtime.companions.push(anchor);
      createWorldAvatar(THREE, pet, anchor, "companion", true);
    });
  }

  function addAmbientNeighbors(THREE) {
    const profiles = [
      {
        person: { name: "Juniper", age: 28, skin: "tone3", hair: "black", hairStyle: "bun", shirt: "yellow", accessory: "straw-hat" },
        route: [[-1.4, 4.2], [-1.1, .6], [-6.1, -3.9], [-7.2, -6.1], [-3.4, 1.2]]
      },
      {
        person: { name: "Rowan", age: 34, skin: "tone1", hair: "red", hairStyle: "short", shirt: "green", accessory: "backpack" },
        route: [[1.5, 4.3], [1.1, .6], [6.2, -3.8], [7.3, -6.0], [3.5, 1.1]]
      },
      {
        person: { name: "Mika", age: 22, skin: "tone2", hair: "brown", hairStyle: "long", shirt: "purple", accessory: "headband" },
        route: [[-5.8, 9.2], [-2.6, 5.5], [0, 3.4], [2.7, 5.5], [5.8, 9.1], [0, 4.1]]
      }
    ];
    profiles.slice(0, runtime.quality.id === "mobile" ? 2 : 3).forEach((profile, index) => {
      const anchor = new THREE.Object3D();
      const start = profile.route[0];
      anchor.position.set(start[0], terrainYAt(start[0], start[1]), start[1]);
      anchor.userData.route = profile.route.map(([x, z]) => new THREE.Vector3(x, 0, z));
      anchor.userData.routeIndex = 1;
      anchor.userData.pause = index * .75;
      anchor.userData.heading = Math.PI;
      anchor.userData.role = "neighbor";
      const model = createLowPolyPerson(THREE, profile.person, "neighbor");
      model.scale.multiplyScalar(.92);
      model.userData.baseScale = model.scale.clone();
      anchor.userData.model = model;
      anchor.add(model);
      runtime.scene.add(anchor);
      runtime.neighbors.push(anchor);
      runtime.avatarAnchors.push(anchor);
    });
  }

  function updateAmbientNeighbors(delta, reduceMotion) {
    if (!runtime?.neighbors?.length) return;
    runtime.neighbors.forEach((anchor, index) => {
      if (reduceMotion || !runtime.playing) {
        anchor.userData.isMoving = false;
        return;
      }
      if (anchor.userData.pause > 0) {
        anchor.userData.pause = Math.max(0, anchor.userData.pause - delta);
        anchor.userData.isMoving = false;
        return;
      }
      const route = anchor.userData.route || [];
      const target = route[anchor.userData.routeIndex % route.length];
      if (!target) return;
      const toward = target.clone().sub(anchor.position);
      toward.y = 0;
      const distance = toward.length();
      if (distance < .16) {
        anchor.userData.routeIndex = (anchor.userData.routeIndex + 1) % route.length;
        anchor.userData.pause = .55 + (index % 3) * .2;
        anchor.userData.isMoving = false;
      } else {
        toward.normalize();
        anchor.position.addScaledVector(toward, Math.min(distance, delta * (1.75 + index * .12)));
        anchor.userData.heading = Math.atan2(toward.x, toward.z);
        anchor.userData.isMoving = true;
      }
      anchor.position.y += (terrainYAt(anchor.position.x, anchor.position.z) - anchor.position.y) * Math.min(1, delta * 8);
      orientSurfaceAnchor(anchor, anchor.userData.heading || 0);
    });
  }

  function buildWorld(THREE) {
    cleanupRuntime();
    const theme = currentVillage();
    const quality = worldQualityProfile();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(theme.sky);
    scene.fog = new THREE.Fog(theme.sky, 23, 61);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, quality.pixelRatio));
    renderer.setSize(dom.host.clientWidth || innerWidth, dom.host.clientHeight || innerHeight);
    renderer.shadowMap.enabled = quality.shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute("tabindex", "-1");
    renderer.domElement.setAttribute("aria-label", `${theme.name}, a cozy third-person financial neighborhood with a rolling horizon and five accessible destinations: Transactions, Planning, Manage Lists, Dashboard, and Future Value.`);
    dom.host.replaceChildren(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(38, 1, .1, 120);
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);
    const bendUniforms = {
      center: { value: new THREE.Vector2(0, .55) },
      strength: { value: WORLD.bendStrength },
      safeDepth: { value: WORLD.bendSafeDepth },
      safeWidth: { value: WORLD.bendSafeWidth },
      maxDrop: { value: WORLD.bendMaxDrop }
    };
    runtime = {
      THREE, theme, quality, scene, renderer, camera, worldGroup,
      clock: new THREE.Clock(), raf: 0, playing: false, night: false,
      cameraAngle: WORLD.cameraAngle, cameraDistance: WORLD.cameraDistance, cameraHeight: WORLD.cameraHeight, cameraDistanceScale: 1,
      cameraFocus: new THREE.Vector3(0, WORLD.surfaceY + 1.8, 0),
      targetCameraFocus: new THREE.Vector3(0, WORLD.surfaceY + 1.8, 0),
      cameraPosition: new THREE.Vector3(), cameraInitialized: false, cameraProfile: "recenter",
      targetCameraZoom: WORLD.initialZoom,
      bendUniforms,
      keys: new Set(), moveTarget: null, moveQueue: [], nearest: null, openingBuilding: false, activeEntranceBuilding: null, entranceSequence: null, dragging: false, dragX: 0,
      cameraMode: "follow", focusBuilding: null,
      player: null, companions: [], neighbors: [], avatarAnchors: [], markers: [], buildings: [], buildingHitboxes: [],
      nightMaterials: [], destinationGlows: [], clouds: [], sakuraBlossoms: [], ambientSway: [], foliageLayers: [], animatedSurfaces: [], starField: null, starLayers: [], labelPlaques: [], colliders: [], listeners: [], resizeObserver: null, guidanceTimer: 0,
      wind: { strength: .55, target: .55 },
      dioramaBase: null, walkSurface: null
    };

    const ambient = new THREE.HemisphereLight(0xffffff, theme.rock, 1.55);
    scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xffefd0, 3.75);
    sun.position.set(-14, 23, 12);
    sun.castShadow = true;
    sun.shadow.mapSize.set(quality.shadowSize, quality.shadowSize);
    sun.shadow.bias = -.00035;
    sun.shadow.normalBias = .018;
    sun.shadow.camera.left = -18;
    sun.shadow.camera.right = 18;
    sun.shadow.camera.top = 18;
    sun.shadow.camera.bottom = -18;
    scene.add(sun);
    const nightFill = new THREE.DirectionalLight(0x9fc8ee, 0);
    nightFill.position.set(14,18,-16);
    scene.add(nightFill);
    const rearFill = new THREE.DirectionalLight(0xb9d8f2, 0);
    rearFill.position.set(-12,22,-22);
    scene.add(rearFill);
    runtime.ambient = ambient;
    runtime.sun = sun;
    runtime.nightFill = nightFill;
    runtime.rearFill = rearFill;
    camera.zoom = WORLD.initialZoom;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.04;

    addRoadsAndSidewalks(THREE, theme);
    BUILDINGS.forEach(building => {
      const object = addBuilding(THREE, building, theme);
      runtime.buildings.push({ config: building, object, entrance: object.userData.entrance });
    });
    addVillageDetails(THREE, theme);
    addSakuraBlossoms(THREE, theme);
    addClouds(THREE);
    addStars(THREE);
    setupAvatars(THREE);
    addAmbientNeighbors(THREE);
    updateCamera(1);
    bindRuntimeEvents();
    resizeWorld();
    runtime.resizeObserver = new ResizeObserver(resizeWorld);
    runtime.resizeObserver.observe(dom.host);
    runtime.playing = true;
    dom.status.textContent = "";
    animate();
    focusWorldSurface();
  }

  function closestBuildingTo(point) {
    if (!point) return { building: null, distance: Infinity };
    return BUILDINGS.reduce((closest, building) => {
      const distance = Math.hypot(point.x - building.x, point.z - building.z);
      return distance < closest.distance ? { building, distance } : closest;
    }, { building: null, distance: Infinity });
  }

  function updateCameraResponsiveLabels(reduceMotion = false, delta = 1 / 60) {
    if (!runtime?.labelPlaques?.length) return;
    const THREE = runtime.THREE;
    runtime.labelPlaques.forEach(plaque => {
      const parentWorld = new THREE.Quaternion();
      plaque.parent?.getWorldQuaternion(parentWorld);
      const localTarget = parentWorld.invert().multiply(runtime.camera.quaternion.clone());
      if (reduceMotion) plaque.quaternion.copy(localTarget);
      else plaque.quaternion.slerp(localTarget, dampAlpha(10.5, delta));
    });
  }

  function updateDestinationNav() {
    if (!dom.destinationNav) return;
    const activeId = runtime?.focusBuilding?.id || runtime?.nearest?.config?.id || "";
    dom.destinationNav.querySelectorAll("[data-world-focus]").forEach(button => {
      const active = button.dataset.worldFocus === activeId;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function focusDestination(id) {
    if (!runtime) return;
    const building = BUILDINGS.find(item => item.id === id);
    if (!building) return;
    runtime.keys.clear();
    const sideOffset = building.x === 0 ? 1.2 : building.x > 0 ? -1.2 : 1.2;
    const approachDistance = building.kind === "atm" ? 3.15 : building.kind === "school" ? 3.3 : 3.75;
    const approach = new runtime.THREE.Vector3(building.x + sideOffset, terrainYAt(building.x + sideOffset, building.z + approachDistance), building.z + approachDistance);
    const center = new runtime.THREE.Vector3(0, terrainYAt(0, 0), 0);
    runtime.moveQueue = [approach];
    runtime.moveTarget = runtime.player && Math.hypot(runtime.player.position.x, runtime.player.position.z) > 3.8 ? center : runtime.moveQueue.shift();
    runtime.cameraMode = "destination";
    runtime.focusBuilding = building;
    runtime.targetCameraZoom = WORLD.destinationZoom;
    dom.status.textContent = `Walking toward ${building.name}. You can take over with the movement controls.`;
    updateDestinationNav();
  }

  function recenterWorld() {
    if (!runtime) return;
    runtime.keys.clear();
    runtime.moveTarget = null;
    runtime.moveQueue = [];
    runtime.cameraMode = "recenter";
    runtime.focusBuilding = null;
    runtime.targetCameraZoom = WORLD.initialZoom;
    dom.status.textContent = "World recentered. Move to resume camera following.";
    updateDestinationNav();
  }

  function runtimeBuildingFor(building) {
    if (!runtime || !building) return null;
    return runtime.buildings.find(entry => entry.config.id === building.id) || null;
  }

  function facadeCameraAngle(building) {
    if (!building) return WORLD.cameraAngle;
    if (building.x < -2) return .22;
    if (building.x > 2) return -.22;
    return .06;
  }

  function cameraProfileForWorld() {
    const active = runtime.activeEntranceBuilding;
    if (runtime.openingBuilding && active) {
      return { id: "opening", building: active, distance: WORLD.cameraOpeningDistance, height: WORLD.cameraOpeningHeight, zoom: 1.18 };
    }
    if (runtime.nearest?.config) {
      return { id: "entrance", building: runtime.nearest.config, distance: WORLD.cameraEntranceDistance, height: WORLD.cameraEntranceHeight, zoom: 1.13 };
    }
    if (runtime.cameraMode === "destination" && runtime.focusBuilding) {
      return { id: "destination", building: runtime.focusBuilding, distance: 23.5, height: 14.5, zoom: WORLD.destinationZoom };
    }
    if (runtime.cameraMode === "recenter") {
      return { id: "recenter", building: null, distance: 27, height: 16.5, zoom: WORLD.initialZoom };
    }
    return { id: "follow", building: null, distance: WORLD.cameraDistance, height: WORLD.cameraHeight, zoom: null };
  }

  function updateCamera(delta = 1 / 60) {
    if (!runtime) return;
    const { camera } = runtime;
    const reduceMotion = Boolean(household?.reduceMotion || matchMedia("(prefers-reduced-motion: reduce)").matches);
    const player = runtime.player?.position || null;
    const profile = cameraProfileForWorld();
    const entry = runtimeBuildingFor(profile.building);
    runtime.cameraProfile = profile.id;

    let followX = !player || profile.id === "recenter" ? 0 : player.x;
    let followY = !player || profile.id === "recenter" ? WORLD.surfaceY + 1.65 : player.y + 1.35;
    let followZ = !player || profile.id === "recenter" ? 0 : player.z - WORLD.cameraLookAhead;
    const door = entry?.entrance?.doorWorldPosition;
    if (door && player) {
      const doorWeight = profile.id === "opening" ? .72 : profile.id === "entrance" ? .48 : .24;
      followX = player.x * (1 - doorWeight) + door.x * doorWeight;
      followY = (player.y + 1.35) * (1 - doorWeight) + (door.y + .58) * doorWeight;
      followZ = (player.z - (profile.id === "destination" ? 1.1 : .25)) * (1 - doorWeight) + door.z * doorWeight;
    }
    runtime.targetCameraFocus.set(followX, followY, followZ);
    if (reduceMotion) runtime.cameraFocus.copy(runtime.targetCameraFocus);
    else runtime.cameraFocus.lerp(runtime.targetCameraFocus, dampAlpha(WORLD.cameraFollowDamping, delta));

    // Camera profiles are deliberately constrained to the +Z/front side of
    // the neighborhood. Entrance profiles turn inward toward the selected
    // facade, but never orbit around to the backs of the destinations.
    const heading = Number(runtime.player?.userData?.heading || 0);
    const followAngle = WORLD.cameraAngle + Math.sin(heading) * WORLD.cameraTurnInfluence;
    const desiredAngle = profile.building ? facadeCameraAngle(profile.building) : followAngle;
    runtime.cameraAngle = reduceMotion ? desiredAngle : dampNumber(runtime.cameraAngle, desiredAngle, WORLD.cameraTurnDamping, delta);
    runtime.cameraDistance = reduceMotion ? profile.distance : dampNumber(runtime.cameraDistance, profile.distance, 5.4, delta);
    runtime.cameraHeight = reduceMotion ? profile.height : dampNumber(runtime.cameraHeight, profile.height, 5.4, delta);
    const cameraDistance = runtime.cameraDistance * Number(runtime.cameraDistanceScale || 1);
    const cameraHeight = runtime.cameraHeight * Number(runtime.cameraDistanceScale || 1);
    const desiredPosition = new runtime.THREE.Vector3(
      runtime.cameraFocus.x + Math.sin(runtime.cameraAngle) * cameraDistance,
      runtime.cameraFocus.y + cameraHeight,
      runtime.cameraFocus.z + Math.cos(runtime.cameraAngle) * cameraDistance
    );
    if (!runtime.cameraInitialized || reduceMotion) {
      runtime.cameraPosition.copy(desiredPosition);
      runtime.cameraInitialized = true;
    } else {
      runtime.cameraPosition.lerp(desiredPosition, dampAlpha(WORLD.cameraPositionDamping, delta));
    }
    camera.position.copy(runtime.cameraPosition);
    camera.lookAt(runtime.cameraFocus);

    if (player) {
      const bendTarget = new runtime.THREE.Vector2(player.x, player.z);
      if (reduceMotion) runtime.bendUniforms.center.value.copy(bendTarget);
      else runtime.bendUniforms.center.value.lerp(bendTarget, dampAlpha(7, delta));
      runtime.bendUniforms.strength.value = reduceMotion ? WORLD.bendStrength * .82 : WORLD.bendStrength;
    }
    const desiredZoom = Math.max(Number(runtime.targetCameraZoom || WORLD.initialZoom), Number(profile.zoom || 0));
    camera.zoom = reduceMotion ? desiredZoom : dampNumber(camera.zoom, desiredZoom, 5.1, delta);
    camera.updateProjectionMatrix();
    updateCameraResponsiveLabels(reduceMotion, delta);
  }

  function resizeWorld() {
    if (!runtime || !dom.host.clientWidth || !dom.host.clientHeight) return;
    const width = dom.host.clientWidth;
    const height = dom.host.clientHeight;
    const aspect = width / height;
    runtime.camera.aspect = aspect;
    runtime.camera.fov = aspect < .78 ? 43 : 38;
    runtime.cameraDistanceScale = aspect < .72 ? 1.16 : aspect < .9 ? 1.07 : 1;
    runtime.camera.updateProjectionMatrix();
    runtime.renderer.setSize(width, height, false);
  }

  function on(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    runtime.listeners.push(() => target.removeEventListener(event, handler, options));
  }

  function bindRuntimeEvents() {
    const canvas = runtime.renderer.domElement;
    const keyDown = event => {
      if (!dom.world.open) return;
      if (event.code === "Escape" && dom.workspace.hidden) {
        event.preventDefault();
        closeWorld();
        window.requestAnimationFrame(() => document.getElementById("visitWorldBtn")?.focus());
        return;
      }
      if (!dom.workspace.hidden || event.target.closest?.("input, select, textarea, [contenteditable='true']")) return;
      const movement = ["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (movement.includes(event.code)) event.preventDefault();
      runtime.keys.add(event.code);
      if (movement.includes(event.code)) dismissEntryGuidance();
      if (["KeyE","Enter"].includes(event.code) && !event.target.closest?.("button, a") && runtime.playing && runtime.nearest) {
        event.preventDefault();
        enterBuilding(runtime.nearest.config);
      }
    };
    const keyUp = event => runtime?.keys.delete(event.code);
    const pointerDown = event => {
      runtime.pointerStart = { x: event.clientX, y: event.clientY };
      canvas.setPointerCapture?.(event.pointerId);
    };
    const pointerMove = event => {
      const building = pickBuilding(event);
      canvas.style.cursor = building && isBuildingNearby(building) ? "pointer" : "default";
    };
    const pointerUp = event => {
      if (runtime.playing && runtime.pointerStart && Math.hypot(event.clientX - runtime.pointerStart.x, event.clientY - runtime.pointerStart.y) < 8) setClickTarget(event);
      runtime.pointerStart = null;
    };
    const wheel = event => {
      event.preventDefault();
      runtime.targetCameraZoom = Math.max(WORLD.minZoom, Math.min(WORLD.maxZoom, runtime.camera.zoom * (event.deltaY > 0 ? .92 : 1.08)));
      runtime.camera.zoom = runtime.targetCameraZoom;
      runtime.camera.updateProjectionMatrix();
    };
    on(window, "keydown", keyDown, { passive: false });
    on(window, "keyup", keyUp);
    on(canvas, "pointerdown", pointerDown);
    on(canvas, "pointermove", pointerMove);
    on(canvas, "pointerup", pointerUp);
    on(canvas, "wheel", wheel, { passive: false });
    on(canvas, "pointerleave", () => { canvas.style.cursor = "default"; });
  }

  function pointerRay(event) {
    const rect = runtime.renderer.domElement.getBoundingClientRect();
    const mouse = new runtime.THREE.Vector2(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new runtime.THREE.Raycaster();
    ray.setFromCamera(mouse, runtime.camera);
    return ray;
  }

  function pickBuilding(event) {
    if (!runtime?.buildingHitboxes?.length) return null;
    const hit = pointerRay(event).intersectObjects(runtime.buildingHitboxes, false)[0]?.object;
    return hit?.userData?.interactionBuilding || null;
  }

  function distanceToBuilding(building) {
    if (!runtime?.player || !building) return Infinity;
    return Math.hypot(runtime.player.position.x - building.x, runtime.player.position.z - building.z);
  }

  function isBuildingNearby(building, extra = 0) {
    return distanceToBuilding(building) <= Number(building?.interactionRadius || 4.25) + extra;
  }

  function setClickTarget(event) {
    if (!runtime) return;
    const building = pickBuilding(event);
    if (building) {
      if (isBuildingNearby(building, .25)) enterBuilding(building);
      else focusDestination(building.id);
      return;
    }
    const ray = pointerRay(event);
    const point = runtime.walkSurface ? ray.intersectObject(runtime.walkSurface, false)[0]?.point : null;
    if (point) {
      clampToDiorama(point);
      if (!isPositionWalkable(point.x, point.z)) {
        dom.status.textContent = "That spot is occupied. Choose a clear path beside the destination or landscape feature.";
        return;
      }
      point.y = terrainYAt(point.x, point.z);
      runtime.moveQueue = [];
      runtime.moveTarget = point;
      runtime.cameraMode = "follow";
      runtime.focusBuilding = null;
      dismissEntryGuidance();
      dom.status.textContent = "Walking to the selected location.";
    }
  }

  function movementVector() {
    const THREE = runtime.THREE;
    const input = new THREE.Vector2(0, 0);
    if (runtime.keys.has("KeyW") || runtime.keys.has("ArrowUp") || runtime.keys.has("TouchForward")) input.y += 1;
    if (runtime.keys.has("KeyS") || runtime.keys.has("ArrowDown") || runtime.keys.has("TouchBack")) input.y -= 1;
    if (runtime.keys.has("KeyA") || runtime.keys.has("ArrowLeft") || runtime.keys.has("TouchLeft")) input.x -= 1;
    if (runtime.keys.has("KeyD") || runtime.keys.has("ArrowRight") || runtime.keys.has("TouchRight")) input.x += 1;
    if (!input.lengthSq()) return null;
    input.normalize();
    const cameraAngle = Number(runtime.cameraAngle || WORLD.cameraAngle);
    const forward = new THREE.Vector3(-Math.sin(cameraAngle), 0, -Math.cos(cameraAngle));
    const right = new THREE.Vector3(Math.cos(cameraAngle), 0, -Math.sin(cameraAngle));
    return forward.multiplyScalar(input.y).add(right.multiplyScalar(input.x)).normalize();
  }

  function isWithinDiorama(x, z, margin = 0) {
    const radius = Math.max(.1, WORLD.cornerRadius - margin);
    const halfWidth = WORLD.width / 2 - margin;
    const halfDepth = WORLD.depth / 2 - margin;
    const qx = Math.abs(x) - (halfWidth - radius);
    const qz = Math.abs(z) - (halfDepth - radius);
    const outside = Math.hypot(Math.max(qx, 0), Math.max(qz, 0));
    const inside = Math.min(Math.max(qx, qz), 0);
    return outside + inside <= radius;
  }

  function clampToDiorama(point, margin = .45) {
    const maxX = WORLD.width / 2 - margin;
    const maxZ = WORLD.depth / 2 - margin;
    point.x = Math.max(-maxX, Math.min(maxX, point.x));
    point.z = Math.max(-maxZ, Math.min(maxZ, point.z));
    if (!isWithinDiorama(point.x, point.z, margin)) {
      for (let index = 0; index < 12 && !isWithinDiorama(point.x, point.z, margin); index += 1) {
        point.x *= .96;
        point.z *= .96;
      }
    }
    return point;
  }

  function isPositionWalkable(x, z, radius = .42) {
    if (!isWithinDiorama(x, z, radius + .18)) return false;
    return !(runtime?.colliders || []).some(collider => {
      const normalizedX = (x - collider.x) / (collider.radiusX + radius);
      const normalizedZ = (z - collider.z) / (collider.radiusZ + radius);
      return normalizedX * normalizedX + normalizedZ * normalizedZ < 1;
    });
  }

  function moveAnchorWithCollision(anchor, displacement, radius = .42) {
    if (!anchor || !displacement) return false;
    const nextX = anchor.position.x + displacement.x;
    const nextZ = anchor.position.z + displacement.z;
    if (isPositionWalkable(nextX, nextZ, radius)) {
      anchor.position.x = nextX;
      anchor.position.z = nextZ;
      return true;
    }
    // Axis-separated fallback lets the avatar slide naturally along building,
    // sign, pond, and scenery boundaries instead of stopping abruptly.
    if (isPositionWalkable(nextX, anchor.position.z, radius)) {
      anchor.position.x = nextX;
      return true;
    }
    if (isPositionWalkable(anchor.position.x, nextZ, radius)) {
      anchor.position.z = nextZ;
      return true;
    }
    return false;
  }

  function terrainYAt(x, z) {
    const surfaceY = WORLD.surfaceY;
    if (Math.hypot(x, z) <= 3.45) return surfaceY + .37;
    for (const building of BUILDINGS) {
      const platformRadius = building.kind === "atm" ? 3.95 : building.kind === "school" ? 4.7 : building.kind === "observatory" ? 4.2 : 4.55;
      if (Math.hypot(x - building.x, z - building.z) <= platformRadius - .14) {
        return surfaceY + Number(building.elevation || 0) + .32;
      }
    }
    return surfaceY + .12;
  }

  function updateMovement(delta) {
    if (!runtime.playing || !runtime.player) {
      if (runtime?.player) runtime.player.userData.isMoving = false;
      return;
    }
    const direct = movementVector();
    let playerMoving = false;
    if (direct) {
      runtime.moveTarget = null;
      runtime.moveQueue = [];
      runtime.cameraMode = "follow";
      runtime.focusBuilding = null;
      playerMoving = moveAnchorWithCollision(runtime.player, direct.clone().multiplyScalar(delta * 8.4));
      runtime.player.userData.heading = Math.atan2(direct.x, direct.z);
    } else if (runtime.moveTarget) {
      const toward = runtime.moveTarget.clone().sub(runtime.player.position);
      toward.y = 0;
      if (toward.length() < .15) {
        runtime.moveTarget = runtime.moveQueue.shift() || null;
        if (!runtime.moveTarget) runtime.player.userData.arrivalPulse = 1;
      }
      else {
        toward.normalize();
        playerMoving = moveAnchorWithCollision(runtime.player, toward.clone().multiplyScalar(delta * 7.6));
        if (!playerMoving) {
          runtime.moveTarget = null;
          runtime.moveQueue = [];
        }
        runtime.player.userData.heading = Math.atan2(toward.x, toward.z);
      }
    }
    runtime.player.userData.isMoving = playerMoving;
    clampToDiorama(runtime.player.position);
    const playerGroundY = terrainYAt(runtime.player.position.x, runtime.player.position.z);
    runtime.player.position.y += (playerGroundY - runtime.player.position.y) * Math.min(1, delta * 10);
    orientSurfaceAnchor(runtime.player, runtime.player.userData.heading || 0);

    runtime.companions.forEach((anchor, index) => {
      const desired = runtime.player.position.clone().add(anchor.userData.offset || new runtime.THREE.Vector3(index - 1, 0, 1.4));
      const toward = desired.sub(anchor.position);
      toward.y = 0;
      const companionDistance = toward.length();
      let companionMoving = false;
      if (companionDistance > .12) {
        toward.normalize();
        companionMoving = moveAnchorWithCollision(anchor, toward.clone().multiplyScalar(Math.min(companionDistance, delta * 4.7)), .34);
        anchor.userData.heading = Math.atan2(toward.x, toward.z);
      }
      anchor.userData.isMoving = companionMoving;
      clampToDiorama(anchor.position, .75);
      const companionGroundY = terrainYAt(anchor.position.x, anchor.position.z);
      anchor.position.y += (companionGroundY - anchor.position.y) * Math.min(1, delta * 9);
      orientSurfaceAnchor(anchor, anchor.userData.heading || 0);
    });
    runtime.markers.forEach(marker => {
      const anchor = marker.userData.followAnchor;
      marker.position.x = anchor.position.x;
      marker.position.y = anchor.position.y - .02;
      marker.position.z = anchor.position.z;
      orientSurfaceAnchor(marker, 0);
    });
  }

  function updateAvatarLayer(delta = 0) {
    if (!runtime) return;
    const time = runtime.clock.elapsedTime;
    runtime.avatarAnchors.forEach((anchor, index) => {
      const model = anchor.userData.model;
      if (!model) return;
      const moving = Boolean(anchor.userData.isMoving);
      const pace = moving ? 9 : 2.2;
      const stride = Math.sin(time * pace + index * .72);
      const arrival = Math.max(0, Number(anchor.userData.arrivalPulse || 0));
      anchor.userData.arrivalPulse = Math.max(0, arrival - delta * 2.4);
      const arrivalBounce = arrival > 0 ? Math.sin((1 - arrival) * Math.PI) * .14 : 0;
      model.position.y = (model.userData.baseY || 0) + Math.abs(stride) * (moving ? .072 : .014) + arrivalBounce;
      const baseScale = model.userData.baseScale || model.scale.clone();
      model.userData.baseScale = baseScale;
      const squash = moving ? Math.abs(stride) * .045 : Math.sin(time * 1.7 + index) * .008;
      model.scale.set(
        baseScale.x * (1 + squash * .55 + arrival * .035),
        baseScale.y * (1 - squash + arrival * .06),
        baseScale.z * (1 + squash * .55 + arrival * .035)
      );
      model.rotation.z = moving ? -stride * .025 : Math.sin(time * .66 + index * 1.4) * .009;
      model.rotation.y = moving ? 0 : Math.sin(time * .48 + index * 2.1) * .035;
      const limbs = model.userData.limbs;
      if (limbs) {
        const swing = moving ? stride * .48 : Math.sin(time * .72 + index) * .018;
        limbs.leftLeg.rotation.x = swing;
        limbs.rightLeg.rotation.x = -swing;
        limbs.leftArm.rotation.x = -swing * .65;
        limbs.rightArm.rotation.x = swing * .65;
      }
    });
  }

  function updateDestinationLife(elapsed, reduceMotion) {
    if (!runtime?.destinationGlows?.length || !runtime.player) return;
    runtime.destinationGlows.forEach((entry, index) => {
      const distance = Math.hypot(runtime.player.position.x - entry.config.x, runtime.player.position.z - entry.config.z);
      const active = runtime.focusBuilding?.id === entry.config.id || runtime.nearest?.config?.id === entry.config.id;
      const proximity = Math.max(0, 1 - distance / 12);
      const pulse = reduceMotion ? 0 : Math.sin(elapsed * 2.1 + index * .9) * .08;
      entry.material.opacity = Math.min(.78, .12 + proximity * .32 + (active ? .22 : 0) + pulse);
      entry.material.emissiveIntensity = .35 + proximity * .7 + (active ? .5 : 0);
      const scale = 1 + proximity * .13 + (active ? .12 : 0) + pulse * .22;
      entry.object.scale.setScalar(scale);
    });
  }

  function updateEntranceSequence(delta, reduceMotion) {
    const sequence = runtime?.entranceSequence;
    const player = runtime?.player;
    if (!sequence || !player) return;
    sequence.elapsed += delta;
    if (sequence.phase === "align") {
      const duration = reduceMotion ? .08 : sequence.alignDuration;
      const progress = Math.min(1, sequence.elapsed / duration);
      const eased = progress * progress * (3 - 2 * progress);
      player.position.lerpVectors(sequence.startPosition, sequence.targetPosition, eased);
      player.userData.heading = lerpAngle(sequence.startHeading, Math.PI, eased);
      player.userData.isMoving = progress < 1;
      orientSurfaceAnchor(player, player.userData.heading);
      if (progress >= 1) {
        player.position.copy(sequence.targetPosition);
        player.userData.heading = Math.PI;
        player.userData.isMoving = false;
        player.userData.arrivalPulse = 1;
        sequence.phase = "open";
        sequence.elapsed = 0;
        dom.status.textContent = `Opening ${sequence.building.name}.`;
      }
      return;
    }
    const duration = reduceMotion ? .12 : sequence.openDuration;
    if (sequence.phase === "open" && sequence.elapsed >= duration && !sequence.completing) {
      sequence.completing = true;
      document.getElementById("worldTransitionEmoji").textContent = sequence.building.emoji;
      document.getElementById("worldTransitionTitle").textContent = `Entering ${sequence.building.name}`;
      dom.transition.hidden = false;
      dom.status.textContent = `Entering ${sequence.building.name}.`;
      window.setTimeout(() => {
        if (!runtime || runtime.entranceSequence !== sequence) return;
        try {
          openWorldWorkspace(sequence.building);
        } catch (error) {
          console.error("LumaFi World workspace could not open.", error);
          dom.transition.hidden = true;
          dom.status.textContent = `${sequence.building.name} could not open. Try the entrance again.`;
          runtime.playing = true;
          runtime.openingBuilding = false;
          runtime.activeEntranceBuilding = null;
          runtime.entranceSequence = null;
        }
      }, reduceMotion ? 40 : 110);
    }
  }

  function updateEntranceStates(delta, elapsed, reduceMotion) {
    if (!runtime?.buildings?.length) return;
    runtime.buildings.forEach((entry, index) => {
      const entrance = entry.entrance;
      if (!entrance) return;
      const isReady = runtime.nearest?.config?.id === entry.config.id;
      const isOpening = runtime.openingBuilding
        && runtime.activeEntranceBuilding?.id === entry.config.id
        && runtime.entranceSequence?.phase === "open";
      const targetOpen = isOpening ? 1 : 0;
      entrance.openAmount = reduceMotion ? targetOpen : dampNumber(entrance.openAmount, targetOpen, isOpening ? 8.8 : 5.8, delta);
      entrance.doorPivot.rotation.y = -entrance.openAmount * 1.08;
      entrance.state = isOpening ? "opening" : isReady ? "ready" : "idle";
      const pulse = reduceMotion ? 0 : Math.sin(elapsed * 2.6 + index * .8) * .12;
      entrance.entranceLight.material.emissiveIntensity = isOpening ? 2.1 : isReady ? 1.12 + pulse : runtime.night ? .7 : .28;
      entrance.doorLeaf.material.emissive.setHex(entry.config.color);
      entrance.doorLeaf.material.emissiveIntensity = isOpening ? .42 : isReady ? .16 + pulse * .2 : 0;
    });
  }

  function updateEnvironmentMotion(delta, elapsed, reduceMotion) {
    if (!runtime) return;
    const windTarget = reduceMotion
      ? 0
      : .58 + Math.sin(elapsed * .19) * .18 + Math.sin(elapsed * .47 + 1.3) * .12 + Math.sin(elapsed * .083 + 2.1) * .09;
    runtime.wind.target = Math.max(.12, Math.min(1, windTarget));
    runtime.wind.strength = dampNumber(runtime.wind.strength, runtime.wind.target, 1.35, delta);

    runtime.ambientSway.forEach(entry => {
      const gust = runtime.wind.strength * entry.strength;
      const targetZ = entry.baseZ + (reduceMotion ? 0 : Math.sin(elapsed * .72 + entry.phase) * .023 * gust);
      const targetX = entry.baseX + (reduceMotion ? 0 : Math.cos(elapsed * .53 + entry.phase) * .009 * gust);
      entry.object.rotation.z = dampNumber(entry.object.rotation.z, targetZ, 5.6, delta);
      entry.object.rotation.x = dampNumber(entry.object.rotation.x, targetX, 5.2, delta);
    });
    runtime.foliageLayers.forEach(entry => {
      const gust = runtime.wind.strength * entry.strength;
      const targetZ = entry.baseZ + (reduceMotion ? 0 : Math.sin(elapsed * 1.18 + entry.phase) * .035 * gust);
      const targetX = entry.baseX + (reduceMotion ? 0 : Math.cos(elapsed * .92 + entry.phase) * .018 * gust);
      entry.object.rotation.z = dampNumber(entry.object.rotation.z, targetZ, 7.4, delta);
      entry.object.rotation.x = dampNumber(entry.object.rotation.x, targetX, 7, delta);
    });
    runtime.animatedSurfaces.forEach(surface => {
      const targetOpacity = surface.baseOpacity * (reduceMotion ? 1 : .95 + Math.sin(elapsed * .9 + surface.phase) * .04);
      const targetY = surface.baseY + (reduceMotion ? 0 : Math.sin(elapsed * .62 + surface.phase) * .012);
      surface.material.opacity = dampNumber(surface.material.opacity, targetOpacity, 4.4, delta);
      surface.object.position.y = dampNumber(surface.object.position.y, targetY, 4.2, delta);
    });
    runtime.clouds.forEach((cloud, index) => {
      if (!reduceMotion) {
        cloud.position.x += delta * cloud.userData.speed * (.82 + runtime.wind.strength * .32);
        if (cloud.position.x > 22) cloud.position.x = -22 - index * 1.4;
      }
      const targetY = cloud.userData.baseY + (reduceMotion ? 0 : Math.sin(elapsed * .16 + cloud.userData.phase) * .16);
      cloud.position.y = dampNumber(cloud.position.y, targetY, 1.7, delta);
    });
    if (!reduceMotion) {
      runtime.sakuraBlossoms.forEach(layer => {
        for (let index = 0; index < layer.falls.length; index += 1) {
          const offset = index * 3;
          layer.positions[offset + 1] -= delta * layer.falls[index] * (.78 + runtime.wind.strength * .3);
          layer.positions[offset] += Math.sin(elapsed * 1.15 + layer.phases[index]) * delta * layer.drift * runtime.wind.strength;
          layer.positions[offset + 2] += Math.cos(elapsed * .82 + layer.phases[index]) * delta * layer.drift * .45;
          if (layer.positions[offset + 1] < WORLD.surfaceY + .12) {
            layer.positions[offset + 1] = WORLD.surfaceY + 7.4 + ((index * 17) % 24) / 10;
          }
        }
        layer.object.geometry.attributes.position.needsUpdate = true;
        layer.object.rotation.y = dampNumber(layer.object.rotation.y, Math.sin(elapsed * .08) * .035, 2.2, delta);
      });
    }
    if (runtime.night) {
      runtime.starLayers.forEach((layer,index) => {
        const sparkle = reduceMotion ? 1 : .66 + Math.sin(elapsed * layer.speed + layer.phase) * .23 + Math.sin(elapsed * (layer.speed * 2.17) + index) * .11;
        layer.material.opacity = Math.max(.22, layer.baseOpacity * sparkle);
        layer.material.size = layer.baseSize * (reduceMotion ? 1 : .86 + Math.sin(elapsed * (layer.speed * 1.47) + layer.phase) * .18);
      });
    }
  }

  function updateNearestBuilding() {
    if (!runtime || runtime.openingBuilding || portalState) {
      dom.prompt.hidden = true;
      return;
    }
    let nearest = null;
    let distance = Infinity;
    runtime.buildings.forEach(building => {
      const current = Math.hypot(runtime.player.position.x - building.config.x, runtime.player.position.z - building.config.z);
      if (current < distance) { distance = current; nearest = building; }
    });
    const previousId = runtime.nearest?.config?.id;
    const enterDistance = Number(nearest?.config?.interactionRadius || 4.25);
    const threshold = previousId === nearest?.config?.id ? enterDistance + .85 : enterDistance;
    runtime.nearest = distance <= threshold ? nearest : null;
    if (!runtime.nearest) {
      dom.prompt.hidden = true;
      delete dom.prompt.dataset.worldBuilding;
      updateDestinationNav();
      return;
    }
    const building = runtime.nearest.config;
    if (dom.prompt.dataset.worldBuilding !== building.id) {
      const touch = Boolean(matchMedia("(pointer: coarse)").matches);
      dom.prompt.dataset.worldBuilding = building.id;
      dom.prompt.innerHTML = `<span class="world-prompt-icon" aria-hidden="true">${building.emoji}</span><span class="world-prompt-copy"><strong>Enter ${escapeHtml(building.name)}</strong><small>${escapeHtml(building.detail)}</small></span><span class="world-prompt-action"><kbd>${touch ? "Tap" : "E"}</kbd><b>Enter</b></span>`;
      dom.prompt.setAttribute("aria-label", `Enter ${building.name}. ${building.detail}. ${touch ? "Tap" : "Press E"} to enter.`);
    }
    dom.prompt.hidden = false;
    updateDestinationNav();
  }

  function updateEntrancePromptPosition() {
    if (!runtime?.nearest?.entrance || dom.prompt.hidden) return;
    const anchor = runtime.nearest.entrance.promptAnchor;
    const projected = anchor.getWorldPosition(new runtime.THREE.Vector3()).project(runtime.camera);
    const hostRect = dom.host.getBoundingClientRect();
    const shellRect = dom.shell.getBoundingClientRect();
    if (projected.z < -1 || projected.z > 1 || hostRect.width <= 0 || hostRect.height <= 0) {
      dom.prompt.classList.remove("is-world-anchored");
      dom.prompt.style.removeProperty("left");
      dom.prompt.style.removeProperty("top");
      return;
    }
    const width = dom.prompt.offsetWidth || 360;
    const x = (projected.x * .5 + .5) * hostRect.width + hostRect.left - shellRect.left;
    const y = (-projected.y * .5 + .5) * hostRect.height + hostRect.top - shellRect.top;
    const safeX = Math.max(width / 2 + 12, Math.min(shellRect.width - width / 2 - 12, x));
    const safeY = Math.max(118, Math.min(shellRect.height - 112, y - 18));
    dom.prompt.style.left = `${safeX}px`;
    dom.prompt.style.top = `${safeY}px`;
    dom.prompt.classList.add("is-world-anchored");
  }

  function animate() {
    if (!runtime) return;
    const delta = Math.min(runtime.clock.getDelta(), .05);
    const elapsed = runtime.clock.elapsedTime;
    const reduceMotion = Boolean(household?.reduceMotion || matchMedia("(prefers-reduced-motion: reduce)").matches);
    updateMovement(delta);
    updateEntranceSequence(delta, reduceMotion);
    updateAmbientNeighbors(delta, reduceMotion);
    updateNearestBuilding();
    updateEnvironmentMotion(delta, elapsed, reduceMotion);
    updateEntranceStates(delta, elapsed, reduceMotion);
    updateCamera(delta);
    updateEntrancePromptPosition();
    updateAvatarLayer(delta);
    updateDestinationLife(elapsed, reduceMotion);
    runtime.renderer.render(runtime.scene, runtime.camera);
    runtime.raf = requestAnimationFrame(animate);
  }

  function setNightMode(force) {
    if (!runtime) return;
    runtime.night = typeof force === "boolean" ? force : !runtime.night;
    const sky = runtime.night ? runtime.theme.nightSky : runtime.theme.sky;
    runtime.scene.background.setHex(sky);
    runtime.scene.fog.color.setHex(sky);
    runtime.ambient.color.setHex(runtime.night ? 0xc4ddf2 : 0xffffff);
    runtime.ambient.groundColor.setHex(runtime.night ? 0x7893a8 : runtime.theme.rock);
    runtime.ambient.intensity = runtime.night ? 1.28 : 1.55;
    runtime.sun.intensity = runtime.night ? .72 : 3.75;
    runtime.nightFill.intensity = runtime.night ? 1.58 : 0;
    runtime.rearFill.intensity = runtime.night ? .92 : 0;
    runtime.renderer.toneMappingExposure = runtime.night ? 1.24 : 1.04;
    runtime.nightMaterials.forEach(item => { item.emissiveIntensity = runtime.night ? 2.5 : .25; });
    runtime.starLayers.forEach(layer => {
      layer.object.visible = runtime.night;
      layer.material.opacity = runtime.night ? layer.baseOpacity : 0;
      layer.material.size = layer.baseSize;
    });
    runtime.clouds.forEach(cloud => {
      cloud.visible = true;
      cloud.children.forEach(part => { if (part.material) part.material.opacity = runtime.night ? .38 : .82; });
    });
    const button = document.querySelector('[data-world-action="night"]');
    if (button) {
      button.setAttribute("aria-checked",String(runtime.night));
      button.setAttribute("aria-label",runtime.night ? "Switch to day mode" : "Switch to night mode");
      button.classList.toggle("is-night",runtime.night);
      const label = button.querySelector(".world-light-label");
      const thumb = button.querySelector(".world-light-thumb");
      if (label) label.textContent = runtime.night ? "Night" : "Day";
      if (thumb) thumb.textContent = runtime.night ? "🌙" : "☀️";
    }
    dom.status.textContent = runtime.night ? "Night mode on. Village paths are illuminated." : "Day mode on.";
  }

  function openWorldWorkspace(building) {
    if (!building) return;
    closeWorldWorkspace({ resume: false });
    const source = document.getElementById(`view-${building.view}`);
    if (!source) {
      dom.status.textContent = `${building.name} could not open. Return to LumaFi and try again.`;
      if (runtime) {
        runtime.openingBuilding = false;
        runtime.activeEntranceBuilding = null;
        runtime.entranceSequence = null;
        runtime.playing = true;
      }
      return;
    }
    const placeholder = document.createComment(`hearth-world-${building.view}-placeholder`);
    source.parentNode.insertBefore(placeholder, source);
    portalState = {
      source,
      placeholder,
      originalClassName: source.className,
      fallbackWasVisible: !dom.fallback.hidden,
      building
    };
    source.classList.add("active", "world-portal-view");
    dom.workspaceContent.replaceChildren(source);
    document.getElementById("worldWorkspaceEmoji").textContent = building.emoji;
    document.getElementById("worldWorkspaceTitle").textContent = building.name;
    dom.transition.hidden = true;
    dom.fallback.hidden = true;
    dom.workspace.hidden = false;
    dom.host.setAttribute("inert", "");
    if (runtime) {
      runtime.openingBuilding = false;
      runtime.activeEntranceBuilding = null;
      runtime.entranceSequence = null;
      runtime.playing = false;
    }
    if (building.tab) source.querySelector(`[data-tab-group="${building.view}"] [data-tab="${building.tab}"]`)?.click();
    window.PFOSCharts?.render?.();
    document.getElementById("closeWorldWorkspaceBtn")?.focus();
    dom.status.textContent = `${building.name} is open inside LumaFi World.`;
  }

  function closeWorldWorkspace({ resume = true } = {}) {
    if (!portalState) return;
    const { source, placeholder, originalClassName, fallbackWasVisible, building } = portalState;
    if (placeholder.parentNode) placeholder.parentNode.insertBefore(source, placeholder);
    placeholder.remove();
    source.className = originalClassName;
    portalState = null;
    dom.workspaceContent.replaceChildren();
    dom.workspace.hidden = true;
    dom.host.removeAttribute("inert");
    if (fallbackWasVisible) {
      dom.fallback.hidden = false;
      if (resume) dom.fallback.querySelector(`[data-world-destination="${building.id}"]`)?.focus();
    } else if (runtime && resume) {
      runtime.playing = true;
      runtime.openingBuilding = false;
      runtime.activeEntranceBuilding = null;
      runtime.entranceSequence = null;
      runtime.keys.clear();
      runtime.moveTarget = null;
      focusWorldSurface();
    }
    dom.status.textContent = `${building.name} closed. You are back in ${currentVillage().name}.`;
    window.PFOSCharts?.render?.();
  }

  function enterBuilding(building) {
    if (!building || portalState || runtime?.openingBuilding) return;
    if (runtime && !isBuildingNearby(building, .25)) {
      focusDestination(building.id);
      return;
    }
    if (!runtime) {
      openWorldWorkspace(building);
      return;
    }
    const entry = runtimeBuildingFor(building);
    if (!entry?.entrance || !runtime.player) {
      openWorldWorkspace(building);
      return;
    }
    runtime.openingBuilding = true;
    runtime.activeEntranceBuilding = building;
    runtime.playing = false;
    runtime.keys.clear();
    runtime.moveTarget = null;
    runtime.moveQueue = [];
    runtime.focusBuilding = building;
    runtime.entranceSequence = {
      building,
      phase: "align",
      elapsed: 0,
      alignDuration: .42,
      openDuration: .52,
      startPosition: runtime.player.position.clone(),
      targetPosition: entry.entrance.approachPosition.clone(),
      startHeading: Number(runtime.player.userData.heading || 0),
      completing: false
    };
    dom.prompt.hidden = true;
    dom.transition.hidden = true;
    dom.status.textContent = `Approaching the entrance to ${building.name}.`;
  }

  function openDestinationById(id) {
    const building = BUILDINGS.find(item => item.id === id);
    if (!building) return;
    openWorldWorkspace(building);
  }

  function cleanupRuntime() {
    if (!runtime) {
      if (dom.host) dom.host.innerHTML = "";
      if (dom.avatars) dom.avatars.innerHTML = "";
      return;
    }
    window.clearTimeout(runtime.guidanceTimer);
    cancelAnimationFrame(runtime.raf);
    runtime.listeners.forEach(remove => remove());
    runtime.resizeObserver?.disconnect?.();
    runtime.scene.traverse(object => {
      object.geometry?.dispose?.();
      if (Array.isArray(object.material)) object.material.forEach(item => { item.map?.dispose?.(); item.dispose?.(); });
      else { object.material?.map?.dispose?.(); object.material?.dispose?.(); }
    });
    runtime.renderer.dispose();
    runtime.renderer.forceContextLoss?.();
    runtime = null;
    dom.host.innerHTML = "";
    dom.avatars.innerHTML = "";
    if (dom.entryHint) dom.entryHint.hidden = true;
  }

  function closeWorld() {
    closeWorldWorkspace({ resume: false });
    cleanupRuntime();
    document.body.classList.remove("hearth-world-open");
    if (dom.world?.open) dom.world.close?.();
    window.requestAnimationFrame(() => document.getElementById("visitWorldBtn")?.focus());
  }

  function handleWorldAction(action) {
    if (!runtime) return;
    if (action === "night") setNightMode();
    if (action === "zoom-in") { runtime.camera.zoom = Math.min(WORLD.maxZoom, runtime.camera.zoom * 1.12); runtime.camera.updateProjectionMatrix(); }
    if (action === "zoom-out") { runtime.camera.zoom = Math.max(WORLD.minZoom, runtime.camera.zoom * .88); runtime.camera.updateProjectionMatrix(); }
    if (action === "recenter") recenterWorld();
  }

  function bindUI() {
    document.getElementById("visitWorldBtn")?.addEventListener("click", openWorldDirect);
    document.getElementById("closeWorldLaunchBtn")?.addEventListener("click", () => dom.launch.close?.());
    document.getElementById("cancelWorldLaunchBtn")?.addEventListener("click", () => dom.launch.close?.());
    dom.launch?.addEventListener("click", event => { if (event.target === dom.launch) dom.launch.close?.(); });
    dom.launchContent?.addEventListener("click", event => {
      const choice = event.target.closest?.("[data-world-player-id]");
      if (!choice) return;
      const input = Array.from(dom.launchForm.querySelectorAll('input[name="worldPlayer"]')).find(item => item.value === choice.dataset.worldPlayerId);
      if (!input) return;
      input.checked = true;
      updateCompanionAvailability();
      document.getElementById("worldLaunchStatus").textContent = `${choice.querySelector("strong")?.textContent || "Explorer"} selected.`;
    });
    dom.launchContent?.addEventListener("keydown", event => {
      const choice = event.target.closest?.("[data-world-player-id]");
      if (!choice || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      const choices = Array.from(dom.launchForm.querySelectorAll("[data-world-player-id]"));
      const current = choices.indexOf(choice);
      const direction = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : -1;
      const next = choices[(current + direction + choices.length) % choices.length];
      event.preventDefault();
      next.click();
      next.focus();
    });
    dom.launchForm?.addEventListener("submit", event => { event.preventDefault(); enterWorld(); });
    document.getElementById("closeWorldBtn")?.addEventListener("click", closeWorld);
    document.getElementById("closeWorldFallbackBtn")?.addEventListener("click", closeWorld);
    document.getElementById("closeWorldWorkspaceBtn")?.addEventListener("click", () => closeWorldWorkspace());
    document.getElementById("doneWorldWorkspaceBtn")?.addEventListener("click", () => closeWorldWorkspace());
    dom.workspace?.addEventListener("keydown", event => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      closeWorldWorkspace();
    }, true);
    dom.world?.addEventListener("cancel", event => {
      event.preventDefault();
      if (portalState) closeWorldWorkspace();
      else closeWorld();
    });
    dom.world?.addEventListener("close", () => { closeWorldWorkspace({ resume: false }); cleanupRuntime(); document.body.classList.remove("hearth-world-open"); });
    dom.prompt?.addEventListener("click", event => {
      event.preventDefault();
      event.stopPropagation();
      const id = dom.prompt.dataset.worldBuilding;
      const building = BUILDINGS.find(item => item.id === id) || runtime?.nearest?.config;
      if (!building) return;
      if (runtime) {
        runtime.keys.clear();
        runtime.moveTarget = null;
      }
      enterBuilding(building);
    });
    document.addEventListener("click", event => {
      const action = event.target.closest?.("[data-world-action]")?.dataset.worldAction;
      if (action) handleWorldAction(action);
      const destination = event.target.closest?.("[data-world-destination]")?.dataset.worldDestination;
      if (destination) openDestinationById(destination);
      const focus = event.target.closest?.("[data-world-focus]")?.dataset.worldFocus;
      if (focus) focusDestination(focus);
    });
    document.querySelectorAll("[data-world-move]").forEach(button => {
      const code = { forward: "TouchForward", back: "TouchBack", left: "TouchLeft", right: "TouchRight" }[button.dataset.worldMove];
      const start = event => { event.preventDefault(); runtime?.keys.add(code); dismissEntryGuidance(); };
      const stop = event => { event.preventDefault(); runtime?.keys.delete(code); };
      button.addEventListener("pointerdown", start);
      button.addEventListener("pointerup", stop);
      button.addEventListener("pointercancel", stop);
      button.addEventListener("pointerleave", stop);
    });
  }

  function init() {
    injectUI();
    bindUI();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  return { init, openLauncher, openWorldDirect, closeWorld, villageIdFor, rollingWorldSurfaceYAt, dioramaSurfaceYAt, planetSurfaceYAt, villages: VILLAGES, placeWorlds: PLACE_WORLDS, buildings: BUILDINGS, layout: WORLD };
})();
