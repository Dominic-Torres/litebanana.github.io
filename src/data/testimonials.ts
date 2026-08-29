// ---------------------------------------------------------------------------
// TESTIMONIALS DATA — quotes from professors, supervisors, teammates
// ---------------------------------------------------------------------------

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "Dominic consistently delivers high-quality work and brings a rare combination of technical skill and attention to detail. His QA testing caught issues that others missed.",
    name: "VetAssist Supervisor",
    role: "QA Team Lead",
  },
  {
    id: "testimonial-2",
    quote:
      "One of the most dedicated students I've worked with. Dominic's projects show real-world problem-solving, not just textbook solutions.",
    name: "CS Professor",
    role: "Lyceum of the Philippines University",
  },
  {
    id: "testimonial-3",
    quote:
      "Working with Dominic on group projects is always a plus. He communicates well, meets deadlines, and helps teammates when they're stuck.",
    name: "Teammate",
    role: "Project Collaborator",
  },
];
