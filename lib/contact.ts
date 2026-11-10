import { siteConfig } from "@/lib/siteConfig";

/**
 * Contact-link helpers. Every WhatsApp / email CTA should build its link here
 * so the number lives in siteConfig only and the opening message names the page
 * the visitor was reading — the team then knows what the enquiry is about
 * without asking.
 */

const topics: Array<[RegExp, string]> = [
  [/^\/same-day-agra-tour-from-delhi/, "a same-day Agra and Taj Mahal tour from Delhi"],
  [/^\/taj-mahal-sunrise-tour/, "a Taj Mahal sunrise tour"],
  [/^\/delhi-to-agra-tour/, "a Delhi to Agra tour"],
  [/^\/jaipur-to-agra-tour/, "a Jaipur to Agra tour"],
  [/^\/rajasthan-golden-triangle-tour/, "a Rajasthan and Golden Triangle tour"],
  [/^\/golden-triangle/, "a Golden Triangle tour (Delhi, Agra, Jaipur)"],
  [/^\/private-vs-group-tour/, "a private Golden Triangle tour"],
  [/^\/taj-mahal/, "a Taj Mahal visit with a guide"],
  [/^\/agra-tour-guide/, "a tour guide in Agra"],
  [/^\/delhi-tour-guide/, "a tour guide in Delhi"],
  [/^\/jaipur-tour-guide/, "a tour guide in Jaipur"],
  [/^\/(guide-booking|guide)(\/|$)/, "booking a tour guide"],
  [/^\/agra-tours/, "a tour in Agra"],
  [/^\/delhi-tours/, "a tour in Delhi"],
  [/^\/jaipur-tours/, "a tour in Jaipur"],
];

/** Opening WhatsApp / email line for the page the visitor is on. */
export const enquiryMessage = (pathname: string | null | undefined): string => {
  const path = pathname || "/";
  const hit = topics.find(([re]) => re.test(path));
  const topic = hit ? hit[1] : "a private tour in India";
  return `Hello Guide India Tours, I am interested in ${topic}. My dates and group size are: `;
};

export const whatsappLink = (text: string): string =>
  `${siteConfig.whatsappHref}?text=${encodeURIComponent(text)}`;

export const emailLink = (subject: string, body = ""): string =>
  `${siteConfig.mailtoHref}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
