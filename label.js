const idol = [
    { id:1, text:'1.天海 春香／天海 春香／HARUKA AMAMI' },
    { id:2, text:'2.如月 千早／如月 千早／CHIHAYA KISARAGI' },
    { id:3, text:'3.星井 美希／星井 美希／MIKI HOSHII' },
    { id:4, text:'4.萩原 雪步／萩原 雪歩／YUKIHO HAGIWARA' },
    { id:5, text:'5.高槻 彌生／高槻 やよい／YAYOI TAKATSUKI' },
    { id:6, text:'6.菊地 真／菊地 真／MAKOTO KIKUCHI' },
    { id:7, text:'7.水瀨 伊織／水瀬 伊織／IORI MINASE' },
    { id:8, text:'8.四條 貴音／四条 貴音／TAKANE SHIJOU' },
    { id:9, text:'9.秋月 律子／秋月 律子／RITSUKO AKIZUKI' },
    { id:10, text:'10.三浦 梓／三浦 あずさ／AZUSA MIURA' },
    { id:11, text:'11.雙海 亞美／双海 亜美／AMI FUTAMI' },
    { id:12, text:'12.雙海 真美／双海 真美／MAMI FUTAMI' },
    { id:13, text:'13.我那霸 響／我那覇 響／HIBIKI GANAHA' },
    { id:14, text:'14.春日 未來／春日 未来／MIRAI KASUGA' },
    { id:15, text:'15.最上 靜香／最上 静香／SHIZUKA MOGAMI' },
    { id:16, text:'16.伊吹 翼／伊吹 翼／TSUBASA IBUKI' },
    { id:17, text:'17.田中 琴葉／田中 琴葉／KOTOHA TANAKA' },
    { id:18, text:'18.島原 埃琳娜／島原 エレナ／ELENA SHIMABARA' },
    { id:19, text:'19.佐竹 美奈子／佐竹 美奈子／MINAKO SATAKE' },
    { id:20, text:'20.所 惠美／所 恵美／MEGUMI TOKORO' },
    { id:21, text:'21.德川 茉莉／徳川 まつり／MATSURI TOKUGAWA' },
    { id:22, text:'22.箱崎 星梨花／箱崎 星梨花／SERIKA HAKOZAKI' },
    { id:23, text:'23.野野原 茜／野々原 茜／AKANE NONOHARA' },
    { id:24, text:'24.望月 杏奈／望月 杏奈／ANNA MOCHIZUKI' },
    { id:25, text:'25.Roco／ロコ／ROCO HANDA' },
    { id:26, text:'26.七尾 百合子／七尾 百合子／YURIKO NANAO' },
    { id:27, text:'27.高山 紗代子／高山 紗代子／SAYOKO TAKAYAMA' },
    { id:28, text:'28.松田 亞利沙／松田 亜利沙／ARISA MATSUDA' },
    { id:29, text:'29.高坂 海美／高坂 海美／UMI KOUSAKA' },
    { id:30, text:'30.中谷 育／中谷 育／IKU NAKATANI' },
    { id:31, text:'31.天空橋 朋花／天空橋 朋花／TOMOKA TENKUBASHI' },
    { id:32, text:'32.艾米莉·斯圖亞特／エミリー スチュアート／EMILY STEWART' },
    { id:33, text:'33.北澤 志保／北沢 志保／SHIHO KITAZAWA' },
    { id:34, text:'34.舞濱 步／舞浜 歩／AYUMU MAIHAMA' },
    { id:35, text:'35.木下 日向／木下 ひなた／HINATA KINOSHITA' },
    { id:36, text:'36.矢吹 可奈／矢吹 可奈／KANA YABUKI' },
    { id:37, text:'37.橫山 奈緒／横山 奈緒／NAO YOKOYAMA' },
    { id:38, text:'38.二階堂 千鶴／二階堂 千鶴／CHIZURU NIKAIDO' },
    { id:39, text:'39.馬場 木實／馬場 このみ／KONOMI BABA' },
    { id:40, text:'40.大神 環／大神 環／TAMAKI OGAMI' },
    { id:41, text:'41.豐川 風花／豊川 風花／FUKA TOYOKAWA' },
    { id:42, text:'42.宮尾 美也／宮尾 美也／MIYA MIYAO' },
    { id:43, text:'43.福田 法子／福田 のり子／NORIKO FUKUDA' },
    { id:44, text:'44.真壁 瑞希／真壁 瑞希／MIZUKI MAKABE' },
    { id:45, text:'45.篠宮 可憐／篠宮 可憐／KAREN SHINOMIYA' },
    { id:46, text:'46.百瀨 莉緒／百瀬 莉緒／RIO MOMOSE' },
    { id:47, text:'47.永吉 昴／永吉 昴／SUBARU NAGAYOSHI' },
    { id:48, text:'48.北上 麗花／北上 麗花／REIKA KITAKAMI' },
    { id:49, text:'49.周防 桃子／周防 桃子／MOMOKO SUOU' },
    { id:50, text:'50.茱莉亞／ジュリア／JULIA' },
    { id:51, text:'51.白石 紬／白石 紬／TSUMUGI SHIRAISHI' },
    { id:52, text:'52.櫻守 歌織／桜守 歌織／KAORI SAKURAMORI'}
];

const idolSelect = document.getElementById('idolSelect');
idol.forEach(i => {
    const option = document.createElement('option');
    option.value = i.id;
    option.textContent = i.text;
    idolSelect.appendChild(option);
});