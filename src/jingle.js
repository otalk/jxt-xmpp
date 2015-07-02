import { Namespace as NS } from 'xmpp-constants';

const CONDITIONS = [
    'out-of-order',
    'tie-break',
    'unknown-session',
    'unsupported-info'
];
const REASONS = [
    'alternative-session',
    'busy',
    'cancel',
    'connectivity-error',
    'decline',
    'expired',
    'failed-application',
    'failed-transport',
    'general-error',
    'gone',
    'incompatible-parameters',
    'media-error',
    'security-error',
    'success',
    'timeout',
    'unsupported-applications',
    'unsupported-transports'
];


export default function (JXT) {

    let Utils = JXT.utils;

    let Jingle = JXT.define({
        name: 'jingle',
        namespace: NS.JINGLE_1,
        element: 'jingle',
        fields: {
            action: Utils.attribute('action'),
            initiator: Utils.attribute('initiator'),
            responder: Utils.attribute('responder'),
            sid: Utils.attribute('sid')
        }
    });

    let Content = JXT.define({
        name: '_jingleContent',
        namespace: NS.JINGLE_1,
        element: 'content',
        fields: {
            creator: Utils.attribute('creator'),
            disposition: Utils.attribute('disposition', 'session'),
            name: Utils.attribute('name'),
            senders: Utils.attribute('senders', 'both'),
            description: {
                get: function () {

                    let opts = JXT.tagged('jingle-description').map(function (Description) {

                        return Description.prototype._name;
                    });
                    for (let i = 0, len = opts.length; i < len; i++) {
                        if (this._extensions[opts[i]]) {
                            return this._extensions[opts[i]];
                        }
                    }
                },
                set: function (value) {

                    let ext = '_' + value.descType;
                    this[ext] = value;
                }
            },
            transport: {
                get: function () {

                    let opts = JXT.tagged('jingle-transport').map(function (Transport) {

                        return Transport.prototype._name;
                    });
                    for (let i = 0, len = opts.length; i < len; i++) {
                        if (this._extensions[opts[i]]) {
                            return this._extensions[opts[i]];
                        }
                    }
                },
                set: function (value) {

                    let ext = '_' + value.transType;
                    this[ext] = value;
                }
            }
        }
    });

    let Reason = JXT.define({
        name: 'reason',
        namespace: NS.JINGLE_1,
        element: 'reason',
        fields: {
            condition: Utils.enumSub(NS.JINGLE_1, REASONS),
            alternativeSession: {
                get: function () {

                    return Utils.getSubText(this.xml, NS.JINGLE_1, 'alternative-session');
                },
                set: function (value) {

                    this.condition = 'alternative-session';
                    Utils.setSubText(this.xml, NS.JINGLE_1, 'alternative-session', value);
                }
            },
            text: Utils.textSub(NS.JINGLE_1, 'text')
        }
    });


    JXT.extend(Jingle, Content, 'contents');
    JXT.extend(Jingle, Reason);

    JXT.extendIQ(Jingle);

    JXT.withStanzaError(function (StanzaError) {

        JXT.add(StanzaError, 'jingleCondition', Utils.enumSub(NS.JINGLE_ERRORS_1, CONDITIONS));
    });
}
