import { formatTitle } from '@/lib/formatter';
import { BsBuilding } from 'react-icons/bs';
import { defineField, defineType } from 'sanity';

export const floorPlanType = defineType({
  name: 'floorPlan',
  title: 'FloorPlan',
  type: 'document',
  icon: BsBuilding,
  fields: [
    defineField({
      name: 'name',
      title: 'Floor Plan Name',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .min(5)
          .info(`Floor Plan name must have at least 5 characters`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'body',
      title: 'Floor Plan Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Floor Plan Image',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImage',
    },
    prepare({ name, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';

      return {
        title: nameFormatted,
        media: image || BsBuilding,
      };
    },
  },
});
