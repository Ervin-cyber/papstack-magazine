import { defineField, defineType } from 'sanity'

export const postType = defineType({//document schema type
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'category' }
        }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
    }),
    defineField({
      name: 'aiSummary',
      title: 'AI Summary (GEO)',
      description: 'A short, to the point summary for AI search engines (ChatGPT, Perplexity) and Google Snippets.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: "block" }, // Block type for regular text (paragraphs, headings, etc.)
        {
          type: "image", fields: [{
            name: "caption",
            title: "Caption",
            type: "string",
            description: "Description of the image",
          }]
        }, // Image type for inserting images
      ],
    }),
  ],
})