import TextAccordion from "./TextAccordion.tsx";
import {HelperBox} from "./HelperBox.tsx";
import {useContext, useEffect, useMemo, useState} from "react";
import {aboutSourceContext, dateContext} from "../../components/Contexts.tsx";
import {getDateByID} from "../../components/Hooks.tsx";
import {Typography} from "@material-tailwind/react";

function scrollToView() {
    document.querySelector('#read_section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

}


const ReadSection: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const date = useContext(dateContext);
    const [aboutSource, setAboutSource] = useContext(aboutSourceContext);
    const events = useMemo(() => getDateByID(date)?.events, [date]);
    useEffect(() => {
        const cd = getDateByID(date);
        if (!events || !cd) return;
        if (aboutSource) setAboutSource(false);
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('id', cd.originalID().toString());
        window.history.replaceState('', document.title, `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`);
        setLoading(true);
        Promise.all(events.map(event => event.response()))
            .then(() => setTimeout(() => setLoading(false), 300));
    }, [date]);

    useEffect(() => {
        if (!events) return;
        scrollToView();
    }, [date, aboutSource]);

    return (
        <div className={'relative grid grid-rows-[auto_auto] grid-cols-1 md:grid-rows-none md:grid-cols-6 w-full'}>
            <div id={'read_section'} className={'md:col-span-2 row-span-1 text-center my-2 px-5'}>
                <HelperBox/>
            </div>
            <div className={'col-span-1 md:col-span-4 row-span-1 text-center min-h-[65vh] px-5'}>
                {loading ? (
                    <TextLoading/>
                ) : (
                    <TextAccordion
                        events={aboutSource ? Object.values(anotherData) : events}/>
                )}
            </div>
        </div>
    );
};

const TextLoading: React.FC = () => {
    return (
        <div className="max-w-full animate-pulse">
            <Typography
                placeholder={undefined}
                as="div"
                variant="h1"
                className="mb-4 h-5 w-11/12 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                placeholder={undefined}
                as="div"
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                placeholder={undefined}
                as="div"
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                placeholder={undefined}
                as="div"
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                placeholder={undefined}
                as="div"
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                placeholder={undefined}
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                placeholder={undefined}
                variant="paragraph"
                className="mb-2 h-3 rounded-full bg-gray-300"
            >
                &nbsp;
            </Typography>
        </div>
    );
};

