import { formatTitle } from '@/lib/formatter';
import { MdCategory } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Categories',
  type: 'document',
  icon: MdCategory,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (rule) => rule.required(),
      options: {
        source: 'name',
      },
    }),
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare({ name }) {
      const namefFormatted = name ? formatTitle(name) : 'Name not provided';

      return {
        title: namefFormatted,
        media: MdCategory,
      };
    },
  },
});
