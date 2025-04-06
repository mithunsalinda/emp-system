import { message, Modal } from 'antd';
export const confirmAndDeleteEmployee = (id: string, deleteFn: any) => {
  Modal.confirm({
    title: 'Delete Employee',
    content: 'Are you sure?',
    okType: 'danger',
    onOk: async () => {
      try {
        await deleteFn(id).unwrap();
        message.success('Deleted!');
      } catch (err) {
        message.error('Failed to delete');
      }
    },
  });
};
