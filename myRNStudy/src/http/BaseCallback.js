export default class BaseCallback<T> {
    onSuccess(result: T) {
    }

    onError(errCode: number, msg: String) {
    }
}