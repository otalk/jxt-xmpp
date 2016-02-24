const NS = 'http://jabber.org/protocol/ibb';


export default function (JXT) {

    let Utils = JXT.utils;

    let IBB = {
        get: function () {

            let data = Utils.find(this.xml, NS, 'data');
            if (data.length) {
                data = data[0];
                return {
                    action: 'data',
                    sid: Utils.getAttribute(data, 'sid'),
                    seq: parseInt(Utils.getAttribute(data, 'seq') || '0', 10),
                    data: new Buffer(Utils.getText(data), 'base64')
                };
            }

            let open = Utils.find(this.xml, NS, 'open');
            if (open.length) {
                open = open[0];
                let ack = Utils.getAttribute(open, 'stanza');
                if (ack === 'message') {
                    ack = false;
                } else {
                    ack = true;
                }

                return {
                    action: 'open',
                    sid: Utils.getAttribute(open, 'sid'),
                    blockSize: Utils.getAttribute(open, 'block-size'),
                    ack: ack
                };
            }

            let close = Utils.find(this.xml, NS, 'close');
            if (close.length) {
                return {
                    action: 'close',
                    sid: Utils.getAttribute(close[0], 'sid')
                };
            }
        },
        set: function (value) {

            if (value.action === 'data') {
                let data = Utils.createElement(NS, 'data');
                Utils.setAttribute(data, 'sid', value.sid);
                Utils.setAttribute(data, 'seq', value.seq.toString());
                Utils.setText(data, value.data.toString('base64'));
                this.xml.appendChild(data);
            }

            if (value.action === 'open') {
                let open = Utils.createElement(NS, 'open');
                Utils.setAttribute(open, 'sid', value.sid);
                Utils.setAttribute(open, 'block-size', (value.blockSize || '4096').toString());
                if (value.ack === false) {
                    Utils.setAttribute(open, 'stanza', 'message');
                } else {
                    Utils.setAttribute(open, 'stanza', 'iq');
                }
                this.xml.appendChild(open);
            }

            if (value.action === 'close') {
                let close = Utils.createElement(NS, 'close');
                Utils.setAttribute(close, 'sid', value.sid);
                this.xml.appendChild(close);
            }
        }
    };

    JXT.withIQ(function (IQ) {

        JXT.add(IQ, 'ibb', IBB);        
    });

    JXT.withMessage(function (Message) {

        JXT.add(Message, 'ibb', IBB);        
    });
}

