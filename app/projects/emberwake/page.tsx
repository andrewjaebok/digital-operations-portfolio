import type { Metadata } from "next";
import PersonalProjectStudy from "../../components/PersonalProjectStudy";

export const metadata: Metadata = {
  title: "EmberWake | Mobile Product Design & QA",
  description: "An independent mobile RPG case study covering the first session, interaction design, responsive layout, and release testing.",
};

export default function EmberWakePage() {
  return (
    <PersonalProjectStudy
      number="PROJECT 08"
      name="EmberWake"
      title="EmberWake"
      archetype="MOBILE EXPERIENCE DESIGN"
      subtitle="Making it easier to start a run, understand combat, and keep earned rewards."
      summary="I designed the mobile RPG flow, reorganized the home and hero screens, and identified the progression and save issues that should block a release."
      status="Playable prototype and release QA"
      role="Independent product direction, UX, design iteration, and QA"
      story={{
        discovery: "Mobile layout issues could cut off enemies or make the HUD crowded. Progression QA also exposed cases where rewards and saves could be lost.",
        decision: "Prioritize a readable first run and safe progression. Make Play the main action and keep hero selection available before entering a stage.",
        delivery: "I redesigned the opening, home, hero selection, equipment, stage selection, and outcome screens. I documented release cases for reward overflow and save recovery.",
        impact: "The redesigned flow gives the prototype a defined path from hero selection to a run result. First-session completion and retention still need player data.",
      }}
      playDemo={{
        href: "/play/emberwake/",
        description: "Clear the first wave of Mossgate Road as the Spellcaster. Your hero attacks automatically. Cast a spell when it becomes available, then look for the wave-clear message. The stage result shows coins and XP for the run.",
      }}
      visualTitle="Screens from the player journey"
      visuals={[
        {
          title: "Campfire home concept",
          src: "/images/personal-projects/emberwake-menu.webp",
          width: 900, height: 1200,
          alt: "EmberWake home screen concept with a prominent Play button, hero carousel, and navigation.",
          caption: "The menu concept explored the placement of Play, the hero carousel, and the always-visible navigation.",
        },
        {
          title: "Opening screen",
          src: "/images/personal-projects/emberwake-opening.webp",
          width: 535, height: 936,
          alt: "EmberWake’s title artwork and Start, Settings, and Credits controls.",
          caption: "The opening introduces the world and gives players a single entry point.",
        },
        {
          title: "Campfire home",
          src: "/images/personal-projects/emberwake-home.webp",
          width: 598, height: 936,
          alt: "The EmberWake home screen with a glowing portal, Play button, hero slots, rewards, and navigation.",
          caption: "Play starts the stage selection flow. Hero slots and gear are reachable from camp.",
        },
        {
          title: "Choose a hero",
          src: "/images/personal-projects/emberwake-hero-selection.webp",
          width: 600, height: 936,
          alt: "The roster comparing the Spellcaster, Fighter, and Archer, with stats and evolution tracks.",
          caption: "Players can compare class roles and see what each hero becomes at levels 25 and 50.",
        },
        {
          title: "Spellcaster details",
          src: "/images/personal-projects/emberwake-hero-details.webp",
          width: 600, height: 936,
          alt: "The Spellcaster’s evolution track, stats, and equipment slots.",
          caption: "The detail screen shows how current equipment contributes to hero stats.",
        },
        {
          title: "Equipment vault",
          src: "/images/personal-projects/emberwake-equipment.webp",
          width: 600, height: 936,
          alt: "The equipment inventory and weapon, armor, and accessory slots.",
          caption: "Players manage equipped gear and inventory from a dedicated screen.",
        },
        {
          title: "Choose a stage",
          src: "/images/personal-projects/emberwake-stage.webp",
          width: 600, height: 936,
          alt: "Greenfields stage selection showing Mossgate Road and locked later levels.",
          caption: "The stage picker shows which areas are available and which hero will enter.",
        },
        {
          title: "Mobile combat",
          src: "/images/personal-projects/emberwake-mobile-combat.webp",
          width: 390, height: 844,
          alt: "EmberWake gameplay showing the Spellcaster and an enemy on the battlefield, with health and skill controls at the bottom.",
          caption: "Mobile layout retest at 390 × 844. Earlier builds could cut off enemies or crowd the HUD. In this capture, the enemy, hero, and skill controls all fit in the same viewport.",
        },
        {
          title: "Wave clear and rewards",
          src: "/images/personal-projects/emberwake-wave-clear.webp",
          width: 390, height: 844,
          alt: "EmberWake mobile gameplay showing a Road Clear banner and a wave message confirming that rewards were banked.",
          caption: "The wave-clear message confirms the rewards earned for the run. The portfolio demo resets between runs.",
        },
      ]}
      sections={[
        { id: "first-session", label: "Player journey", title: "Design the first session from home to rewards", items: [
          { title: "Start a run", detail: "Home → select a hero → select a stage → auto-run combat → review the result. Keep Play prominent and reserve the hero carousel for decisions before combat." },
          { title: "Read the battle", detail: "The stage has five waves. Active skills give the player choices during auto-run combat. Prioritize visible enemies, readable health and energy, and clear skill availability in a narrow viewport." },
          { title: "Handle the result", detail: "Victory should show what the player earned and where it went. Defeat should offer a clear next step. Keep rewards recoverable if inventory is full or a save is interrupted." },
        ] },
        { id: "qa", label: "Accessibility and QA", title: "Treat layout, saves, and rewards as release checks", items: [
          { title: "Known issues", detail: "Small screens can cut off enemies or crowd the HUD. Hero replacement, full inventory, unclaimed rewards, save recovery, and missing assets belong in the release backlog." },
          { title: "Acceptance checks", detail: "Verify the battlefield fits at narrow phone widths, skills stay reachable, and changing a hero preserves expected progress. Fill inventory, earn a reward, reload, and verify the reward is still available." },
          { title: "Accessibility checks to run", detail: "Check readable contrast and tap target size, pair colors with labels for skill state, and test keyboard access to menus and reduced-motion settings. The prototype has no completed accessibility audit." },
        ] },
        { id: "rollout", label: "Playtest and rollout", title: "Use a small playtest to decide what to change next", items: [
          { title: "Planned first-session test", detail: "Give a new player a phone and ask them to choose a hero, start a stage, use a skill, and collect their result without coaching. Record mis-taps, hesitation, unexpected scrolling, and help needed." },
          { title: "Proposed instrumentation", detail: "Track hero selection, stage start, first skill use, stage result, reward claim, and save failure. Compare first-run completion and unclaimed rewards before and after the next iteration once events are available." },
          { title: "Release sequence", detail: "Fix progression and layout blockers, complete the mobile and save regression checks, invite players to a limited build, and share the controls and known issues. Use player feedback and event counts to plan the next changes." },
        ] },
      ]}
      capabilities={["Mobile UX", "Interaction design", "Release QA", "Product analytics planning"]}
      next={{ number: "PROJECT 03", title: "LumaFi", description: "A household finance app designed around understanding the month.", href: "/projects/hearth" }}
    />
  );
}
