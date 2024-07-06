const idol = [
    { id: 1, text: '1. 天海 春香 / 天海 春香' },
    { id: 2, text: '2. 如月 千早 / 如月 千早' },
    { id: 3, text: '3. 星井 美希 / 星井 美希' },
    { id: 4, text: '4. 萩原 雪歩 / 萩原 雪步' },
    { id: 5, text: '5. 高槻 やよい / 高槻 彌生' },
    { id: 6, text: '6. 菊地 真 / 菊地 真' },
    { id: 7, text: '7. 水瀬 伊織 / 水瀨 伊織' },
    { id: 8, text: '8. 四条 貴音 / 四條 貴音' },
    { id: 9, text: '9. 秋月 律子 / 秋月 律子' },
    { id: 10, text: '10. 三浦 あずさ / 三浦 梓' },
    { id: 11, text: '11. 双海 亜美 / 雙海 亞美' },
    { id: 12, text: '12. 双海 真美 / 雙海 真美' },
    { id: 13, text: '13. 我那覇 響 / 我那霸 響' },
    { id: 14, text: '14. 春日 未来 / 春日 未來' },
    { id: 15, text: '15. 最上 静香 / 最上 靜香' },
    { id: 16, text: '16. 伊吹 翼 / 伊吹 翼' },
    { id: 17, text: '17. 田中 琴葉 / 田中 琴葉' },
    { id: 18, text: '18. 島原 エレナ / 島原 埃琳娜' },
    { id: 19, text: '19. 佐竹 美奈子 / 佐竹 美奈子' },
    { id: 20, text: '20. 所 恵美 / 所 惠美' },
    { id: 21, text: '21. 徳川 まつり / 德川 茉莉' },
    { id: 22, text: '22. 箱崎 星梨花 / 箱崎 星梨花' },
    { id: 23, text: '23. 野々原 茜 / 野野原 茜' },
    { id: 24, text: '24. 望月 杏奈 / 望月 杏奈' },
    { id: 25, text: '25. ロコ / Roco' },
    { id: 26, text: '26. 七尾 百合子 / 七尾 百合子' },
    { id: 27, text: '27. 高山 紗代子 / 高山 紗代子' },
    { id: 28, text: '28. 松田 亜利沙 / 松田 亞利沙' },
    { id: 29, text: '29. 高坂 海美 / 高坂 海美' },
    { id: 30, text: '30. 中谷 育 / 中谷 育' },
    { id: 31, text: '31. 天空橋 朋花 / 天空橋 朋花' },
    { id: 32, text: '32. エミリー スチュアート / 艾米莉·斯圖亞特' },
    { id: 33, text: '33. 北沢 志保 / 北澤 志保' },
    { id: 34, text: '34. 舞浜 歩 / 舞濱 步' },
    { id: 35, text: '35. 木下 ひなた / 木下 日向' },
    { id: 36, text: '36. 矢吹 可奈 / 矢吹 可奈' },
    { id: 37, text: '37. 横山 奈緒 / 橫山 奈緒' },
    { id: 38, text: '38. 二階堂 千鶴 / 二階堂 千鶴' },
    { id: 39, text: '39. 馬場 このみ / 馬場 木實' },
    { id: 40, text: '40. 大神 環 / 大神 環' },
    { id: 41, text: '41. 豊川 風花 / 豐川 風花' },
    { id: 42, text: '42. 宮尾 美也 / 宮尾 美也' },
    { id: 43, text: '43. 福田 のり子 / 福田 法子' },
    { id: 44, text: '44. 真壁 瑞希 / 真壁 瑞希' },
    { id: 45, text: '45. 篠宮 可憐 / 篠宮 可憐' },
    { id: 46, text: '46. 百瀬 莉緒 / 百瀬 莉緒' },
    { id: 47, text: '47. 永吉 昴 / 永吉 昴' },
    { id: 48, text: '48. 北上 麗花 / 北上 麗花' },
    { id: 49, text: '49. 周防 桃子 / 周防 桃子' },
    { id: 50, text: '50. ジュリア / 茱莉亞' },
    { id: 51, text: '51. 白石 紬 / 白石 紬' },
    { id: 52, text: '52. 桜守 歌織 / 櫻守 歌織' }
];


const idolSelect = document.getElementById('idolSelect');
idol.forEach(i => {
    const option = document.createElement('option');
    option.value = i.id;
    option.textContent = i.text;
    idolSelect.appendChild(option);
});
