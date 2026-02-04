import { type SchemaTypeDefinition } from 'sanity';
import { blockContentType } from './components/blockContent';
import { blockImage } from './components/blockImage';
import { unitType } from './unitType';
import { floorPlanType } from './floorPlanType';
import { galleryType } from './galleryType';
import { authorType } from './authorType';
import { categoryType } from './categoryType';
import { blogType } from './blogType';
import { amenityType } from './amenityType';
import { neighborhoodType } from './neighborhoodType';
import { employeeType } from './employeeType';
import { serviceType } from './serviceType';
import { eventType } from './eventType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    blockImage,
    unitType,
    floorPlanType,
    galleryType,
    authorType,
    categoryType,
    blogType,
    amenityType,
    neighborhoodType,
    employeeType,
    serviceType,
    eventType,
  ],
};
