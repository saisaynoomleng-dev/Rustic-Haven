import {
  formatDateTime,
  formatPrice,
  formatTitle,
  formatUpperCase,
} from '@/lib/formatter';
import { FaCalendar } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export const eventType = defineType({
  name: 'event',
  title: 'Events',
  icon: FaCalendar,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Event Name',
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
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Paid', value: 'paid' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Event Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Event Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      eventDate: 'eventDate',
      image: 'mainImage',
      type: 'type',
      price: 'price',
    },
    prepare({ name, eventDate, image, price, type }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const priceFormatted = price ? formatPrice(price) : 'Price not provided';
      const typeFormatted = type ? formatUpperCase(type) : 'Type not provided';
      const dateFormatted = eventDate
        ? formatDateTime(eventDate)
        : 'Date not confirmed yet';

      return {
        title: `${nameFormatted} | Type: ${typeFormatted}`,
        subtitle: `Price: ${priceFormatted} | Date: ${dateFormatted}`,
        media: image || FaCalendar,
      };
    },
  },
});
