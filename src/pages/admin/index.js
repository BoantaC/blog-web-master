import React from 'react';

import {
  DELETE_ICON,
  EDIT_ICON,
  TITLE_MAIN_MENU_ICON,
} from '../../constants/icon';
import { BLOG_POSTS_TABLE_HEADERS } from './table-config';
import { ADMIN_MENU } from '../../constants/menu-options';

import MenuComponent from '../../components/generic-menu';
import Button from '../../components/button';
import AdminHeader from '../../components/admin-header-app';
import TableComponent from '../../components/table';

import './style.scss';

export const AdminPage = () => {
  const onEditBlog = (blog) => {
    console.log('Edit blog', blog);
  };

  const onDeleteBlog = (blog) => {
    console.log('Delete blog', blog);
  };

  const BLOG_TABLE_ACTIONS = [
    {
      title: 'Edit Blog',
      onClick: onEditBlog,
      icon: EDIT_ICON,
    },
    {
      title: 'Delete Blog',
      onClick: onDeleteBlog,
      icon: DELETE_ICON,
    },
  ];

  return (
    <div className="admin-container">
      <AdminHeader text="Admin page" icon={TITLE_MAIN_MENU_ICON} />
      <div className="managing-container">
        <MenuComponent menuClass="admin-menu" options={ADMIN_MENU} />
        <div className="admin-manage-posts">
          <div className="button-container">
            <Button
              href={'http://localhost:3000/admin/create'}
              secondary
              text="Add post"
            />
          </div>
          <div className="manage-posts-container">
            <TableComponent
              actions={BLOG_TABLE_ACTIONS}
              tableHeaders={BLOG_POSTS_TABLE_HEADERS}
              entities={CreateEditBlogsInformation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

const CreateEditBlogsInformation = [
  {
    title: 'Sed porttitor',
    description:
      'Phasellus ullamcorper ullamcorper turpis, id finibus diam. Sed porttitor metus eget leo iaculis interdum. Nulla et nibh eu ipsum placerat iaculis. Nunc tristique feugiat viverra. Sed ut sapien ut enim cursus laoreet. Nam sed turpis sed elit ultricies ornare. Aliquam ex risus, aliquam a pretium nec, iaculis eu lacus. Quisque tempor ex lacus, in commodo orci tristique sit amet. Vestibulum blandit ut ex commodo varius. Nunc sit amet tempus metus, ac ultrices nulla. Nulla nibh enim, placerat vel dictum a, sodales in dui. Donec consectetur felis id turpis iaculis, sed aliquam nibh lobortis. Ut pharetra ornare diam, eu gravida ipsum molestie ac.',
    id: 1,
  },
  {
    title: 'Interdum et malesuad',
    description:
      'Aenean ullamcorper ex non iaculis elementum. Donec sed finibus turpis, quis tempor dui. Donec gravida molestie augue, at hendrerit lectus interdum et. Proin pulvinar libero sit amet molestie commodo. Donec elit arcu, vulputate in elit eu, luctus ornare velit. Vestibulum quis accumsan metus. Proin pretium tellus vitae convallis interdum. Phasellus porta diam et ipsum sodales aliquet. Donec in magna tempus, interdum ipsum varius, dapibus est. Nulla nec nisi et velit aliquam sollicitudin eu nec erat. Nunc laoreet nec nisl facilisis blandit. Nulla mollis lorem ut turpis dapibus, id fermentum libero auctor.',
    id: 2,
  },
  {
    title: 'Aliquam varius est ',
    description:
      'Praesent ante orci, interdum ut enim vel, imperdiet commodo neque. Cras quis nibh volutpat, suscipit massa ac, ornare nunc. Etiam ullamcorper risus a lectus semper, sed euismod metus fermentum. Vivamus sed nunc cursus, mollis est a, ultricies turpis. Pellentesque elementum nisl id dolor ultrices vehicula. Morbi mollis porta finibus. Ut molestie posuere turpis, id faucibus tellus accumsan a. Vivamus non nisi id nunc volutpat vestibulum quis eu libero.',
    id: 3,
  },
  {
    title: 'Fusce ac nulla lacus. ',
    description:
      'Quisque viverra mauris eu massa semper varius. Pellentesque nibh urna, tincidunt eu turpis et, tempus finibus nibh. Nam facilisis lacus molestie mauris ultricies finibus. Sed ultrices ut risus semper tempor. Suspendisse tempor urna dui, sit amet lacinia erat dapibus eget. Nullam tortor dui, dictum eget lorem sed, tincidunt molestie elit. Morbi quam tortor, tempor nec erat a, consectetur condimentum mi. Morbi quis tempus tortor, eget pretium arcu.',
    id: 4,
  },
  {
    title: 'Donec dignissim ',
    description:
      'Nullam sodales lacinia lacus nec finibus. Donec quis elementum lectus. In hac habitasse platea dictumst. Nullam lacus sem, sodales quis ante eu, dictum tincidunt nunc. Sed lobortis mollis odio eu vehicula. Donec sem tortor, suscipit sed hendrerit a, tristique egestas dolor.',
    id: 5,
  },
  {
    title: 'Duis sit amet justo in velit ',
    description:
      'Morbi malesuada dui id eros vehicula varius. Duis congue velit justo, eu ultrices lacus fermentum quis. Sed imperdiet nisi at leo ultrices facilisis.',
    id: 6,
  },
  {
    title: 'Phasellus ac est augue.ci tincidunt suscipit.',
    description:
      'In varius, ex vel viverra dapibus, libero mauris volutpat nisl, sed rhoncus ante enim a diam. Fusce ut auctor ligula. Cras elementum, ipsum ut gravida commodo, purus ligula iaculis felis, a consectetur nisi leo nec odio.',
    id: 7,
  },
  {
    title: 'Duis venenatis dignissim dui, a sagitti',
    description:
      ' Nullam vitae ullamcorper nisl. Phasellus in rutrum ligula, sit amet suscipit elit. Aenean ultricies nulla vel orci posuere efficitur auctor non magna. Ut et viverra erat. Ut ipsum nunc, varius eget quam iaculis, ullamcorper facilisis est. Maecenas lacus neque, mattis eget feugiat a, tincidunt id lorem. Vivamus accumsan consectetur sodales. Praesent sollicitudin tincidunt pharetra.',
    id: 8,
  },
  {
    title: 'Sed sed massa quis augue aliquam preti',
    description:
      'Cras velit neque, tempor non lacinia id, interdum nec nisl. Quisque ut auctor urna. In aliquet sem eu orci ultricies efficitur. Phasellus erat nulla, varius a imperdiet vitae, molestie scelerisque quam. Etiam accumsan nisi luctus auctor maximus. Cras pharetra suscipit blandit. ',
    id: 9,
  },
  {
    title: 'Pellentesque gravida urna vel',
    description:
      'Nulla facilisi. Morbi lacinia lectus sed iaculis fermentum. Pellentesque eu sem porttitor, auctor justo et, molestie ipsum. Fusce vel lectus sit amet diam congue faucibus quis sit amet urna. Aliquam eleifend vestibulum tempor. Ut fringilla tortor purus, ut suscipit arcu dapibus sit amet.',
    id: 10,
  },
  {
    title: 'Pellentesque nec neque pharetra,bulumgiunc',
    description:
      ' Vivamus id massa ut enim sagittis posuere dictum non neque. Etiam condimentum, velit vel egestas dictum, nunc mauris posuere mauris, non luctus ipsum leo nec tortor. Integer ipsum est, vulputate at hendrerit id, vehicula eu libero. Praesent consectetur ut sem eget placerat',
    id: 11,
  },
];
