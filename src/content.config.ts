import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { PROJECT_PAGE_KINDS, PROJECT_STATUSES } from "./lib/constants";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const partialDate = z.string().regex(/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/);

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/index.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string().trim().min(2).max(80),
      slug,
      projectCode: z.string().regex(/^BP-\d{2}$/),
      summary: z.string().trim().min(20).max(240),
      status: z.enum(PROJECT_STATUSES),
      kind: z.enum(["product", "research", "internal-tool", "hardware", "case-study"]),
      visibility: z.enum(["public", "case-study-only"]).default("public"),
      published: z.boolean().default(false),
      featured: z.boolean().default(false),
      needsReview: z.boolean().default(true),
      order: z.number().int().min(0).max(999),
      yearStart: z.number().int().min(2000).max(2100).optional(),
      yearEnd: z.number().int().min(2000).max(2100).optional(),
      role: z.string().trim().max(120).optional(),
      categories: z.array(z.string().trim().min(1)).default([]),
      technologies: z.array(z.string().trim().min(1)).default([]),
      shortProblem: z.string().trim().max(400).optional(),
      shortSolution: z.string().trim().max(400).optional(),
      features: z
        .array(
          z.object({
            title: z.string().trim().min(2).max(100),
            description: z.string().trim().min(10).max(500),
          }),
        )
        .default([]),
      architecture: z
        .array(
          z.object({
            label: z.string().trim().min(2).max(100),
            description: z.string().trim().min(10).max(500),
          }),
        )
        .default([]),
      outcomes: z.array(z.string().trim().min(2)).default([]),
      cover: z.object({ src: image(), alt: z.string().trim().min(5).max(180) }).optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().trim().min(5).max(180),
            caption: z.string().trim().max(240).optional(),
          }),
        )
        .default([]),
      links: z
        .object({
          live: z.url().optional(),
          repository: z.url().optional(),
          demo: z.url().optional(),
          video: z.url().optional(),
        })
        .default({}),
      accent: z.enum(["blue", "lime", "amber", "violet", "neutral"]).default("blue"),
      seo: z.object({
        title: z.string().trim().max(65).optional(),
        description: z.string().trim().min(40).max(170),
        image: image().optional(),
        noindex: z.boolean().default(false),
      }),
      appStore: z
        .object({
          candidate: z.boolean().default(false),
          accountCreation: z.boolean().default(false),
          userGeneratedContent: z.boolean().default(false),
          inPersonMeetups: z.boolean().default(false),
          processesSensitiveInformation: z.boolean().default(false),
          supportEmail: z.email().optional(),
          legalReady: z.boolean().default(false),
          appStoreUrl: z.url().optional(),
        })
        .optional(),
    }),
});

const projectPages = defineCollection({
  loader: glob({ base: "./src/content/project-pages", pattern: "**/*.md" }),
  schema: z.object({
    projectSlug: slug,
    pageSlug: slug,
    kind: z.enum(PROJECT_PAGE_KINDS),
    title: z.string().trim().min(2).max(120),
    summary: z.string().trim().min(20).max(240),
    status: z.enum(["draft", "review", "published"]).default("draft"),
    effectiveDate: date.optional(),
    lastUpdated: date.optional(),
    contactEmail: z.email().optional(),
    robots: z.enum(["index", "noindex"]).default("index"),
    readiness: z
      .object({
        factualReviewComplete: z.boolean().default(false),
        dataInventoryComplete: z.boolean().default(false),
        processorInventoryComplete: z.boolean().default(false),
        retentionReviewComplete: z.boolean().default(false),
        deletionReviewComplete: z.boolean().default(false),
      })
      .default({
        factualReviewComplete: false,
        dataInventoryComplete: false,
        processorInventoryComplete: false,
        retentionReviewComplete: false,
        deletionReviewComplete: false,
      }),
    seo: z.object({
      title: z.string().trim().max(65).optional(),
      description: z.string().trim().min(40).max(170),
    }),
  }),
});

const datedRecord = {
  startDate: partialDate.optional(),
  endDate: partialDate.optional(),
  current: z.boolean().default(false),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).max(999),
  published: z.boolean().default(false),
  needsReview: z.boolean().default(true),
};

const experience = defineCollection({
  loader: glob({ base: "./src/content/experience", pattern: "**/*.md" }),
  schema: z.object({
    organization: z.string().trim().min(2),
    role: z.string().trim().min(2),
    location: z.string().trim().optional(),
    summary: z.string().trim().min(20).max(400),
    highlights: z.array(z.string().trim().min(2)).default([]),
    technologies: z.array(z.string().trim().min(1)).default([]),
    ...datedRecord,
  }),
});

const education = defineCollection({
  loader: glob({ base: "./src/content/education", pattern: "**/*.md" }),
  schema: z.object({
    institution: z.string().trim().min(2),
    program: z.string().trim().min(2),
    field: z.string().trim().optional(),
    location: z.string().trim().optional(),
    highlights: z.array(z.string().trim().min(2)).default([]),
    ...datedRecord,
  }),
});

const credentials = defineCollection({
  loader: glob({ base: "./src/content/credentials", pattern: "**/*.md" }),
  schema: z.object({
    name: z.string().trim().min(2),
    issuer: z.string().trim().min(2),
    issueDate: date.optional(),
    expirationDate: date.optional(),
    credentialUrl: z.url().optional(),
    credentialId: z.string().trim().optional(),
    featured: z.boolean().default(false),
    order: z.number().int().min(0).max(999),
    published: z.boolean().default(false),
    needsReview: z.boolean().default(true),
  }),
});

const research = defineCollection({
  loader: glob({ base: "./src/content/research", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string().trim().min(2),
    organization: z.string().trim().min(2),
    role: z.string().trim().min(2),
    summary: z.string().trim().min(20).max(400),
    topics: z.array(z.string().trim().min(1)).default([]),
    links: z.array(z.url()).default([]),
    ...datedRecord,
  }),
});

export const collections = { projects, projectPages, experience, education, credentials, research };
