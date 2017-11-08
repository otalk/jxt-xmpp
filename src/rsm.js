import { Namespace as NS } from 'xmpp-constants';


export default function (JXT) {

    const Utils = JXT.utils;

    const First = JXT.define({
      name: 'oFirst',
      namespace: NS.RSM,
      element: 'first',
      fields: {
        value: Utils.text(),
        index: Utils.numberAttribute('index', false)
      }
    });

    const Last = JXT.define({
      name: 'oLast',
      namespace: NS.RSM,
      element: 'last',
      fields: {
        value: Utils.text(),
        index: Utils.numberAttribute('index', false)
      }
    });

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
            index: Utils.numberSub(NS.RSM, 'index', false),
            last: Utils.textSub(NS.RSM, 'last'),
            max: Utils.numberSub(NS.RSM, 'max', false),
            oFirst: Utils.subAttribute(NS.RSM, First),
            oLast: Utils.subAttribute(NS.RSM, Last)
        }
    });
}
