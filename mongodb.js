import { MongoClient } from "mongodb"
import { config } from "dotenv"
config()

// await addToShelf('hello', 'shelf_1')

async function connectToCluster() {
	const uri = process.env.DB_URI
	try {
		const mongoClient = new MongoClient(uri)
		console.log("Connecting to MongoDB Atlas cluster...")
		await mongoClient.connect()
		console.log("Successfully connected to MongoDB Atlas!")

		return mongoClient
	} catch (error) {
		console.error("Connection to MongoDB Atlas failed!", error)
		process.exit()
	}
}

export async function addToShelf(book_id, shelf_id) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("shelfs")
		const collection = db.collection(shelf_id)

		console.log(`adding ${book_id} to ${shelf_id}`)
		const status = await collection.insertOne({ book_id: book_id })
		return status.acknowledged
	} finally {
		await mongoClient.close()
	}
}

export async function queryShelf(shelf_id) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("shelfs")

		const collection = db.collection(shelf_id)

		console.log(`querying ${shelf_id}`)

		const a = await collection.find().toArray()
		console.log(a)
		return a
	} finally {
		await mongoClient.close()
	}
}

export async function deleteFromShelf(book_id, shelf_id) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		mongoClient.db().admin()
		const db = mongoClient.db("shelfs")

		const collection = db.collection(shelf_id)

		console.log(`deleting ${book_id} from ${shelf_id}`)
		const a = await collection.deleteMany({ book_id: book_id })
		console.log(`${a.deletedCount} books has been deleted`)
		return a.deletedCount
	} finally {
		await mongoClient.close()
	}
}

