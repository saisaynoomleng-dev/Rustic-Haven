import { BsBuilding } from 'react-icons/bs';
import {
  FaCalendar,
  FaHouseUser,
  FaNewspaper,
  FaPenNib,
  FaSwimmingPool,
} from 'react-icons/fa';
import { IoIosImages } from 'react-icons/io';
import {
  MdBedroomParent,
  MdCategory,
  MdHomeWork,
  MdOutlineLocalLaundryService,
} from 'react-icons/md';
import type { StructureResolver } from 'sanity/structure';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Rustic Haven')
    .items([
      S.divider().title('Management'),
      S.documentTypeListItem('unit').title('Units').icon(MdBedroomParent),
      S.documentTypeListItem('floorPlan').title('Floor Plans').icon(BsBuilding),
      S.documentTypeListItem('amenity').title('Amenities').icon(FaSwimmingPool),
      S.documentTypeListItem('event').title('Events').icon(FaCalendar),
      S.documentTypeListItem('neighborhood')
        .title('Neighborhoods')
        .icon(MdHomeWork),
      S.documentTypeListItem('employee')
        .title('Team Members')
        .icon(FaHouseUser),
      S.documentTypeListItem('service')
        .title('Services')
        .icon(MdOutlineLocalLaundryService),

      S.divider().title('Marketing'),
      S.documentTypeListItem('gallery').title('Galleries').icon(IoIosImages),
      S.documentTypeListItem('blog').title('Blogs').icon(FaNewspaper),
      S.documentTypeListItem('category').title('Categories').icon(MdCategory),
      S.documentTypeListItem('author').title('Authors').icon(FaPenNib),
    ]);
