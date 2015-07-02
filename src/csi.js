import { Namespace as NS } from 'xmpp-constants';


export default function (JXT) {

    let CSIFeature = JXT.define({
        name: 'clientStateIndication',
        namespace: NS,
        element: 'csi'
    });

    JXT.define({
        name: 'csiActive',
        eventName: 'csi:active',
        namespace: NS,
        element: 'active',
        topLevel: true
    });

    JXT.define({
        name: 'csiInactive',
        eventName: 'csi:inactive',
        namespace: NS,
        element: 'inactive',
        topLevel: true
    });


    JXT.extendStreamFeatures(CSIFeature);
}
