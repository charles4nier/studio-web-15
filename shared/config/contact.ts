// Email affiché partout sur le site (footer, page contact, etc.)
export const CONTACT_EMAIL = 'contact@studioweb15.fr';

// Destinataire réel des formulaires : override via CONTACT_EMAIL_DESTINATION pour recevoir sur Gmail
export const getContactDestination = (): string =>
	process.env.CONTACT_EMAIL_DESTINATION || CONTACT_EMAIL;
