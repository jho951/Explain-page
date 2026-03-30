import { requestGatewayJson } from '@/shared/lib';
import type { PermissionMeResponse } from '@/shared/api/permission.types';

const fetchMyPermissions = async () =>
  requestGatewayJson<PermissionMeResponse>('/permissions/me', {
    method: 'GET',
  });

export { fetchMyPermissions };
