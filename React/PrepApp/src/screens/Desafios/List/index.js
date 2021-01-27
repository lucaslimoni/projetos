import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listChallenge } from '~/store/modules/desafio/actions';
import ListChallenge from '~/screens/Desafios/ListChallenge';
import { getPref, setPref } from '~/helpers/preferences';

export default function TabelaNaoAgendados(props) {
  const dispatch = useDispatch();
  const { search, status } = props;
  const { result } = useSelector(state => state.desafio);

  useEffect(() => {
    dispatch(
      listChallenge({ status, search, limit: getPref('page-limit', 20) })
    );
  }, [search]);

  const handleChangePage = page => {
    dispatch(
      listChallenge({
        status,
        search,
        page,
        limit: result.limit || getPref('page-limit', 20),
      })
    );
  };

  const handleChangeRowsPerPage = limit => {
    setPref('page-limit', limit);
    dispatch(listChallenge({ status, search, page: result.page || 1, limit }));
  };

  return (
    <ListChallenge
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      result={result}
    />
  );
}
