import Section from "../components/Section";

const ContactDetails = () => (
	<address className="not-italic text-gray-700 leading-relaxed">
		Harlekids e.V.
		<br />
		Briesker Straße 134
		<br />
		01968 Senftenberg
		<br />
		Telefon: <a className="text-circus-red hover:underline" href="tel:+493573148181">03573 / 148181</a>
		<br />
		Fax: 03573 / 148161
		<br />
		E-Mail: <a className="text-circus-red hover:underline" href="mailto:info@zpz-harlekids.de">info@zpz-harlekids.de</a>
	</address>
);

export const Impressum = () => (
	<Section title="Impressum" subtitle="Anbieterkennzeichnung">
		<div className="max-w-3xl mx-auto space-y-8 text-gray-700">
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-3">Angaben gemäß § 5 DDG</h2>
				<ContactDetails />
			</div>
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-3">Registerangaben</h2>
				<p>Vereinsregister: Amtsgericht Senftenberg, VR 829</p>
				<p>Umsatzsteuer-ID: DE 231 521 824</p>
			</div>
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-3">Hinweis zu externen Links</h2>
				<p>Für Inhalte externer Seiten sind deren jeweilige Betreiber verantwortlich.</p>
			</div>
		</div>
	</Section>
);

export const Datenschutz = () => (
	<Section title="Datenschutz" subtitle="Informationen zur Datenverarbeitung">
		<div className="max-w-3xl mx-auto space-y-8 text-gray-700 leading-relaxed">
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-3">Verantwortlich</h2>
				<ContactDetails />
			</div>
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-3">Kontaktformular</h2>
				<p>
					Wenn Sie das Kontaktformular verwenden, verarbeiten wir Ihren Namen,
					Ihre E-Mail-Adresse, die optional angegebene Telefonnummer, den Betreff
					und Ihre Nachricht, um Ihr Anliegen zu beantworten. Zur Abwehr von Spam
					wird außerdem die IP-Adresse verarbeitet. Die Verarbeitung erfolgt zur
					Bearbeitung Ihrer Anfrage; die Daten werden nicht für Werbung verwendet.
				</p>
			</div>
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-3">Keine Webanalyse</h2>
				<p>
					Diese Website verwendet kein Google Analytics und keine vergleichbaren
					Analyse- oder Trackingdienste.
				</p>
			</div>
			<div>
				<h2 className="text-2xl font-bold text-gray-900 mb-3">Ihre Rechte</h2>
				<p>
					Sie können Auskunft über Ihre gespeicherten personenbezogenen Daten,
					deren Berichtigung oder Löschung sowie die Einschränkung der
					Verarbeitung verlangen. Außerdem können Sie der Verarbeitung
					widersprechen und sich bei einer Datenschutzaufsichtsbehörde
					beschweren. Wenden Sie sich hierfür bitte an die oben genannten
					Kontaktdaten.
				</p>
			</div>
		</div>
	</Section>
);
