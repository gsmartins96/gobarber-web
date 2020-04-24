import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import {
  updateProfileSuccess,
  updateProfileFailure,
} from '~/store/modules/user/actions';

export function* updateProfile({ payload }) {
  try {
    const { nome, email, avatar_id, ...rest } = payload.data;
    const profile = Object.assign(
      { nome, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);
    toast.success('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar seus dados');

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
