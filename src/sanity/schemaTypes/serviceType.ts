import { formatPrice, formatTitle } from '@/lib/formatter';
import { MdOutlineLocalLaundryService } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const serviceType = defineType({
  name: 'service',
  title: 'Services',
  icon: MdOutlineLocalLaundryService,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
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
      name: 'pricePerMonth',
      title: 'Price Per Month',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Service Description',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Service Photo',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      pricePerMonth: 'pricePerMonth',
      image: 'mainImage',
    },
    prepare({ name, pricePerMonth, image }) {
      const nameFormatted = name
        ? formatTitle(name)
        : 'Service name not provided';
      const priceFormatted = pricePerMonth
        ? formatPrice(pricePerMonth)
        : 'Price not provided';

      return {
        title: nameFormatted,
        subtitle: `Price: ${priceFormatted}`,
        media: image || MdOutlineLocalLaundryService,
      };
    },
  },
});
