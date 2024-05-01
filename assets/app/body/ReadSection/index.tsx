import TextAccordion from "./TextAccordion.tsx";
import {HelperBox} from "./HelperBox.tsx";
import {useContext, useEffect, useMemo, useState} from "react";
import {aboutSourceContext, dateContext} from "../../components/Contexts.tsx";
import {getDateByID} from "../../components/Hooks.tsx";
import {Typography} from "@material-tailwind/react";

function scrollToView() {
    document.querySelector('#read_section')?.scrollIntoView({
        behavior: 'smooth',
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
        <div className={'relative grid grid-rows-[auto_auto] md:grid-rows-none md:grid-cols-6 w-full'}>
            <div id={'read_section'} className={'md:col-span-2 row-span-1 text-center my-2 px-5'}>
                <HelperBox/>
            </div>
            <div className={'md:col-span-4 row-span-1 text-center min-h-[65vh] px-5'}>
                {loading ? (
                    <TextLoading/>
                ) : (
                    <TextAccordion events={aboutSource ? Object.values(anotherData) : events}/>
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
const anotherData = {
    about: {
        title: 'Hakkımızda',
        content: 'Tarihi, Miletoslular’ın, M.Ö. 7. Yüzyılda Karadeniz’e gelerek kıyılarda koloni kentleri kurmalarına dayanan Trabzon, Anadolu’nun olduğu kadar dünyanın da en eski şehirlerinden biridir. Tarih boyunca birçok milletin hâkimiyetine giren Trabzon, bu milletlerin hüküm sürdükleri dönemlerde önemli olaylara tanıklık etmiştir. Savaşlar, yıkılan devletler, önemli tarihi eserler, şahsiyetler, sanatçılar, düşünürler Trabzon Tarihi’nin bir parçası olmuştur. Günümüzde geçmişin izini sürmek kolay bir çaba olarak algılansa da, bunun tahmin edilenden zor bir durum olduğu ortadadır. Bizler, Trabzon Tarihi’nde kendisine yer bulan olayları, mekânları, kişileri dijital ortamda tanıtmak amacıyla, kendimiz için büyük, istifade edecekler için küçük sayılabilecek bir çabanın içerisine girdik. Girdiğimizin zor bir çabadan öte, bir dehliz olduğunu ve bu dehlizden çıkmanın ne kadar zor olduğunu anladık. Henüz lisede öğrenim gören ve 2204 TÜBİTAK Ortaöğretim Öğrencileri Araştırma Projeleri Yarışması kapsamında yerel tarihi Trabzon Tarihi özelinde öğrencilere sevdirmek, yerel tarihe öğrencilerin ilgisini çekmek amacıyla hazırladığımız Trabzon Dijital Maarif Takvimi Projemiz kapsamında bir dijital takvim tasarladık. Ülkemizde insanımızın bilgiye ulaşmak için kullandığı yöntemlerden biri de basılı takvimlerde yer alan bilgileri okumaktır. Günümüzde basılı takvimler yaygın olarak kullanılmakla birlikte, artık bu takvimlerin dijital versiyonlarıyla elektronik ortamda karşılaşmak mümkündür. Tarihi kişiliklerin bile elektronik ortamda hayatını anlatan takvimlerin varlığını tespit ettik. Bizler bu takvimleri örnek alarak yazılım dilini kullanarak Trabzon Tarihi hakkında bir takvim tasarladık. Zaman içerisinde takvimde yer alan bilgiler hakkında oluşturduğumuz kaynakçayı sizlerle paylaşacağız. Tasarladığımız takvimin öncelikle öğrenci arkadaşlarımıza ve diğer kullanıcılara Trabzon Tarihi hakkında önemli bilgileri sunacağına inanıyoruz. İlginiz, önerileriniz, eleştirileriniz bizim için önemlidir. Şimdiden kullanıcılara teşekkür eder, sizlerin istifadesinin bizler için mutluluk vesilesi olduğunu ifade etmek isteriz.',
    },
    source: {
        title: 'Kaynakça',
        content: (
            <>
                <p>(tarih yok). 12 28, 2022 tarihinde trabzon.ktb.gov.tr:
                    https://trabzon.ktb.gov.tr/TR-57678/santa-maria-kilisesi.html adresinden al&#305;nd&#305; 61 medya.
                    2022. &ldquo;Trabzonspor taraftar&#305; &#304;stanbul&rsquo;da yine rekor k&#305;rd&#305;&rdquo;.
                    Trabzon Haber - Trabzon Son dakika Haber. Geli&#351; tarihi 13 Nisan 2024
                    (https://www.61medya.com/haber/13293502/trabzonspor-taraftari-istanbulda-yine-rekor-kirdi).</p>

                <p>61 Saat. 2023. &ldquo;Trabzon&rsquo;da Muhte&#351;em Solot&uuml;rk G&ouml;sterisi! (24 Ekim
                    2023)&rdquo;. 61 Saat TV. Geli&#351; tarihi 04 Nisan 2024
                    (https://www.youtube.com/watch?v=k63AMy5dFeg).</p>

                <p>Acun, F. (2020). Dijital Tarih ve Dijital Tarih&ccedil;ili&#287;in Tarih Yaz&#305;m&#305;na
                    Etkisi &Uuml;zerine. Tarih Yaz&#305;m&#305; Journal Of H&#305;storiography, 66-90.
                    A&ccedil;&#305;c&#305;, Funda Kurak, ve Zeynep Nilsun Konako&#287;lu.
                    2018. &ldquo;K&uuml;lt&uuml;rel Miras&#305;n &#304;zlerini Kent M&uuml;zelerinde S&uuml;rmek:
                    Trabzon M&uuml;zeleri / Following the Traces of Cultural Heritage Through City Museums: Trabzon
                    Museums&rdquo;. Journal of History Culture and Art Research 7(3):668-82. doi:
                    10.7596/taksad.v7i3.1524.</p>

                <p>Ahunbay, Zeynep. 2018. &ldquo;M&uuml;zeme Dokunma: Trabzon Ayasofyas&#305;&rdquo;. Mimarl&#305;k
                    Dergisi, 42-45.</p>

                <p>Ak, Musa. 2006. &ldquo;II. Me&#351;ruti&#775;yet D&ouml;nemi&#775;&rsquo;nde Meslek&icirc; Ve
                    Tekni&#775;k E&#287;i&#775;ti&#775;m Okullari (1908 &ndash; 1918)&rdquo;. Y&Uuml;KSEK L&#304;SANS
                    TEZ&#304;, T.C. PAMUKKALE &Uuml;N&#304;VERS&#304;TES&#304; SOSYAL B&#304;L&#304;MLER
                    ENST&#304;T&Uuml;S&Uuml; TAR&#304;H ANAB&#304;L&#304;M DALI YAKIN&Ccedil;A&#286; B&#304;L&#304;M
                    DALI, Denizli.</p>

                <p>Akarca, Halit D&uuml;ndar. 2014. &ldquo;&#304;LM&Icirc; &#304;&#350;GAL:
                    B&#304;R&#304;NC&#304; C&#304;HAN HARB&#304;&rsquo;NDE RUS B&#304;L&#304;M ADAMLARININ TRABZON VE
                    C&#304;VARINDA GER&Ccedil;EKLE&#350;T&#304;RD&#304;KLER&#304; ARKEOLOJ&#304;K
                    FAAL&#304;YETLER&rdquo;. Karadeniz &#304;ncelemeleri Dergisi 17(17):21-30. doi:
                    10.18220/kid.44835.</p>

                <p>Akbal, &#304;. (2002). Milli M&uuml;cadele'de
                    Trabzon'daki &#304;ttihat&ccedil;&#305; &Ouml;rg&uuml;tlenme Ve Yahya Kahya Meselesi.
                    Uluslararas&#305; Tarih-Dil-Edebiyat Sempozyumu (s. 421-466). Trabzon : T.C Trabzon
                    Valili&#287;i &#304;l K&uuml;lt&uuml;r M&uuml;d&uuml;rl&uuml;&#287;&uuml; Yay&#305;nlar&#305;.
                    Akbal, &#304;smail. 2008. Mi&#775;lli&#775; M&uuml;cadele D&ouml;nemi&#775;nde Trabzonda Muhalefet.
                    1.Bask&#305;. Trabzon: Serander.</p>

                <p>Ak&ccedil;al&#305; Avc&#305;, A., &amp; Aslan, E. (2007). Yerel Tarih ve
                    Tarih &Ouml;&#287;retimindeki Rol&uuml;,. Dokuz Eyl&uuml;l &Uuml;niversitesi Buca E&#287;itim
                    Fak&uuml;ltesi Dergisi 21: 80-88 (2007)(21), 80-88. Aksoy, F. (2009). Osmanl&#305; &Ouml;ncesi
                    D&ouml;nemde Trabzon &#350;ehri. Elaz&#305;&#287;: T.C. F&#305;rat &Uuml;niversitesi Sosyal Bilimler
                    Enstit&uuml;s&uuml; Y&uuml;ksek Lisans Tezi Tarih Anabilim Dal&#305; . Aksoy, Volkan.
                    2022. &ldquo;II. Me&#351;ruti&#775;yet D&ouml;nemi&#775;nde Trabzon&rsquo;da Meydana Gelen
                    De&#287;i&#351;im Ve Geli&#775;&#351;meler&rdquo;. Ss. 453-515 i&ccedil;inde Trabzon Tarihi (Siyasi
                    Tarih). C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p></p>

                <p>Akta&#351;, Esat. 2016. Trabzon&rsquo;da Sa&#287;l&#305;k. C. II. Ankara: Trabzon Ticaret Ve Sanayi
                    Odas&#305;.</p>

                <p>Albayrak, H. (2015). Birinci D&uuml;nya Sava&#351;&#305; Y&#305;llar&#305;nda Trabzon'da
                    Rus-Ermeni-Rum Mez&acirc;limi (1914-1918). Ankara: Trabzon B&uuml;y&uuml;k&#351;ehir Belediyesi
                    K&uuml;lt&uuml;r ve Sosyal &#304;&#351;ler Dairesi
                    Ba&#351;kanl&#305;&#287;&#305; Yay&#305;nlar&#305;. Alik&#305;l&#305;&ccedil;, D&uuml;ndar.
                    2013. &ldquo;Ba&#351;timar&rsquo;in Mazlum &#350;ehi&#775;di&#775; Hafiz Mehmed Bey&rdquo;. Prof.
                    Dr. D&uuml;ndar Alik&#305;l&#305;&ccedil;. Geli&#351; tarihi 27 Ocak 2024
                    (https://dundaralikilic.wordpress.com/makalelerim/bastimarin-mazlum-sehidi-hafiz-mehmed-bey/).</p>

                <p>Alkan, Necmettin. 2016. Ali &#350;&uuml;kr&uuml; Bey&rsquo;in Makaleleri Medeniyet, Tarih Ve
                    Siyaseti. &#304;stanbul: Trabzon B&uuml;y&uuml;k&#351;ehir Belediyesi K&uuml;lt&uuml;r Ve
                    Sosyal &#304;&#351;ler Dairesi Ba&#351;kanl&#305;&#287;&#305;.</p>

                <p>Anonim. 2016a. &ldquo;Trabzon&rsquo;da S&#305;rad&#305;&#351;&#305; Bir Vali: Kadri Bey
                    (Nam&#305;di&#287;er Deli Kadri)&rdquo;. Geli&#351; tarihi 20 Ocak 2024
                    (https://www.facebook.com/FotografTrabzon/photos/a.582178501800361/1318845858133618/?type=3&amp;locale=tr_TR).</p>

                <p>Anonim. 2016b. &ldquo;Trabzon&rsquo;da S&#305;rad&#305;&#351;&#305; Bir Vali: Kadri Bey
                    (Nam&#305;di&#287;er Deli Kadri)&rdquo;. Geli&#351; tarihi 20 Ocak 2024
                    (https://www.facebook.com/FotografTrabzon/photos/a.582178501800361/1318845858133618/?type=3&amp;locale=tr_TR).</p>

                <p>Anonim. 2023a. &ldquo;Kenan Evren&rsquo;in 1980 Anayasas&#305;&rsquo;n&#305; Tan&#305;tma
                    Konu&#351;malar&#305; &ndash; 1&rdquo;. http://www.ankahukuk.com. Geli&#351; tarihi 03 Nisan 2024
                    (http://www.ankahukuk.com/kenan-evrenin-1980-anayasasini-tanitma-konusmalari/7/).</p>

                <p>Anonim. 2023b. &ldquo;Trabzon Tarihinde &#304;z
                    B&#305;rakanlar! &#350;&uuml;kr&uuml; Sara&ccedil;o&#287;lu Kimdir?&rdquo; Eyl&uuml;l 13.</p>

                <p>Anonim. 2024a. &ldquo;#BizeHerYerTrabzon&rdquo;. Geli&#351; tarihi 21 Ocak 2024
                    (https://www.trabzonspor.org.tr/tr/kulup/tarihce).</p>

                <p>Anonim. 2024b. &ldquo;Kisarna Maden Suyu&rdquo;. &#350;irket Tarihi. Geli&#351; tarihi 27 &#350;ubat
                    2024 (http://www.kisarnamadensuyu.com/sirket.html).</p>

                <p>Anonim. 2024c. &ldquo;Kurucular | DSK&rdquo;. https://dsk.org.tr/. Geli&#351; tarihi 26 Ocak 2024
                    (https://dsk.org.tr/darussafaka-ailesi/kurucular/).</p>

                <p>Anonim. 2024d. &ldquo;TRABZON&rsquo;DA SIRADI&#350;I B&#304;R VAL&#304;: KADR&#304; BEY
                    (NAMID&#304;&#286;ER DEL&#304; KADR&#304;)&rdquo;.</p>

                <p>Anonim. t.y.-a. &ldquo;#BizeHerYerTrabzon&rdquo;. Geli&#351; tarihi 21 Ocak 2024
                    (https://www.trabzonspor.org.tr/tr/kulup/tarihce).</p>

                <p>Anonim. t.y.-b. &ldquo;Tarih&ccedil;e 27 Mart 2024 tarihinde kayna&#287;&#305;ndan ar&#351;ivlendi.
                    Eri&#351;im tarihi: 27 Mart 2024.&rdquo; Tarh&ccedil;e. Geli&#351; tarihi 27 Mart 2024
                    (https://www.trabzon.bel.tr/Web/Tarihce).</p>

                <p>Arslan, Firdevs. 2014. &ldquo;Trabzon Vali&#775;si&#775; Kadri&#775; Pa&#351;a D&ouml;nemi&#775;nde
                    Trabzon (1892&ndash;1903)&rdquo;. Y&uuml;ksek Lisans Tezi, Karadeniz Teknik &Uuml;niversitesi Sosyal
                    Bilimler Enstit&uuml;s&uuml;, Trabzon.</p>

                <p>Arslan, Zehra. 2011. &ldquo;Demokrat Parti D&ouml;neminde Trabzon (1950-1960)&rdquo;. Karadeniz
                    Teknik &Uuml;niversitesi Sosyal Bilimler Enstit&uuml;s&uuml; Tarih Anabilim Dal&#305; Tarih
                    Program&#305;, Trabzon.</p>

                <p>Aslan, B. (2000). I. D&uuml;nya Sava&#351;&#305; Esnas&#305;nda &quot;Azerbaycan
                    T&uuml;rkleri&quot;nin &quot;Anadolu T&uuml;rkleri&rsquo;ne&quot;Karda&#351; K&ouml;me&#287;i
                    (Yard&#305;m&#305;)&quot; Ve Bak&uuml; M&uuml;sl&uuml;man Cemiyet-i Hayriyesi. Ankara: Atat&uuml;rk
                    K&uuml;lt&uuml;r Merkezi Ba&#351;kanl&#305;&#287;&#305; Yay&#305;nlar. Aslan, Z. (2022 , 5 17).
                    Karadeniz Teknik &Uuml;niversitesi (KT&Uuml;). Ocak 2, 2024 tarihinde ataturkansiklopedisi.gov.t:
                    https://ataturkansiklopedisi.gov.tr/bilgi/karadeniz-teknik-universitesi-ktu/ adresinden
                    al&#305;nd&#305; Atalay, Sevgi. 2018. &ldquo;Trabzon &ndash; G&uuml;m&uuml;&#351;hane
                    Aras&#305;ndaki&#775; Tarihi&#775; &#304;pek Ve G&ouml;&ccedil; Yolu&rdquo;.
                    Kafda&#287;&#305; 3(2):130-49.</p>

                <p>Ayar, Mesut. 2005. &ldquo;Osmanli Devleti&#775;&rsquo;nde Kolera
                    Salgini: &#304;stanbul &Ouml;rne&#287;i&#775; (1892 &ndash; 1895)&rdquo;. Doktara Tezi, T.C.
                    Marmara &Uuml;niversitesi T&uuml;rkiyat Ara&#351;t&#305;rmalar&#305; Enstit&uuml;s&uuml; Tarih
                    Anabilimdal&#305; Yak&#305;n&ccedil;a&#287; Tarihi Bilimdal&#305;, &#304;stanbul.</p>

                <p>Ayg&uuml;n, Necmettin. 2016. Karadeniz&rsquo;den Osmanl&#305; Ekonomisine Bak&#305;&#351;. C. I.
                    Ankara: Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>Bal, Mehmet Akif. 2009. Trabzon Kronolojisi(M.&Ouml;.800 - M.S.2010) Kurulu&#351;undan Bug&uuml;ne
                    Trabzon Tarihi. &#304;stanbul.Trabzon Kitapl&#305;&#287;&#305; III.</p>

                <p>Bal, Mehmet Akif. 2012. &ldquo;Trabzon&rsquo;dan D&uuml;nyaya A&ccedil;&#305;lan
                    Uluslararas&#305; Bir Aile: Nemlizadeler&rdquo;. &#304;lkhaber Gazetesi 2.</p>

                <p>Ba&#351;ar, S. (2022, 07 01). Trabzon'un fethi tarihi, 15 A&#287;ustos olarak resmile&#351;ti. 12 26,
                    2022 tarihinde www.dha.com.tr:
                    https://www.dha.com.tr/gundem/trabzonun-fethi-tarihi-15-agustos-olarak-resmilesti-2094539 adresinden
                    al&#305;nd&#305; Ba&#351;aran, Y. (2015, 10 4). 1810 Y&#305;l&#305;nda Ruslar&#305; Sargana Burnunda
                    Denize D&ouml;ken &#350;ebinkarahisar Taburu. 12 27, 2023 tarihinde Trabzon'dan Esintiler:
                    https://www.facebook.com/groups/108079095946806/permalink/885194311568610 adresinden
                    al&#305;nd&#305; Ba&#351;kan, &#350;. (2020). 1416-1461 Y&#305;llar&#305; Aras&#305;nda Trabzon Rum
                    Devleti. &#304;stanbul: T.C. &#304;stanbul Ayd&#305;n &Uuml;niversitesi
                    Lisans&uuml;st&uuml; E&#287;itim Enstit&uuml;s&uuml;, Tarih Ana Bilim Dal&#305;, Tarih Bilim
                    Dal&#305; . Ba&#351;kaya, M. (2022, 11 14). Trabzon Havaliman&#305;&rsquo;n&#305;n Hik&acirc;yesi. 4
                    1, 2024 tarihinde www.takagazete.com.tr:
                    https://www.takagazete.com.tr/trabzon-havalimaninin-hikyesi-makale,159310.html adresinden
                    al&#305;nd&#305; Ba&#351;kaya, M. (2022, 12 5). Trabzon'un &#304;lk Kad&#305;n Milletvekili. 4 1,
                    2024 tarihinde www.takagazete.com.tr:
                    https://www.takagazete.com.tr/trabzonun-ilk-kadin-milletvekili-makale,159370.html adresinden
                    al&#305;nd&#305; Ba&#351;kaya, Muzaffer. 2014. &ldquo;Cumhuri&#775;yeti&#775;n &#304;lk Yillarinda
                    Trabzon&rsquo;da Ekonomi&#775;k Hayat(1923-1950)&rdquo;. Doktara Tezi, Karadeniz
                    Teknik &Uuml;niversitesi, Sosyal Bilimler Enstit&uuml;s&uuml;, Trabzon.</p>

                <p>Ba&#351;kaya, Muzaffer. 2018a. &ldquo;Cumhuri&#775;yeti&#775;n &#304;lk Yillarinda Trabzon&rsquo;da
                    Mi&#775;lli&#775; Bayram Kutlamalari (1923-1950)&rdquo;. nternational Journal of Social Humanities
                    Sciences Research (JSHSR). doi: I 5. 3201-3215. 10.26450/jshsr.713.</p>

                <p>Ba&#351;kaya, Muzaffer. 2018b. &ldquo;Osmanlidan Cumhuri&#775;yete Bi&#775;r Kurumun
                    Tari&#775;hi&#775;: Trabzon &#350;ehi&#775;r Kul&uuml;b&uuml; (1923-1955)&rdquo;. International
                    Journal of Social and Humanities Sciences Research (JSHSR) 5(29):3787-97. doi:
                    10.26450/jshsr.813.</p>

                <p>Ba&#351;kaya, Muzaffer. 2018c. &ldquo;Osmanl&#305;dan Cumhuri&#775;yete Bi&#775;r Kurumun
                    Tari&#775;hi&#775;: Trabzon &#350;ehi&#775;r Kul&uuml;b&uuml; (1923-1955)&rdquo;. International
                    Journal of Social and Humanities Sciences Research (JSHSR) 5(29):3787-97. doi:
                    10.26450/jshsr.813.</p>

                <p>Ba&#351;kaya, Muzaffer. 2022. &ldquo;Cumhuri&#775;yeti&#775;n &#304;lk Y&#305;llar&#305;nda
                    Trabzon&rsquo;da Ticaret&rdquo;. i&ccedil;inde Trabzon Tarihi (K&uuml;lt&uuml;r Ve Medeniyet). C.
                    II. Trabzon: Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>Bia. (2011, 5 19). Kaz&#305;m Karabekir'den Nisan-May&#305;s 1919 G&uuml;nleri. 4 1, 2024 tarihinde
                    m.bianet.org: https://m.bianet.org/bianet/diger/130104-kazim-karabekir-den-nisan-mayis-1919-gunleri
                    adresinden al&#305;nd&#305; Biber, T. E. (2006). Milli M&uuml;cadele D&ouml;neminde Do&#287;u
                    Karadeniz. &#304;stanbul: Mimar Sinan G&uuml;zel Sanatlar &Uuml;niversitesi G&uuml;zel Sanatlar
                    Fak&uuml;ltesi, Y&uuml;ksek Lisans Tezi. bigpara@hurriyet.com.tr. 2004. &ldquo;T&uuml;rk
                    profes&ouml;re Kanada&#96;dan &#96;hidrojen h&uuml;cresi&#96; &ouml;d&uuml;l&uuml;&rdquo;.
                    bigpara.hurriyet.com.tr. Geli&#351; tarihi 11 Nisan 2024
                    (https://bigpara.hurriyet.com.tr/haberler/genel-haberler/turk-profesore-kanada-dan-hidrojen-hucresi-odulu_ID503117/).</p>

                <p>Bilgin, Mehmet. 1996. &ldquo;Trabzon Tarihi&rdquo;. Ss. 27-81 i&ccedil;inde Trabzon. &#304;stanbul:
                    T.C.K&uuml;lt&uuml;r Bakanl&#305;&#287;&#305; Yay&#305;nlar&#305;.</p>

                <p>Bircan, T. &#350;. (2016). Teknoloji Destekli Tarih &Ouml;&#287;retiminin &Ouml;&#287;rencilerin
                    Mek&acirc;n Alg&#305;lar&#305;na ve Akademik Ba&#351;ar&#305;lar&#305;na Etkisi.
                    Hacettepe &Uuml;n&uuml;versitesi E&#287;itim Fak&uuml;ltesi Dergisi, 564-577.
                    Bi&#775;ri&#775;nci&#775;, Ali. 2008. &ldquo;Me&#351;veretci&#775; Naci&#775; Bey Ve
                    Gazetesi&#775;&rdquo;. Uluslararas&#305; Karadeniz &#304;ncelemeleri Dergisi 5(5):139-49.</p>

                <p>Bi&#775;rli&#775;k, G&uuml;ltekin Kamil. 2016. &ldquo;Trabzon Atat&uuml;rk
                    K&ouml;&#351;k&uuml;&rdquo;. Atat&uuml;rk Yolu Dergisi 15(59). doi: 10.1501/Tite_0000000449.</p>

                <p>Bi&#775;rli&#775;k, G&uuml;ltekin K&acirc;mil.
                    2018. &ldquo;Cumhurba&#351;kan&#305; &#304;smet &#304;n&ouml;n&uuml;&rsquo;n&uuml;n Trabzon
                    Ziyaretleri&rdquo;. &Ccedil;a&#287;da&#351; T&uuml;rkiye Tarihi Ara&#351;t&#305;rmalar&#305; Dergisi
                    18(36):295-322.</p>

                <p>Bolat, M. (2022, 2 10). Hasan Saka(1885-1960). 2 1, 2024 tarihinde ataturkansiklopedisi:
                    https://ataturkansiklopedisi.gov.tr/bilgi/hasan-saka/ adresinden al&#305;nd&#305; Bostan, M. Hanefi.
                    2022. &ldquo;Trabzon&rsquo;un Fethi&#775; Ve T&uuml;rkle&#351;mesi&#775;&rdquo;. Ss. 69-109
                    i&ccedil;inde Trabzon Tarihi(Siyasi Tarih). C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>Budak, Hac&#305; &Ouml;mer. 2024. &ldquo;Kaz&#305;m Karabekir Pa&#351;a Ve Baz&#305; Yazarlara
                    G&ouml;re Enver Pa&#351;a&rdquo;. Ocak, 19-48.</p>

                <p>Bulut, E. &Ccedil;. (2006). Ertu&#287;rul Facias&#305;n&#305;n Trabzonlu &#350;ehitleri. Karadeniz
                    Ara&#351;t&#305;rmalar&#305; Enstit&uuml;s&uuml; Dergisi, s. 365-383. celalhocaiho.meb.k12.tr.
                    2024. &ldquo;Mahmut Celaletti&#775;n &Ouml;kten (1882-1961)&rdquo;. www.celalhocaiho.meb.k12.tr.
                    Geli&#351; tarihi
                    (https://celalhocaiho.meb.k12.tr/icerikler/mahmut-celalettin-okten-1882-1961_2283629.html).</p>

                <p>Cevahir, E. (2020). SPSS &#304;le Nicel Veri Analizi Rehberi. &#304;stanbul: Kibele. &Ccedil;am, E.,
                    Uysal, M. (2017). Mobil Uygulamalar&#305;n E&#287;itsel Ama&ccedil;l&#305; Kullan&#305;m&#305;:
                    Bir &Ouml;l&ccedil;ek Geli&#351;tirme &Ccedil;al&#305;&#351;mas&#305;. Uluslararas&#305; T&uuml;rk
                    E&#287;itim Bilimleri Dergisi, 2017(9), 559-567.</p>

                <p>&Ccedil;apa, Mesut. 1997. &ldquo;Milli M&uuml;cadele D&ouml;neminde Trabzon&rsquo;da
                    Mitingler&rdquo;. T&uuml;rk Yurdu, 124-28.</p>

                <p>&Ccedil;apa, Mesut. 2022. &ldquo;Tanzi&#775;mat&rsquo;tan Cumhuri&#775;yet&rsquo;e Trabzon&rsquo;da
                    E&#287;i&#775;ti&#775;m&rdquo;. Ss. 153-92 i&ccedil;inde Trabzon Tarihi K&uuml;lt&uuml;r ve
                    Medeniyet (&#304;kinci Cilt). Trabzon: Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>&Ccedil;ayk&#305;ran, G. (2021). Birinci D&uuml;nya Sava&#351;&#305;&rsquo;nda
                    Trabzon&rsquo;un &#304;&#351;gali Ve M&uuml;sl&uuml;man M&uuml;ltecilerin Durumu. Asker&icirc; Tarih
                    Ara&#351;t&#305;rmalar&#305; Dergisi (ATAD)(33), 123-150. </p>

                <p>&Ccedil;elo&#287;lu, Yavuz Selim. 2021. &ldquo;Kafkas/Do&#287;u Cephesi&rsquo;nde T&uuml;rk
                    Ordusunun &#304;a&#351;e Ve &#304;kmal Durumu&rdquo;. Askeri Tarih
                    Ara&#351;t&#305;rmalar&#305; Dergisi 19(33):63-92. doi: 10.46953/askeritarih.854676.</p>

                <p>&Ccedil;etinda&#351;, Dilek. 2020. &ldquo;&#304;smet Zeki Ey&uuml;bo&#287;lu&rdquo;.
                    www.teis.yesevi.edu.tr. Geli&#351; tarihi 11 Nisan 2024
                    (https://teis.yesevi.edu.tr/madde-detay/eyuboglu-ismet-zeki).</p>

                <p>&Ccedil;&#305;nk&#305;r &Ouml;zbitirgi&ccedil;, Olcay. 2023. &ldquo;Marshall
                    Plan&#305; &Ccedil;er&ccedil;evesinde Amerikal&#305; Mr. Russell Dorr&rsquo;un
                    T&uuml;rkiye &#304;zlenimlerine Dair Raporunun De&#287;erlendirilmesi&rdquo;. BELLEK
                    Uluslararas&#305; Tarih ve K&uuml;lt&uuml;r Ara&#351;t&#305;rmalar&#305; Dergisi 5(2):164-73.</p>

                <p>&Ccedil;i&ccedil;ek, Rahmi. 2017. &ldquo;&Ccedil;ok Partili Hayata Ge&ccedil;i&#351;te Trabzon
                    Bas&#305;n&#305; (1945-1950)&rdquo;. Karadeniz
                    Ara&#351;t&#305;rmalar&#305; Enstit&uuml;s&uuml; Dergisi, 129-66.</p>

                <p>Demircio&#287;lu, Asuman. 1998. &ldquo;Faik Ahmet (Barut&ccedil;u) Bey Ve &#304;stikbal Gazetesi(1918
                    Y&#305;l&#305; Sonu Ve 1922 Y&#305;l&#305;)&rdquo;. Doktora Tezi, Atat&uuml;rk &Uuml;niversitesi,
                    Atat&uuml;rk &#304;lkeleri ve &#304;nk&#305;lap Tarihi
                    Enstit&uuml;s&uuml; M&uuml;d&uuml;rl&uuml;&#287;&uuml;, Erzurum.</p>

                <p>Demircio&#287;lu, Sezgin, Ali Mesut Birinci, ve Recep Karacakaya. 2007. Ar&#351;iv Belgelerine
                    G&ouml;re Trabzon&rsquo;da Ermeni faaliyetleri (1850-1923). C. I-II. 1. bs. Trabzon Belediyesi.</p>

                <p>Derman, U&#287;ur. 1989. &ldquo;ALTUNBEZER, &#304;smail Hakk&#305;(1873-1946)&rdquo;.
                    TDV &#304;sl&acirc;m Ansiklopedisi II:543-44.</p>

                <p>Di&#775;lek, Mehmet Sait. 2012. &ldquo;PAR&#304;S BARI&#350; KONFERANSI&rsquo;NDA
                    ERMEN&#304; SORUNU&rdquo;. Yak&#305;n D&ouml;nem T&uuml;rkiye
                    Ara&#351;t&#305;rmalar&#305; (15-16):79-97.</p>

                <p>Do&#287;anay, Erkan. 2020. &ldquo;Trabzon&rsquo;dan T&uuml;rk Sanat&#305;na
                    Kazand&#305;r&#305;lm&#305;&#351; Ger&ccedil;ek Bi&#775;r Maestro; Bedri Rahmi
                    Ey&uuml;bo&#287;lu&rdquo;. T Dergi.</p>

                <p>Do&#287;anay, R. (2017). Milli M&uuml;cadele'de Karadeniz (1919-1922). Ankara: Atat&uuml;rk
                    K&uuml;lt&uuml;r, Dil Ve Tarih Y&uuml;ksek Kurumu Atat&uuml;rk Ara&#351;t&#305;rma Merkezi.
                    Do&#287;anay, Rahmi. 2017. Milli M&uuml;cadelede Trabzon(1919-1922). Ankara: Atat&uuml;rk
                    Ara&#351;t&#305;rma Merkezi.</p>

                <p>Duran, Zafer. 2023. &ldquo;1911&rsquo;de Trabzon&rsquo;da Frans&#305;z
                    Rahi&#775;beleri&#775;ni&#775;n Trabzon &#350;ehi&#775;r Merkezi&#775;nde K&#305;z Okulu
                    A&ccedil;ma &Ccedil;al&#305;&#351;malar&#305;&rdquo;. Trabzondan Esintiler. Geli&#351; tarihi 08
                    Nisan 2024
                    (https://www.facebook.com/groups/108079095946806/permalink/6662228387198478/?m_entstream_source=group&amp;paipv=0&amp;eav=AfaqH9NhqKZ-ev8qwjhOYoMcAy4o-X2CvYS38EziHz7J4hEYa4W128iSlrUaUc4Oupg&amp;_rdr).</p>

                <p>D&uuml;ndar, Fuad. 2015. &#304;ttihat ve Terakki&rsquo;nin
                    M&uuml;sl&uuml;manlar&#305; &#304;sk&acirc;n&#305; Politikas&#305;(1913-1918).
                    6.Bask&#305;. &#304;stanbul: &#304;leti&#351;im Yay&#305;nlar&#305;.</p>

                <p>D&uuml;zenli, Yahya. 2010. Ben Bir Ulu &#350;ehre Vard&#305;m Trabzon
                    Yaz&#305;lar&#305;. &#304;stanbul: N&uuml;ans Ajans Bas&#305;n Yay&#305;n.</p>

                <p>E&#287;itim Takvimi 2020 &quot;Bug&uuml;n 24 saat ve her saniyesi &ccedil;ok k&#305;ymetli&quot;.
                    (2020, 1 1). Ocak 19, 2024 tarihinde www.meb.gov.tr:
                    https://www.meb.gov.tr/egitim-takvimi-2020-bugun-24-saat-ve-her-saniyesi-cok-kiymetli/haber/20047/tr
                    adresinden al&#305;nd&#305; Eken, Emre. 2019. &ldquo;Ey&uuml;bo&#287;lu: Bi&#775;r Ai&#775;le
                    Tari&#775;hi&#775; &#304;ncelemesi&#775;&rdquo;. Y&uuml;ksek Lisans Tezi, T.C. &#304;stanbul
                    Medeniyet &Uuml;niversitesi Sosyal Bilimler Enstit&uuml;s&uuml; Tarih Anabilim
                    Dal&#305;, &#304;stanbul.</p>

                <p>Ekinci, Ekrem Bu&#287;ra. 2019. &ldquo;Yer &#304;si&#775;mleri&#775;ni&#775; Ki&#775;m, Ni&#775;ye
                    De&#287;i&#775;&#351;ti&#775;ri&#775;r?&rdquo; ekrembugraekinci.com. Geli&#351; tarihi 27 Mart 2024
                    (https://www.ekrembugraekinci.com/article/?ID=1028&amp;yer-isimlerini-kim--niye-de%C4%9Fi%C5%9Ftirir-).</p>

                <p>Eray Biber, Tu&#287;ba. 2006. &ldquo;Milli M&uuml;cadele D&ouml;neminde Do&#287;u Karadeniz&rdquo;.
                    Y&uuml;ksek Lisans Tezi, Mimar Sinan G&uuml;zel Sanatlar &Uuml;niversitesi, Sosyal Bilimler
                    Enstit&uuml;s&uuml;, &#304;stanbul.</p>

                <p>Eray Biber, Tu&#287;ba. 2019. &ldquo;Karadeniz&rsquo;de Depremler Ve Yard&#305;mlar
                    (1939-1944)&rdquo;. MUTAD VI(2):151-81. doi: 10.16985/mtad.660163.</p>

                <p>Eray Biber, Tu&#287;ba. 2020. &ldquo;Mill&icirc;&#775; M&uuml;cadele D&ouml;neminde &lsquo;Pontus
                    Cumhuriyeti&#775;&rsquo; Kurma &Ccedil;al&#305;&#351;malar&#305;&rdquo;. 124(245):421-34.</p>

                <p>Erener, Tolga. 2022. Do&#287;u Karadeniz B&ouml;lgesi&rsquo;nin Rus &#304;&#351;galinden
                    Kurtulu&#351;u. 1.Bask&#305;. &#304;stanbul: Ar&#305; Sanat Yay&#305;nlar&#305;.</p>

                <p>Ergin, Recep. 2024. &ldquo;Har&#351;it Savunmas&#305;&rdquo;. Wikipedi &Ouml;zg&uuml;r Ansiklopedi.
                    Geli&#351; tarihi 01 Nisan 2024 (https://w.wiki/9dew).</p>

                <p>Erol, F. (2022, 02 16). Baba Salim. 12 25, 2022 tarihinde www.takagazete.com.tr:
                    https://www.takagazete.com.tr/kultursanat/baba-salim-h239414.html adresinden al&#305;nd&#305; Erol,
                    F. (2022, 12 19). Be&#351;irli Sahilinde Ne Hazineler Var? 01 06, 2023 tarihinde
                    www.takagazete.com.tr:
                    https://www.takagazete.com.tr/kultursanat/besirli-sahilinde-ne-hazineler-var-h255176.html adresinden
                    al&#305;nd&#305; Erol, Fatih. 2022. &ldquo;93 YILDIR NUR SA&Ccedil;IYOR&rdquo;. Taka Gazete, Haziran
                    22.</p>

                <p>Erol, Fatih. 2023. &ldquo;Trabzon Halkevine Ne Oldu?&rdquo; Taka Gazetesi, &#350;ubat 1.</p>

                <p>Erol, Fatih. 2024. &ldquo;Fatih Erol: Trabzon&rsquo;daki &Ccedil;&#305;&#287; Afetleri&rdquo;. Taka
                    Gazete - Trabzon Haber - Karadeniz Haber.</p>

                <p>Gedikli, H. (1996 ). Ak&ccedil;aabat . Trabzon . Gen&ccedil;t&uuml;rk, G. (2022). Dijital
                    Ortam&#305;n Gen&ccedil;lerin Okuma Al&#305;&#351;kanl&#305;klar&#305;na
                    Etkisi: &#304;stanbul&rsquo;da Durum. &#304;stanbul : T.C. &#304;stanbul &Uuml;niversitesi, Sosyal
                    Bilimler Enstit&uuml;s&uuml;, Bilgi Ve Belge Y&ouml;netimi Anabilim Dal&#305;. Ger&ccedil;ek, Bekir.
                    1996. &ldquo;Eski Bir Ba&#351;kent&rdquo;. Ss. 27-81 i&ccedil;inde Trabzon. &#304;stanbul: T.C.
                    K&uuml;lt&uuml;r Bakanl&#305;&#287;&#305; Yay&#305;nlar&#305;.</p>

                <p>Gider, Osman. 1992. &ldquo;&#350;eyh Osman Baba Hazretleri&rdquo;. Gazi Bayburt Dergisi, 18.</p>

                <p>Golo&#287;lu, Mahmut. 2013. Trabzon Tarihi (Fetihten Kurtulu&#351;a Kadar). 2.Bask&#305;. Trabzon:
                    Serander.</p>

                <p>G&uuml;l, Osman Kubilay. 2014. &ldquo;Bir &#304;&ccedil; &#304;skan
                    Uygulamas&#305;: &Ccedil;aykara&rsquo;dan &Ouml;zalp&rsquo;e G&ouml;&ccedil;&rdquo;. Gaziantep
                    University Journal of Social Sciences 13(2):423-35.</p>

                <p>G&uuml;nay, Nejla. 2013. &ldquo;Atat&uuml;rk D&ouml;nemi&#775;nde T&uuml;rki&#775;ye&rsquo;de Beden
                    E&#287;i&#775;ti&#775;mi&#775;ni&#775;n Geli&#775;&#351;i&#775;mi&#775; Ve Gazi&#775; Beden
                    Terbi&#775;yesi&#775; B&ouml;l&uuml;m&uuml;&rdquo;. Atat&uuml;rk Ara&#351;t&#305;rma Merkezi Dergisi
                    29(85):72-100.</p>

                <p>G&uuml;ner, &Ouml;mer. 1996. &ldquo;Trabzon&rsquo;da Spor Ve Trabzonspor&rdquo;. Ss. 143-51
                    i&ccedil;inde Trabzon. &#304;stanbul: T.C. K&uuml;lt&uuml;r
                    Bakanl&#305;&#287;&#305; Yay&#305;nlar&#305;.</p>

                <p>G&uuml;rb&uuml;z, Vedat. 2023. &ldquo;Hava Kuvvetlerinin Cumhuriyet D&ouml;nemi &#304;lk &#350;ehidi
                    Hava Pilot Y&uuml;zba&#351;&#305; Cengiz Topel, Nas&#305;l &#350;ehit Oldu?&rdquo; Geli&#351; tarihi
                    24 Mart 2024
                    (https://strasam.org/tarih/askeri-tarih/hava-kuvvetlerinin-cumhuriyet-donemi-ilk-sehidi-hava-pilot-yuzbasi-cengiz-topel-nasil-sehit-oldu-2228).</p>

                <p>haber61. 2010. &ldquo;Trabzon&rsquo;da sinema e&#287;itimi | Trabzon Haber - Haber61&rdquo;.
                    Geli&#351; tarihi 12 Nisan 2024
                    (https://www.haber61.net/bolgesel/trabzonda-sinema-egitimi-h51901.html).</p>

                <p>Hac&#305;fettaho&#287;lu, &#304;. (2008, 7 19). Trabzon Valisi &#350;ehit Cemal Azmi Bey. 11 12, 2023
                    tarihinde www.serander.net:
                    https://www.serander.net/karadeniz-kulturu/karadeniz-tarihi/644-trabzon-valisi-sehit-cemal-azmi-bey.html
                    adresinden al&#305;nd&#305; Hayri G&uuml;r&rsquo;&uuml; kaybettik. (2010, 4 8). 12 12, 2023
                    tarihinde www.trabzonspor.org.tr:
                    https://www.trabzonspor.org.tr/tr/haberler/guncel-haberler/hayri-gur-u-kaybettik8-4-2010 adresinden
                    al&#305;nd&#305; Hayri, Abd&uuml;lvahap. 2008. &#304;ktisadi Trabzon. edit&ouml;r
                    M. &Ouml;ks&uuml;z. Serander Yay&#305;nlar&#305;.</p>

                <p>&#304;nan, K. (2021). Trabzon&rsquo;un Osmanl&#305;lar Taraf&#305;ndan Fethi Ve Fethin
                    Tarihlendirilmesi Meselesi. Trabzon'da Fetih Ve &#350;ehir (s. 109-120).
                    i&ccedil;inde &#304;stanbul: Trabzon B&uuml;y&uuml;k&#351;ehir Belediyesi K&uuml;lt&uuml;r
                    Yay&#305;nlar&#305;. &#304;nan, Kenan. 2003. &ldquo;Trabzon&rsquo;un Osmanl&#305;lar Taraf&#305;ndan
                    Fethi&#775;&rdquo;. Sosyal Bilimler Enstit&uuml;s&uuml; Dergisi, Ocak, 71-84.</p>

                <p>&#304;stikbal. (1922, May&#305;s 16). Kafal&#305;, M. (1999). Trabzon'un Yeti&#351;tirdi&#287;i
                    M&uuml;mtaz Sima:Prof.Dr.Osman Turan. Trabzon Tarihi Sempozyumu (6-8 Kas&#305;m 1998 (s. 17-23).
                    i&ccedil;inde Trabzon: Trabzon Belediyesi K&uuml;lt&uuml;r Yay&#305;nlar&#305;. Kantarc&#305;,
                    Dilek. 2019. &ldquo;XX. Y&uuml;zy&#305;l&#305;n &#304;lk &Ccedil;eyre&#287;inde Trabzon&rsquo;da
                    Gayrim&uuml;slimler&rdquo;. Y&uuml;ksek Lisans Tezi, Karadeniz Teknik &Uuml;niversitesi,
                    Trabzon.</p>

                <p>Karabekir, Kaz&#305;m. 2019. &#304;stiklal Harbimizde Enver Pa&#351;a Ve &#304;ttihat Ve Terakki
                    Erk&acirc;n&#305;. edit&ouml;r E. &Ccedil;ift&ccedil;i. &#304;stanbul: Kronik
                    Yay&#305;nlar&#305;.</p>

                <p>Karaca, Alaattin. 2011. &ldquo;&#304;sm&acirc;il Saf&acirc;&rdquo;. TDV &#304;sl&acirc;m
                    Ansiklopedisi XXIII:121-22.</p>

                <p>Kara&ccedil;avu&#351;, Ahmet. 2015. &ldquo;1895 Trabzon
                    Ermeni &#304;syan&#305; Ve &#304;syanc&#305;lar&#305;n Sosyo-Ekonomik, Siyasi, K&uuml;lt&uuml;rel
                    K&ouml;kenleri&rdquo;. Karadeniz &#304;ncelemeleri Dergisi, 75-118.</p>

                <p>Karademir, G. (2022). Tuzcuo&#287;lu Memi&#351; A&#287;a&rsquo;n&#305;n Do&#287;u Karadeniz&rsquo;de
                    Ayanl&#305;k M&uuml;cadelesi. Artvin: T.C. Artvin &Ccedil;oruh &Uuml;niversitesi
                    Lisans&uuml;st&uuml; E&#287;itim Enstit&uuml;s&uuml; Tarih Anabilim Dal&#305;, Y&uuml;ksek Lisans
                    Tezi. Karpuz, Ha&#351;im. 2018. Trabzon Merkez Ve &#304;l&ccedil;elerindeki &Ouml;nemli Tarihi
                    Yap&#305;lar. Ankara: T&uuml;rk Tarih Kurumu.</p>

                <p>Ke&ccedil;i&#351;, Murat. 2009. &ldquo;Trabzon Rum &#304;mparatorlu&#287;u ve T&uuml;rkler
                    1204-1404&rdquo;. Doktara Tezi, T&uuml;rkiye Cumhuriyeti Ankara &Uuml;niversitesi Sosyal Bilimler
                    Enstit&uuml;s&uuml; Tarih (Orta&ccedil;a&#287; Tarihi) Anabilim Dal&#305;, Ankara.</p>

                <p>Keskin, &#304;. (2005). 1895 Ermeni Olaylar&#305; Ve Trabzon Hadisesi. Ba&#351;lang&#305;&ccedil;tan
                    20.Y&uuml;zy&#305;la Karadeniz Tarihi Sempozyumu, (s. 597-611). Trabzon. Keskin, &Ouml;mer Ali, ve
                    Mehmet Esat Saricao&#287;lu.
                    2015. &ldquo;&lsquo;&#304;sti&#775;kb&#515;l&rsquo; Gazetesi&#775;ni&#775;n
                    Mi&#775;lli&#775; M&uuml;cadeleye Katk&#305;s&#305; (1918-1922)&rdquo;. Turkish Studies (Elektronik)
                    10(5):285-306.</p>

                <p>K&#305;l&#305;&ccedil; Ya&#351;in, G&ouml;zde. 2019. 100. Y&#305;l&#305;nda Pontus&ccedil;uluk
                    Ama&ccedil;, Y&ouml;ntem ve Hedef. 21. Y&uuml;zy&#305;l T&uuml;rkiye Enstit&uuml;s&uuml;.</p>

                <p>K&#305;l&#305;&ccedil;, Sezen. 2023. &ldquo;Atat&uuml;rk D&ouml;neminde Yabanc&#305; Okullar&rdquo;.
                    www.ataturkansiklopedisi.gov.tr. Geli&#351; tarihi 08 Nisan 2024
                    (https://ataturkansiklopedisi.gov.tr/bilgi/ataturk-doneminde-yabanci-okullar/).</p>

                <p>Koca, S. (2012). TURAN, Osman. 12 26, 2022 tarihinde islamansiklopedisi.org.tr:
                    https://islamansiklopedisi.org.tr/turan-osman adresinden al&#305;nd&#305; Ko&ccedil;, R. (2022).
                    Dijitalle&#351;en K&uuml;lt&uuml;r Ya Da K&uuml;lt&uuml;r&uuml;n Dijitalle&#351;mesi: Dijital
                    K&uuml;lt&uuml;r Kavram&#305;. Motif Akademi Halkbilimi Dergisi, 15(38), 500-513.
                    K&ouml;ksal, &Uuml;. (2017). Trabzon Hilal-&#304; Ahmer (K&#305;z&#305;lay) Cemiyeti.
                    Karadeniz &#304;ncelemeleri Dergisi, 161-208 . K&ouml;ksal, &Uuml;lk&uuml;.
                    2022. &ldquo;Trabzon&rsquo;da Dernekler Ve Faali&#775;yetleri&#775;&rdquo;. i&ccedil;inde C. I.
                    Trabzon: Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>Kurt, D. &Ouml;. (2020, 12 20). &#350;akir &#350;evket. 12 28, 2022 tarihinde
                    http://teis.yesevi.edu.tr: http://teis.yesevi.edu.tr/madde-detay/sevket-sakir adresinden
                    al&#305;nd&#305; Kurt, Hasan. 2020. Bir Zamanlar Trabzon Kadim &#350;ehrin G&ouml;rkemli
                    Ge&ccedil;mi&#351;i-1. C. 1. &#304;ber Matbaac&#305;l&#305;k. Trabzon: Kuzey Ekspres
                    Yay&#305;nlar&#305;.</p>

                <p>K&uuml;&ccedil;&uuml;k, Mustafa. 2021. &ldquo;Bi&#775;ri&#775;nci&#775; B&uuml;y&uuml;k Mi&#775;llet
                    Mecli&#775;si&#775;nde Trabzon Mebuslar&#305;&rdquo;. T Dergi, 28-32.</p>

                <p>K&uuml;&ccedil;&uuml;ker, Y&uuml;ksel, ve Hikmet &Ouml;ks&uuml;z. 2017. Tarihsel Arka Plan&#305;yla
                    Pontus Meselesi. 2. bsk. Ankara: Avrasya &#304;ncelemeleri Merkezi.</p>

                <p>K&uuml;&ccedil;&uuml;ku&#287;urlu, Murat, ve Muzaffer Ba&#351;kaya. 2019. Sorularla Trabzon Tarihi.
                    Konya: &Ccedil;izgi Kitabevi.</p>

                <p>K&uuml;&ccedil;&uuml;ku&#287;urlu, Murat. 2022. &ldquo;Cumhuri&#775;yet D&ouml;nemi&#775;nde Trabzon
                    Beledi&#775;yesi&rdquo;. Ss. 655-715 i&ccedil;inde Trabzon Tarihi(Siyasi Tarih). C. 1. Trabzon:
                    Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>K&uuml;lek&ccedil;i, Ahmet. 2013. &ldquo;Trabzon&rsquo;da Dangalaklar Cemiyeti!&rdquo; Haber61.
                    Geli&#351; tarihi 26 Ocak 2024
                    (https://www.haber61.net/yazar-yazilari/trabzonda-dangalaklar-cemiyeti-h501356.html).</p>

                <p>Lowry, Heath W., ve Demet Lowry. 2010. Trabzon &#350;ehrinin &#304;slamla&#351;mas&#305; Ve
                    T&uuml;rkle&#351;mesi 1461-1583. &#304;stanbul: Bo&#287;azi&ccedil;i &Uuml;niversitesi.</p>

                <p>M.Hanefi, Bostan. 2022. &ldquo;Trabzon&rsquo;un Fethi&#775; Ve T&uuml;rkle&#351;mesi&#775;&rdquo;.
                    Ss. 69-109 i&ccedil;inde Trabzon Tarihi(Siyasi Tarih). C. I. Trabzon: Trabzon Ticaret Ve Sanayi
                    Odas&#305;.</p>

                <p>Milli E&#287;itim Bakanl&#305;&#287;&#305;.(2023) Uzman &Ouml;&#287;retmenlik Yeti&#351;tirme
                    Program&#305; &Ccedil;al&#305;&#351;ma Kitab&#305;, Eri&#351;im Tarihi: 01/01/2024
                    https://cdn.eba.gov.tr/oba/UZMAN_OGRETMENLIK_YETISTIRME_PROGRAMI_CALISMA__KITABI.pdf Neziro&#287;lu,
                    E. (2021, 2 7). Ayd&#305;nlanman&#305;n Be&#351;i&#287;i: Be&#351;ikd&uuml;z&uuml; K&ouml;y
                    Enstit&uuml;s&uuml;. 12 22, 2022 tarihinde ayamfolklor.com:
                    https://www.ayamfolklor.com/aydinlanmanin-besigi-besikduzu-koy-enstitusu/ adresinden
                    al&#305;nd&#305; Okur, Mehmet. 2022. &ldquo;T&uuml;rk Tarih&ccedil;ili&#287;inde Mahmut Golo&#287;lu
                    ve Cumhuriyet Tarihi Yaz&#305;lar&#305; &Uuml;zerine Bir De&#287;erlendirme&rdquo;.
                    Uluslararas&#305; Prof.Dr.Halil &#304;nalc&#305;k Tarih Ve Tarih&ccedil;ilik Sempozyumu II:459-74.
                    doi: 0.37879/9789751749994.2022.27.</p>

                <p>Olgundemir, A. (2022). Saatli Maarif Takvimi. 12 13, 2022 tarihinde
                    https://apps.apple.com/us/app/saatli-maarif-takvimi:
                    https://apps.apple.com/us/app/saatli-maarif-takvimi/id1501840430 adresinden
                    al&#305;nd&#305; &Ouml;cal, Mustafa. 1998. &ldquo;Cumhuriyet D&ouml;neminde T&uuml;rkiye&rsquo;de
                    Din E&#287;itimi Ve &Ouml;&#287;retimi&rdquo;. T.C. Uluda&#287; &Uuml;niversitesi &#304;lahiyat
                    Fak&uuml;ltesi, 241-68.</p>

                <p>&Ouml;ks&uuml;z, H. (2006). I.D&uuml;nya Sava&#351;&#305; S&#305;ras&#305;nda Rus
                    Donanmas&#305;n&#305;n Karadeniz Limanlar&#305;n&#305; Bombalamas&#305;. Uluslararas&#305; Trabzon
                    ve &Ccedil;evresi K&uuml;lt&uuml;r Ve Tarih, Sempozyumu (s. 391-397). i&ccedil;inde Trabzon:
                    T&uuml;rk Ocaklar&#305; Trabzon Sube&#351;i Yay&#305;nlar&#305;. &Ouml;ks&uuml;z, Hikmet, Veysel
                    Usta, ve Kenan &#304;nan. 2009. Trabzon Ticaret Ve Sanayi Odas&#305; Tarihi 1884-1950. Trabzon:
                    Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>&Ouml;ks&uuml;z, Hikmet. 2014. 20.Y&uuml;zy&#305;l Ba&#351;lar&#305;nda Trabzon(Toplumsal Tarih
                    Yaz&#305;lar&#305;). Eser Ofset Matbaac&#305;l&#305;k. Serander Yay&#305;nlar&#305;.</p>

                <p>&Ouml;ks&uuml;z, Hikmet. 2022. &ldquo;Trabzon&rsquo;da Rus &#304;&#351;gali Ve Muhacirlik&rdquo;. Ss.
                    515-35 i&ccedil;inde Trabzon Tarihi (Siyasi Tarih). C. I. Trabzon: Trabzon Ticaret Ve Sanayi
                    Odas&#305;.</p>

                <p>&Ouml;ks&uuml;z, Melek. 2022. &ldquo;Osmanl&#305; &#304;mparatorlu&#287;u&rsquo;nun De&#287;i&#351;im
                    Ve D&ouml;n&uuml;&#351;&uuml;m Y&uuml;zy&#305;l&#305;ndan Tanzimat&rsquo;a Kadar Trabzon&rdquo;. Ss.
                    289-317 i&ccedil;inde C. 1, edit&ouml;r H. &Ouml;ks&uuml;z, V. Usta, ve K. &#304;nan. Trabzon:
                    Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>&Ouml;zcan Erdal, Burcu. 2023. &ldquo;General M. V. Frunze&rsquo;nin T&uuml;rkiye Ziyareti ve 1922
                    T&uuml;rkiye-Ukrayna Dostluk ve Karde&#351;lik Antla&#351;mas&#305;&rdquo;. T&uuml;rk
                    D&uuml;nyas&#305; Ara&#351;t&#305;rmalar&#305; Cilt: 135 Say&#305;: 266, Ekim, 21-42.</p>

                <p>&Ouml;zdi&#351;, Hamdi. 2008. &ldquo;Ta&#351;rada &#304;ktidar M&uuml;cadelesi: II. Abd&uuml;lhamid
                    D&ouml;neminde Trabzon Vilayeti&rsquo;nde E&#351;raf, Siyaset ve Devlet (1876-1909), Ankara,
                    2008.&rdquo; Doktora Tezi, Hacettepe &Uuml;niversitesi Sosyal Bilimler Enstit&uuml;s&uuml;,
                    Ankara.</p>

                <p>&Ouml;zer, Ahmet. 1996. &ldquo;D&uuml;nden Bug&uuml;ne Trabzon&rsquo;da K&uuml;lt&uuml;r&rdquo;. Ss.
                    93-103 i&ccedil;inde Trabzon. &#304;stanbul: T.C.K&uuml;lt&uuml;r
                    Bakanl&#305;&#287;&#305; Yay&#305;nlar&#305;.</p>

                <p>&Ouml;zt&uuml;rk, &Ouml;. (2020, 3 3). Trabzon'dan Esintiler. 12 28, 2022 tarihinde
                    https://www.facebook.com/groups/108079095946806/search/?q=SOLOMON adresinden
                    al&#305;nd&#305; Reiso&#287;lu, Mustafa. 2022. &ldquo;Unutulan 4000 Y&#305;ll&#305;k Gelenek:
                    May&#305;s Yedi&#775;si&#775;&rdquo;. T Dergi.</p>

                <p>Sar&#305;han, Zeki. 1984.
                    Kurtulu&#351; Sava&#351;&#305; G&uuml;nl&uuml;&#287;&uuml; II. &Ouml;&#287;retmen
                    D&uuml;nyas&#305; Yay&#305;nlar&#305;.</p>

                <p>Sar&#305;han, Zeki. 1985.
                    Kurtulu&#351; Sava&#351;&#305; G&uuml;nl&uuml;&#287;&uuml; III. &Ouml;&#287;retmen
                    D&uuml;nyas&#305; Yay&#305;nlar&#305;.</p>

                <p>Sar&#305;han, Zeki. 1986. Zeki Sar&#305;han,
                    Kurtulu&#351; Sava&#351;&#305; G&uuml;nl&uuml;&#287;&uuml; I. C. I. Ankara: &Ouml;&#287;retmen
                    Yay&#305;nlar&#305;.</p>

                <p>Sar&#305;han, Zeki. 1996. Kurtulu&#351; Sava&#351;&#305; G&uuml;nl&uuml;&#287;&uuml; IV. C. IV.
                    Ankara: T&uuml;rk Tarih Kurumu.</p>

                <p>Sar&#305;nay, Yusuf. 1995. &ldquo;Pontus Meselesi Ve Yunanistan&rsquo;&#305;n Politikas&#305;&rdquo;.
                    Atat&uuml;rk Ara&#351;t&#305;rma Merkezi Dergisi, Mart, 107-62.</p>

                <p>Saruhan, Emeti. 2020. &ldquo;Ma&ccedil;ka Ayanl&#305;&#287;&#305;&rsquo;ndan Yazma Sanat&#305;na
                    Ey&uuml;bo&#287;lu Ailesi&rdquo;. T Dergi, 68-71.</p>

                <p>Serbesto&#287;lu, &#304;brahim. 2006. &ldquo;Trabzon Vali&#775;si&#775; Cani&#775;kli&#775; Tayyar
                    Mahmud Pa&#351;a &#304;syani Ve Cani&#775;kli&#775;z&acirc;deleri&#775;n Sonu (1805-1808)&rdquo;.
                    Karadeniz &#304;ncelemeleri Dergisi 1(1):89-105.</p>

                <p>&#350;ampiyon Trabzonspor! (2022, 04 30). 04 01, 2024 tarihinde takagazete.com.tr:
                    https://www.takagazete.com.tr/spor/sampiyon-trabzonspor-2-h243271.html adresinden
                    al&#305;nd&#305; &#350;en, &Ouml;mer. 1998. Trabzon Tarihi. Erhan Ofset Matbaac&#305;l&#305;k.
                    Trabzon: Derya Kitabevi.</p>

                <p>&#350;enkarde&#351;ler, A. (2013). Takvimlerin Toplumsal &#304;&#351;levleri: Saatli Maarif
                    Takvimi &Ouml;rne&#287;i. Karab&uuml;k: T.C.Karab&uuml;k &Uuml;niversitesi Sosyal Bilimler
                    Enstit&uuml;s&uuml; Sosyoloji Anabilim Dal&#305;. &#350;im&#351;ek, Osman. 1993. Trabzon Belediye
                    Tarihi I. C. 1. Trabzon: Trabzon Belediyesi.</p>

                <p>&#350;i&#351;ko, Osman. 2009. &ldquo;Zigana&rsquo;da &ccedil;&#305;&#287; facias&#305;:
                    10 &ouml;l&uuml;&rdquo;. Milliyet. Geli&#351; tarihi 01 &#350;ubat 2024
                    (https://www.milliyet.com.tr/pembenar/zigana-da-cig-faciasi-10-olu-1051550).</p>

                <p>T Dergi. 2021. &ldquo;Trabzon Ve Hat&#305;rlatt&#305;klar&#305; Dangalaklar
                    Cemi&#775;yeti&#775;&rdquo;. T Dergi, 32.</p>

                <p>T Dergi. 2022. &ldquo;Mah&#351;ah Han&#305;m&rdquo;. T Dergi, 65.</p>

                <p>T. C. M&#304;LL&Icirc; E&#286;&#304;T&#304;M BAKANLI&#286;I TRABZON / ORTAH&#304;SAR / Cudibey,
                    Ortaokulu. 2022. &ldquo;Cudi&#775;bey Ortaokulunun Tari&#775;h&ccedil;esi&#775;&rdquo;.
                    Geli&#351; tarihi 11 Nisan 2024 (https://cudibey.meb.k12.tr/icerikler/icerik_250733).</p>

                <p>Tarak&ccedil;&#305;o&#287;lu, Mustafa Re&#351;it. 1986a. Trabzon&rsquo;un Yak&#305;n Tarihi. Trabzon:
                    Karadeniz Teknik &Uuml;niversitesi.</p>

                <p>Tarak&ccedil;&#305;o&#287;lu, Mustafa Re&#351;it. 1986b. Trabzon&rsquo;un Yak&#305;n Tarihi. Trabzon:
                    Karadeniz Teknik &Uuml;niversitesi.</p>

                <p>Tarak&ccedil;&#305;o&#287;lu, Mustafa Re&#351;it. 2006. Tarak&ccedil;&#305;o&#287;lu, M. Re&#351;it
                    Mustafa Re&#351;it Tarak&ccedil;&#305;o&#287;lu Hayat&#305;, Hat&#305;rat&#305; ve Trabzon&rsquo;un
                    Yak&#305;n Tarihi. edit&ouml;r V. Usta ve H. &Ouml;ks&uuml;z. Trabzon: Serander.</p>

                <p>Tarihte Bug&uuml;n . (2006). 02 01, 2024 tarihinde www.ataturktoday.com:
                    https://www.ataturktoday.com/AtaturkGunlugu/SubatFebruary/3.htm adresinden
                    al&#305;nd&#305; Ta&#351;k&#305;ran, C. (2022, 12 6). Mustafa Suphi (1883-1921). 1 2, 2023 tarihinde
                    ataturkansiklopedisi: https://ataturkansiklopedisi.gov.tr/bilgi/mustafa-suphi-1883-1921/ adresinden
                    al&#305;nd&#305; Tekinda&#287;, M. C. &#350;ehabettin. 1979. &ldquo;Trabzon&rdquo;. Ss. 455-77
                    i&ccedil;inde &#304;slam Ansiklopedisi. C. XII/1. &#304;stanbul: Milli E&#287;itim
                    Bakanl&#305;&#287;&#305;.</p>

                <p>Tellio&#287;lu, &#304;brahim. 2022. &ldquo;Orta &Ccedil;a&#287;da Trabzon Tarihinden Bir
                    Kesit(1204-1461)&rdquo;. Ss. 35-69 i&ccedil;inde Trabzon Tarihi Siyasi Tarih. C. I. Trabzon: Trabzon
                    Ticaret Ve Sanayi Odas&#305;.</p>

                <p>Tosun, Murat Dursun. 2023. &ldquo;1911&rsquo;de Trabzon&rsquo;da Frans&#305;z
                    Rahibeleri&#775;&rdquo;. www.muratdursuntosun.wordpress.com. Geli&#351; tarihi
                    (https://muratdursuntosun.wordpress.com/?s=1911%E2%80%99DE+TRABZON%E2%80%99DA+FRANSIZ+RAH%C4%B0BELER%C4%B0).</p>

                <p>Trabzon Merkez Fen Lisesi. 2023. &ldquo;Trabzon Fen Lisesi Tarih&ccedil;e&rdquo;.
                    www.trabzonfenlisesi.meb.k12.tr. Geli&#351; tarihi 08 Nisan 2024
                    (https://trabzonfenlisesi.meb.k12.tr/icerikler/trabzon-fen-lisesi-tarihce_3893799.html).</p>

                <p>Trabzonsporun &#304;lk &#350;ampiyonlu&#287;u (1975-76). (2012, 9 12). 01 05, 2022 tarihinde
                    kuzeyinrengi.blogspot.com:
                    http://kuzeyinrengi.blogspot.com/2012/09/trabzonsporun-ilk-sampiyonlugu-1975-76-6.html adresinden
                    al&#305;nd&#305; T&uuml;rkiye Atletizm Federasyonu. 2023. &ldquo;Trabzon Yar&#305; Maratonu
                    yap&#305;ld&#305;.&rdquo; https://www.taf.org.tr. Geli&#351; tarihi 04 Nisan 2024
                    (https://www.taf.org.tr/Haber/Detay/trabzon-yari-maratonu-yapildi#:~:text=%C3%9Clkemizde%206%20%C5%9Eubat'ta%20ya%C5%9Fanan,Uluslararas%C4%B1%20Trabzon%20Yar%C4%B1%20Maratonu%20ko%C5%9Fuldu.).</p>

                <p>U&ccedil;arol, R&#305;fat. 2006. Siyasi Tarih (1789-2001). 6. bs. &#304;stanbul: Der.</p>

                <p>Usta, Veysel. 1999. Anabasis&rsquo;ten Atat&uuml;rk&rsquo;e Seyehatnamelerde Trabzon. 1.Bask&#305;.
                    Trabzon: Serander.</p>

                <p>Usta, Veysel. 2014. &ldquo;Tan&#305;klar&#305;n Kaleminden Rus &#304;&#351;galinden Sonra
                    Trabzon&rsquo;un Durumu&rdquo;. Karadeniz &#304;ncelemeleri Dergisi 17(17):136-72. doi:
                    10.18220/kid.36047.</p>

                <p>Usta, Veysel. 2019. &ldquo;Trabzon Metropoliti Hrisantos&rsquo;un Paris Konferans&#305;&rsquo;na
                    Sundu&#287;u Muht&#305;ran&#305;n Tenkidi&rdquo;. Journal of Turkish Studies 6(Volume 6 Issue
                    2):973-84. doi: 10.7827/TurkishStudies.2258.</p>

                <p>Usta, Veysel. 2022a. Balkan Harbi&rsquo;nde 87. Alay Trabzon G&ouml;n&uuml;ll&uuml;leri. Serander
                    Yay&#305;nlar&#305;.</p>

                <p>Usta, Veysel. 2022b. &ldquo;Trabzon&rsquo;da Tiyatro&rdquo;. Ss. 393-437 i&ccedil;inde Trabzon Tarihi
                    (K&uuml;lt&uuml;r Ve Medeniyet). C. II. Trabzon: Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>Uzun, Mustafa &#304;smet. 1997. &ldquo;Ham&acirc;m&icirc;z&acirc;de Mehmed &#304;hsan&rdquo;.
                    T&uuml;rkiye Diyanet Vakf&#305; &#304;slam Ansiklopedisi XV:435-36.</p>

                <p>Uzun, Pira&#287;a. 1980. Her y&ouml;n&uuml;yle ilimiz Trabzonun durumu. Trabzon? Uzun.</p>

                <p>&Uuml;&ccedil;&uuml;nc&uuml;, U. (2015). Trabzon&rsquo;da 10 Temmuz 1919 Cephanelik Patlamas&#305;.
                    Karadeniz &#304;ncelemeleri Dergisi, 161-176 . &Uuml;&ccedil;&uuml;nc&uuml;, U&#287;ur.
                    2010. &ldquo;T&uuml;rkiye B&uuml;y&uuml;k Millet Meclisinin &#304;lk &#350;ehit
                    Milletvekilleri&rdquo;. Uluslararas&#305; Sosyal Ara&#351;t&#305;rmalar Dergisi 3(12):432-40.</p>

                <p>&Uuml;&ccedil;&uuml;nc&uuml;, U&#287;ur. 2022. &ldquo;Mi&#775;lli&#775; M&uuml;cadelede
                    D&ouml;nemi&#775;&rsquo;nde Trabzon&rdquo;. Ss. 535-71 i&ccedil;inde Trabzon Tarihi
                    (K&uuml;lt&uuml;r Ve Medeniyet). C. I. Trabzon: Trabzon Ticaret Ve Sanayi Odas&#305;.</p>

                <p>&Uuml;nalan, &#304;brahim. 2023. &ldquo;Trabzonlu &#350;airlerin &#350;iirlerindeki Arap&ccedil;a
                    Unsurlara &Ouml;rnekler&rdquo;. BENG&#304; D&uuml;nya Y&ouml;r&uuml;k-T&uuml;rkmen
                    Ara&#351;t&#305;rmalar&#305; Dergisi (2):193-208. doi: 10.58646/bengi.1349677.</p>

                <p>Vikipedi. 2024. &ldquo;Haf&#305;z Mehmet&rdquo;. Vikipedi.</p>

                <p>www.tenmak.gov.tr. 2022. &ldquo;Prof. Dr. &#304;brahim Din&ccedil;er - Tenmak&rdquo;.
                    Geli&#351; tarihi 11 Nisan 2024 (https://www.tenmak.gov.tr/prof-dr-ibrahim-dincer.html).</p>

                <p>www.ziraatbank.com.tr. (tarih yok). Bankam&#305;z&#305;n Kurulu&#351;u. 29 12, 2023 tarihinde
                    www.ziraatbank.com.tr: https://www.ziraatbank.com.tr/tr/bankamiz/hakkimizda/bankamiz-tarihcesi
                    adresinden al&#305;nd&#305; Yaz&#305;c&#305;, Nuri. 2003. Milli M&uuml;cadelede Canik
                    Sanca&#287;&#305;nda Pontus&ccedil;u Faaliyetler (1918-1922). Ankara: &Ccedil;izgi Kitabevi.</p>

                <p>Y&#305;k&#305;c&#305;, Abdulgazi, ve Tu&#287;ba Salman. 2022. &ldquo;Kad&#305;n Dostu Kent
                    Ba&#287;lam&#305;nda Kad&#305;n Ve Kent &#304;li&#351;kisi: Trabzon &Ouml;rne&#287;i&rdquo;. Mehmet
                    Akif Ersoy &Uuml;niversitesi &#304;ktisadi ve &#304;dari Bilimler Fak&uuml;ltesi Dergisi
                    9(3):1677-1708. doi: 10.30798/makuiibf.979763.</p>

                <p>Y&#305;lmaz, &Ccedil;a&#287;la. 2020. &ldquo;&Ccedil;a&#287;la Y&#305;lmaz, Trabzon Halkevi
                    Dergisi &#304;nan&rsquo;da Yay&#305;mlanan Folklor Metinleri &Uuml;zerine Bir &#304;nceleme&rdquo;.
                    Akademi Sosyal Bilimler Dergisi 7(19):33-47. doi: 10.34189/asbd.7.19.003.</p>

                <p>Y&#305;lmaz, &Ouml;zg&uuml;r. 2022. &ldquo;Trabzon Liman&#305;&rdquo;. Ss. 115-53 i&ccedil;inde
                    Trabzon Tarihi (K&uuml;lt&uuml;r Ve Medeniyet). C. II. Trabzon: Trabzon Ticaret Ve Sanayi
                    Odas&#305;.</p>

                <p>Yilmaz, &Ouml;zg&uuml;r. 2017. &ldquo;Veba, Kolera ve Salg&#305;nlar: Trabzon&rsquo;da Halk
                    Sa&#287;l&#305;&#287;&#305; ve Sa&#287;l&#305;k Kurumlar&#305; (1804-1895)&rdquo;. Mavi Atlas
                    5(1):172-200. doi: 10.18795/gumusmaviatlas.309429.</p>

                <p>Y&uuml;ksel, Ayhan. 2005. Do&#287;u Karadeniz Ara&#351;t&#305;rmalar&#305;. 1.Bask&#305;.
                    Kitabevi.</p>

                <p>Zaman, Mehmet. 2016. Trabzon&rsquo;da Ormanlar Ve Ormanc&#305;l&#305;k. C. II. Ankara: Trabzon
                    Ticaret Ve Sanayi Odas&#305;.</p>
            </>
        ),
    },

};

export default ReadSection;