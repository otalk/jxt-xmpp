import { Namespace as NS } from 'xmpp-constants';


export default function (JXT) {

    let Utils = JXT.utils;

    let Bind = JXT.define({
        name: 'bind',
        namespace: NS.BIND,
        element: 'bind',
        fields: {
            resource: Utils.textSub(NS.BIND, 'resource'),
            jid: Utils.jidSub(NS.BIND, 'jid')
        }
    });


    JXT.extendIQ(Bind);
    JXT.extendStreamFeatures(Bind);
}
