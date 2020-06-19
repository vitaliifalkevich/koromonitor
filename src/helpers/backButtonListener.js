const backHomeListener = (
  event,
  history,
  changeActivePage,
  countryName = undefined,
  countriesToFollow = undefined
) => {
  if (event.keyName === 'back') {
    if (countryName) {
      history.push(`/country/${countryName}`);
      changeActivePage(
        countriesToFollow.findIndex(item => item === countryName)
      );
    } else {
      history.push(`/`);
      changeActivePage(0);
    }
  }
};

export default backHomeListener;
