import { formatTitle } from '@/lib/formatter';
import { IoIosImage } from 'react-icons/io';
import { defineField, defineType } from 'sanity';

export const galleryType = defineType({
  name: 'gallery',
  title: 'Galleries',
  type: 'document',
  icon: IoIosImage,
  fields: [
    defineField({
      name: 'name',
      title: 'Gallery Name',
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
      name: 'mainImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'blockImage' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      image: 'mainImages.0.asset',
    },
    prepare({ name, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';

      return {
        title: nameFormatted,
        media: image || IoIosImage,
      };
    },
  },
});
