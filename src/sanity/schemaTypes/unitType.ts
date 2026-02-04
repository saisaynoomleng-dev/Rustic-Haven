import { formatPrice, formatTitle } from '@/lib/formatter';
import { MdBedroomParent } from 'react-icons/md';
import { defineField, defineType } from 'sanity';

export const unitType = defineType({
  name: 'unit',
  title: 'Units',
  icon: MdBedroomParent,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Unit Name',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .error(`Unit name must have at least 3 characters`)
          .min(3),
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
      name: 'floorPlan',
      title: 'Floor Plan',
      type: 'reference',
      to: [{ type: 'floorPlan' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'pricePerMonth',
      title: 'Price Per Month',
      type: 'number',
      validation: (rule) => rule.required().error(`Price is required`),
    }),
    defineField({
      name: 'sqFt',
      title: 'Square Feet',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bed',
      title: 'Number of Bedrooms',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bath',
      title: 'Number of Bathrooms',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isAvailable',
      title: 'Is the unit Available',
      type: 'boolean',
      validation: (rule) => rule.required(),
      initialValue: true,
    }),
    defineField({
      name: 'mainImages',
      title: 'Unit Images',
      type: 'array',
      of: [{ type: 'blockImage' }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      pricePerMonth: 'pricePerMonth',
      floorPlan: 'floorPlan.name',
      bath: 'bath',
      bed: 'bed',
      image: 'mainImages.0.asset',
      isAvailable: 'isAvailable',
    },
    prepare({ name, pricePerMonth, floorPlan, bath, bed, image, isAvailable }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const priceFormatted = pricePerMonth
        ? formatPrice(pricePerMonth)
        : 'Price not provided';
      const floorPlanFormatted = floorPlan
        ? formatTitle(floorPlan)
        : 'No floor plan';
      const availability = isAvailable ? 'Available' : 'Not Available';

      return {
        title: `${nameFormatted} | ${floorPlanFormatted}`,
        subtitle: `Bed: ${bed} | Bath: ${bath}| Price: ${priceFormatted} | ${availability}`,
        media: image || MdBedroomParent,
      };
    },
  },
});