const Resources = () => (
    <>
        <p>(tarih yok). 12 28, 2022 tarihinde&nbsp;<a
            href="https://trabzon.ktb.gov.tr/TR-57678/santa-maria-kilisesi.html" target="_blank"
            rel="noopener noreferrer">trabzon.ktb.gov.tr</a>&nbsp;adresinden alındı</p>
        <p>61 medya. 2022. &ldquo;Trabzonspor taraftarı İstanbul&rsquo;da yine rekor kırdı&rdquo;. Trabzon Haber -
            Trabzon Son dakika Haber. Geliş tarihi 13 Nisan 2024 (<a
                href="https://www.61medya.com/haber/13293502/trabzonspor-taraftari-istanbulda-yine-rekor-kirdi"
                target="_blank"
                rel="noopener noreferrer">https://www.61medya.com/haber/13293502/trabzonspor-taraftari-istanbulda-yine-rekor-kirdi</a>).
        </p>
        <p>61 Saat. 2023. &ldquo;Trabzon&rsquo;da Muhteşem&nbsp;Solot&uuml;rk&nbsp;G&ouml;sterisi! (24 Ekim
            2023)&rdquo;. 61 Saat TV. Geliş tarihi 04 Nisan 2024 (<a href="https://www.youtube.com/watch?v=k63AMy5dFeg"
                                                                     target="_blank"
                                                                     rel="noopener noreferrer">https://www.youtube.com/watch?v=k63AMy5dFeg</a>).
        </p>
        <p>Acun, F. (2020). Dijital Tarih ve Dijital Tarih&ccedil;iliğin Tarih Yazımına Etkisi &Uuml;zerine.&nbsp;<em>Tarih
            Yazımı Journal Of Hıstoriography</em>, 66-90.</p>
        <p>A&ccedil;ıcı, Funda&nbsp;Kurak,&nbsp;ve Zeynep&nbsp;Nilsun&nbsp;Konakoğlu. 2018. &ldquo;K&uuml;lt&uuml;rel
            Mirasın İzlerini Kent M&uuml;zelerinde S&uuml;rmek: Trabzon M&uuml;zeleri
            /&nbsp;Following&nbsp;the&nbsp;Traces&nbsp;of&nbsp;Cultural&nbsp;Heritage&nbsp;Through City&nbsp;Museums:
            Trabzon&nbsp;Museums&rdquo;.&nbsp;Journal&nbsp;of&nbsp;History&nbsp;Culture&nbsp;and&nbsp;Art&nbsp;Research&nbsp;7(3):668-82.&nbsp;doi:
            10.7596/taksad.v7i3.1524.</p>
        <p>Ahunbay, Zeynep. 2018. &ldquo;M&uuml;zeme Dokunma: Trabzon&nbsp;Ayasofyası&rdquo;. Mimarlık Dergisi,
            42-45.</p>
        <p>Ak, Musa.
            2006. &ldquo;II.&nbsp;Meşruti̇yet&nbsp;D&ouml;nemi̇&rsquo;nde&nbsp;Meslek&icirc; Ve&nbsp;Tekni̇k&nbsp;Eği̇ti̇m&nbsp;Okullari&nbsp;(1908 &ndash; 1918)&rdquo;.&nbsp;Y&uuml;ksek
            Lisans Tezi, T.C. Pamukkale &Uuml;niversitesi Sosyal Bilimler Enstit&uuml;s&uuml; Tarih Anabilim Dalı
            Yakın&ccedil;ağ Bilim Dalı, Denizli.</p>
        <p>Akarca, Halit D&uuml;ndar. 2014. &ldquo;İlm&icirc; İşgal: Birinci Cihan Harbi&rsquo;nde Rus Bilim Adamlarının
            Trabzon Ve Civarında Ger&ccedil;ekleştirdikleri Arkeolojik Faaliyetler&rdquo;. Karadeniz İncelemeleri
            Dergisi 17(17):21-30.&nbsp;doi: 10.18220/kid.44835.</p>
        <p>Akbal, İ. (2002). Milli M&uuml;cadele'de Trabzon'daki İttihat&ccedil;ı &Ouml;rg&uuml;tlenme Ve Yahya Kahya
            Meselesi.&nbsp;<em>Uluslararası Tarih-Dil-Edebiyat Sempozyumu</em>&nbsp;(s. 421-466). Trabzon : T.C Trabzon
            Valiliği İl K&uuml;lt&uuml;r M&uuml;d&uuml;rl&uuml;ğ&uuml; Yayınları.</p>
        <p>Akbal, İsmail. 2008.&nbsp;Mi̇lli̇ M&uuml;cadele&nbsp;D&ouml;nemi̇nde&nbsp;Trabzonda&nbsp;Muhalefet. 1.Baskı.
            Trabzon:&nbsp;Serander.</p>
        <p>Ak&ccedil;alı Avcı, A., &amp; Aslan, E. (2007). Yerel Tarih ve Tarih &Ouml;ğretimindeki Rol&uuml;,.&nbsp;<em>Dokuz
            Eyl&uuml;l &Uuml;niversitesi Buca Eğitim Fak&uuml;ltesi Dergisi 21: 80-88 (2007)</em>(21), 80-88.</p>
        <p>Aksoy, F. (2009).&nbsp;<em>Osmanlı &Ouml;ncesi D&ouml;nemde Trabzon Şehri.</em>&nbsp;Elazığ: T.C.
            Fırat &Uuml;niversitesi Sosyal Bilimler Enstit&uuml;s&uuml; Y&uuml;ksek Lisans Tezi Tarih Anabilim Dalı .
        </p>
        <p>Aksoy, Volkan. 2022. &ldquo;II.&nbsp;Meşruti̇yet&nbsp;D&ouml;nemi̇nde&nbsp;Trabzon&rsquo;da Meydana Gelen
            Değişim Ve&nbsp;Geli̇şmeler&rdquo;.&nbsp;Ss. 453-515 i&ccedil;inde Trabzon Tarihi (Siyasi Tarih). C. I.
            Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Aktaş, Esat. 2016. Trabzon&rsquo;da Sağlık. C. II. Ankara: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Albayrak, H. (2015).&nbsp;<em>Birinci D&uuml;nya Savaşı Yıllarında Trabzon'da Rus-Ermeni-Rum Mez&acirc;limi
            (1914-1918).</em>&nbsp;Ankara: Trabzon B&uuml;y&uuml;kşehir Belediyesi K&uuml;lt&uuml;r ve Sosyal İşler
            Dairesi Başkanlığı Yayınları.</p>
        <p>Alikılı&ccedil;, D&uuml;ndar.
            2013. &ldquo;Baştimar&rsquo;in&nbsp;Mazlum&nbsp;Şehi̇di̇&nbsp;Hafiz&nbsp;Mehmed&nbsp;Bey&rdquo;. Prof. Dr.
            D&uuml;ndar&nbsp;Alikılı&ccedil;. Geliş tarihi 27 Ocak 2024 (<a
                href="https://dundaralikilic.wordpress.com/makalelerim/bastimarin-mazlum-sehidi-hafiz-mehmed-bey/"
                target="_blank"
                rel="noopener noreferrer">https://dundaralikilic.wordpress.com/makalelerim/bastimarin-mazlum-sehidi-hafiz-mehmed-bey/</a>).
        </p>
        <p>Alkan, Necmettin. 2016. Ali Ş&uuml;kr&uuml; Bey&rsquo;in Makaleleri Medeniyet, Tarih Ve Siyaseti. İstanbul:
            Trabzon B&uuml;y&uuml;kşehir Belediyesi K&uuml;lt&uuml;r Ve Sosyal İşler Dairesi Başkanlığı.</p>
        <p>Anonim. 2016a. &ldquo;Trabzon&rsquo;da&nbsp;Sıradışı&nbsp;Bir Vali: Kadri Bey (Namıdiğer&nbsp;Deli
            Kadri)&rdquo;. Geliş tarihi 20 Ocak 2024 (<a
                href="https://www.facebook.com/FotografTrabzon/photos/a.582178501800361/1318845858133618/?type=3&amp;locale=tr_TR"
                target="_blank"
                rel="noopener noreferrer">https://www.facebook.com/FotografTrabzon/photos/a.582178501800361/1318845858133618/?type=3&amp;locale=tr_TR</a>).
        </p>
        <p>Anonim. 2016b. &ldquo;Trabzon&rsquo;da&nbsp;Sıradışı&nbsp;Bir Vali: Kadri Bey (Namıdiğer&nbsp;Deli
            Kadri)&rdquo;. Geliş tarihi 20 Ocak 2024 (<a
                href="https://www.facebook.com/FotografTrabzon/photos/a.582178501800361/1318845858133618/?type=3&amp;locale=tr_TR"
                target="_blank"
                rel="noopener noreferrer">https://www.facebook.com/FotografTrabzon/photos/a.582178501800361/1318845858133618/?type=3&amp;locale=tr_TR</a>).
        </p>
        <p>Anonim. 2023a. &ldquo;Kenan Evren&rsquo;in 1980 Anayasası&rsquo;nı Tanıtma Konuşmaları &ndash; 1&rdquo;.
            http://www.ankahukuk.com. Geliş tarihi 03 Nisan 2024 (<a
                href="http://www.ankahukuk.com/kenan-evrenin-1980-anayasasini-tanitma-konusmalari/7" target="_blank"
                rel="noopener noreferrer">http://www.ankahukuk.com/kenan-evrenin-1980-anayasasini-tanitma-konusmalari/7</a>/).
        </p>
        <p>Anonim. 2023b. &ldquo;Trabzon Tarihinde İz Bırakanlar! Ş&uuml;kr&uuml; Sara&ccedil;oğlu
            Kimdir?&rdquo; Eyl&uuml;l 13.</p>
        <p>Anonim. 2024a. &ldquo;#BizeHerYerTrabzon&rdquo;. Geliş tarihi 21 Ocak 2024 (<a
            href="https://www.trabzonspor.org.tr/tr/kulup/tarihce" target="_blank"
            rel="noopener noreferrer">https://www.trabzonspor.org.tr/tr/kulup/tarihce</a>).</p>
        <p>Anonim. 2024b. &ldquo;Kisarna&nbsp;Maden Suyu&rdquo;. Şirket Tarihi. Geliş tarihi 27 Şubat 2024 (<a
            href="http://www.kisarnamadensuyu.com/sirket.html" target="_blank"
            rel="noopener noreferrer">http://www.kisarnamadensuyu.com/sirket.html</a>).</p>
        <p>Anonim. 2024c. &ldquo;Kurucular | DSK&rdquo;. https://dsk.org.tr/. Geliş tarihi 26 Ocak 2024 (<a
            href="https://dsk.org.tr/darussafaka-ailesi/kurucular/" target="_blank"
            rel="noopener noreferrer">https://</a><a href="https://dsk.org.tr/darussafaka-ailesi/kurucular/"
                                                     target="_blank" rel="noopener noreferrer">dsk.org.tr</a><a
            href="https://dsk.org.tr/darussafaka-ailesi/kurucular/" target="_blank"
            rel="noopener noreferrer">/darussafaka-ailesi/kurucular/</a>).</p>
        <p>Anonim. 2024d. &ldquo;Trabzon&rsquo;da&nbsp;Sıradışı&nbsp;Bir Vali: Kadri Bey (Namıdiğer&nbsp;Deli
            Kadri)&rdquo;.</p>
        <p>Anonim.&nbsp;t.y.-a. &ldquo;#BizeHerYerTrabzon&rdquo;. Geliş tarihi 21 Ocak 2024 (<a
            href="https://www.trabzonspor.org.tr/tr/kulup/tarihce" target="_blank"
            rel="noopener noreferrer">https://www.trabzonspor.org.tr/tr/kulup/tarihce</a>).</p>
        <p>Anonim.&nbsp;t.y.-b. &ldquo;Tarih&ccedil;e 27&nbsp;Mart 2024 tarihinde kaynağından arşivlendi. Erişim tarihi:
            27&nbsp;Mart 2024.&rdquo;&nbsp;Tarh&ccedil;e. Geliş tarihi 27 Mart 2024 (<a
                href="https://www.trabzon.bel.tr/Web/Tarihce" target="_blank"
                rel="noopener noreferrer">https://www.trabzon.bel.tr/Web/Tarihce</a>).</p>
        <p>Arslan, Firdevs. 2014. &ldquo;Trabzon&nbsp;Vali̇si̇ Kadri̇ Paşa&nbsp;D&ouml;nemi̇nde&nbsp;Trabzon
            (1892&ndash;1903)&rdquo;. Y&uuml;ksek Lisans Tezi, Karadeniz Teknik &Uuml;niversitesi Sosyal Bilimler
            Enstit&uuml;s&uuml;, Trabzon.</p>
        <p>Arslan, Zehra. 2011. &ldquo;Demokrat Parti D&ouml;neminde Trabzon (1950-1960)&rdquo;. Karadeniz
            Teknik &Uuml;niversitesi Sosyal Bilimler Enstit&uuml;s&uuml; Tarih Anabilim Dalı Tarih Programı,
            Trabzon.</p>
        <p>Aslan, B. (2000).&nbsp;<em>I. D&uuml;nya Savaşı Esnasında "Azerbaycan T&uuml;rkleri"nin "Anadolu
            T&uuml;rkleri&rsquo;ne"Kardaş K&ouml;meği (Yardımı)" Ve Bak&uuml; M&uuml;sl&uuml;man Cemiyet-i
            Hayriyesi.</em>Ankara: Atat&uuml;rk K&uuml;lt&uuml;r Merkezi Başkanlığı Yayınlar.</p>
        <p>Aslan, Z. (2022 , 5 17).&nbsp;<em>Karadeniz Teknik &Uuml;niversitesi (KT&Uuml;).</em>&nbsp;Ocak 2, 2024
            tarihinde ataturkansiklopedisi.gov.t:&nbsp;<a
                href="https://ataturkansiklopedisi.gov.tr/bilgi/karadeniz-teknik-universitesi-ktu/" target="_blank"
                rel="noopener noreferrer">https://ataturkansiklopedisi.gov.tr/bilgi/karadeniz-teknik-universitesi-ktu/</a>&nbsp;adresinden
            alındı</p>
        <p>Atalay, Sevgi. 2018. &ldquo;Trabzon &ndash; G&uuml;m&uuml;şhane Arasındaki̇ Tarihi̇ İpek Ve
            G&ouml;&ccedil; Yolu&rdquo;. Kafdağı 3(2):130-49.</p>
        <p>Ayar, Mesut. 2005. &ldquo;Osmanli&nbsp;Devleti̇&rsquo;nde&nbsp;Kolera&nbsp;Salgını: İstanbul &Ouml;rneği̇
            (1892 &ndash; 1895)&rdquo;.&nbsp;Doktara&nbsp;Tezi, T.C. Marmara&nbsp;&Uuml;niversitesi
            T&uuml;rkiyat&nbsp;Araştırmaları Enstit&uuml;s&uuml; Tarih&nbsp;Anabilimdalı Yakın&ccedil;ağ
            Tarihi&nbsp;Bilimdalı, İstanbul.</p>
        <p>Ayg&uuml;n, Necmettin. 2016. Karadeniz&rsquo;den Osmanlı Ekonomisine Bakış. C. I. Ankara: Trabzon Ticaret Ve
            Sanayi Odası.</p>
        <p>Bal, Mehmet Akif. 2009. Trabzon Kronolojisi(M.&Ouml;.800 - M.S.2010) Kuruluşundan Bug&uuml;ne Trabzon
            Tarihi.&nbsp;İstanbul.Trabzon&nbsp;Kitaplığı III.</p>
        <p>Bal, Mehmet Akif. 2012. &ldquo;Trabzon&rsquo;dan D&uuml;nyaya A&ccedil;ılan Uluslararası Bir
            Aile:&nbsp;Nemlizadeler&rdquo;.&nbsp;İlkhaber&nbsp;Gazetesi 2.</p>
        <p>Başar, S. (2022, 07 01).&nbsp;<em>Trabzon'un fethi tarihi, 15 Ağustos olarak resmileşti</em>. 12 26, 2022
            tarihinde www.dha.com.tr:&nbsp;<a
                href="https://www.dha.com.tr/gundem/trabzonun-fethi-tarihi-15-agustos-olarak-resmilesti-2094539"
                target="_blank"
                rel="noopener noreferrer">https://www.dha.com.tr/gundem/trabzonun-fethi-tarihi-15-agustos-olarak-resmilesti-2094539</a>&nbsp;adresinden
            alındı</p>
        <p>Başaran, Y. (2015, 10 4).&nbsp;<em>1810 Yılında Rusları Sargana Burnunda Denize D&ouml;ken Şebinkarahisar
            Taburu</em>. 12 27, 2023 tarihinde Trabzon'dan Esintiler:&nbsp;<a
            href="https://www.facebook.com/groups/108079095946806/permalink/885194311568610" target="_blank"
            rel="noopener noreferrer">https://www.facebook.com/groups/108079095946806/permalink/885194311568610</a>&nbsp;adresinden
            alındı</p>
        <p>Başkan, Ş. (2020).&nbsp;<em>1416-1461 Yılları Arasında Trabzon Rum Devleti.</em>&nbsp;İstanbul: T.C. İstanbul
            Aydın &Uuml;niversitesi Lisans&uuml;st&uuml; Eğitim Enstit&uuml;s&uuml;, Tarih Ana Bilim Dalı, Tarih Bilim
            Dalı .</p>
        <p>Başkaya, M. (2022, 11 14).&nbsp;<em>Trabzon Havalimanı&rsquo;nın Hik&acirc;yesi.</em>&nbsp;4 1, 2024
            tarihinde www.takagazete.com.tr:&nbsp;<a
                href="https://www.takagazete.com.tr/trabzon-havalimaninin-hikyesi-makale,159310.html" target="_blank"
                rel="noopener noreferrer">https://www.takagazete.com.tr/trabzon-havalimaninin-hikyesi-makale,159310.html</a>&nbsp;adresinden
            alındı</p>
        <p>Başkaya, M. (2022, 12 5).&nbsp;<em>Trabzon'un İlk Kadın Milletvekili.</em>&nbsp;4 1, 2024 tarihinde
            www.takagazete.com.tr:&nbsp;<a
                href="https://www.takagazete.com.tr/trabzonun-ilk-kadin-milletvekili-makale,159370.html" target="_blank"
                rel="noopener noreferrer">https://www.takagazete.com.tr/trabzonun-ilk-kadin-milletvekili-makale,159370.html</a>&nbsp;adresinden
            alındı</p>
        <p>Başkaya, Muzaffer.
            2014. &ldquo;Cumhuri̇yeti̇n&nbsp;İlk&nbsp;Yıllarında&nbsp;Trabzon&rsquo;da&nbsp;Ekonomi̇k&nbsp;Hayat(1923-1950)&rdquo;.&nbsp;Doktara&nbsp;Tezi,
            Karadeniz Teknik &Uuml;niversitesi, Sosyal Bilimler Enstit&uuml;s&uuml;, Trabzon.</p>
        <p>Başkaya, Muzaffer. 2018a. &ldquo;Cumhuri̇yeti̇n&nbsp;İlk&nbsp;Yıllarında&nbsp;Trabzon&rsquo;da&nbsp;Mi̇lli̇
            Bayram&nbsp;Kutlamaları&nbsp;(1923-1950)&rdquo;.&nbsp;nternational&nbsp;Journal&nbsp;of&nbsp;Social&nbsp;Humanities&nbsp;Sciences&nbsp;Research(JSHSR).&nbsp;doi:
            I 5. 3201-3215. 10.26450/jshsr.713.</p>
        <p>Başkaya, Muzaffer. 2018b. &ldquo;Osmanlıdan&nbsp;Cumhuriyete&nbsp;Bi̇r&nbsp;Kurumun&nbsp;Tari̇hi̇:
            Trabzon&nbsp;Şehi̇rKul&uuml;b&uuml; (1923-1955)&rdquo;.
            International&nbsp;Journal&nbsp;of&nbsp;Social&nbsp;and&nbsp;Humanities&nbsp;Sciences&nbsp;Research(JSHSR)
            5(29):3787-97.&nbsp;doi: 10.26450/jshsr.813.</p>
        <p>Başkaya, Muzaffer. 2018c. &ldquo;Osmanlıdan&nbsp;Cumhuri̇yete&nbsp;Bi̇r&nbsp;Kurumun&nbsp;Tari̇hi̇:
            Trabzon&nbsp;Şehi̇rKul&uuml;b&uuml; (1923-1955)&rdquo;.
            International&nbsp;Journal&nbsp;of&nbsp;Social&nbsp;and&nbsp;Humanities&nbsp;Sciences&nbsp;Research(JSHSR)
            5(29):3787-97.&nbsp;doi: 10.26450/jshsr.813.</p>
        <p>Başkaya, Muzaffer. 2022. &ldquo;Cumhuri̇yeti̇n&nbsp;İlk Yıllarında Trabzon&rsquo;da
            Ticaret&rdquo;.&nbsp;i&ccedil;inde&nbsp;Trabzon Tarihi (K&uuml;lt&uuml;r Ve Medeniyet). C. II. Trabzon:
            Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Bia. (2011, 5 19).&nbsp;<em>Kazım Karabekir'den Nisan-Mayıs 1919 G&uuml;nleri</em>. 4 1, 2024 tarihinde
            m.bianet.org:&nbsp;<a
                href="https://m.bianet.org/bianet/diger/130104-kazim-karabekir-den-nisan-mayis-1919-gunleri"
                target="_blank"
                rel="noopener noreferrer">https://m.bianet.org/bianet/diger/130104-kazim-karabekir-den-nisan-mayis-1919-gunleri</a>&nbsp;adresinden
            alındı</p>
        <p>Biber, T. E. (2006).&nbsp;<em>Milli M&uuml;cadele D&ouml;neminde Doğu Karadeniz.</em>&nbsp;İstanbul: Mimar
            Sinan G&uuml;zel Sanatlar &Uuml;niversitesi G&uuml;zel Sanatlar Fak&uuml;ltesi, Y&uuml;ksek Lisans Tezi.</p>
        <p>bigpara@hurriyet.com.tr. 2004. &ldquo;T&uuml;rk profes&ouml;re Kanada`dan `hidrojen
            h&uuml;cresi` &ouml;d&uuml;l&uuml;&rdquo;. bigpara.hurriyet.com.tr. Geliş tarihi 11 Nisan 2024 (<a
                href="https://bigpara.hurriyet.com.tr/haberler/genel-haberler/turk-profesore-kanada-dan-hidrojen-hucresi-odulu_ID503117/"
                target="_blank"
                rel="noopener noreferrer">https://bigpara.hurriyet.com.tr/haberler/genel-haberler/turk-profesore-kanada-dan-hidrojen-hucresi-odulu_ID503117/</a>).
        </p>
        <p>Bilgin, Mehmet. 1996. &ldquo;Trabzon Tarihi&rdquo;.&nbsp;Ss. 27-81 i&ccedil;inde Trabzon.
            İstanbul:&nbsp;T.C.K&uuml;lt&uuml;rBakanlığı Yayınları.</p>
        <p>Bircan, T. Ş. (2016). Teknoloji Destekli Tarih &Ouml;ğretiminin &Ouml;ğrencilerin Mek&acirc;n Algılarına ve
            Akademik Başarılarına Etkisi.&nbsp;<em>Hacettepe &Uuml;n&uuml;versitesi Eğitim Fak&uuml;ltesi Dergisi</em>,
            564-577.</p>
        <p>Bi̇ri̇nci̇, Ali. 2008. &ldquo;Meşveretci̇ Naci̇ Bey Ve Gazetesi̇&rdquo;. Uluslararası Karadeniz İncelemeleri
            Dergisi 5(5):139-49.</p>
        <p>Bi̇rli̇k, G&uuml;ltekin Kamil. 2016. &ldquo;Trabzon Atat&uuml;rk K&ouml;şk&uuml;&rdquo;. Atat&uuml;rk Yolu
            Dergisi 15(59).&nbsp;doi: 10.1501/Tite_0000000449.</p>
        <p>Bi̇rli̇k, G&uuml;ltekin K&acirc;mil. 2018. &ldquo;Cumhurbaşkanı İsmet İn&ouml;n&uuml;&rsquo;n&uuml;n Trabzon
            Ziyaretleri&rdquo;. &Ccedil;ağdaş T&uuml;rkiye Tarihi Araştırmaları Dergisi 18(36):295-322.</p>
        <p>Bolat, M. (2022, 2 10).&nbsp;<em>Hasan Saka(1885-1960).</em>&nbsp;2 1, 2024 tarihinde
            ataturkansiklopedisi:&nbsp;<a href="https://ataturkansiklopedisi.gov.tr/bilgi/hasan-saka/" target="_blank"
                                          rel="noopener noreferrer">https://ataturkansiklopedisi.gov.tr/bilgi/hasan-saka/</a>&nbsp;adresinden
            alındı</p>
        <p>Bostan, M. Hanefi. 2022. &ldquo;Trabzon&rsquo;un Fethi̇ Ve T&uuml;rkleşmesi̇&rdquo;.&nbsp;Ss. 69-109
            i&ccedil;inde Trabzon Tarihi(Siyasi Tarih). C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Budak, Hacı &Ouml;mer. 2024. &ldquo;Kazım&nbsp;Karabekir&nbsp;Paşa Ve&nbsp;Bazı&nbsp;Yazarlara G&ouml;re
            Enver Paşa&rdquo;. Ocak, 19-48.</p>
        <p>Bulut, E. &Ccedil;. (2006). Ertuğrul Faciasının Trabzonlu Şehitleri.&nbsp;<em>Karadeniz Araştırmaları
            Enstit&uuml;s&uuml; Dergisi</em>, s. 365-383.</p>
        <p>celalhocaiho.meb.k12.tr. 2024. &ldquo;Mahmut&nbsp;Celaletti̇n&nbsp;&Ouml;kten (1882-1961)&rdquo;.
            www.celalhocaiho.meb.k12.tr. Geliş tarihi (<a
                href="https://celalhocaiho.meb.k12.tr/icerikler/mahmut-celalettin-okten-1882-1961_2283629.html"
                target="_blank"
                rel="noopener noreferrer">https://celalhocaiho.meb.k12.tr/icerikler/mahmut-celalettin-okten-1882-1961_2283629.html</a>).
        </p>
        <p>Cevahir, E. (2020).&nbsp;<em>SPSS İle Nicel Veri Analizi Rehberi.</em>&nbsp;İstanbul: Kibele.</p>
        <p>&Ccedil;am, E., Uysal, M. (2017). Mobil Uygulamaların Eğitsel Ama&ccedil;lı Kullanımı: Bir &Ouml;l&ccedil;ek
            Geliştirme &Ccedil;alışması. Uluslararası T&uuml;rk Eğitim Bilimleri Dergisi, 2017(9), 559-567.</p>
        <p>&Ccedil;apa, Mesut. 1997. &ldquo;Milli M&uuml;cadele D&ouml;neminde Trabzon&rsquo;da Mitingler&rdquo;.
            T&uuml;rk Yurdu, 124-28.</p>
        <p>&Ccedil;apa, Mesut.
            2022. &ldquo;Tanzi̇mat&rsquo;tan&nbsp;Cumhuri̇yet&rsquo;e&nbsp;Trabzon&rsquo;da&nbsp;Eği̇ti̇m&rdquo;.&nbsp;Ss.
            153-92 i&ccedil;inde Trabzon Tarihi K&uuml;lt&uuml;r ve Medeniyet (İkinci Cilt). Trabzon: Trabzon Ticaret Ve
            Sanayi Odası.</p>
        <p>&Ccedil;aykıran, G. (2021). Birinci D&uuml;nya Savaşı&rsquo;nda Trabzon&rsquo;un İşgali Ve M&uuml;sl&uuml;man
            M&uuml;ltecilerin Durumu.&nbsp;<em>Asker&icirc; Tarih Araştırmaları Dergisi (ATAD)</em>(33), 123-150.&nbsp;
        </p>
        <p>&Ccedil;eloğlu, Yavuz Selim. 2021. &ldquo;Kafkas/Doğu Cephesi&rsquo;nde T&uuml;rk Ordusunun İaşe Ve İkmal
            Durumu&rdquo;. Askeri Tarih Araştırmaları Dergisi 19(33):63-92.&nbsp;doi: 10.46953/askeritarih.854676.</p>
        <p>&Ccedil;etindaş, Dilek. 2020. &ldquo;İsmet Zeki Ey&uuml;boğlu&rdquo;. www.teis.yesevi.edu.tr. Geliş tarihi 11
            Nisan 2024 (<a href="https://teis.yesevi.edu.tr/madde-detay/eyuboglu-ismet-zeki" target="_blank"
                           rel="noopener noreferrer">https://teis.yesevi.edu.tr/madde-detay/eyuboglu-ismet-zeki</a>).
        </p>
        <p>&Ccedil;ınkır&nbsp;&Ouml;zbitirgi&ccedil;, Olcay. 2023. &ldquo;Marshall Planı &Ccedil;er&ccedil;evesinde
            Amerikalı&nbsp;Mr.&nbsp;Russell&nbsp;Dorr&rsquo;unT&uuml;rkiye İzlenimlerine Dair Raporunun
            Değerlendirilmesi&rdquo;. BELLEK Uluslararası Tarih ve K&uuml;lt&uuml;r Araştırmaları Dergisi
            5(2):164-73.</p>
        <p>&Ccedil;i&ccedil;ek, Rahmi. 2017. &ldquo;&Ccedil;ok Partili Hayata Ge&ccedil;işte Trabzon Basını
            (1945-1950)&rdquo;. Karadeniz Araştırmaları Enstit&uuml;s&uuml; Dergisi, 129-66.</p>
        <p>Demircioğlu, Asuman. 1998. &ldquo;Faik Ahmet (Barut&ccedil;u) Bey Ve İstikbal Gazetesi(1918 Yılı Sonu Ve 1922
            Yılı)&rdquo;. Doktora Tezi, Atat&uuml;rk &Uuml;niversitesi, Atat&uuml;rk İlkeleri ve İnkılap Tarihi
            Enstit&uuml;s&uuml; M&uuml;d&uuml;rl&uuml;ğ&uuml;, Erzurum.</p>
        <p>Demircioğlu, Sezgin, Ali Mesut&nbsp;Birinci,&nbsp;ve Recep&nbsp;Karacakaya. 2007. Arşiv Belgelerine G&ouml;re
            Trabzon&rsquo;da Ermeni faaliyetleri (1850-1923). C. I-II. 1. bs. Trabzon Belediyesi.</p>
        <p>Derman, Uğur. 1989. &ldquo;ALTUNBEZER, İsmail Hakkı(1873-1946)&rdquo;. TDV İsl&acirc;m Ansiklopedisi
            II:543-44.</p>
        <p>Di̇lek, Mehmet Sait. 2012. &ldquo;Paris Barış Konferansı&rsquo;nda Ermeni Sorunu&rdquo;. Yakın D&ouml;nem
            T&uuml;rkiye Araştırmaları (15-16):79-97.</p>
        <p>Doğanay, Erkan. 2020. &ldquo;Trabzon&rsquo;dan T&uuml;rk
            Sanatına&nbsp;Kazandırılmış&nbsp;Ger&ccedil;ek&nbsp;Bi̇r&nbsp;Maestro; Bedri Rahmi Ey&uuml;boğlu&rdquo;. T
            Dergi.</p>
        <p>Doğanay, R. (2017).&nbsp;<em>Milli M&uuml;cadele'de Karadeniz (1919-1922).</em>&nbsp;Ankara: Atat&uuml;rk
            K&uuml;lt&uuml;r, Dil Ve Tarih Y&uuml;ksek Kurumu Atat&uuml;rk Araştırma Merkezi.</p>
        <p>Doğanay, Rahmi. 2017. Milli&nbsp;M&uuml;cadelede&nbsp;Trabzon(1919-1922). Ankara: Atat&uuml;rk Araştırma
            Merkezi.</p>
        <p>Duran, Zafer. 2023. &ldquo;1911&rsquo;de Trabzon&rsquo;da
            Fransız&nbsp;Rahi̇beleri̇ni̇n&nbsp;Trabzon&nbsp;Şehi̇r&nbsp;Merkezi̇ndeKız Okulu
            A&ccedil;ma &Ccedil;alışmaları&rdquo;.&nbsp;Trabzondan&nbsp;Esintiler. Geliş tarihi 08 Nisan 2024 (<a
                href="https://www.facebook.com/groups/108079095946806/permalink/6662228387198478/?m_entstream_source=group&amp;paipv=0&amp;eav=AfaqH9NhqKZ-ev8qwjhOYoMcAy4o-X2CvYS38EziHz7J4hEYa4W128iSlrUaUc4Oupg&amp;_rdr"
                target="_blank"
                rel="noopener noreferrer">https://www.facebook.com/groups/108079095946806/permalink/6662228387198478/?m_entstream_source=group&amp;paipv=0&amp;eav=AfaqH9NhqKZ-ev8qwjhOYoMcAy4o-X2CvYS38EziHz7J4hEYa4W128iSlrUaUc4Oupg&amp;_rdr</a>).
        </p>
        <p>D&uuml;ndar,&nbsp;Fuad. 2015. İttihat ve Terakki&rsquo;nin M&uuml;sl&uuml;manları İsk&acirc;nı
            Politikası(1913-1918). 6.Baskı. İstanbul: İletişim Yayınları.</p>
        <p>D&uuml;zenli, Yahya. 2010. Ben Bir Ulu Şehre Vardım Trabzon Yazıları. İstanbul: N&uuml;ans Ajans Basın
            Yayın.</p>
        <p><em>Eğitim Takvimi 2020 "Bug&uuml;n 24 saat ve her saniyesi &ccedil;ok kıymetli"</em>. (2020, 1 1). Ocak 19,
            2024 tarihinde www.meb.gov.tr:&nbsp;<a
                href="https://www.meb.gov.tr/egitim-takvimi-2020-bugun-24-saat-ve-her-saniyesi-cok-kiymetli/haber/20047/tr"
                target="_blank"
                rel="noopener noreferrer">https://www.meb.gov.tr/egitim-takvimi-2020-bugun-24-saat-ve-her-saniyesi-cok-kiymetli/haber/20047/tr</a>&nbsp;adresinden
            alındı</p>
        <p>Eken, Emre. 2019. &ldquo;Ey&uuml;boğlu:&nbsp;Bi̇r&nbsp;Ai̇le&nbsp;Tari̇hi̇ İncelemesi̇&rdquo;. Y&uuml;ksek
            Lisans Tezi, T.C. İstanbul Medeniyet &Uuml;niversitesi Sosyal
            Bilimler&nbsp;Enstit&uuml;s&uuml; Tarih&nbsp;Anabilim Dalı, İstanbul.</p>
        <p>Ekinci, Ekrem Buğra.
            2019. &ldquo;Yer&nbsp;İsi̇mleri̇ni̇&nbsp;Ki̇m,&nbsp;Ni̇ye&nbsp;Deği̇şti̇ri̇r?&rdquo; ekrembugraekinci.com.
            Geliş tarihi 27 Mart 2024 (<a
                href="https://www.ekrembugraekinci.com/article/?ID=1028&amp;yer-isimlerini-kim--niye-de%C4%9Fi%C5%9Ftirir-"
                target="_blank"
                rel="noopener noreferrer">https://www.ekrembugraekinci.com/article/?ID=1028&amp;yer-isimlerini-kim--niye-de%C4%9Fi%C5%9Ftirir-</a>).
        </p>
        <p>Eray Biber, Tuğba. 2006. &ldquo;Milli M&uuml;cadele D&ouml;neminde Doğu Karadeniz&rdquo;. Y&uuml;ksek Lisans
            Tezi, Mimar Sinan G&uuml;zel Sanatlar &Uuml;niversitesi, Sosyal Bilimler Enstit&uuml;s&uuml;, İstanbul.</p>
        <p>Eray Biber, Tuğba. 2019. &ldquo;Karadeniz&rsquo;de&nbsp;Depremler Ve&nbsp;Yardımlar&nbsp;(1939-1944)&rdquo;.
            MUTAD VI(2):151-81.&nbsp;doi: 10.16985/mtad.660163.</p>
        <p>Eray Biber, Tuğba. 2020. &ldquo;Mill&icirc;̇
            M&uuml;cadele&nbsp;D&ouml;neminde&nbsp;&lsquo;Pontus&nbsp;Cumhuriyeti̇&rsquo; Kurma &Ccedil;alışmaları&rdquo;.
            124(245):421-34.</p>
        <p>Erener, Tolga. 2022. Doğu Karadeniz B&ouml;lgesi&rsquo;nin Rus İşgalinden Kurtuluşu. 1.Baskı. İstanbul: Arı
            Sanat Yayınları.</p>
        <p>Ergin, Recep. 2024. &ldquo;Harşit&nbsp;Savunması&rdquo;.&nbsp;Wikipedi&nbsp;&Ouml;zg&uuml;r Ansiklopedi.
            Geliş tarihi 01 Nisan 2024 (https://w.wiki/9dew).</p>
        <p>Erol, F. (2022, 02 16).&nbsp;<em>Baba Salim.</em>&nbsp;12 25, 2022 tarihinde www.takagazete.com.tr:&nbsp;<a
            href="https://www.takagazete.com.tr/kultursanat/baba-salim-h239414.html" target="_blank"
            rel="noopener noreferrer">https://www.takagazete.com.tr/kultursanat/baba-salim-h239414.html</a>&nbsp;adresinden
            alındı</p>
        <p>Erol, F. (2022, 12 19).&nbsp;<em>Beşirli Sahilinde Ne Hazineler Var?</em>&nbsp;01 06, 2023 tarihinde
            www.takagazete.com.tr:&nbsp;<a
                href="https://www.takagazete.com.tr/kultursanat/besirli-sahilinde-ne-hazineler-var-h255176.html"
                target="_blank"
                rel="noopener noreferrer">https://www.takagazete.com.tr/kultursanat/besirli-sahilinde-ne-hazineler-var-h255176.html</a>&nbsp;adresinden
            alındı</p>
        <p>Erol, Fatih. 2022. &ldquo;93 YILDIR NUR SA&Ccedil;IYOR&rdquo;. Taka Gazete, Haziran 22.</p>
        <p>Erol, Fatih. 2023. &ldquo;Trabzon Halkevine Ne Oldu?&rdquo; Taka Gazetesi, Şubat 1.</p>
        <p>Erol, Fatih. 2024. &ldquo;Fatih Erol: Trabzon&rsquo;daki &Ccedil;ığ Afetleri&rdquo;. Taka Gazete - Trabzon
            Haber - Karadeniz Haber.</p>
        <p>Gedikli, H. (1996 ). Ak&ccedil;aabat . Trabzon .</p>
        <p>Gen&ccedil;t&uuml;rk, G. (2022).&nbsp;<em>Dijital Ortamın Gen&ccedil;lerin Okuma Alışkanlıklarına Etkisi:
            İstanbul&rsquo;da Durum.</em>&nbsp;İstanbul : T.C. İstanbul &Uuml;niversitesi, Sosyal Bilimler
            Enstit&uuml;s&uuml;, Bilgi Ve Belge Y&ouml;netimi Anabilim Dalı.</p>
        <p>Ger&ccedil;ek, Bekir. 1996. &ldquo;Eski Bir Başkent&rdquo;.&nbsp;Ss. 27-81 i&ccedil;inde Trabzon.
            İstanbul:&nbsp;T.C. K&uuml;lt&uuml;rBakanlığı Yayınları.</p>
        <p>Gider, Osman. 1992. &ldquo;Şeyh Osman Baba Hazretleri&rdquo;. Gazi Bayburt Dergisi, 18.</p>
        <p>Goloğlu, Mahmut. 2013. Trabzon Tarihi (Fetihten Kurtuluşa Kadar). 2.Baskı. Trabzon:&nbsp;Serander.</p>
        <p>G&uuml;l, Osman Kubilay. 2014. &ldquo;Bir
            İ&ccedil;&nbsp;İskan&nbsp;Uygulaması: &Ccedil;aykara&rsquo;dan &Ouml;zalp&rsquo;e G&ouml;&ccedil;&rdquo;.
            Gaziantep&nbsp;University&nbsp;Journal&nbsp;of&nbsp;Social&nbsp;Sciences&nbsp;13(2):423-35.</p>
        <p>G&uuml;nay,&nbsp;Nejla.
            2013. &ldquo;Atat&uuml;rk&nbsp;D&ouml;nemi̇nde&nbsp;T&uuml;rki̇ye&rsquo;de&nbsp;Beden&nbsp;Eği̇ti̇mi̇ni̇n&nbsp;Geli̇şi̇mi̇
            Ve Gazi̇ Beden&nbsp;Terbi̇yesi̇ B&ouml;l&uuml;m&uuml;&rdquo;. Atat&uuml;rk Araştırma Merkezi Dergisi
            29(85):72-100.</p>
        <p>G&uuml;ner, &Ouml;mer. 1996. &ldquo;Trabzon&rsquo;da Spor Ve Trabzonspor&rdquo;.&nbsp;Ss. 143-51
            i&ccedil;inde Trabzon. İstanbul:&nbsp;T.C. K&uuml;lt&uuml;r&nbsp;Bakanlığı Yayınları.</p>
        <p>G&uuml;rb&uuml;z, Vedat. 2023. &ldquo;Hava Kuvvetlerinin Cumhuriyet D&ouml;nemi İlk Şehidi Hava Pilot
            Y&uuml;zbaşı Cengiz Topel, Nasıl Şehit Oldu?&rdquo; Geliş tarihi 24 Mart 2024 (<a
                href="https://strasam.org/tarih/askeri-tarih/hava-kuvvetlerinin-cumhuriyet-donemi-ilk-sehidi-hava-pilot-yuzbasi-cengiz-topel-nasil-sehit-oldu-2228"
                target="_blank"
                rel="noopener noreferrer">https://strasam.org/tarih/askeri-tarih/hava-kuvvetlerinin-cumhuriyet-</a><a
                href="https://strasam.org/tarih/askeri-tarih/hava-kuvvetlerinin-cumhuriyet-donemi-ilk-sehidi-hava-pilot-yuzbasi-cengiz-topel-nasil-sehit-oldu-2228"
                target="_blank" rel="noopener noreferrer">donemi</a><a
                href="https://strasam.org/tarih/askeri-tarih/hava-kuvvetlerinin-cumhuriyet-donemi-ilk-sehidi-hava-pilot-yuzbasi-cengiz-topel-nasil-sehit-oldu-2228"
                target="_blank"
                rel="noopener noreferrer">-ilk-sehidi-hava-pilot-yuzbasi-cengiz-topel-nasil-sehit-oldu-2228</a>).</p>
        <p>haber61. 2010. &ldquo;Trabzon&rsquo;da sinema eğitimi | Trabzon Haber - Haber61&rdquo;. Geliş tarihi 12 Nisan
            2024 (<a
                href="https://www.haber61.net/bolgesel/trabzonda-sinema-egitimi-h51901.html">https://www.haber61.net/bolgesel/trabzonda-sinema-egitimi-h51901.html</a>).
        </p>
        <p>Hacıfettahoğlu, İ. (2008, 7 19).&nbsp;<em>Trabzon Valisi Şehit Cemal Azmi Bey</em>. 11 12, 2023 tarihinde
            www.serander.net:&nbsp;<a
                href="https://www.serander.net/karadeniz-kulturu/karadeniz-tarihi/644-trabzon-valisi-sehit-cemal-azmi-bey.html"
                target="_blank"
                rel="noopener noreferrer">https://www.serander.net/karadeniz-kulturu/karadeniz-tarihi/644-trabzon-valisi-sehit-cemal-azmi-bey.html</a>&nbsp;adresinden
            alındı</p>
        <p><em>Hayri G&uuml;r&rsquo;&uuml; kaybettik.</em>&nbsp;(2010, 4 8). 12 12, 2023 tarihinde
            www.trabzonspor.org.tr:&nbsp;<a
                href="https://www.trabzonspor.org.tr/tr/haberler/guncel-haberler/hayri-gur-u-kaybettik8-4-2010"
                target="_blank"
                rel="noopener noreferrer">https://www.trabzonspor.org.tr/tr/haberler/guncel-haberler/hayri-gur-u-kaybettik8-4-2010</a>&nbsp;adresinden
            alındı</p>
        <p>Hayri,&nbsp;Abd&uuml;lvahap. 2008. İktisadi
            Trabzon.&nbsp;edit&ouml;r&nbsp;M. &Ouml;ks&uuml;z.&nbsp;Serander&nbsp;Yayınları.</p>
        <p>İnan, K. (2021). Trabzon&rsquo;un Osmanlılar Tarafından Fethi Ve Fethin Tarihlendirilmesi Meselesi.&nbsp;<em>Trabzon'da
            Fetih Ve Şehir</em>&nbsp;(s. 109-120). i&ccedil;inde İstanbul: Trabzon B&uuml;y&uuml;kşehir Belediyesi
            K&uuml;lt&uuml;r Yayınları.</p>
        <p>İnan, Kenan. 2003. &ldquo;Trabzon&rsquo;un&nbsp;Osmanlılar&nbsp;Tarafından&nbsp;Fethi̇&rdquo;. Sosyal
            Bilimler Enstit&uuml;s&uuml; Dergisi, Ocak, 71-84.</p>
        <p>İstikbal. (1922, Mayıs 16).</p>
        <p>Kafalı, M. (1999). Trabzon'un Yetiştirdiği M&uuml;mtaz Sima:Prof.Dr.Osman Turan.&nbsp;<em>Trabzon Tarihi
            Sempozyumu (6-8 Kasım 1998</em>&nbsp;(s. 17-23). i&ccedil;inde Trabzon: Trabzon Belediyesi K&uuml;lt&uuml;r
            Yayınları.</p>
        <p>Kantarcı, Dilek. 2019. &ldquo;XX. Y&uuml;zyılın İlk &Ccedil;eyreğinde Trabzon&rsquo;da
            Gayrim&uuml;slimler&rdquo;. Y&uuml;ksek Lisans Tezi, Karadeniz Teknik &Uuml;niversitesi, Trabzon.</p>
        <p>Karabekir, Kazım. 2019. İstiklal Harbimizde Enver Paşa Ve İttihat Ve Terakki
            Erk&acirc;nı.&nbsp;edit&ouml;rE. &Ccedil;ift&ccedil;i. İstanbul: Kronik Yayınları.</p>
        <p>Karaca, Alaattin. 2011. &ldquo;İsm&acirc;il&nbsp;Saf&acirc;&rdquo;. TDV İsl&acirc;m Ansiklopedisi
            XXIII:121-22.</p>
        <p>Kara&ccedil;avuş, Ahmet. 2015. &ldquo;1895 Trabzon Ermeni İsyanı Ve İsyancıların&nbsp;Sosyo-Ekonomik, Siyasi,
            K&uuml;lt&uuml;rel K&ouml;kenleri&rdquo;. Karadeniz İncelemeleri Dergisi, 75-118.</p>
        <p>Karademir, G. (2022).&nbsp;<em>Tuzcuoğlu Memiş Ağa&rsquo;nın Doğu Karadeniz&rsquo;de Ayanlık
            M&uuml;cadelesi</em>. Artvin: T.C. Artvin &Ccedil;oruh &Uuml;niversitesi Lisans&uuml;st&uuml; Eğitim
            Enstit&uuml;s&uuml; Tarih Anabilim Dalı, Y&uuml;ksek Lisans Tezi.</p>
        <p>Karpuz, Haşim. 2018. Trabzon Merkez Ve İl&ccedil;elerindeki &Ouml;nemli Tarihi Yapılar. Ankara: T&uuml;rk
            Tarih Kurumu.</p>
        <p>Ke&ccedil;iş, Murat. 2009. &ldquo;Trabzon Rum İmparatorluğu ve T&uuml;rkler
            1204-1404&rdquo;.&nbsp;Doktara&nbsp;Tezi,&nbsp;T&uuml;rkiye Cumhuriyeti Ankara&nbsp;&Uuml;niversitesi
            Sosyal&nbsp;Bilimler Enstit&uuml;s&uuml; Tarih (Orta&ccedil;ağ Tarihi) Anabilim Dalı, Ankara.</p>
        <p>Keskin, İ. (2005). 1895 Ermeni Olayları Ve Trabzon Hadisesi.&nbsp;<em>Başlangı&ccedil;tan 20.Y&uuml;zyıla
            Karadeniz Tarihi Sempozyumu</em>, (s. 597-611). Trabzon.</p>
        <p>Keskin, &Ouml;mer&nbsp;Ali,&nbsp;ve Mehmet Esat&nbsp;Saricaoğlu.
            2015. &ldquo;&lsquo;İsti̇kbȃl&rsquo;&nbsp;Gazetesi̇ni̇n&nbsp;Mi̇lli̇
            M&uuml;cadeleye&nbsp;Katkısı&nbsp;(1918-1922)&rdquo;.&nbsp;Turkish&nbsp;Studies&nbsp;(Elektronik)
            10(5):285-306.</p>
        <p>Kılı&ccedil; Yaşin, G&ouml;zde. 2019. 100. Yılında&nbsp;Pontus&ccedil;uluk&nbsp;Ama&ccedil;, Y&ouml;ntem ve
            Hedef. 21. Y&uuml;zyıl T&uuml;rkiye Enstit&uuml;s&uuml;.</p>
        <p>Kılı&ccedil;, Sezen. 2023. &ldquo;Atat&uuml;rk D&ouml;neminde Yabancı Okullar&rdquo;.
            www.ataturkansiklopedisi.gov.tr. Geliş tarihi 08 Nisan 2024 (<a
                href="https://ataturkansiklopedisi.gov.tr/bilgi/ataturk-doneminde-yabanci-okullar/" target="_blank"
                rel="noopener noreferrer">https://ataturkansiklopedisi.gov.tr/bilgi/ataturk-doneminde-yabanci-okullar/</a>).
        </p>
        <p>Koca, S. (2012).&nbsp;<em>TURAN, Osman.</em>&nbsp;12 26, 2022 tarihinde islamansiklopedisi.org.tr:&nbsp;<a
            href="https://islamansiklopedisi.org.tr/turan-osman" target="_blank"
            rel="noopener noreferrer">https://islamansiklopedisi.org.tr/turan-osman</a>&nbsp;adresinden alındı</p>
        <p>Ko&ccedil;, R. (2022). Dijitalleşen K&uuml;lt&uuml;r Ya Da K&uuml;lt&uuml;r&uuml;n Dijitalleşmesi: Dijital
            K&uuml;lt&uuml;r Kavramı.&nbsp;<em>Motif Akademi Halkbilimi Dergisi, 15</em>(38), 500-513.</p>
        <p>K&ouml;ksal, &Uuml;. (2017). Trabzon Hilal-İ Ahmer (Kızılay) Cemiyeti.&nbsp;<em>Karadeniz İncelemeleri
            Dergisi</em>, 161-208 .</p>
        <p>K&ouml;ksal, &Uuml;lk&uuml;. 2022. &ldquo;Trabzon&rsquo;da Dernekler
            Ve&nbsp;Faaliyetleri̇&rdquo;.&nbsp;i&ccedil;inde&nbsp;C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Kurt, D. &Ouml;. (2020, 12 20).&nbsp;<em>Şakir Şevket</em>. 12 28, 2022 tarihinde
            http://teis.yesevi.edu.tr:&nbsp;<a href="http://teis.yesevi.edu.tr/madde-detay/sevket-sakir" target="_blank"
                                               rel="noopener noreferrer">http://teis.yesevi.edu.tr/madde-detay/sevket-sakir</a>&nbsp;adresinden
            alındı</p>
        <p>Kurt, Hasan. 2020. Bir Zamanlar Trabzon Kadim Şehrin G&ouml;rkemli Ge&ccedil;mişi-1. C.
            1.&nbsp;İberMatbaacılık. Trabzon: Kuzey Ekspres Yayınları.</p>
        <p>K&uuml;&ccedil;&uuml;k, Mustafa. 2021. &ldquo;Bi̇ri̇nci̇
            B&uuml;y&uuml;k&nbsp;Mi̇llet&nbsp;Mecli̇si̇nde&nbsp;Trabzon Mebusları&rdquo;. T Dergi, 28-32.</p>
        <p>K&uuml;&ccedil;&uuml;ker,&nbsp;Y&uuml;ksel,&nbsp;ve Hikmet &Ouml;ks&uuml;z. 2017. Tarihsel Arka Planıyla
            Pontus Meselesi. 2.&nbsp;bsk. Ankara: Avrasya İncelemeleri Merkezi.</p>
        <p>K&uuml;&ccedil;&uuml;kuğurlu,&nbsp;Murat,&nbsp;ve Muzaffer Başkaya. 2019. Sorularla Trabzon Tarihi.
            Konya: &Ccedil;izgi Kitabevi.</p>
        <p>K&uuml;&ccedil;&uuml;kuğurlu, Murat.
            2022. &ldquo;Cumhuri̇yet&nbsp;D&ouml;nemi̇nde&nbsp;Trabzon&nbsp;Beledi̇yesi&rdquo;.&nbsp;Ss. 655-715
            i&ccedil;inde Trabzon Tarihi(Siyasi Tarih). C. 1. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>K&uuml;lek&ccedil;i, Ahmet. 2013. &ldquo;Trabzon&rsquo;da Dangalaklar Cemiyeti!&rdquo; Haber61. Geliş tarihi
            26 Ocak 2024 (<a href="https://www.haber61.net/yazar-yazilari/trabzonda-dangalaklar-cemiyeti-h501356.html"
                             target="_blank"
                             rel="noopener noreferrer">https://www.haber61.net/yazar-yazilari/trabzonda-dangalaklar-cemiyeti-h501356.html</a>).
        </p>
        <p>Lowry,&nbsp;Heath&nbsp;W.,&nbsp;ve Demet&nbsp;Lowry. 2010. Trabzon Şehrinin İslamlaşması Ve T&uuml;rkleşmesi
            1461-1583. İstanbul: Boğazi&ccedil;i &Uuml;niversitesi.</p>
        <p>M.Hanefi, Bostan. 2022. &ldquo;Trabzon&rsquo;un Fethi̇ Ve T&uuml;rkleşmesi̇&rdquo;.&nbsp;Ss. 69-109
            i&ccedil;inde Trabzon Tarihi(Siyasi Tarih). C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Milli Eğitim Bakanlığı.(2023) Uzman &Ouml;ğretmenlik Yetiştirme Programı &Ccedil;alışma Kitabı, Erişim
            Tarihi: 01/01/2024&nbsp;<a
                href="https://cdn.eba.gov.tr/oba/UZMAN_OGRETMENLIK_YETISTIRME_PROGRAMI_CALISMA__KITABI.pdf"
                target="_blank"
                rel="noopener noreferrer">https://cdn.eba.gov.tr/oba/UZMAN_OGRETMENLIK_YETISTIRME_PROGRAMI_CALISMA__KITABI.pdf</a>
        </p>
        <p>Neziroğlu, E. (2021, 2 7).&nbsp;<em>Aydınlanmanın Beşiği: Beşikd&uuml;z&uuml; K&ouml;y
            Enstit&uuml;s&uuml;.</em>&nbsp;12 22, 2022 tarihinde ayamfolklor.com:&nbsp;<a
            href="https://www.ayamfolklor.com/aydinlanmanin-besigi-besikduzu-koy-enstitusu/" target="_blank"
            rel="noopener noreferrer">https://www.ayamfolklor.com/aydinlanmanin-besigi-besikduzu-koy-enstitusu/</a>&nbsp;adresinden
            alındı</p>
        <p>Okur, Mehmet. 2022. &ldquo;T&uuml;rk Tarih&ccedil;iliğinde Mahmut&nbsp;Goloğlu&nbsp;ve Cumhuriyet Tarihi
            Yazıları &Uuml;zerine Bir Değerlendirme&rdquo;.&nbsp;Uluslararası&nbsp;Prof.Dr.Halil&nbsp;İnalcık Tarih Ve
            Tarih&ccedil;ilik Sempozyumu&nbsp;II:459-74.&nbsp;doi: 0.37879/9789751749994.2022.27.</p>
        <p>Olgundemir, A. (2022).&nbsp;<em>Saatli Maarif Takvimi</em>. 12 13, 2022 tarihinde
            https://apps.apple.com/us/app/saatli-maarif-takvimi:&nbsp;<a
                href="https://apps.apple.com/us/app/saatli-maarif-takvimi/id1501840430" target="_blank"
                rel="noopener noreferrer">https://apps.apple.com/us/app/saatli-maarif-takvimi/id1501840430</a>&nbsp;adresinden
            alındı</p>
        <p>&Ouml;cal, Mustafa. 1998. &ldquo;Cumhuriyet D&ouml;neminde T&uuml;rkiye&rsquo;de Din Eğitimi
            Ve &Ouml;ğretimi&rdquo;. T.C.&nbsp;Uludağ &Uuml;niversitesi İlahiyat Fak&uuml;ltesi, 241-68.</p>
        <p>&Ouml;ks&uuml;z, H. (2006). I.D&uuml;nya Savaşı Sırasında Rus Donanmasının Karadeniz Limanlarını
            Bombalaması.&nbsp;<em>Uluslararası Trabzon ve &Ccedil;evresi K&uuml;lt&uuml;r Ve Tarih,
                Sempozyumu</em>&nbsp;(s. 391-397). i&ccedil;inde Trabzon: T&uuml;rk Ocakları Trabzon Subeşi Yayınları.
        </p>
        <p>&Ouml;ks&uuml;z, Hikmet, Veysel&nbsp;Usta,&nbsp;ve Kenan İnan. 2009. Trabzon Ticaret Ve Sanayi Odası Tarihi
            1884-1950. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>&Ouml;ks&uuml;z, Hikmet. 2014. 20.Y&uuml;zyıl Başlarında Trabzon(Toplumsal Tarih Yazıları). Eser Ofset
            Matbaacılık.&nbsp;Serander&nbsp;Yayınları.</p>
        <p>&Ouml;ks&uuml;z, Hikmet. 2022. &ldquo;Trabzon&rsquo;da Rus İşgali Ve Muhacirlik&rdquo;.&nbsp;Ss. 515-35
            i&ccedil;inde Trabzon Tarihi (Siyasi Tarih). C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>&Ouml;ks&uuml;z, Melek. 2022. &ldquo;Osmanlı&nbsp;İmparatorluğu&rsquo;nun&nbsp;Değişim&nbsp;Ve
            D&ouml;n&uuml;ş&uuml;m&nbsp;Y&uuml;zyılındanTanzimat&rsquo;a&nbsp;Kadar Trabzon&rdquo;.&nbsp;Ss. 289-317
            i&ccedil;inde C. 1, edit&ouml;r H. &Ouml;ks&uuml;z, V.&nbsp;Usta,&nbsp;ve K. İnan. Trabzon: Trabzon Ticaret
            Ve Sanayi Odası.</p>
        <p>&Ouml;zcan Erdal, Burcu. 2023. &ldquo;General M. V.&nbsp;Frunze&rsquo;nin&nbsp;T&uuml;rkiye Ziyareti ve 1922
            T&uuml;rkiye-Ukrayna Dostluk ve Kardeşlik Antlaşması&rdquo;. T&uuml;rk D&uuml;nyası&nbsp;Araştırmaları Cilt:
            135 Sayı: 266, Ekim, 21-42.</p>
        <p>&Ouml;zdiş, Hamdi. 2008. &ldquo;Taşrada İktidar M&uuml;cadelesi: II. Abd&uuml;lhamid
            D&ouml;neminde&nbsp;Trabzon Vilayeti&rsquo;nde&nbsp;Eşraf, Siyaset ve Devlet (1876-1909), Ankara,
            2008.&rdquo; Doktora Tezi, Hacettepe &Uuml;niversitesi Sosyal Bilimler Enstit&uuml;s&uuml;, Ankara.</p>
        <p>&Ouml;zer, Ahmet. 1996. &ldquo;D&uuml;nden&nbsp;Bug&uuml;ne&nbsp;Trabzon&rsquo;da
            K&uuml;lt&uuml;r&rdquo;.&nbsp;Ss. 93-103 i&ccedil;inde Trabzon.
            İstanbul:&nbsp;T.C.K&uuml;lt&uuml;r&nbsp;Bakanlığı Yayınları.</p>
        <p>&Ouml;zt&uuml;rk, &Ouml;. (2020, 3 3).&nbsp;<em>Trabzon'dan Esintiler</em>. 12 28, 2022 tarihinde&nbsp;<a
            href="https://www.facebook.com/groups/108079095946806/search/?q=SOLOMON">https://www.facebook.com/groups/108079095946806/search/?q=SOLOMON</a>&nbsp;adresinden
            alındı</p>
        <p>Reisoğlu, Mustafa. 2022. &ldquo;Unutulan 4000 Yıllık Gelenek: Mayıs&nbsp;Yedi̇si̇&rdquo;. T Dergi.</p>
        <p>Sarıhan, Zeki. 1984.&nbsp;Kurtuluş Savaşı&nbsp;G&uuml;nl&uuml;ğ&uuml; II. &Ouml;ğretmen D&uuml;nyası
            Yayınları.</p>
        <p>Sarıhan, Zeki. 1985.&nbsp;Kurtuluş Savaşı&nbsp;G&uuml;nl&uuml;ğ&uuml; III. &Ouml;ğretmen D&uuml;nyası
            Yayınları.</p>
        <p>Sarıhan, Zeki. 1986. Zeki Sarıhan, Kurtuluş Savaşı G&uuml;nl&uuml;ğ&uuml; I. C. I. Ankara: &Ouml;ğretmen
            Yayınları.</p>
        <p>Sarıhan, Zeki. 1996. Kurtuluş Savaşı G&uuml;nl&uuml;ğ&uuml; IV. C. IV. Ankara: T&uuml;rk Tarih Kurumu.</p>
        <p>Sarınay, Yusuf. 1995. &ldquo;Pontus Meselesi Ve Yunanistan&rsquo;ın Politikası&rdquo;. Atat&uuml;rk Araştırma
            Merkezi Dergisi, Mart, 107-62.</p>
        <p>Saruhan,&nbsp;Emeti. 2020. &ldquo;Ma&ccedil;ka&nbsp;Ayanlığı&rsquo;ndan&nbsp;Yazma Sanatına Ey&uuml;boğlu
            Ailesi&rdquo;. T Dergi, 68-71.</p>
        <p>Serbestoğlu, İbrahim. 2006. &ldquo;Trabzon&nbsp;Vali̇si̇&nbsp;Cani̇kli̇
            Tayyar&nbsp;Mahmud&nbsp;Paşa&nbsp;İsyani&nbsp;Ve&nbsp;Cani̇kli̇z&acirc;deleri̇n&nbsp;Sonu
            (1805-1808)&rdquo;. Karadeniz İncelemeleri Dergisi 1(1):89-105.</p>
        <p><em>Şampiyon Trabzonspor!</em>&nbsp;(2022, 04 30). 04 01, 2024 tarihinde takagazete.com.tr:&nbsp;<a
            href="https://www.takagazete.com.tr/spor/sampiyon-trabzonspor-2-h243271.html" target="_blank"
            rel="noopener noreferrer">https://www.takagazete.com.tr/spor/sampiyon-trabzonspor-2-h243271.html</a>&nbsp;adresinden
            alındı</p>
        <p>Şen, &Ouml;mer. 1998. Trabzon Tarihi. Erhan Ofset Matbaacılık. Trabzon: Derya Kitabevi.</p>
        <p>Şenkardeşler, A. (2013).&nbsp;<em>Takvimlerin Toplumsal İşlevleri: Saatli Maarif
            Takvimi &Ouml;rneği.</em>Karab&uuml;k: T.C.Karab&uuml;k &Uuml;niversitesi Sosyal Bilimler
            Enstit&uuml;s&uuml; Sosyoloji Anabilim Dalı.</p>
        <p>Şimşek, Osman. 1993. Trabzon Belediye Tarihi I. C. 1. Trabzon: Trabzon Belediyesi.</p>
        <p>Şişko, Osman. 2009. &ldquo;Zigana&rsquo;da &ccedil;ığ faciası: 10 &ouml;l&uuml;&rdquo;. Milliyet. Geliş
            tarihi 01 Şubat 2024 (<a
                href="https://www.milliyet.com.tr/pembenar/zigana-da-cig-faciasi-10-olu-1051550">https://www.milliyet.com.tr/pembenar/zigana-da-cig-faciasi-10-olu-1051550</a>).
        </p>
        <p>T Dergi. 2021. &ldquo;Trabzon Ve Hatırlattıkları Dangalaklar&nbsp;Cemi̇yeti̇&rdquo;. T Dergi, 32.</p>
        <p>T Dergi. 2022. &ldquo;Mahşah&nbsp;Hanım&rdquo;. T Dergi, 65.</p>
        <p>T. C. MİLL&Icirc; EĞİTİM BAKANLIĞI TRABZON / ORTAHİSAR /&nbsp;Cudibey, Ortaokulu.
            2022. &ldquo;Cudi̇bey&nbsp;Ortaokulunun&nbsp;Tari̇h&ccedil;esi̇&rdquo;. Geliş tarihi 11 Nisan 2024 (<a
                href="https://cudibey.meb.k12.tr/icerikler/icerik_250733" target="_blank"
                rel="noopener noreferrer">https://cudibey.meb.k12.tr/icerikler/icerik_250733</a>).</p>
        <p>Tarak&ccedil;ıoğlu, Mustafa Reşit. 1986. Trabzon&rsquo;un Yakın Tarihi. Trabzon: Karadeniz
            Teknik &Uuml;niversitesi.</p>
        <p>Tarak&ccedil;ıoğlu, Mustafa Reşit. 2006. Tarak&ccedil;ıoğlu, M. Reşit Mustafa Reşit Tarak&ccedil;ıoğlu
            Hayatı, Hatıratı ve Trabzon&rsquo;un Yakın Tarihi.&nbsp;edit&ouml;r&nbsp;V. Usta ve H. &Ouml;ks&uuml;z.
            Trabzon:&nbsp;Serander.</p>
        <p><em>Tarihte Bug&uuml;n&nbsp;</em>. (2006). 02 01, 2024 tarihinde www.ataturktoday.com:&nbsp;<a
            href="https://www.ataturktoday.com/AtaturkGunlugu/SubatFebruary/3.htm" target="_blank"
            rel="noopener noreferrer">https://www.ataturktoday</a><a
            href="https://www.ataturktoday.com/AtaturkGunlugu/SubatFebruary/3.htm" target="_blank"
            rel="noopener noreferrer">.com/AtaturkGunlugu/SubatFebruary/3.htm</a>&nbsp;adresinden alındı</p>
        <p>Taşkıran, C. (2022, 12 6).&nbsp;<em>Mustafa Suphi (1883-1921).</em>&nbsp;1 2, 2023 tarihinde
            ataturkansiklopedisi:&nbsp;<a href="https://ataturkansiklopedisi.gov.tr/bilgi/mustafa-suphi-1883-1921/"
                                          target="_blank"
                                          rel="noopener noreferrer">https://ataturkansiklopedisi.gov.tr/bilgi/mustafa-suphi-1883-1921/</a>&nbsp;adresinden
            alındı</p>
        <p>Tekindağ, M. C. Şehabettin. 1979. &ldquo;Trabzon&rdquo;.&nbsp;Ss. 455-77 i&ccedil;inde İslam Ansiklopedisi.
            C. XII/1. İstanbul: Milli Eğitim Bakanlığı.</p>
        <p>Tellioğlu, İbrahim. 2022. &ldquo;Orta &Ccedil;ağda Trabzon Tarihinden Bir Kesit(1204-1461)&rdquo;.&nbsp;Ss.
            35-69 i&ccedil;inde Trabzon Tarihi Siyasi Tarih. C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Tosun, Murat Dursun. 2023. &ldquo;1911&rsquo;de Trabzon&rsquo;da&nbsp;Fransız&nbsp;Rahibeleri̇&rdquo;.
            www.muratdursuntosun.wordpress.com. Geliş tarihi (<a
                href="https://muratdursuntosun.wordpress.com/?s=1911%E2%80%99DE+TRABZON%E2%80%99DA+FRANSIZ+RAH%C4%B0BELER%C4%B0"
                target="_blank"
                rel="noopener noreferrer">https://muratdursuntosun.wordpress.com/?s=1911%E2%80%99DE+TRABZON%E2%80%99DA+FRANSIZ+RAH%C4%B0BELER%C4%B0</a>).
        </p>
        <p>Trabzon Merkez Fen Lisesi. 2023. &ldquo;Trabzon Fen Lisesi Tarih&ccedil;e&rdquo;.
            www.trabzonfenlisesi.meb.k12.tr. Geliş tarihi 08 Nisan 2024 (<a
                href="https://trabzonfenlisesi.meb.k12.tr/icerikler/trabzon-fen-lisesi-tarihce_3893799.html"
                target="_blank"
                rel="noopener noreferrer">https://trabzonfenlisesi.meb.k12.tr/icerikler/trabzon-fen-lisesi-tarihce_3893799.html</a>).
        </p>
        <p><em>Trabzonsporun İlk Şampiyonluğu (1975-76).</em>&nbsp;(2012, 9 12). 01 05, 2022 tarihinde
            kuzeyinrengi.blogspot.com:&nbsp;<a
                href="http://kuzeyinrengi.blogspot.com/2012/09/trabzonsporun-ilk-sampiyonlugu-1975-76-6.html"
                target="_blank"
                rel="noopener noreferrer">http://kuzeyinrengi.blogspot.com/2012/09/trabzonsporun-ilk-sampiyonlugu-1975-76-6.html</a>&nbsp;adresinden
            alındı</p>
        <p>T&uuml;rkiye Atletizm Federasyonu. 2023. &ldquo;Trabzon Yarı Maratonu yapıldı.&rdquo; https://www.taf.org.tr.
            Geliş tarihi 04 Nisan 2024 (<a
                href="https://www.taf.org.tr/Haber/Detay/trabzon-yari-maratonu-yapildi#:~:text=%C3%9Clkemizde%206%20%C5%9Eubat'ta%20ya%C5%9Fanan,Uluslararas%C4%B1%20Trabzon%20Yar%C4%B1%20Maratonu%20ko%C5%9Fuldu."
                target="_blank" rel="noopener noreferrer">https://www.taf.org.tr/Haber/Detay/trabzon-</a><a
                href="https://www.taf.org.tr/Haber/Detay/trabzon-yari-maratonu-yapildi#:~:text=%C3%9Clkemizde%206%20%C5%9Eubat'ta%20ya%C5%9Fanan,Uluslararas%C4%B1%20Trabzon%20Yar%C4%B1%20Maratonu%20ko%C5%9Fuldu."
                target="_blank" rel="noopener noreferrer">yari</a><a
                href="https://www.taf.org.tr/Haber/Detay/trabzon-yari-maratonu-yapildi#:~:text=%C3%9Clkemizde%206%20%C5%9Eubat'ta%20ya%C5%9Fanan,Uluslararas%C4%B1%20Trabzon%20Yar%C4%B1%20Maratonu%20ko%C5%9Fuldu."
                target="_blank"
                rel="noopener noreferrer">-maratonu-yapildi#:~:text=%C3%9Clkemizde%206%20%C5%9Eubat'ta%20ya%C5%9Fanan,Uluslararas%C4%B1%20Trabzon%20Yar%C4%B1%20Maratonu%20ko%C5%9Fuldu.</a>).
        </p>
        <p>U&ccedil;arol, Rıfat. 2006. Siyasi Tarih (1789-2001). 6. bs. İstanbul: Der.</p>
        <p>Usta, Veysel. 1999.&nbsp;Anabasis&rsquo;ten&nbsp;Atat&uuml;rk&rsquo;e&nbsp;Seyehatnamelerde&nbsp;Trabzon.
            1.Baskı. Trabzon:&nbsp;Serander.</p>
        <p>Usta, Veysel. 2009. Balkan Harbi&rsquo;nde 87. Alay Trabzon
            G&ouml;n&uuml;ll&uuml;leri.&nbsp;Serander&nbsp;Yayınları.</p>
        <p>Usta, Veysel. 2014. &ldquo;Tanıkların Kaleminden Rus İşgalinden Sonra Trabzon&rsquo;un Durumu&rdquo;.
            Karadeniz İncelemeleri Dergisi 17(17):136-72.&nbsp;doi: 10.18220/kid.36047.</p>
        <p>Usta, Veysel. 2019. &ldquo;Trabzon Metropoliti&nbsp;Hrisantos&rsquo;un&nbsp;Paris Konferansı&rsquo;na Sunduğu
            Muhtıranın Tenkidi&rdquo;.&nbsp;Journal&nbsp;of&nbsp;Turkish&nbsp;Studies&nbsp;6(Volume
            6&nbsp;Issue&nbsp;2):973-84.&nbsp;doi: 10.7827/TurkishStudies.2258.</p>
        <p>Usta, Veysel. 2022. &ldquo;Trabzon&rsquo;da Tiyatro&rdquo;.&nbsp;Ss. 393-437 i&ccedil;inde Trabzon Tarihi
            (K&uuml;lt&uuml;r Ve Medeniyet). C. II. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Uzun, Mustafa İsmet. 1997. &ldquo;Ham&acirc;m&icirc;z&acirc;de&nbsp;Mehmed&nbsp;İhsan&rdquo;. T&uuml;rkiye
            Diyanet Vakfı İslam Ansiklopedisi XV:435-36.</p>
        <p>Uzun,&nbsp;Pirağa. 1980. Her y&ouml;n&uuml;yle ilimiz&nbsp;Trabzonun&nbsp;durumu. Trabzon? Uzun.</p>
        <p>&Uuml;&ccedil;&uuml;nc&uuml;, U. (2015). Trabzon&rsquo;da 10 Temmuz 1919 Cephanelik Patlaması.&nbsp;<em>Karadeniz
            İncelemeleri Dergisi</em>, 161-176 .</p>
        <p>&Uuml;&ccedil;&uuml;nc&uuml;, Uğur. 2010. &ldquo;T&uuml;rkiye B&uuml;y&uuml;k Millet Meclisinin İlk Şehit
            Milletvekilleri&rdquo;. Uluslararası Sosyal Araştırmalar Dergisi 3(12):432-40.</p>
        <p>&Uuml;&ccedil;&uuml;nc&uuml;, Uğur. 2022. &ldquo;Mi̇lli̇ M&uuml;cadelede
            D&ouml;nemi̇&rsquo;nde&nbsp;Trabzon&rdquo;.&nbsp;Ss. 535-71 i&ccedil;inde Trabzon Tarihi (K&uuml;lt&uuml;r
            Ve Medeniyet). C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>&Uuml;nalan, İbrahim. 2023. &ldquo;Trabzonlu Şairlerin Şiirlerindeki Arap&ccedil;a
            Unsurlara &Ouml;rnekler&rdquo;. BENGİ D&uuml;nya Y&ouml;r&uuml;k-T&uuml;rkmen Araştırmaları Dergisi
            (2):193-208.&nbsp;doi: 10.58646/bengi.1349677.</p>
        <p>Vikipedi. 2024. &ldquo;Hafız Mehmet&rdquo;.&nbsp;Vikipedi.</p>
        <p>www.tenmak.gov.tr. 2022. &ldquo;Prof. Dr. İbrahim Din&ccedil;er -&nbsp;Tenmak&rdquo;. Geliş tarihi 11 Nisan
            2024 (<a href="https://www.tenmak.gov.tr/prof-dr-ibrahim-dincer.html" target="_blank"
                     rel="noopener noreferrer">https://www.tenmak.gov.tr/prof-dr-ibrahim-dincer.html</a>).</p>
        <p>www.ziraatbank.com.tr. (tarih yok).&nbsp;<em>Bankamızın Kuruluşu</em>. 29 12, 2023 tarihinde
            www.ziraatbank.com.tr:&nbsp;<a
                href="https://www.ziraatbank.com.tr/tr/bankamiz/hakkimizda/bankamiz-tarihcesi" target="_blank"
                rel="noopener noreferrer">https://www.ziraatbank.com.tr/tr/bankamiz/hakkimizda/bankamiz-tarihcesi</a>&nbsp;adresinden
            alındı</p>
        <p>Yazıcı, Nuri. 2003. Milli M&uuml;cadelede Canik Sancağında&nbsp;Pontus&ccedil;u&nbsp;Faaliyetler (1918-1922).
            Ankara: &Ccedil;izgi Kitabevi.</p>
        <p>Yıkıcı,&nbsp;Abdulgazi,&nbsp;ve Tuğba Salman. 2022. &ldquo;Kadın Dostu Kent Bağlamında Kadın Ve Kent
            İlişkisi: Trabzon &Ouml;rneği&rdquo;. Mehmet Akif Ersoy &Uuml;niversitesi İktisadi ve İdari Bilimler
            Fak&uuml;ltesi Dergisi 9(3):1677-1708.&nbsp;doi: 10.30798/makuiibf.979763.</p>
        <p>Yılmaz, &Ccedil;ağla. 2020. &ldquo;&Ccedil;ağla Yılmaz, Trabzon Halkevi Dergisi İnan&rsquo;da Yayımlanan
            Folklor Metinleri &Uuml;zerine Bir İnceleme&rdquo;. Akademi Sosyal Bilimler Dergisi 7(19):33-47.&nbsp;doi:
            10.34189/asbd.7.19.003.</p>
        <p>Yılmaz, &Ouml;zg&uuml;r. 2022. &ldquo;Trabzon Limanı&rdquo;.&nbsp;Ss. 115-53 i&ccedil;inde Trabzon Tarihi
            (K&uuml;lt&uuml;r Ve Medeniyet). C. II. Trabzon: Trabzon Ticaret Ve Sanayi Odası.</p>
        <p>Yılmaz, &Ouml;zg&uuml;r. 2017. &ldquo;Veba, Kolera ve Salgınlar: Trabzon&rsquo;da Halk Sağlığı ve Sağlık
            Kurumları (1804-1895)&rdquo;. Mavi Atlas 5(1):172-200.&nbsp;doi: 10.18795/gumusmaviatlas.309429.</p>
        <p>Y&uuml;ksel, Ayhan. 2005. Doğu Karadeniz Araştırmaları. 1.Baskı. Kitabevi.</p>
        <p>Zaman, Mehmet. 2016. Trabzon&rsquo;da Ormanlar Ve&nbsp;Ormancılık. C. II. Ankara: Trabzon Ticaret Ve Sanayi
            Odası.</p>
    </>
);
const anotherData = {
    about: {
        title: 'Hakkımızda',
        content: 'Tarihi, Miletoslular’ın, M.Ö. 7. Yüzyılda Karadeniz’e gelerek kıyılarda koloni kentleri kurmalarına dayanan Trabzon, Anadolu’nun olduğu kadar dünyanın da en eski şehirlerinden biridir. Tarih boyunca birçok milletin hâkimiyetine giren Trabzon, bu milletlerin hüküm sürdükleri dönemlerde önemli olaylara tanıklık etmiştir. Savaşlar, yıkılan devletler, önemli tarihi eserler, şahsiyetler, sanatçılar, düşünürler Trabzon Tarihi’nin bir parçası olmuştur. Günümüzde geçmişin izini sürmek kolay bir çaba olarak algılansa da, bunun tahmin edilenden zor bir durum olduğu ortadadır. Bizler, Trabzon Tarihi’nde kendisine yer bulan olayları, mekânları, kişileri dijital ortamda tanıtmak amacıyla, kendimiz için büyük, istifade edecekler için küçük sayılabilecek bir çabanın içerisine girdik. Girdiğimizin zor bir çabadan öte, bir dehliz olduğunu ve bu dehlizden çıkmanın ne kadar zor olduğunu anladık. Henüz lisede öğrenim gören ve 2204 TÜBİTAK Ortaöğretim Öğrencileri Araştırma Projeleri Yarışması kapsamında yerel tarihi Trabzon Tarihi özelinde öğrencilere sevdirmek, yerel tarihe öğrencilerin ilgisini çekmek amacıyla hazırladığımız Trabzon Dijital Maarif Takvimi Projemiz kapsamında bir dijital takvim tasarladık. Ülkemizde insanımızın bilgiye ulaşmak için kullandığı yöntemlerden biri de basılı takvimlerde yer alan bilgileri okumaktır. Günümüzde basılı takvimler yaygın olarak kullanılmakla birlikte, artık bu takvimlerin dijital versiyonlarıyla elektronik ortamda karşılaşmak mümkündür. Tarihi kişiliklerin bile elektronik ortamda hayatını anlatan takvimlerin varlığını tespit ettik. Bizler bu takvimleri örnek alarak yazılım dilini kullanarak Trabzon Tarihi hakkında bir takvim tasarladık. Zaman içerisinde takvimde yer alan bilgiler hakkında oluşturduğumuz kaynakçayı sizlerle paylaşacağız. Tasarladığımız takvimin öncelikle öğrenci arkadaşlarımıza ve diğer kullanıcılara Trabzon Tarihi hakkında önemli bilgileri sunacağına inanıyoruz. İlginiz, önerileriniz, eleştirileriniz bizim için önemlidir. Şimdiden kullanıcılara teşekkür eder, sizlerin istifadesinin bizler için mutluluk vesilesi olduğunu ifade etmek isteriz.',
    },
    source: {
        title: 'Kaynakça',
        content: <Resources/>,
    },

};

export default ReadSection;