export async function addSampleData() {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		// mongoClient.db().admin()
		const db = mongoClient.db("專題")
		const collection = db.collection('書')

		const bookNames = ["菲式思考：從22K到頂尖，一個交易員逆轉人生的關鍵思維", "原子習慣：細微改變帶來巨大成就的實證法則", "蛤蟆先生去看心理師（暢銷300萬冊！英國心理諮商經典，附《蛤蟆先生勇氣藏書卡》組）", "ONE PIECE航海王 106", "精準獲利：企業永續經營、利潤極大化的商業模式秘訣", "持續買進：資料科學家的投資終極解答，存錢及致富的實證方法", "政府不敢告訴你的健保危機", "你想活出怎樣的人生？【品格形塑經典，宮崎駿為它復出，親自改編電影】", "一筆入魂：怡慧老師的創作人生課！隨書限量附贈6款「掌中的創作攻略」手跡書籤！【博客來獨家書封版】", "逆思維：華頓商學院最具影響力的教授，突破人生盲點的全局思考【博客來獨家書封版】", "60歲，還是想一個人去日本Long Stay──老青春背包客的樂活遊學日誌", "底層邏輯：看清這個世界的底牌", "我可能錯了：森林智者的最後一堂人生課", "全新！新制多益TOEIC聽力／閱讀題庫解析【博客來獨家套書】：全新收錄精準 10 回模擬試題！徹底反映命題趨勢、大幅提升實戰能力！（附2 MP3＋音檔下載QR碼）", "姊嫁物語 (14)", "宗門屑語：四十年習佛錄影【壹】", "GOOD BOY：晏人物男子寫真×卞慶華【博客來獨家書衣版】（隨書加贈：收藏寫真卡；二款隨機一款）", "那些少女沒有抵達【博客來獨家簽名版】", "如果歷史是一群喵(12)：元末明初篇【萌貓漫畫學歷史】", "全新制20次多益滿分的怪物講師TOEIC多益單字+文法【隨身版】(附文法教學影片+「Youtor App」內含VRP虛擬點讀筆+防水書套)", "靈與肉", "當和尚遇到鑽石（二十週年金典紀念版）：一個佛學博士如何在商場中實踐佛法", "山雨小學1：愛哭公主上學去！(首刷版贈數字大冒險遊戲盤)", "別對每件事都有反應：淡泊一點也無妨， 活出快意人生的99個禪練習！", "蒙格之道：關於投資、閱讀、工作與幸福的普通常識（限量硬殼精裝版）", "膽大黨 9 (首刷限定版)", "洛克菲勒寫給兒子的38封信（全新完整譯本）【暢銷紀念版】", "教育 行動 茁壯：吃出免疫力", "在命運決定我之前：叛逆而後生(博客來黃色獨家封面版)", "鳥山明 滿漢全席 2", "你也可以存100張金融股：養出退休金雞母 打造領息好日子", "正太哥哥 3(特裝版)", "GOOD BOY：晏人物男子寫真×卞慶華（隨書加贈：收藏寫真卡；二款隨機一款）", "王室緋聞守則【電影書封特別版+新增番外】", "多巴胺國度：在縱慾年代找到身心平衡", "達克比辦案13-海洋酷斯拉：特殊海洋生態環境與物種適應", "自律學習力：從思考到有效行動，從懂事到奮發向上！", "科學刮痧修復全書：【圖解】8大部位X 34個對症手法，從痧圖回推傷害，讓身體再也不疼痛", "國中三年最強父母求生指南：校園生活、親子溝通、升學讀書，中學老師親授與青少年過招的實用祕笈", "理財EASY學：時間複利+選股策略的雙重魔法", "晶片島上的光芒：台積電、半導體與晶片戰，我的30年採訪筆記", "別把你的錢留到死：懂得花錢，是最好的投資——理想人生的9大財務思維", "重啟人生：一個哈佛教授的生命領悟，給你把餘生過好的簡單建議", "百鬼夜行卷12（完結篇）：拉彌亞（限量2024百鬼夜行連曆版）", "歸來的愛麗絲 4", "創造力的修行：打開一切可能", "火箭老媽，烏龜老爸：我家，或許也是你家的故事", "生命最後三通電話，你會打給誰？：及時道謝、道歉、道愛、道別，不負此生【隨書附贈天堂筆記本】", "別讓世界奪走你該有的燦爛：餘生，只需要取悅自己【限量作者親簽版+暖心書卡1套4張】", "思考101：耶魯大學改變人生的一堂思辨課【博客來獨家書封版】", "全新！新制多益 TOEIC 單字大全 ：備考多益唯一推薦權威單字書！不論題型如何變化，內容持續更新，常考字彙表達完全掌握，準確度最高！（附音檔下載QR碼）", "靈異教師神眉 愛藏版 15(首刷附錄版)", "不便利的便利店", "老師，我不會寫讀書心得！", "工作美學（硬精裸背穿線版）", "野貓軍團海上遊", "天國大魔境 5", "有一種愛是放手——《斷食善終》2，從第一手個案經驗、觀念迷思到法規醫療協同，拿回生命自主權，有尊嚴、無懼無憾的安詳離世", "那些學霸教會我的事：20位建中、北一女學霸的Ｚ世代青春哲學，陪你在制度裡、校園外無懼前行", "八尺門的辯護人【同名影集原著小說】", "對話中讓孩子感受愛：連結孩子內心渴望，做個有溫度的父母【限量親簽版】", "火鳳燎原 75", "ROMEO羅密歐 4", "蒼蠅效應：如何用最簡單的方法，操控最複雜的人心？揭開潛意識引導的底層邏輯【博客來獨家書封版】", "斷食善終——送母遠行，學習面對死亡的生命課題", "來自魔界 愛藏版 6 (首刷附錄版)", "一人份的勇氣：仲誼集團惡魔老闆岳啟儒的硬闖人生", "不便利的便利店2", "大人學破局思考：從關鍵小事看出職場大局【Apple Podcast 年度熱門節目】", "與成功有約：高效能人士的七個習慣（30週年全新增訂版）", "學會走圖SOP：讓技術分析養我一輩子", "慢富：慢慢成為富一代，快快過上自由生活", "我內心的糟糕念頭 1", "鏈鋸人 14(首刷限定版)", "紅色賭盤：令中共高層害怕，直擊現代中國金權交易背後的腐敗內幕", "全新！我的第一本韓語課本【初級篇：QR碼行動學習版】：最多韓語老師指定教材，適用完全初學、從零開始的韓文學習者！", "新AI與新人類：學習、認知與生命的進化新路程", "新日檢完勝500題N4-N5：文字．語彙．文法", "斯文豪與福爾摩沙的奇幻動物：臺灣自然探索的驚奇旅程", "我內心的糟糕念頭 2", "被討厭的勇氣：自我啟發之父「阿德勒」的教導", "孩子的叛逆，都是想求助：爸媽崩潰前，先搞懂青春期的孩子怎麼了！解鎖半熟大腦 X賀爾蒙的生理風暴，穩定數位焦慮，停止親子內耗【博客來獨家簽名版】", "富爸爸，窮爸爸【25週年紀念版】", "MADK 惡魔調教 3完(首刷限定版)", "一歷百憂解1 上癮臺灣史：一部400年的島嶼生存角力賽【隨書贈「秒懂臺灣大事年表」書衣海報】", "刻意放鬆：25個壓力調節練習，找回安定的內在", "全息人生：專注本業，閒錢投資。輕鬆打造股市印鈔機，COVER 你一生！", "SPY×FAMILY 間諜家家酒 11(首刷限定版)", "非暴力溝通：愛的語言（全新增訂版）", "Sword Art Online 刀劍神域 (27) Unital ring Ⅵ", "BLUE GIANT SUPREME 藍色巨星 歐洲篇(03)", "SPY×FAMILY 間諜家家酒 11", "我內心的糟糕念頭 3", "心。人生皆為自心映照", "獅子的點心：2020本屋大賞TOP2！小川糸全新小說，感淚必至！", "在回家之後重新開始 全", "全新制怪物講師教學團隊的TOEIC多益5回全真模擬試題+解析【修訂版】（2書＋1CD＋文法教學影片＋「Youtor App」內含VRP虛擬點讀筆＋防水書套）", "假裝放蕩的南同學 ～往後的故事～ 全", "一步蔬果‧小農雜學力：第一本校園食農全紀錄", "陰陽眼見子 (8)"]
		const bookAuthors = ["菲比斯", "詹姆斯‧克利爾", "羅伯．狄保德", "尾田榮一郎", "陳宗賢", "尼克．馬朱利", "張鴻仁", "吉野源三郎", "宋怡慧", "亞當．格蘭特", "吳典宜", "劉潤", "比約恩．納提科．林德布勞,卡洛琳．班克勒,納維德．莫迪里", "Hackers Academia", "森薰", "王薀", "晏人物,卞慶華", "吳曉樂", "肥志", "怪物講師教學團隊（台灣）", "甘紹文", "麥可・羅區格西", "賴曉妍,賴馬", "枡野俊明", "蒙格", "龍幸伸", "約翰‧洛克菲勒", "張藝懿", "王律婷", "鳥山明", "陳重銘", "中山幸", "晏人物,卞慶華", "凱西．麥奎斯頓", "安娜‧蘭布克醫師（Dr. Anna Lembke）", "胡妙芬", "陳怡嘉", "黃卉君", "洛洛老師", "禮林(Lilin)", "林宏文", "比爾‧柏金斯", "亞瑟．布魯克斯", "笭菁", "押見修造", "里克・魯賓", "街頭故事 李白", "郭憲鴻（小冬瓜）", "篠崎泫", "安宇敬", "David Cho", "岡野剛,真倉翔", "金浩然", "山本悅子", "江振誠", "工藤紀子", "石黒正数", "畢柳鶯", "王蘭芬", "唐福睿", "澤爸（魏瑋志）", "陳某", "わたなべあじあ", "伊娃．凡登布魯克,提姆．登海爾", "畢柳鶯", "光原伸", "岳啟儒", "金浩然", "姚詩豪,張國洋", "史蒂芬‧柯維,西恩‧柯維", "林穎", "慢活夫妻George & Dewi", "桜井紀雄", "藤本樹", "沈棟", "吳承恩", "蘇經天", "松本紀子,佐佐木仁子", "林大利", "桜井紀雄", "岸見一郎,古賀史健", "黃之盈", "羅勃特．T．清崎", "硯遼", "李文成", "胡展誥", "大俠武林", "遠藤達哉", "馬歇爾．盧森堡", "川原礫", "石塚真一", "遠藤達哉", "桜井紀雄", "稻盛和夫", "小川糸", "ココミ", "林政翰,怪物講師教學團隊（台灣）", "栗原カナ", "賴秋江,王彥嵓", "泉朝樹"]
		function _uuid() {
			var d = Date.now();
			if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
				d += performance.now(); //use high-precision timer if available
			}
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
			});
		}
		for (let i = 0; i < bookNames.length; i++) {
			await collection.insertOne({
				name: bookNames[i], shelfShouldStay: "A1", currentShelf: "", rfid: _uuid(), author: bookAuthors[i]
			})

		}

		// const status = await collection.insertMany({
		// 	name: "解憂雜貨店2", shelfShouldStay: "A1", currentShelf: "", rfid: "b755ae6c"
		// })
		// return status.acknowledged
	} finally {
		await mongoClient.close()
	}
}

