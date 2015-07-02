import { Namespace as NS } from 'xmpp-constants';


export default function (JXT) {

    let Utils = JXT.utils;

    JXT.define({
        name: 'rsm',
        namespace: NS.RSM,
        element: 'set',
        fields: {
            after: Utils.textSub(NS.RSM, 'after'),
            before: {
                get: function () {

                    return Utils.getSubText(this.xml, NS.RSM, 'before');
                },
                set: function (value) {

                    if (value === true) {
                        Utils.findOrCreate(this.xml, NS.RSM, 'before');
                    } else {
                        Utils.setSubText(this.xml, NS.RSM, 'before', value);
                    }
                }
            },
            count: Utils.numberSub(NS.RSM, 'count', false, 0),
            first: Utils.textSub(NS.RSM, 'first'),
            firstIndex: Utils.subAttribute(NS.RSM, 'first', 'index'),
            index: Utils.textSub(NS.RSM, 'index'),
            last: Utils.textSub(NS.RSM, 'last'),
            max: Utils.textSub(NS.RSM, 'max')
        }
    });
}
