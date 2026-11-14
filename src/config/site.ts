// ─────────────────────────────────────────────────────────────────────────────
// HOME REMODELS — central site configuration
// Only verified information lives here. When the company supplies phone, email
// or a base city, add them below and the corresponding UI appears automatically.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Home Remodels",
  shortName: "Home Remodels",
  tagline: "Premium Home Remodeling",
  region: "Southern California",
  areas: ["Inland Empire", "Los Angeles", "High Desert"],
  // Not yet verified — leave empty to keep the UI honest. e.g. phone: "(909) 555-0100"
  phone: "",
  email: "",
};

export const SERVICES = [
  {
    n: "01",
    title: "Kitchen Remodeling",
    text: "Layout, cabinetry, stone and light — rebuilt around the way your household actually cooks, gathers and lives.",
    img: "/media/hero-poster.jpg",
  },
  {
    n: "02",
    title: "Bathroom Remodeling",
    text: "Walk-in showers, large-format tile and finish work that turns a utility room into a daily ritual.",
    img: "/media/shower-wide.jpg",
    badge: "Company project",
  },
  {
    n: "03",
    title: "Full Home Remodeling",
    text: "Whole-home transformations — one coordinated vision from the first wall to the final walkthrough.",
    img: "/media/slide-living.jpg",
  },
  {
    n: "04",
    title: "Interior Renovation",
    text: "Flooring, millwork, plaster and paint — interiors refined room by room with obsessive attention to detail.",
    img: "/media/svc-interior.jpg",
  },
  {
    n: "05",
    title: "Exterior & Outdoor Living",
    text: "Curb appeal, patios and outdoor rooms built for long Southern California evenings.",
    img: "/media/svc-exterior.jpg",
  },
  {
    n: "06",
    title: "Cabinetry, Countertops & Finish Work",
    text: "Custom cabinets, slab selection and finish carpentry — the details that separate good from exceptional.",
    img: "/media/svc-finish.jpg",
  },
];

export const ADDITIONAL_SERVICES = [
  "Flooring",
  "Painting",
  "Room additions",
  "Patios & outdoor living",
  "General remodeling",
];

export interface GalleryItem {
  src: string;
  title: string;
  cats: string[];
  real: boolean;
  tall?: boolean;
}

export const GALLERY: GalleryItem[] = [
  { src: "/media/shower-wide.jpg", title: "Walk-in shower — frameless glass", cats: ["bathrooms"], real: true, tall: true },
  { src: "/media/slide-bath.jpg", title: "Primary bath — design direction", cats: ["bathrooms", "inspiration"], real: false },
  { src: "/media/slab-selection.jpg", title: "Slab selection at the stone yard", cats: ["process"], real: true, tall: true },
  { src: "/media/hero-poster.jpg", title: "Kitchen — design direction", cats: ["kitchens", "inspiration"], real: false },
  { src: "/media/shower-detail.jpg", title: "Marble-look tile, herringbone floor", cats: ["bathrooms"], real: true, tall: true },
  { src: "/media/svc-interior.jpg", title: "Stair & millwork — design direction", cats: ["interiors", "inspiration"], real: false },
  { src: "/media/kitchen-demo.jpg", title: "Demolition day — kitchen remodel", cats: ["process", "kitchens"], real: true, tall: true },
  { src: "/media/svc-exterior.jpg", title: "Exterior living — design direction", cats: ["exteriors", "inspiration"], real: false },
  { src: "/media/insp-1.jpg", title: "Open shelving — design direction", cats: ["kitchens", "inspiration"], real: false, tall: true },
  { src: "/media/insp-2.jpg", title: "Vanity detail — design direction", cats: ["bathrooms", "inspiration"], real: false, tall: true },
  { src: "/media/insp-3.jpg", title: "Plaster fireplace — design direction", cats: ["interiors", "inspiration"], real: false, tall: true },
  { src: "/media/slide-living.jpg", title: "Open living — design direction", cats: ["interiors", "inspiration"], real: false },
];

export const FAQS = [
  {
    q: "What areas do you serve?",
    a: "Our primary service areas are the Inland Empire, Los Angeles County and the High Desert, along with surrounding Southern California communities. If you're not sure whether your neighborhood is covered, send us your city through the project inquiry form and we'll confirm quickly.",
  },
  {
    q: "What types of remodeling projects do you handle?",
    a: "Kitchens, bathrooms, full-home remodels, interior and exterior renovations, flooring, cabinets and countertops, painting, custom finish work, room additions and outdoor living spaces. If your project doesn't fit neatly into a category, ask — we handle general remodeling too.",
  },
  {
    q: "How does the remodeling process work?",
    a: "Four phases. Discover — we listen to your goals and walk the space. Plan — we develop the direction, scope and details together. Build — we execute with careful attention to quality. Refine — finishing details and a final walkthrough to make sure everything is right.",
  },
  {
    q: "How long does a remodel take?",
    a: "It depends on the size and scope of the project, the materials selected, structural changes, permits and inspections. Rather than promise a fixed timeline, we map out a realistic schedule for your specific project during planning.",
  },
  {
    q: "How much does a remodel cost?",
    a: "Every project is different — cost depends on scope, materials, design choices and structural requirements. The right first step is a project consultation: tell us what you're envisioning and we'll talk through what's possible for your budget.",
  },
  {
    q: "Can I remodel just one room?",
    a: "Yes. Single-room projects — a kitchen, a bathroom, a living space — are a core part of what we do, and they get the same attention to detail as a full-home transformation.",
  },
  {
    q: "Do you take on full-home remodels?",
    a: "Yes. Whole-home remodeling is one of our primary services — one coordinated vision carried through every space, from demolition to the final walkthrough.",
  },
  {
    q: "How do I get started?",
    a: "Start with the project inquiry form below — tell us your city, the type of project and what you're hoping to change. You can also text our AI project assistant anytime for quick questions.",
  },
];
