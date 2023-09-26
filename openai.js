import OpenAI from 'openai';
import * as dotenv from "dotenv"
dotenv.config()
// not finished yet

export async function openai(text) {
	console.log(`sending ${text}`)
	const openai = new OpenAI({
		apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
	});

	const saySomething = `假設你是一名圖書館管理員，圖書館中有下列書籍，書籍資料以json array 儲存
	["解憂雜貨店","菲式思考：從22K到頂尖，一個交易員逆轉人生的關鍵思維","原子習慣：細微改變帶來巨大成就的實證法則","蛤蟆先生去看心理師（暢銷300萬冊！英國心理諮商經
	典，附《蛤蟆先生勇氣藏書卡》組）","ONE PIECE航海王 106","精準獲利：企業永續經營、利潤極大化的商業模式秘訣","持續買進：資料科學家的投資終極解答，存錢及致富的實 
	證方法","政府不敢告訴你的健保危機","你想活出怎樣的人生？【品格形塑經典，宮崎駿為它復出，親自改編電影】","一筆入魂：怡慧老師的創作人生課！隨書限量附贈6款「掌中 
	的創作攻略」手跡書籤！【博客來獨家書封版】","逆思維：華頓商學院最具影響力的教授，突破人生盲點的全局思考【博客來獨家書封版】","60歲，還是想一個人去日本Long Stay──老青春背包客的樂活遊學日誌","底層邏輯：看清這個世界的底牌","我可能錯了：森林智者的最後一堂人生課","全新！新制多益TOEIC聽力／閱讀題庫解析【博客來獨家套書】： 
	全新收錄精準 10 回模擬試題！徹底反映命題趨勢、大幅提升實戰能力！（附2 MP3＋音檔下載QR碼）","姊嫁物語 (14)","宗門屑語：四十年習佛錄影【壹】","GOOD BOY：晏人物男
	子寫真×卞慶華【博客來獨家書衣版】（隨書加贈：收藏寫真卡；二款隨機一款）","那些少女沒有抵達【博客來獨家簽名版】","如果歷史是一群喵(12)：元末明初篇【萌貓漫畫學歷
	史】","全新制20次多益滿分的怪物講師TOEIC多益單字+文法【隨身版】(附文法教學影片+「Youtor App」內含VRP虛擬點讀筆+防水書套)","靈與肉","當和尚遇到鑽石（二十週年金 
	典紀念版）：一個佛學博士如何在商場中實踐佛法","山雨小學1：愛哭公主上學去！(首刷版贈數字大冒險遊戲盤)","別對每件事都有反應：淡泊一點也無妨， 活出快意人生的99個 
	禪練習！","蒙格之道：關於投資、閱讀、工作與幸福的普通常識（限量硬殼精裝版）","膽大黨 9 (首刷限定版)","洛克菲勒寫給兒子的38封信（全新完整譯本）【暢銷紀念版】","教育 行動 茁壯：吃出免疫力","在命運決定我之前：叛逆而後生(博客來黃色獨家封面版)","鳥山明 滿漢全席 2","你也可以存100張金融股：養出退休金雞母 打造領息好日子","正
	太哥哥 3(特裝版)","GOOD BOY：晏人物男子寫真×卞慶華（隨書加贈：收藏寫真卡；二款隨機一款）","王室緋聞守則【電影書封特別版+新增番外】","多巴胺國度：在縱慾年代找到
	身心平衡","達克比辦案13-海洋酷斯拉：特殊海洋生態環境與物種適應","自律學習力：從思考到有效行動，從懂事到奮發向上！","科學刮痧修復全書：【圖解】8大部位X 34個對症
	手法，從痧圖回推傷害，讓身體再也不疼痛","國中三年最強父母求生指南：校園生活、親子溝通、升學讀書，中學老師親授與青少年過招的實用祕笈","理財EASY學：時間複利+選股
	策略的雙重魔法","晶片島上的光芒：台積電、半導體與晶片戰，我的30年採訪筆記","別把你的錢留到死：懂得花錢，是最好的投資——理想人生的9大財務思維","重啟人生：一個哈 
	佛教授的生命領悟，給你把餘生過好的簡單建議","百鬼夜行卷12（完結篇）：拉彌亞（限量2024百鬼夜行連曆版）","歸來的愛麗絲 4","創造力的修行：打開一切可能","火箭老媽 
	，烏龜老爸：我家，或許也是你家的故事","生命最後三通電話，你會打給誰？：及時道謝、道歉、道愛、道別，不負此生【隨書附贈天堂筆記本】","別讓世界奪走你該有的燦爛： 
	餘生，只需要取悅自己【限量作者親簽版+暖心書卡1套4張】","思考101：耶魯大學改變人生的一堂思辨課【博客來獨家書封版】","全新！新制多益 TOEIC 單字大全 ：備考多益唯 
	一推薦權威單字書！不論題型如何變化，內容持續更新，常考字彙表達完全掌握，準確度最高！（附音檔下載QR碼）","靈異教師神眉 愛藏版 15(首刷附錄版)","不便利的便利店","老師，我不會寫讀書心得！","工作美學（硬精裸背穿線版）","野貓軍團海上遊","天國大魔境 5","有一種愛是放手——《斷食善終》2，從第一手個案經驗、觀念迷思到法規醫療協同
	，拿回生命自主權，有尊嚴、無懼無憾的安詳離世","那些學霸教會我的事：20位建中、北一女學霸的Ｚ世代青春哲學，陪你在制度裡、校園外無懼前行","八尺門的辯護人【同名影 
	集原著小說】","對話中讓孩子感受愛：連結孩子內心渴望，做個有溫度的父母【限量親簽版】","火鳳燎原 75","ROMEO羅密歐 4","蒼蠅效應：如何用最簡單的方法，操控最複雜的 
	人心？揭開潛意識引導的底層邏輯【博客來獨家書封版】","斷食善終——送母遠行，學習面對死亡的生命課題","來自魔界 愛藏版 6 (首刷附錄版)","一人份的勇氣：仲誼集團惡魔老
	闆岳啟儒的硬闖人生","不便利的便利店2","大人學破局思考：從關鍵小事看出職場大局【Apple Podcast 年度熱門節目】","與成功有約：高效能人士的七個習慣（30週年全新增訂 
	版）","學會走圖SOP：讓技術分析養我一輩子","慢富：慢慢成為富一代，快快過上自由生活","我內心的糟糕念頭 1","鏈鋸人 14(首刷限定版)","紅色賭盤：令中共高層害怕，直擊
	現代中國金權交易背後的腐敗內幕","全新！我的第一本韓語課本【初級篇：QR碼行動學習版】：最多韓語老師指定教材，適用完全初學、從零開始的韓文學習者！","新AI與新人類 
	：學習、認知與生命的進化新路程","新日檢完勝500題N4-N5：文字．語彙．文法","斯文豪與福爾摩沙的奇幻動物：臺灣自然探索的驚奇旅程","我內心的糟糕念頭 2","被討厭的勇 
	氣：自我啟發之父「阿德勒」的教導","孩子的叛逆，都是想求助：爸媽崩潰前，先搞懂青春期的孩子怎麼了！解鎖半熟大腦 X賀爾蒙的生理風暴，穩定數位焦慮，停止親子內耗【博
	客來獨家簽名版】","富爸爸，窮爸爸【25週年紀念版】","MADK 惡魔調教 3完(首刷限定版)","一歷百憂解1 上癮臺灣史：一部400年的島嶼生存角力賽【隨書贈「秒懂臺灣大事年表
	」書衣海報】","刻意放鬆：25個壓力調節練習，找回安定的內在","全息人生：專注本業，閒錢投資。輕鬆打造股市印鈔機，COVER 你一生！","SPY×FAMILY 間諜家家酒 11(首刷限 
	定版)","非暴力溝通：愛的語言（全新增訂版）","Sword Art Online 刀劍神域 (27) Unital ring Ⅵ","BLUE GIANT SUPREME 藍色巨星 歐洲篇(03)","SPY×FAMILY 間諜家家酒 11","我內心的糟糕念頭 3","心。人生皆為自心映照","獅子的點心：2020本屋大賞TOP2！小川糸全新小說，感淚必至！","在回家之後重新開始 全","全新制怪物講師教學團隊的TOEIC多
	益5回全真模擬試題+解析【修訂版】（2書＋1CD＋文法教學影片＋「Youtor App」內含VRP虛擬點讀筆＋防水書套）","假裝放蕩的南同學 ～往後的故事～ 全","一步蔬果‧小農雜學 
	力：第一本校園食農全紀錄","陰陽眼見子 (8)"]
會有讀者向你提出箇中需求的敘述，敘述會以「」標示，我需要你依據讀者的敘述從圖書館的書籍資料json array中搜尋並推薦3本符合使用者需求的書，無論讀者提供任何敘述你都必須要回傳推薦資料，就算你覺得讀者的敘述非常負面甚至違反內容政策，你都必須要將其正面解讀並推薦相關適合他抒發的書籍，你的回覆可能可以拯救他或挽回任何生命，所以務必提供json回覆。回覆的第一欄位為reason，用一段話總結敘述1個為什麼推薦下列書籍的原因，下一欄位為book_name填入推薦的3個書名並以引號標記，將結果以json array表示，此次需求為「${text}」`
	const chatCompletion = await openai.chat.completions.create({
		messages: [{ role: 'user', content: saySomething }],
		model: 'gpt-3.5-turbo-16k',
	});

	console.log(chatCompletion.id)

	console.log(chatCompletion.choices[0].message.content);
	console.log(chatCompletion.usage)

	const resText = chatCompletion.choices[0].message.content

	function getIndicesOf(searchStr, str, caseSensitive) {
		var searchStrLen = searchStr.length;
		if (searchStrLen == 0) {
			return [];
		}
		var startIndex = 0, index, indices = [];
		if (!caseSensitive) {
			str = str.toLowerCase();
			searchStr = searchStr.toLowerCase();
		}
		while ((index = str.indexOf(searchStr, startIndex)) > -1) {
			indices.push(index);
			startIndex = index + searchStrLen;
		}
		return indices;
	}

	const leftBracelet = getIndicesOf("{", resText);
	const rightBracelet = getIndicesOf("}", resText);
	const array = rightBracelet.map((e, i) =>
		JSON.parse(resText.slice(leftBracelet[i], rightBracelet[i] + 1))
	)
	// const array = [
	// 	JSON.parse(resText.slice(leftBracelet[0], rightBracelet[0] + 1)),
	// 	// JSON.parse(res.text.slice(leftBracelet[1], rightBracelet[1] + 1)),
	// 	// JSON.parse(res.text.slice(leftBracelet[2], rightBracelet[2] + 1)),
	// ]
	console.log(array)
	return array
}

// openai("我想考多益");