import { formatDate, formatTitle } from '@/lib/formatter';
import { FaNewspaper } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export const blogType = defineType({
  name: 'blog',
  title: 'Blogs',
  icon: FaNewspaper,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) =>
        rule.required().error(`Required to generate a page on the website`),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Blog Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Blog Cover Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      category: 'category.name',
      publishedAt: 'publishedAt',
      image: 'mainImage',
    },
    prepare({ title, author, category, publishedAt, image }) {
      const titleFormatted = title ? formatTitle(title) : 'Title not provided';
      const authorFormatted = author
        ? formatTitle(author)
        : 'Author name not provided';
      const categoryFormatted = category
        ? formatTitle(category)
        : 'Category not provided';
      const publishDate = publishedAt
        ? formatDate(publishedAt)
        : 'No published Date';

      return {
        title: `${titleFormatted} | Category: ${categoryFormatted}`,
        subtitle: `Author: ${authorFormatted} | Published: ${publishDate}`,
        media: image || FaNewspaper,
      };
    },
  },
});
