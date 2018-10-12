import { withSaga } from '../dist/bundle'

// import { sagaGenesis } from '../dist/bundle'
// import { withSaga } from '../dist/bundle'

describe('importExport', () => {
  it('should find withSaga', () => {
    console.log(withSaga)
    expect(withSaga).toEqual({})
  })
})
