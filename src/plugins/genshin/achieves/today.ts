import { InputParameter } from "@modules/command";
import { dailyClass } from "../init";

export async function main( { sendMessage, messageData }: InputParameter ): Promise<void> {
	const userID: string = messageData.msg.author.id;
	
	const week = messageData.msg.content;
	
	const { code, data } = await dailyClass.getUserSubscription( userID, week ? parseInt( week ) : undefined );
	if ( code === "base64" )
		await sendMessage( { file_image: data } );
	else if ( code === "url" ) {
		await sendMessage( { image: data } );
	} else {
		await sendMessage( data );
	}
}