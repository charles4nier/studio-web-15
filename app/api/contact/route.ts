import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_EMAIL } from '@shared/config/contact';

const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse expéditrice : à configurer dans Vercel (ex: noreply@studioweb15.fr si domaine vérifié)
// Sans domaine vérifié, Resend utilise onboarding@resend.dev en test
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Studio Web 15 <onboarding@resend.dev>';

export type ContactPayload = {
	name: string;
	email: string;
	message?: string;
	// Champs optionnels (formulaire tarifs / demande express)
	phone?: string;
	source?: string;
	packageName?: string;
	packagePrice?: string;
	packageCategory?: string;
	maintenance?: string;
	projectType?: string;
	budget?: string;
	timing?: string;
};

function buildEmailBody(data: ContactPayload): string {
	const lines: string[] = [
		`Nom / Entreprise : ${data.name}`,
		`Email : ${data.email}`,
		...(data.phone ? [`Téléphone : ${data.phone}`] : []),
		...(data.source ? [`Formulaire : ${data.source}`] : []),
		...(data.projectType ? [`Type de projet : ${data.projectType}`] : []),
		...(data.budget ? [`Budget : ${data.budget}`] : []),
		...(data.timing ? [`Délai : ${data.timing}`] : []),
		...(data.packageName ? [`Pack : ${data.packageCategory || ''} - ${data.packageName}`] : []),
		...(data.packagePrice ? [`Prix affiché : ${data.packagePrice}`] : []),
		...(data.maintenance ? [`Maintenance : ${data.maintenance}`] : []),
		'',
		...(data.message ? [`Message :\n${data.message}`] : [])
	];
	return lines.join('\n');
}

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as ContactPayload;
		const { name, email } = body;

		if (!name?.trim() || !email?.trim()) {
			return NextResponse.json(
				{ error: 'Nom et email requis.' },
				{ status: 400 }
			);
		}

		const subject = body.source
			? `[${body.source}] ${name}`
			: `[Contact] ${name}`;

		const { error } = await resend.emails.send({
			from: FROM_EMAIL,
			to: CONTACT_EMAIL,
			replyTo: email,
			subject,
			text: buildEmailBody(body)
		});

		if (error) {
			console.error('Resend error:', error);
			return NextResponse.json(
				{ error: "Échec de l'envoi du message." },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (e) {
		console.error('Contact API error:', e);
		return NextResponse.json(
			{ error: "Erreur serveur lors de l'envoi." },
			{ status: 500 }
		);
	}
}
