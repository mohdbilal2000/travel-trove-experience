/**
 * Hand-written landing-page copy for multilingual tour-guide pages.
 * Targets "[language]-speaking guide in Agra / Golden Triangle" searches —
 * a real differentiator (our guides speak French, German, Italian & Spanish;
 * Japanese & Mandarin are arranged on request). Rendered by app/guide/[lang].
 *
 * Keep translations natural and truthful. fr/de/it/es/ru = guides available;
 * ja/zh/pt/ko/ms = arranged on request / interpreter. Have a native speaker
 * check headings and CTAs before relying on a language for paid traffic.
 */

export type GuideLang = {
    code: string;          // url + hreflang code
    htmlLang: string;      // <html lang> value
    hreflang?: string;     // hreflang value if it differs from `code` (e.g. zh -> zh-CN)
    guides: 'available' | 'on-request'; // truthful availability of a native-speaking guide
    label: string;         // native language name
    title: string;         // <title>
    description: string;   // meta description
    badge: string;
    heroTitle: string;
    heroHighlight: string;
    heroSub: string;
    directAnswer: string;
    includedHeading: string;
    included: string[];
    faqHeading: string;
    faq: { q: string; a: string }[];
    ctaHeading: string;
    ctaText: string;
    ctaBtn: string;
    altBtn: string;
    ratingLabel: string;   // "{count}" is replaced with the live review count
};

