const makeCommonConstant = (type: string) => ({
  BEGIN: type.concat('_BEGIN'),
  SUCCESS: type.concat('_SUCCESS'),
  FAILURE: type.concat('_FAILURE'),
})

export const AUTHENTICATION = makeCommonConstant('AUTHENTICATION')
