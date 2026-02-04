import { defineField, defineType } from 'sanity';

export const blockImage = defineType({
  name: 'blockImage',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative Text',
      type: 'string',
      validation: (rule) =>
        rule.required().info(`Alternative text is useful for accessibility`),
    }),
  ],
});