export async function bookTouchShelf(rfid, touchedShelf) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		const db = mongoClient.db("專題")
		const collection = db.collection('書')
		const books = await collection.find({ rfid }).toArray()

		let currentShelf = ""
		if (books[0]?.currentShelf == '') {
			currentShelf = touchedShelf
		}
		if (books[0]?.currentShelf != '' && books[0]?.currentShelf != touchedShelf) {
			currentShelf = touchedShelf
		}

		const status = await collection.updateOne({ rfid }, { $set: { currentShelf: currentShelf } })
		return status.acknowledged
	} finally {
		await mongoClient.close()
	}
}

export async function getAllBooks() {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		const db = mongoClient.db("專題")
		const collection = db.collection('書')
		const books = await collection.find().project({ _id: 0 }).toArray()

		console.log(books)
		return books

	} finally {
		await mongoClient.close()
	}
}

export async function getBooksByNames(stringfyNames) {
	let mongoClient
	try {
		mongoClient = await connectToCluster()
		const db = mongoClient.db("專題")
		const collection = db.collection('書')
		const parsedNames = JSON.parse(stringfyNames)
		console.log(parsedNames)
		const query = {
			$or: parsedNames.map(name => { return { name: { $regex: name } } })
		}
		// console.log('query:', query)
		const books = await collection.find(query).project({ _id: 0 }).toArray()
		console.log(books)
		return books

	} catch {
		return []
	} finally {
		await mongoClient.close()
	}
}

// getBooksByNames('["解憂雜貨店","2"]')

// getAllBooks()
// bookTouchShelf("48a754ad14c80", "A1")
// addSampleData()