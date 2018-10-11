export default function (state, {type, accounts}) {
  if (typeof state === 'undefined') {
    state = []
  }

  switch (type) {
    case 'WEB3_ACCOUNTS':
      state = accounts
      break

    // no default
  }

  return state
}
