import { z } from "astro/zod";
import homeJson from "../data/home.json";
import navigationJson from "../data/navigation.json";
import siteJson from "../data/site.json";

const linkSchema = z.object({
  label: z.string().trim().min(1).max(80),
  href: z.string().trim().min(1),
});

const siteSchema = z.object({
  name: z.string().trim().min(2),
  shortName: z.string().trim().min(1).max(8),
  canonicalUrl: z.url(),
  defaultTitle: z.string().trim().min(10).max(80),
  defaultDescription: z.string().trim().min(40).max(180),
  email: z.union([z.email(), z.literal("")]),
  location: z.string().trim().max(120),
  availability: z.string().trim().max(160),
  socials: z.object({
    github: z.union([z.url(), z.literal("")]),
    linkedin: z.union([z.url(), z.literal("")]),
  }),
  resumePath: z.string(),
  defaultSocialImage: z.string(),
  copyrightStartYear: z.number().int().min(2000).max(2100),
});

const homeSchema = z.object({
  hero: z.object({
    name: z.string().trim().min(2),
    headline: z.string().trim().min(2).max(80),
    supportingText: z.string().trim().min(20).max(240),
    handwrittenWord: z.string().trim().min(2).max(40),
    primaryAction: linkSchema,
    secondaryAction: linkSchema,
  }),
  selectedWorkLimit: z.number().int().min(1).max(12),
  currentFocus: z.array(z.string().trim().min(2).max(120)).max(6),
  aboutSummary: z.string().trim().min(40).max(700),
  closingStatement: z.string().trim().min(20).max(300),
});

const navigationSchema = z.object({
  primary: z.array(linkSchema).min(1),
  footer: z.array(linkSchema),
});

export const site = siteSchema.parse(siteJson);
export const home = homeSchema.parse(homeJson);
export const navigation = navigationSchema.parse(navigationJson);
