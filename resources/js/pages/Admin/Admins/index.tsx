import DataTable from '@/components/DataTables/DataTable';
import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Users } from 'lucide-react';

export default function index() {
    interface Filters {
        page: number;
        perPage: number;
        [key: string]: any;
    }

    const { admins, filters, can } = usePage().props;
    const columns = [
        {
            key: 'index',
            label: '#',
            sortable: false,
            type: 'IndexColumn',
            width: '80px',
            render: (item: any, index: number) => {
                const f = filters as Filters;
                return (f.page - 1) * f.perPage + index + 1;
            },
        },
        {
            key: 'avatar',
            label: 'Avatar',
            sortable: false,
            type: 'image',
            design: 'circle',
            render: (item: any) => (
                <img src={`/storage/avatars/${item.avatar}`} alt="Avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
            ),
        },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'phone', label: 'Phone', sortable: true },
        { key: 'created_at', type: 'date', label: 'Created At', sortable: true },
    ];

    const handleDelete = (id: string) => {
        router.delete(route('admin.users.destroy', id), {
            preserveScroll: true,
            onSuccess: () => {
                // toast.success('User deleted successfully');
            },
            onError: () => {
                // toast.error('User deletion failed');
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Admins" />
            <div className="py-6">
                <div className="mx-auto">
                    <DataTable
                        data={admins}
                        columns={columns}
                        resourceName="Admins"
                        singularName="Admin"
                        routeName="admin.admins.index"
                        filters={filters}
                        canViewResource={false}
                        canCreateResource={true}
                        canEditResource={true}
                        canDeleteResource={true}
                        createRoute="admin.admins.create"
                        viewRoute="admin.admins.show"
                        editRoute="admin.admins.edit"
                        onDelete={handleDelete}
                        icon={Users}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
