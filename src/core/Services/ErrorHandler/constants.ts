import i18n from '../../Localisation/i18n'

export const Errors = {
    Unauthenticated: 'Unauthenticated',
    NotFound: 'NotFound',
    UnknownError: 'UnknownError',
    ServerError: 'ServerError',
    RequestTimeout: 'RequestTimeout'
} as const

const defaultErrorMessage = {
    title: i18n.t('errors.error_messages.default.title'),
    message: i18n.t('errors.error_messages.default.message')
}

const unauthenticatedErrorMessage = {
    title: i18n.t('errors.error_messages.unauthenticated.title'),
    message: i18n.t('errors.error_messages.unauthenticated.message')
}

const emptyFields = i18n.t('errors.error_messages.emptyFields')
const passowordMisMatch = i18n.t('errors.error_messages.passowordMisMatch')

export const ErrorMessages = {
    default: defaultErrorMessage,
    unauthenticatedErrorMessage,
    emptyFields,
    passowordMisMatch
} as const