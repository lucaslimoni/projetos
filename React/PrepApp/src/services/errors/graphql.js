export default class GraphError extends Error {
  constructor({ message, code, validations, origin, tryAction }) {
    super(message);
    this.code = code;
    this.origin = origin;
    this.validations = validations || [];
    this.tryAction = tryAction || null;
  }

  static createError({ err, tryAction }) {
    if (err instanceof GraphError) {
      err.tryAction = tryAction;
      return err;
    } else {
      return new GraphError({
        message: err.message || 'Houve um erro desconhecido.',
        code: err.code,
        origin: 'UNKNOWN',
        tryAction,
      });
    }
  }
}
