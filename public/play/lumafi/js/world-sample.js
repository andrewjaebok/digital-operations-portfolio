// Connects the saved LumaFi world renderer to a fictional portfolio household.
const explorerForm = document.getElementById("sample-explorer");
const explorerPreview = document.getElementById("explorer-preview");

function sampleExplorer() {
  return {
    ...Object.fromEntries(new FormData(explorerForm)),
    id: "portfolio-explorer",
    name: "Jamie",
    age: 30,
    hair: "brown",
    accessory: "none",
  };
}

function sampleHousehold() {
  return { neighborhood: "citypark", people: [sampleExplorer()], pets: [] };
}

window.PFOS = {
  state: { currentMonth: 0, currentYear: 2026 },
  months: ["August"],
  householdFor: sampleHousehold,
  householdDefault: sampleHousehold,
};

function renderSampleExplorer() {
  explorerPreview.innerHTML = HouseholdEngine.character(sampleExplorer(), "good");
}

explorerForm.addEventListener("change", renderSampleExplorer);
explorerForm.addEventListener("submit", event => event.preventDefault());
renderSampleExplorer();
