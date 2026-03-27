import { requestGatewayJson } from '@/libs/api-client';

interface PermissionMeResponse {
  permissions: string[];
}

const fetchMyPermissions = async () =>
  requestGatewayJson<PermissionMeResponse>('/permissions/me', {
    method: 'GET',
  });

export { fetchMyPermissions };
