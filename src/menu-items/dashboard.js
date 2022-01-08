// assets
import { IconDashboard, IconAccessible } from '@tabler/icons';

// constant
const icons = { IconDashboard, IconAccessible };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: true
        },
        {
            id: 'movie',
            title: 'Movies',
            type: 'item',
            url: '/movies',
            icon: icons.IconAccessible,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
