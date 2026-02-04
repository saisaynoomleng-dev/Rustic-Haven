import { formatTitle } from '@/lib/formatter';
import { FaHouseUser } from 'react-icons/fa';
import { defineField, defineType } from 'sanity';

export const employeeType = defineType({
  name: 'employee',
  title: 'Employees',
  icon: FaHouseUser,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Employee Name',
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
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Bio',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Employee Image',
      type: 'blockImage',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      role: 'role',
      image: 'mainImage',
    },
    prepare({ name, role, image }) {
      const nameFormatted = name ? formatTitle(name) : 'Name not provided';
      const roleFromatted = role ? formatTitle(role) : 'Role not provided';

      return {
        title: nameFormatted,
        subtitle: `Position: ${roleFromatted}`,
        media: image || FaHouseUser,
      };
    },
  },
});
