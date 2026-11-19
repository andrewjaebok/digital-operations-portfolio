window.HouseholdEngine = (() => {
  const spriteBase = "./assets/sprites";
  const rendererProfiles = {
    dashboard: { name: "HouseholdHero", zoom: 1, y: 0, safe: "standard" },
    sidebar: { name: "TimelineThumbnail", zoom: .94, y: -2, safe: "compact" },
    builder: { name: "StudioPreview", zoom: .92, y: -4, safe: "studio" },
    "place-card": { name: "PlaceCard", zoom: .78, y: -6, safe: "scenic" },
    "mood-preview": { name: "FinancialMood", zoom: .84, y: -7, safe: "full-body" },
    timeline: { name: "TimelineThumbnail", zoom: .82, y: -6, safe: "thumbnail" }
  };

  function profileFor(target) {
    return rendererProfiles[target] || rendererProfiles.dashboard;
  }
  const moodRules = [
    { id: "excellent", min: 90, label: "Thriving", caption: "Your household is thriving this month." },
    { id: "good", min: 75, label: "Strong", caption: "Your household is looking strong." },
    { id: "stable", min: 60, label: "Stable", caption: "Your household is steady and building." },
    { id: "tired", min: 40, label: "Needs attention", caption: "Your household could use a little attention." },
    { id: "worried", min: 0, label: "Reset mode", caption: "Your household needs a financial reset." }
  ];

  function moodFromScore(score) {
    const value = Number(score || 0);
    return moodRules.find(rule => value >= rule.min) || moodRules[moodRules.length - 1];
  }

  function normalizeBackground(background) {
    return window.HouseholdNeighborhoods
      ? HouseholdNeighborhoods.normalize(background)
      : (background || "citypark");
  }

  function asset(path) {
    return `${spriteBase}/${path}`;
  }

  function expressionForMood(moodId, override) {
    if (override && override !== "auto") return override;
    return {
      excellent: "happy",
      good: "smile",
      stable: "neutral",
      tired: "tired",
      worried: "sad"
    }[moodId] || "neutral";
  }

  function character(person, moodId) {
    const skin = person.skin || "tone2";
    const age = Number(person.age || 0);
    const ageClass = age && age < 13 ? "child" : "adult";
    const body = `${ageClass}-${skin}`;
    const hair = `${person.hairStyle || "short"}-${person.hair || "black"}`;
    const shirt = person.shirt || "green";
    const face = expressionForMood(moodId, person.mood || "auto");
    const accessory = person.accessory || "none";
    const pose = person.pose || "front";
    const idle = person.idle || "subtle";

    const layers = [
      ["body", asset(`bodies/${body}.svg`)],
      ["shirt", asset(`shirts/${shirt}.svg`)],
      ["face", asset(`faces/${face}.svg`)],
      ["hair", asset(`hair/${hair}.svg`)]
    ];

    if (accessory !== "none") {
      layers.push(["accessory", asset(`accessories/${accessory}.svg`)]);
    }

    return `<div class="household-sprite household-person ${ageClass} pose-${pose} accessory-${accessory} idle-${idle}" data-pose="${pose}" data-accessory="${accessory}" data-idle="${idle}" data-name="${escapeHtml(person.name || "Person")}">
      <span class="sprite-foot-shadow" aria-hidden="true"></span>
      ${layers.map(([name, src]) => `<img class="sprite-layer sprite-${name}" alt="" src="${src}">`).join("")}
      <div class="avatar-label">${escapeHtml(person.name || "Person")}</div>
    </div>`;
  }

  function pet(pet, moodId) {
    const type = pet.type || "dog";
    const color = pet.color || "orange";
    return `<div class="household-sprite household-pet pet-${type} idle-pet" data-pet="${type}">
      <span class="sprite-foot-shadow" aria-hidden="true"></span>
      <img class="sprite-layer" alt="" src="${asset(`pets/${type}-${color}.svg`)}">
      <div class="pet-label">${escapeHtml(pet.name || type)}</div>
    </div>`;
  }

  function seasonFromMonth(month) {
    const m = Number(month || 0);
    if ([11, 0, 1].includes(m)) return "winter";
    if ([2, 3, 4].includes(m)) return "spring";
    if ([5, 6, 7].includes(m)) return "summer";
    return "fall";
  }


  function sceneProps(background, moodId, season) {
    const neighborhood = window.HouseholdNeighborhoods
      ? HouseholdNeighborhoods.get(background)
      : { leftProps: ["tree-left"], rightProps: ["bench-right"] };
    const left = (neighborhood.leftProps || []).map(name => `<span class="neighborhood-prop prop-zone-left prop-${name}"></span>`).join("");
    const right = (neighborhood.rightProps || []).map(name => `<span class="neighborhood-prop prop-zone-right prop-${name}"></span>`).join("");
    return `<div class="neighborhood-prop-zone left-zone">${left}</div><div class="neighborhood-prop-zone center-safe-zone"></div><div class="neighborhood-prop-zone right-zone">${right}</div>`;
  }


  function validateScene(background, neighborhood, target) {
    const issues = [];
    const motion = neighborhood?.motion || "";
    const assetName = neighborhood?.asset || background || "";
    const nightLike = /night|star|holiday|snow/.test(assetName) || /stars|snow/.test(motion);
    const dayLike = /beach|desert|suburb|forest|mountain|lake|garden|coffee|downtown/.test(assetName);
    if (nightLike && dayLike && target !== "place-card") issues.push("Mixed day/night atmosphere checked");
    if ((neighborhood?.leftProps || []).concat(neighborhood?.rightProps || []).length > 4) issues.push("High prop density");
    return issues;
  }

  function scene({ household, score, target = "dashboard", month = 0 }) {
    const mood = moodFromScore(score);
    const background = normalizeBackground(household?.neighborhood || household?.background);
    const neighborhood = window.HouseholdNeighborhoods ? HouseholdNeighborhoods.get(background) : { asset: background };
    const people = household?.people || [];
    const pets = household?.pets || [];
    const reduceMotion = Boolean(household?.reduceMotion);
    const env = household?.environment || {};
    const season = env.season && env.season !== "auto" ? env.season : seasonFromMonth(month);
    const weather = env.weather || "auto";
    const lighting = env.lighting || "auto";
    const motion = neighborhood.motion || "clouds";
    const profile = profileFor(target);
    const validationIssues = validateScene(background, neighborhood, target);

    return `<div class="household-engine-scene ${reduceMotion ? "reduce-motion" : ""}" data-bg="${background}" data-mood="${mood.id}" data-season="${season}" data-weather="${weather}" data-lighting="${lighting}" data-motion="${motion}" data-target="${target}" data-profile="${profile.name}" data-safe="${profile.safe}" data-validation="${validationIssues.length ? "review" : "pass"}" style="--scene-zoom:${profile.zoom};--scene-y:${profile.y}px;background-image:url('${asset(`backgrounds/${neighborhood.asset || background}.svg`)}')">
      <div class="scene-layer scene-ambient" aria-hidden="true"></div>
      <div class="scene-layer scene-weather" aria-hidden="true"></div>
      <div class="scene-layer scene-decor-back" aria-hidden="true">
        ${sceneProps(background, mood.id, season)}
      </div>
      <div class="scene-layer scene-household">
        <div class="household-group people-group">${people.map(person => character(person, mood.id)).join("")}</div>
        <div class="household-group pet-group">${pets.map(item => pet(item, mood.id)).join("")}</div>
      </div>
      <div class="scene-layer scene-decor-front" aria-hidden="true"></div>
      <div class="scene-layer scene-effects" aria-hidden="true"></div>
    </div>`;
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    }[char]));
  }

  return { moodFromScore, normalizeBackground, seasonFromMonth, scene, character, pet, profileFor, validateScene };
})();
