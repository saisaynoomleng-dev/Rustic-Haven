import { formatTitle } from '@/lib/formatter';
import { MdHomeWork } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const neighborhoodType = defineType({
  name: 'neighborhood',
  title: 'Neighborhoods',
  icon: MdHomeWork,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Neighborhood Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Neighborhood Type',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'minsWalk',
      title: 'Walking Duration',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      minsWalk: 'minsWalk',
      image: 'mainImage',
      type: 'type',
    },
    prepare({ name, minsWalk, image, type }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const typeFormatted = type ? formatTitle(type) : 'Type not provided';

      return {
        title: `${nameFormatted}`,
        subtitle: `Type: ${typeFormatted} | Duration: ${minsWalk}`,
        media: image || MdHomeWork,
      };
    },
  },
});
