import type { PermissionMeResponse } from '@/shared/api/permission.types';

const fetchMyPermissions = async (): Promise<PermissionMeResponse> => {
  throw new Error('Authz permission checks are internal-only through Gateway admin precheck.');
};

export { fetchMyPermissions };
