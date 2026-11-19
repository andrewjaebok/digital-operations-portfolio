window.HouseholdNeighborhoods = (() => {
  const neighborhoods = {
    citypark: { label: "City Park", emoji: "🌳", category: "Town", asset: "citypark", leftProps: ["tree-left"], rightProps: ["bench-right"], motion: "clouds", hidden: true },
    suburbs: { label: "Suburbs", emoji: "🏡", category: "Town", asset: "suburbs", mood: "Stability", quality: 5, seasons: ["spring","summer","fall"], leftProps: ["mailbox-left"], rightProps: ["tree-right"], motion: "clouds" },
    downtown: { label: "Downtown", emoji: "🏙️", category: "Town", asset: "downtown", mood: "Ambition", quality: 5, seasons: ["spring","summer","fall","winter"], leftProps: ["lamp-left"], rightProps: ["bench-right"], motion: "lights" },
    coffee: { label: "Coffee Street", emoji: "☕", category: "Town", asset: "coffee", mood: "Community", quality: 5, seasons: ["spring","fall","winter"], leftProps: ["table-left"], rightProps: ["lamp-right"], motion: "steam", hidden: true },
    rooftopgarden: { label: "Rooftop Garden", emoji: "🌿", category: "Town", asset: "downtown", mood: "Ambition", quality: 4, seasons: ["spring","summer","fall","winter"], leftProps: ["lamp-left"], rightProps: ["tree-right"], motion: "breeze", hidden: true },
    universitycampus: { label: "University Campus", emoji: "🎓", category: "Town", asset: "suburbs", mood: "Stability", quality: 4, seasons: ["spring","summer","fall"], leftProps: ["tree-left"], rightProps: ["lamp-right"], motion: "clouds", hidden: true },

    forest: { label: "Forest", emoji: "🌲", category: "Nature", asset: "forest", mood: "Growth", quality: 4, seasons: ["spring","summer","fall"], leftProps: ["stump-left"], rightProps: ["pine-right"], motion: "leaves" },
    autumnforest: { label: "Autumn Forest", emoji: "🍂", category: "Nature", asset: "forest", mood: "Growth", quality: 4, seasons: ["spring","summer","fall"], leftProps: ["pine-left"], rightProps: ["stump-right"], motion: "leaves", hidden: true },
    mountains: { label: "Mountains", emoji: "🏔️", category: "Nature", asset: "mountains", mood: "Adventure", quality: 4, seasons: ["summer","fall","winter"], leftProps: ["pine-left"], rightProps: ["rock-right"], motion: "clouds" },
    mountainvillage: { label: "Mountain Village", emoji: "🛖", category: "Nature", asset: "mountains", mood: "Adventure", quality: 4, seasons: ["summer","fall","winter"], leftProps: ["pine-left"], rightProps: ["campfire-right"], motion: "smoke", hidden: true },
    lakeside: { label: "Lakeside", emoji: "🌊", category: "Nature", asset: "lakeside", mood: "Reflection", quality: 4, seasons: ["spring","summer","fall"], leftProps: ["dock-left"], rightProps: ["tree-right"], motion: "ripples" },
    riverside: { label: "Riverside", emoji: "🏞️", category: "Nature", asset: "lakeside", mood: "Reflection", quality: 4, seasons: ["spring","summer","fall"], leftProps: ["tree-left"], rightProps: ["dock-right"], motion: "ripples", hidden: true },
    beach: { label: "Beach", emoji: "🏖️", category: "Nature", asset: "beach", mood: "Vacation", quality: 4, seasons: ["summer"], leftProps: ["palm-left"], rightProps: ["umbrella-right"], motion: "waves" },
    islandretreat: { label: "Island Retreat", emoji: "🏝️", category: "Nature", asset: "beach", mood: "Vacation", quality: 4, seasons: ["summer"], leftProps: ["palm-left"], rightProps: ["rock-right"], motion: "waves", hidden: true },
    harbor: { label: "Harbor", emoji: "⛵", category: "Nature", asset: "lakeside", mood: "Reflection", quality: 4, seasons: ["spring","summer","fall"], leftProps: ["dock-left"], rightProps: ["lamp-right"], motion: "ripples", hidden: true },

    japanesegarden: { label: "Japanese Garden", emoji: "🌸", category: "Relaxing", asset: "japanesegarden", mood: "Balance", quality: 5, seasons: ["spring","summer","fall"], leftProps: ["cherry-left"], rightProps: ["bridge-right"], motion: "petals" },
    botanicalgarden: { label: "Botanical Garden", emoji: "🌺", category: "Relaxing", asset: "japanesegarden", mood: "Balance", quality: 5, seasons: ["spring","summer","fall"], leftProps: ["tree-left"], rightProps: ["cherry-right"], motion: "petals", hidden: true },
    flowerfield: { label: "Flower Field", emoji: "🌼", category: "Relaxing", asset: "citypark", leftProps: ["tree-left"], rightProps: ["bench-right"], motion: "breeze", hidden: true },
    cozycabin: { label: "Cozy Cabin", emoji: "🪵", category: "Relaxing", asset: "cozycabin", mood: "Escape", quality: 4, seasons: ["fall","winter"], leftProps: ["campfire-left"], rightProps: ["pine-right"], motion: "smoke", hidden: true },
    stargazing: { label: "Stargazing", emoji: "✨", category: "Relaxing", asset: "stargazing", mood: "Wonder", quality: 4, seasons: ["summer","fall"], leftProps: ["telescope-left"], rightProps: ["campfire-right"], motion: "stars", hidden: true },

    holidayvillage: { label: "Holiday Village", emoji: "🎄", category: "Seasonal", asset: "holidayvillage", mood: "Christmas", quality: 4, seasons: ["winter"], leftProps: ["holidaytree-left"], rightProps: ["gift-right"], motion: "snow", hidden: true },
    snowy: { label: "Snow Village", emoji: "❄️", category: "Seasonal", asset: "snowy", mood: "Winter", quality: 4, seasons: ["winter"], leftProps: ["snowpine-left"], rightProps: ["snowman-right"], motion: "snow" },
    winterpark: { label: "Winter Park", emoji: "⛄", category: "Seasonal", asset: "winter", leftProps: ["snowpine-left"], rightProps: ["snowman-right"], motion: "snow", hidden: true },
    desertsunset: { label: "Desert", emoji: "🌵", category: "Seasonal", asset: "desertsunset", mood: "Solitude", quality: 4, seasons: ["spring","summer","fall"], leftProps: ["cactus-left"], rightProps: ["rock-right"], motion: "heat" },
    nightcity: { label: "Night City", emoji: "🌃", category: "Seasonal", asset: "night", mood: "Energy", quality: 4, seasons: ["spring","summer","fall","winter"], leftProps: ["lamp-left"], rightProps: ["bench-right"], motion: "lights", hidden: true },
    classicpark: { label: "Classic Park", emoji: "🌿", category: "Town", asset: "park", leftProps: ["tree-left"], rightProps: ["bench-right"], motion: "clouds", hidden: true }
  };

  const aliases = {
    park: "classicpark",
    city: "citypark",
    mountain: "mountains",
    winter: "winterpark",
    sunset: "desertsunset",
    coffee: "downtown",
    cozy: "forest",
    cozycabin: "forest",
    stargazing: "mountains",
    night: "downtown",
    nightcity: "downtown",
    holidayvillage: "snowy",
    snowyvillage: "snowy"
  };

  function normalize(id) {
    const normalized = aliases[id] || id || "citypark";
    return neighborhoods[normalized] ? normalized : "citypark";
  }

  function get(id) {
    const normalized = normalize(id);
    const config = neighborhoods[normalized];
    const props = [ ...(config.leftProps || []), ...(config.rightProps || []) ];
    return { id: normalized, props, ...config };
  }

  function list(options = {}) {
    const includeHidden = Boolean(options.includeHidden);
    return Object.keys(neighborhoods)
      .filter(id => includeHidden || !neighborhoods[id].hidden)
      .map(get)
      .filter((item, index, items) => items.findIndex(candidate => candidate.id === item.id) === index);
  }

  function groups() {
    return list().reduce((acc, item) => {
      const category = item.category || "Places";
      acc[category] ||= [];
      acc[category].push(item);
      return acc;
    }, {});
  }

  function validateAll() {
    return Object.keys(neighborhoods).map(id => {
      const item = { id, ...neighborhoods[id] };
      const issues = [];
      if (!item.asset) issues.push("Missing background asset");
      if (!item.motion) issues.push("Missing signature motion");
      if ((item.leftProps || []).some(prop => (item.rightProps || []).includes(prop))) issues.push("Duplicate left/right prop");
      if (!item.hidden && Number(item.quality || 0) < 4) issues.push("Needs quality pass");
      return { id, label: item.label, hidden: Boolean(item.hidden), status: issues.length ? "review" : "pass", issues };
    });
  }

  return { get, list, groups, normalize, validateAll };
})();