export const guideLangs: GuideLang[] = [
    {
        code: 'fr',
        htmlLang: 'fr',
        guides: 'available',
        label: 'Français',
        title: "Guide francophone à Agra & Triangle d'Or | Guide India Tours",
        description: "Guide touristique francophone agréé à Agra et pour le Triangle d'Or (Delhi, Agra, Jaipur). Taj Mahal, Fort d'Agra, visites privées. Noté 4,9/5 par plus de 400 voyageurs.",
        badge: 'Agra, Inde',
        heroTitle: 'Guide touristique',
        heroHighlight: 'francophone',
        heroSub: "Un guide privé agréé par l'État, parlant français, pour le Taj Mahal, le Fort d'Agra et tout le Triangle d'Or.",
        directAnswer: "Guide India Tours propose des guides privés francophones et agréés par le ministère du Tourisme à Agra et pour tout le Triangle d'Or (Delhi, Agra, Jaipur). Vous visitez le Taj Mahal, le Fort d'Agra et Fatehpur Sikri avec des explications claires en français, une voiture privée climatisée et un chauffeur. Noté 4,9/5 par plus de {count} voyageurs sur Google. Les circuits privés commencent à partir de 49 $ par personne. Le Taj Mahal est fermé le vendredi.",
        includedHeading: 'Ce qui est inclus',
        included: [
            'Guide privé agréé parlant français',
            'Voiture privée climatisée avec chauffeur',
            'Prise en charge et retour à l’hôtel',
            'Assistance 24h/24 et 7j/7 sur WhatsApp',
        ],
        faqHeading: 'Questions fréquentes',
        faq: [
            { q: 'Proposez-vous un guide parlant français à Agra ?', a: "Oui. Nous proposons des guides privés agréés parlant français pour le Taj Mahal, le Fort d'Agra et le Triangle d'Or. Précisez vos dates lors de votre demande." },
            { q: 'Combien coûte une visite privée ?', a: 'Une visite privée d’une journée à Agra commence à partir de 49 $ par personne. Contactez-nous sur WhatsApp pour un devis personnalisé.' },
        ],
        ctaHeading: 'Réservez un guide francophone',
        ctaText: "Indiquez-nous vos dates et vos centres d'intérêt — nous créerons un itinéraire privé sur mesure.",
        ctaBtn: 'Demander un devis',
        altBtn: 'Voir les circuits',
        ratingLabel: '4,9/5 · plus de {count} avis Google',
    },
    {
        code: 'es',
        htmlLang: 'es',
        guides: 'available',
        label: 'Español',
        title: 'Guía en español en Agra y el Triángulo de Oro | Guide India Tours',
        description: 'Guía turístico privado en español en Agra y el Triángulo de Oro (Delhi, Agra, Jaipur). Taj Mahal, Fuerte de Agra, visitas privadas. Valorado 4,9/5 por más de 400 viajeros.',
        badge: 'Agra, India',
        heroTitle: 'Guía turístico',
        heroHighlight: 'en español',
        heroSub: 'Un guía privado con licencia oficial, que habla español, para el Taj Mahal, el Fuerte de Agra y todo el Triángulo de Oro.',
        directAnswer: 'Guide India Tours ofrece guías privados en español con licencia del Ministerio de Turismo en Agra y en todo el Triángulo de Oro (Delhi, Agra, Jaipur). Visitarás el Taj Mahal, el Fuerte de Agra y Fatehpur Sikri con explicaciones claras en español, un coche privado con aire acondicionado y chófer. Valorado 4,9/5 por más de {count} viajeros en Google. Las visitas privadas empiezan desde 49 $ por persona. El Taj Mahal cierra los viernes.',
        includedHeading: 'Qué incluye',
        included: [
            'Guía privado con licencia que habla español',
            'Coche privado con aire acondicionado y chófer',
            'Recogida y regreso al hotel',
            'Asistencia 24/7 por WhatsApp',
        ],
        faqHeading: 'Preguntas frecuentes',
        faq: [
            { q: '¿Tienen guía que hable español en Agra?', a: 'Sí. Ofrecemos guías privados con licencia que hablan español para el Taj Mahal, el Fuerte de Agra y el Triángulo de Oro. Indícanos tus fechas al reservar.' },
            { q: '¿Cuánto cuesta una visita privada?', a: 'Una visita privada de un día en Agra empieza desde 49 $ por persona. Escríbenos por WhatsApp para un presupuesto personalizado.' },
        ],
        ctaHeading: 'Reserva un guía en español',
        ctaText: 'Dinos tus fechas e intereses y crearemos un itinerario privado a tu medida.',
        ctaBtn: 'Pedir presupuesto',
        altBtn: 'Ver los tours',
        ratingLabel: '4,9/5 · más de {count} reseñas en Google',
    },
    {
        code: 'de',
        htmlLang: 'de',
        guides: 'available',
        label: 'Deutsch',
        title: 'Deutschsprachiger Reiseführer in Agra & Goldenes Dreieck | Guide India Tours',
        description: 'Privater, lizenzierter deutschsprachiger Reiseführer in Agra und für das Goldene Dreieck (Delhi, Agra, Jaipur). Taj Mahal, Agra Fort, private Touren. 4,9/5 von über 400 Reisenden.',
        badge: 'Agra, Indien',
        heroTitle: 'Reiseführer auf',
        heroHighlight: 'Deutsch',
        heroSub: 'Ein privater, staatlich lizenzierter Guide, der Deutsch spricht, für das Taj Mahal, Agra Fort und das gesamte Goldene Dreieck.',
        directAnswer: 'Guide India Tours bietet private, vom Tourismusministerium lizenzierte deutschsprachige Reiseführer in Agra und im gesamten Goldenen Dreieck (Delhi, Agra, Jaipur). Sie besuchen das Taj Mahal, Agra Fort und Fatehpur Sikri mit klaren Erklärungen auf Deutsch, einem privaten klimatisierten Auto und Fahrer. Mit 4,9/5 von über {count} Reisenden auf Google bewertet. Private Touren ab 49 $ pro Person. Das Taj Mahal ist freitags geschlossen.',
        includedHeading: 'Inklusivleistungen',
        included: [
            'Privater lizenzierter Guide, der Deutsch spricht',
            'Privates klimatisiertes Auto mit Fahrer',
            'Abholung und Rückfahrt zum Hotel',
            '24/7-Unterstützung über WhatsApp',
        ],
        faqHeading: 'Häufige Fragen',
        faq: [
            { q: 'Bieten Sie einen deutschsprachigen Guide in Agra an?', a: 'Ja. Wir bieten private, lizenzierte deutschsprachige Guides für das Taj Mahal, Agra Fort und das Goldene Dreieck. Nennen Sie uns bei der Anfrage Ihre Reisedaten.' },
            { q: 'Was kostet eine private Tour?', a: 'Eine private Tagestour in Agra beginnt ab 49 $ pro Person. Schreiben Sie uns über WhatsApp für ein individuelles Angebot.' },
        ],
        ctaHeading: 'Buchen Sie einen deutschsprachigen Guide',
        ctaText: 'Nennen Sie uns Ihre Reisedaten und Interessen — wir erstellen eine private, maßgeschneiderte Route.',
        ctaBtn: 'Angebot anfordern',
        altBtn: 'Touren ansehen',
        ratingLabel: '4,9/5 · über {count} Google-Bewertungen',
    },
    {
        code: 'it',
        htmlLang: 'it',
        guides: 'available',
        label: 'Italiano',
        title: "Guida in italiano ad Agra e Triangolo d'Oro | Guide India Tours",
        description: "Guida turistica privata in italiano ad Agra e per il Triangolo d'Oro (Delhi, Agra, Jaipur). Taj Mahal, Forte di Agra, tour privati. Valutata 4,9/5 da oltre 400 viaggiatori.",
        badge: 'Agra, India',
        heroTitle: 'Guida turistica in',
        heroHighlight: 'italiano',
        heroSub: "Una guida privata con licenza statale, che parla italiano, per il Taj Mahal, il Forte di Agra e tutto il Triangolo d'Oro.",
        directAnswer: "Guide India Tours offre guide private in italiano con licenza del Ministero del Turismo ad Agra e in tutto il Triangolo d'Oro (Delhi, Agra, Jaipur). Visiterai il Taj Mahal, il Forte di Agra e Fatehpur Sikri con spiegazioni chiare in italiano, un'auto privata con aria condizionata e autista. Valutata 4,9/5 da oltre {count} viaggiatori su Google. I tour privati partono da 49 $ a persona. Il Taj Mahal è chiuso il venerdì.",
        includedHeading: 'Cosa è incluso',
        included: [
            'Guida privata con licenza che parla italiano',
            "Auto privata con aria condizionata e autista",
            "Prelievo e rientro in hotel",
            'Assistenza 24/7 su WhatsApp',
        ],
        faqHeading: 'Domande frequenti',
        faq: [
            { q: 'Avete una guida che parla italiano ad Agra?', a: 'Sì. Offriamo guide private con licenza che parlano italiano per il Taj Mahal, il Forte di Agra e il Triangolo d’Oro. Indicaci le tue date al momento della richiesta.' },
            { q: 'Quanto costa un tour privato?', a: 'Un tour privato di un giorno ad Agra parte da 49 $ a persona. Scrivici su WhatsApp per un preventivo personalizzato.' },
        ],
        ctaHeading: 'Prenota una guida in italiano',
        ctaText: 'Dicci le tue date e i tuoi interessi: creeremo un itinerario privato su misura.',
        ctaBtn: 'Richiedi un preventivo',
        altBtn: 'Vedi i tour',
        ratingLabel: '4,9/5 · oltre {count} recensioni Google',
    },
    {
        code: 'ja',
        htmlLang: 'ja',
        guides: 'on-request',
        label: '日本語',
        title: 'アグラ・ゴールデントライアングルの日本語ガイド | Guide India Tours',
        description: 'アグラとゴールデントライアングル（デリー・アグラ・ジャイプル）の日本語対応プライベートガイド。タージ・マハル、アグラ城。4.9/5、400人以上の口コミ。',
        badge: 'インド・アグラ',
        heroTitle: 'アグラの',
        heroHighlight: '日本語ガイド',
        heroSub: 'タージ・マハル、アグラ城、ゴールデントライアングルを巡る、政府公認のプライベートガイド（日本語対応はリクエストに応じて手配）。',
        directAnswer: 'Guide India Toursは、アグラおよびゴールデントライアングル（デリー・アグラ・ジャイプル）で、政府公認のプライベートガイドをご用意します。日本語対応のガイドまたは通訳はリクエストに応じて手配いたします。専用のエアコン付き車両とドライバーで、タージ・マハル、アグラ城、ファテープル・シークリーを巡ります。Googleで{count}人以上から4.9/5の評価。プライベートツアーは1人あたり49ドルから。タージ・マハルは金曜定休です。',
        includedHeading: '含まれるもの',
        included: [
            '政府公認のプライベートガイド（日本語はリクエストで手配）',
            '専用エアコン付き車両とドライバー',
            'ホテルの送迎',
            'WhatsAppで24時間サポート',
        ],
        faqHeading: 'よくある質問',
        faq: [
            { q: 'アグラで日本語ガイドをお願いできますか？', a: 'はい。リクエストに応じて、日本語対応のガイドまたは通訳を手配します。ご予約時に日程をお知らせください。' },
            { q: 'プライベートツアーの料金は？', a: 'アグラの1日プライベートツアーは1人あたり49ドルからです。WhatsAppでお見積もりをご依頼ください。' },
        ],
        ctaHeading: '日本語ガイドを予約',
        ctaText: 'ご希望の日程と関心をお知らせください。専用のプライベート旅程をお作りします。',
        ctaBtn: '見積もりを依頼',
        altBtn: 'ツアーを見る',
        ratingLabel: '4.9/5 · Google口コミ{count}件以上',
    },
    {
        code: 'zh',
        htmlLang: 'zh-CN',
        hreflang: 'zh-CN',
        guides: 'on-request',
        label: '中文',
        title: '阿格拉及金三角中文导游 | Guide India Tours',
        description: '阿格拉及金三角（德里、阿格拉、斋浦尔）中文私人导游。泰姬陵、阿格拉堡、私人游览。谷歌4.9/5，400多名旅客好评。',
        badge: '印度·阿格拉',
        heroTitle: '阿格拉',
        heroHighlight: '中文导游',
        heroSub: '政府持证私人导游，带您游览泰姬陵、阿格拉堡和整个金三角（中文导游或翻译可应要求安排）。',
        directAnswer: 'Guide India Tours 在阿格拉及整个金三角（德里、阿格拉、斋浦尔）提供政府持证的私人导游。中文导游或翻译可应要求安排。您将乘坐专属空调车辆，由司机陪同，游览泰姬陵、阿格拉堡和法塔赫布尔西格里。谷歌评分4.9/5，获{count}多名旅客好评。私人游览每人49美元起。泰姬陵每周五闭馆。',
        includedHeading: '包含内容',
        included: [
            '政府持证私人导游（中文可应要求安排）',
            '专属空调车辆及司机',
            '酒店接送',
            'WhatsApp 24小时支持',
        ],
        faqHeading: '常见问题',
        faq: [
            { q: '在阿格拉可以安排中文导游吗？', a: '可以。我们可应要求安排中文导游或翻译。预订时请告知您的日期。' },
            { q: '私人游览费用是多少？', a: '阿格拉一日私人游览每人49美元起。请通过 WhatsApp 联系我们获取报价。' },
        ],
        ctaHeading: '预订中文导游',
        ctaText: '告诉我们您的日期和兴趣，我们将为您定制专属行程。',
        ctaBtn: '获取报价',
        altBtn: '查看行程',
        ratingLabel: '4.9/5 · 超过 {count} 条谷歌评价',
    },
    {
        code: 'ru',
        htmlLang: 'ru',
        guides: 'available',
        label: 'Русский',
        title: 'Русскоязычный гид в Агре и Золотом треугольнике | Guide India Tours',
        description: 'Лицензированный русскоязычный частный гид в Агре и по Золотому треугольнику (Дели, Агра, Джайпур). Тадж-Махал, форт Агра, частные туры. Рейтинг 4,9/5, более 400 путешественников.',
        badge: 'Агра, Индия',
        heroTitle: 'Гид в Агре на',
        heroHighlight: 'русском языке',
        heroSub: 'Частный гид с государственной лицензией, говорящий по-русски, для Тадж-Махала, форта Агра и всего Золотого треугольника.',
        directAnswer: 'Guide India Tours предоставляет частных русскоязычных гидов с лицензией Министерства туризма в Агре и по всему Золотому треугольнику (Дели, Агра, Джайпур). Вы осмотрите Тадж-Махал, форт Агра и Фатехпур-Сикри с понятными объяснениями на русском языке, на частном автомобиле с кондиционером и с водителем. Рейтинг 4,9/5 по отзывам более {count} путешественников в Google. Частные туры — от 49 $ на человека. Тадж-Махал закрыт по пятницам.',
        includedHeading: 'Что включено',
        included: [
            'Частный лицензированный гид, говорящий по-русски',
            'Частный автомобиль с кондиционером и водитель',
            'Встреча и возвращение в отель',
            'Поддержка 24/7 в WhatsApp',
        ],
        faqHeading: 'Часто задаваемые вопросы',
        faq: [
            { q: 'Есть ли у вас русскоговорящий гид в Агре?', a: 'Да. Мы предоставляем частных лицензированных гидов, говорящих по-русски, для Тадж-Махала, форта Агра и Золотого треугольника. Укажите даты при запросе.' },
            { q: 'Сколько стоит частная экскурсия?', a: 'Частная однодневная экскурсия по Агре стоит от 49 $ на человека. Напишите нам в WhatsApp для индивидуального расчёта.' },
        ],
        ctaHeading: 'Закажите гида на русском языке',
        ctaText: 'Сообщите нам даты и интересы — мы составим индивидуальный частный маршрут.',
        ctaBtn: 'Запросить расчёт',
        altBtn: 'Смотреть туры',
        ratingLabel: '4,9/5 · более {count} отзывов в Google',
    },
    {
        code: 'pt',
        htmlLang: 'pt-BR',
        hreflang: 'pt',
        guides: 'on-request',
        label: 'Português',
        title: 'Guia em português em Agra e no Triângulo Dourado | Guide India Tours',
        description: 'Guia turístico privado licenciado em Agra e no Triângulo Dourado (Délhi, Agra, Jaipur). Taj Mahal, Forte de Agra, passeios privados. Nota 4,9/5 de mais de 400 viajantes. Guia em português sob solicitação.',
        badge: 'Agra, Índia',
        heroTitle: 'Guia turístico em',
        heroHighlight: 'português',
        heroSub: 'Um guia privado licenciado pelo governo para o Taj Mahal, o Forte de Agra e todo o Triângulo Dourado (guia ou intérprete em português organizado sob solicitação).',
        directAnswer: 'A Guide India Tours oferece guias privados licenciados pelo Ministério do Turismo em Agra e em todo o Triângulo Dourado (Délhi, Agra, Jaipur). Um guia ou intérprete em português é organizado sob solicitação. Você visita o Taj Mahal, o Forte de Agra e Fatehpur Sikri com carro privado com ar-condicionado e motorista. Nota 4,9/5 de mais de {count} viajantes no Google. Os passeios privados começam em US$ 49 por pessoa. O Taj Mahal fecha às sextas-feiras.',
        includedHeading: 'O que está incluído',
        included: [
            'Guia privado licenciado (português sob solicitação)',
            'Carro privado com ar-condicionado e motorista',
            'Busca e retorno ao hotel',
            'Suporte 24 horas por WhatsApp',
        ],
        faqHeading: 'Perguntas frequentes',
        faq: [
            { q: 'Vocês têm guia que fala português em Agra?', a: 'Organizamos um guia ou intérprete em português sob solicitação. Informe suas datas ao fazer o pedido.' },
            { q: 'Quanto custa um passeio privado?', a: 'Um passeio privado de um dia em Agra começa em US$ 49 por pessoa. Fale conosco pelo WhatsApp para um orçamento personalizado.' },
        ],
        ctaHeading: 'Reserve um guia em português',
        ctaText: 'Diga-nos suas datas e seus interesses — criaremos um roteiro privado sob medida.',
        ctaBtn: 'Pedir orçamento',
        altBtn: 'Ver passeios',
        ratingLabel: '4,9/5 · mais de {count} avaliações no Google',
    },
    {
        code: 'ko',
        htmlLang: 'ko',
        guides: 'on-request',
        label: '한국어',
        title: '아그라 및 골든 트라이앵글 한국어 가이드 | Guide India Tours',
        description: '아그라와 골든 트라이앵글(델리·아그라·자이푸르) 한국어 프라이빗 가이드. 타지마할, 아그라 성, 프라이빗 투어. 구글 4.9/5, 400명 이상의 후기. 한국어 가이드·통역은 요청 시 준비해 드립니다.',
        badge: '인도·아그라',
        heroTitle: '아그라',
        heroHighlight: '한국어 가이드',
        heroSub: '타지마할, 아그라 성, 골든 트라이앵글을 함께하는 정부 공인 프라이빗 가이드 (한국어 가이드 또는 통역은 요청 시 준비).',
        directAnswer: 'Guide India Tours는 아그라와 골든 트라이앵글(델리·아그라·자이푸르)에서 정부 공인 프라이빗 가이드를 제공합니다. 한국어 가이드 또는 통역은 요청 시 준비해 드립니다. 전용 에어컨 차량과 기사와 함께 타지마할, 아그라 성, 파테푸르 시크리를 둘러보실 수 있습니다. 구글에서 {count}명 이상의 여행자로부터 4.9/5 평점을 받았습니다. 프라이빗 투어는 1인당 49달러부터입니다. 타지마할은 금요일에 휴관합니다.',
        includedHeading: '포함 사항',
        included: [
            '정부 공인 프라이빗 가이드 (한국어는 요청 시 준비)',
            '전용 에어컨 차량 및 기사',
            '호텔 픽업 및 드롭',
            'WhatsApp 24시간 지원',
        ],
        faqHeading: '자주 묻는 질문',
        faq: [
            { q: '아그라에서 한국어 가이드를 이용할 수 있나요?', a: '네. 요청 시 한국어 가이드 또는 통역을 준비해 드립니다. 예약 시 일정을 알려 주세요.' },
            { q: '프라이빗 투어 요금은 얼마인가요?', a: '아그라 1일 프라이빗 투어는 1인당 49달러부터입니다. WhatsApp으로 맞춤 견적을 문의해 주세요.' },
        ],
        ctaHeading: '한국어 가이드 예약',
        ctaText: '원하는 일정과 관심사를 알려 주세요. 맞춤 프라이빗 일정을 만들어 드립니다.',
        ctaBtn: '견적 요청',
        altBtn: '투어 보기',
        ratingLabel: '4.9/5 · 구글 후기 {count}개 이상',
    },
    {
        code: 'ms',
        htmlLang: 'ms',
        guides: 'on-request',
        label: 'Bahasa Melayu',
        title: 'Pemandu pelancong Bahasa Melayu di Agra & Segi Tiga Emas | Guide India Tours',
        description: 'Pemandu pelancong peribadi berlesen di Agra dan Segi Tiga Emas (Delhi, Agra, Jaipur). Taj Mahal, Kubu Agra, lawatan persendirian. Penilaian 4.9/5 daripada 400+ pelancong. Pemandu atau jurubahasa Bahasa Melayu diatur atas permintaan.',
        badge: 'Agra, India',
        heroTitle: 'Pemandu pelancong',
        heroHighlight: 'Bahasa Melayu',
        heroSub: 'Pemandu peribadi berlesen kerajaan untuk Taj Mahal, Kubu Agra dan seluruh Segi Tiga Emas (pemandu atau jurubahasa Bahasa Melayu diatur atas permintaan).',
        directAnswer: 'Guide India Tours menyediakan pemandu peribadi berlesen Kementerian Pelancongan di Agra dan seluruh Segi Tiga Emas (Delhi, Agra, Jaipur). Pemandu atau jurubahasa Bahasa Melayu diatur atas permintaan. Anda akan melawat Taj Mahal, Kubu Agra dan Fatehpur Sikri dengan kenderaan persendirian berhawa dingin dan pemandu. Dinilai 4.9/5 oleh lebih {count} pelancong di Google. Lawatan persendirian bermula dari USD 49 seorang. Taj Mahal ditutup pada hari Jumaat.',
        includedHeading: 'Apa yang termasuk',
        included: [
            'Pemandu peribadi berlesen (Bahasa Melayu atas permintaan)',
            'Kenderaan persendirian berhawa dingin dengan pemandu',
            'Ambil dan hantar di hotel',
            'Sokongan WhatsApp 24 jam',
        ],
        faqHeading: 'Soalan lazim',
        faq: [
            { q: 'Adakah anda ada pemandu Bahasa Melayu di Agra?', a: 'Kami mengatur pemandu atau jurubahasa Bahasa Melayu atas permintaan. Sila nyatakan tarikh anda semasa membuat permintaan.' },
            { q: 'Berapakah kos lawatan persendirian?', a: 'Lawatan persendirian sehari di Agra bermula dari USD 49 seorang. Hubungi kami melalui WhatsApp untuk sebut harga yang disesuaikan.' },
        ],
        ctaHeading: 'Tempah pemandu Bahasa Melayu',
        ctaText: 'Beritahu kami tarikh dan minat anda — kami akan sediakan itinerari persendirian mengikut citarasa anda.',
        ctaBtn: 'Minta sebut harga',
        altBtn: 'Lihat lawatan',
        ratingLabel: '4.9/5 · lebih {count} ulasan Google',
    },
];

export const getGuideLang = (code: string) => guideLangs.find((l) => l.code === code);
