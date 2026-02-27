import { Outlet } from 'react-router-dom';

export default function ProfileLayout() {
  return (
    <div style={{ paddingTop: '32px', paddingBottom: '64px', minHeight: '600px' }}>
      <Outlet />
    </div>
  );
}
