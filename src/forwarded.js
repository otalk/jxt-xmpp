import { Namespace as NS } from 'xmpp-constants';


export default function (JXT) {

    let Forwarded = JXT.define({
        name: 'forwarded',
        namespace: NS.FORWARD_0,
        element: 'forwarded'
    });


    JXT.extendIQ(Forwarded);
    JXT.extendPresence(Forwarded);

    JXT.withMessage(function (Message) {

        JXT.extend(Message, Forwarded);
        JXT.extend(Forwarded, Message);
    });

    JXT.withDefinition('delay', NS.DELAY, function (Delayed) {

        JXT.extend(Forwarded, Delayed);
    });
}
