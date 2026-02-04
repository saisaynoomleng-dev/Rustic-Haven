import { formatTitle } from '@/lib/formatter';
import { FaSwimmingPool } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export const amenityType = defineType({
  name: 'amenity',
  title: 'Amenities',
  icon: FaSwimmingPool,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Amenity Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'floor',
      title: 'Floor Level',
      type: 'string',
      options: {
        list: [
          { title: 'Level 7', value: 'level-9' },
          { title: 'Level 7', value: 'level-10' },
          { title: 'Level 7', value: 'level-11' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Amenity Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      floor: 'floor',
      image: 'mainImage',
    },
    prepare({ name, floor, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const floorFormatted = floor
        ? formatTitle(floor)
        : 'Floor Level Not provided';

      return {
        title: nameFormatted,
        subtitle: `Floor: ${floorFormatted}`,
        media: image || FaSwimmingPool,
      };
    },
  },
});
