/**
Author: Ethereal
CreateTime: 2022/6/21
 */

import * as msg from "@modules/message";
import { __API, getChatResponse, getEmoji, getTextResponse } from "@modules/utils/chat-api";
import { Message } from "@modules/utils/message";
import BotConfig from "@modules/config";

export async function autoReply( messageData: Message, sendMessage: msg.SendFunc, config: BotConfig ) {
	//处理传入的数据
	const autoChat = config.autoChat;
	const msg: string = messageData.msg.content;
	//开始匹配回答
	if ( msg.length <= 0 ) {
		//随即回复一个表情包
		await sendMessage( { content: "找我有何贵干？", image: getEmoji() } );
		return;
	} else if ( msg.length >= 20 ) {
		await sendMessage( { content: "问题太复杂了，要不咱们聊点别的？", image: getEmoji() } );
		return;
	}
	
	switch ( true ) {
		case /渣/.test( msg ):
			await sendMessage( await getTextResponse( __API.LOVELIVE ) );
			break;
		case /emo/.test( msg ):
			await sendMessage( await getTextResponse( __API.HITOKOTO ) );
			break;
		case /诗/.test( msg ):
			await sendMessage( await getTextResponse( __API.POETRY ) );
			break;
		case /舔狗/.test( msg ):
			await sendMessage( await getTextResponse( __API.DOGS ) );
			break;
		default:
			//调用青云客免费API
			autoChat ? await sendMessage( await getChatResponse( msg ) ) : "";
	}
}