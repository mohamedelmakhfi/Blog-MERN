class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

module.exports = HttpError;

//ce fichier définit une classe HttpError pour créer des instances d'erreurs personnalisées associées à des codes d'erreur HTTP spécifiques, ce qui peut être utile pour gérer et signaler des erreurs HTTP dans une application Node.js.
