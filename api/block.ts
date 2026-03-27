import { requestGatewayJson } from '@/libs/api-client';

interface CreateBlockPayload {
  [key: string]: unknown;
}

const createBlock = async <TResponse>(payload: CreateBlockPayload) =>
  requestGatewayJson<TResponse>('/blocks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export { createBlock };
