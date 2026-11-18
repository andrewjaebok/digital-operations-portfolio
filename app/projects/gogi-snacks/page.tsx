import type { Metadata } from "next";
import PersonalProjectStudy from "../../components/PersonalProjectStudy";

export const metadata: Metadata = {
  title: "Gogi Snacks | Product Discovery & Packaging",
  description: "An independent snack concept covering supplier discovery, packaging decisions, and a plan to validate the product before launch.",
};

export default function GogiSnacksPage() {
  return (
    <PersonalProjectStudy
      number="PROJECT 07"
      name="Gogi Snacks"
      title="Gogi Snacks"
      archetype="CONSUMER PRODUCT DISCOVERY"
      subtitle="Testing a Korean barbecue jerky chip concept and making the product easy to understand."
      summary="I developed the snack and packaging concept, explored manufacturing options, and used an early sample to refine what to ask for in the next supplier round."
      status="Packaging concepts and supplier samples"
      role="Independent concept development, packaging direction, supplier research"
      story={{
        discovery: "I needed to find a supplier who could make a thin, crisp chip and support a small trial. An early sample did not meet the intended texture.",
        decision: "Continue sample testing before committing to a production run. Use the front of the pouch to explain what the snack is and what flavor to expect.",
        delivery: "I created a packaging direction, compared supplier options, and identified what the next sample needs to prove.",
        impact: "The first sample gave me a concrete texture issue to take into the next supplier conversation. Consumer response, unit economics, and demand are still open questions.",
      }}
      visual={{
        src: "/images/personal-projects/gogi-packaging.webp",
        width: 1280,
        height: 853,
        alt: "Gogi Snacks concept board comparing Korean stamp marks, wordmarks, pouch colors, and packaging mockups.",
        caption: "Early brand and packaging concepts. The board shows alternatives explored before final production artwork.",
      }}
      sections={[
        { id: "discovery", label: "Discovery", title: "Define what the supplier and customer need to understand", items: [
          { title: "Supplier signal", detail: "One early sample did not meet the chip texture target, and another supplier quoted a 2,000 lb minimum. A small sample run helps answer the texture question before a volume commitment." },
          { title: "Customer hypothesis", detail: "A shopper should quickly understand that this is a thin beef jerky chip and identify the Korean barbecue flavor. That assumption still needs shopper feedback." },
          { title: "Stakeholders", detail: "I own the concept and sample decisions. Suppliers inform feasibility and cost. Planned shopper feedback would inform the packaging, while a qualified review would cover final labeling." },
        ] },
        { id: "design", label: "Design decisions", title: "Make the product easy to recognize", items: [
          { title: "Information order", detail: "Lead with the product name and flavor, followed by the details shoppers need to compare it. The Korean stamp and color system identify the brand and flavor line." },
          { title: "Translate the layout to a product page", detail: "Proposed mobile flow: product and flavor, ingredients and allergens, then pack size and availability. Use text labels for flavors and check contrast, zoom, and keyboard access before launch." },
          { title: "Tradeoff", detail: "Keep the proposed front panel compact and use the back panel or product page for supporting details. Any nutrient or ingredient claim needs verification before print." },
        ] },
        { id: "validation", label: "Validation and rollout", title: "Validate the sample and the shopping experience", items: [
          { title: "Next supplier round", detail: "Ask for a small sample that meets the intended thin cut and crisp snap. Record sample cost, minimum order, lead time, and texture consistency before deciding whether to proceed." },
          { title: "Planned packaging check", detail: "Show the front panel or mobile product mockup to shoppers. Ask what the snack is, what flavor they expect, and where they would look for ingredients. Record unaided answers and revise the first confusing label." },
          { title: "Launch gates and measures", detail: "Approve the sample, verify packaging copy, and prepare the product page and FAQ. If a pilot goes live, measure product views, ingredient detail clicks, and purchase starts. Log common questions and use them to revise the page." },
        ] },
      ]}
      capabilities={["Product discovery", "Information hierarchy", "Supplier evaluation", "Validation planning"]}
      next={{ number: "PROJECT 08", title: "EmberWake", description: "A mobile RPG shaped around a clear first session and reliable progression.", href: "/projects/emberwake" }}
    />
  );
}
