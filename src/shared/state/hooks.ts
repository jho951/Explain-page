import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/shared/state/store.types';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
